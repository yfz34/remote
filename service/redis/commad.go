package redis

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"remoteback/models"
	"strings"

	"github.com/gomodule/redigo/redis"
)

func (r *RedisClient) Commad(commandName string, args ...interface{}) {
	conn := r.pool.Get()
	defer conn.Close()
	conn.Do(commandName, args)
}

func GetRoomData(key string) (*models.PlayerInfo, bool) {
	playerInfo := &models.PlayerInfo{}
	r := NewRedisClient()
	conn := r.pool.Get()
	defer conn.Close()
	rs, err := redis.Bytes(conn.Do("GET", "Room-"+key))
	if err != nil {
		fmt.Println(err) // [xxx]
		return playerInfo, false
	}

	err = json.Unmarshal(rs, playerInfo)
	if err != nil {
		fmt.Println(err) // [xxx]
		return playerInfo, false
	}
	log.Print(playerInfo)
	return playerInfo, true
}

func RoomExist(token string) bool {
	r := NewRedisClient()
	conn := r.pool.Get()
	defer conn.Close()
	reply, _ := redis.Strings(conn.Do("KEYS", "Room-"+token))
	log.Print(reply)
	if len(reply) != 0 {
		return true
	}
	return false
}

func RoomInitial(roomid string, val interface{}) bool {
	r := NewRedisClient()
	conn := r.pool.Get()
	defer conn.Close()
	val1, _ := json.Marshal(val)
	reply, err := conn.Do("SET", "Room-"+roomid, val1)
	log.Print(reply)
	if err != nil {
		return false
	}
	return true
}

func GetAllRoom() {
	r := NewRedisClient()
	conn := r.pool.Get()
	defer conn.Close()
	reply, _ := redis.Strings(conn.Do("KEYS", "Room-*"))

	// log.Print(reply)

	ctx := context.Background()
	for _, name := range reply {
		s := strings.Split(name, "-")
		go r.Subscribe(ctx, reciveConsumer, s[1], s[1]+"-room-vts")
	}
}
