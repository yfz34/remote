package publish

import (
	"encoding/json"
	"fmt"
	"log"
	"remoteback/models"
	"time"

	"github.com/astaxie/beego"

	"github.com/gomodule/redigo/redis"
)

type RedisClient struct {
	pool *redis.Pool
}

var addr = beego.AppConfig.String("redisserver")
var redisdb, _ = beego.AppConfig.Int("redisdb")
var redispwd = beego.AppConfig.String("redispwd")

func NewRedisClient() *RedisClient {
	pool := &redis.Pool{
		MaxIdle:     10,
		IdleTimeout: 300 * time.Second,
		Dial: func() (redis.Conn, error) {
			c, err := redis.Dial("tcp", addr, redis.DialPassword(redispwd), redis.DialDatabase(redisdb))
			if err != nil {
				return nil, err
			}
			return c, nil
		},
		TestOnBorrow: func(c redis.Conn, t time.Time) error {
			if time.Since(t) < time.Minute {
				return nil
			}
			_, err := c.Do("PING")
			return err
		},
	}
	log.Printf("new redis pool at %s", addr)
	client := &RedisClient{
		pool: pool,
	}
	return client
}

func RedisPub(room string, msg []byte) {
	r := NewRedisClient()
	r.Publish(room, msg)
}

func (r *RedisClient) Publish(channel string, message []byte) (int, error) {
	c := r.pool.Get()
	defer c.Close()
	n, err := redis.Int(c.Do("PUBLISH", channel, message))
	if err != nil {
		return 0, fmt.Errorf("redis publish %s %s, err: %v", channel, message, err)
	}
	return n, nil
}

func SaveRoom(channel string, message []byte) (int, error) {
	playerInfo := &models.PlayerInfo{}
	msg := models.HandleMessage{}
	json.Unmarshal(message, &msg)
	log.Print(msg)

	r := NewRedisClient()
	c := r.pool.Get()
	defer c.Close()

	rs, _ := redis.Bytes(c.Do("GET", "Room-"+channel))
	json.Unmarshal(rs, playerInfo)
	log.Print(playerInfo)

	switch msg.Type {
	case "REMOTE_VOLUME_CHANGE":
		data := models.REMOTEVOLUMECHANGE{}
		json.Unmarshal(message, &data)
		log.Print(data)
		playerInfo.PlayerState.Volume = data.Volume
		val1, _ := json.Marshal(playerInfo)
		log.Print(playerInfo)
		c.Do("SET", "Room-"+channel, val1)
	case "REMOTE_SPEED_CHANGE":
		data := models.REMOTESPEEDCHANGE{}
		json.Unmarshal(message, &data)
		log.Print(data)
		playerInfo.PlayerState.Speed = data.Speed
		val1, _ := json.Marshal(playerInfo)
		log.Print(playerInfo)
		c.Do("SET", "Room-"+channel, val1)
	case "REMOTE_PLAY_STATE":
		data := models.REMOTEPLAYSTATE{}
		json.Unmarshal(message, &data)
		log.Print(data)
		playerInfo.PlayerState.Play = !data.PlayState
		val1, _ := json.Marshal(playerInfo)
		log.Print(playerInfo.PlayerState.Play)
		c.Do("SET", "Room-"+channel, val1)
	case "OrderVideo":
		data := models.OrderVideo{}
		json.Unmarshal(message, &data)
		log.Print(data)
		playerInfo.PlayList = append(playerInfo.PlayList, models.Video{
			ChannelTitle: data.ChannelTitle,
			Description:  data.Description,
			Id:           data.Id,
			Title:        data.Title,
		})
		if playerInfo.PlayingVideo.Count == -1 || len(playerInfo.PlayList)-1 == playerInfo.PlayingVideo.Count {
			playerInfo.PlayingVideo.Count += 1
			playerInfo.PlayingVideo.Type = "Playing"
			playerInfo.PlayingVideo.VideoId = data.Id
		} else {
			playerInfo.PlayingVideo.Type = "Playing"
		}
		log.Print(playerInfo.PlayingVideo)
		val1, _ := json.Marshal(playerInfo)
		c.Do("SET", "Room-"+channel, val1)
	case "REMOTE_NEXT_VIDEO":
		if playerInfo.PlayingVideo.Count != -1 && len(playerInfo.PlayList)-1 != playerInfo.PlayingVideo.Count {
			playerInfo.PlayingVideo.Count += 1
			playerInfo.PlayingVideo.VideoId = playerInfo.PlayList[playerInfo.PlayingVideo.Count].Id
		}
		log.Print(playerInfo.PlayingVideo)
		val1, _ := json.Marshal(playerInfo)
		c.Do("SET", "Room-"+channel, val1)
	case "REMOTE_PREVIOUS_VIDEO":
		if playerInfo.PlayingVideo.Count > 0 {
			playerInfo.PlayingVideo.Count -= 1
			playerInfo.PlayingVideo.VideoId = playerInfo.PlayList[playerInfo.PlayingVideo.Count].Id
		}
		log.Print(playerInfo.PlayingVideo)
		val1, _ := json.Marshal(playerInfo)
		c.Do("SET", "Room-"+channel, val1)
	}
	return 0, nil
}
