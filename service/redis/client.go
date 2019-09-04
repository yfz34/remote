package redis

import (
	"log"
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
