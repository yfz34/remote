package redis

import (
	"context"
	"fmt"
	"log"
	"remoteback/websocket"
	"time"

	"github.com/gomodule/redigo/redis"
)

// type ConsumeFunc func(msg redis.Message) error
// ConsumeFunc consumes message at the channel.
type ConsumeFunc func(channel string, room string, message []byte) error

func (r *RedisClient) Publish(channel string, message []byte) (int, error) {
	c := r.pool.Get()
	defer c.Close()
	n, err := redis.Int(c.Do("PUBLISH", channel, message))
	if err != nil {
		return 0, fmt.Errorf("redis publish %s %s, err: %v", channel, message, err)
	}
	return n, nil
}

func (r *RedisClient) Subscribe(ctx context.Context, consume ConsumeFunc, room string, channel ...string) error {
	psc := redis.PubSubConn{Conn: r.pool.Get()}
	// defer psc.Close()
	log.Printf("redis pubsub subscribe channel: %v", channel)
	// if err := psc.Subscribe(redis.Args{}.AddFlat(channel)...); err != nil {
	if err := psc.Subscribe(redis.Args{}.AddFlat(channel)...); err != nil {
		log.Print(err)
		return err
	}
	done := make(chan error, 1)
	// start a new goroutine to receive message
	go func() {
		// IMPORTANT!
		defer psc.Close()
		for {
			switch msg := psc.Receive().(type) {
			case error:
				done <- fmt.Errorf("redis pubsub receive err: %v", msg)
				return
			case redis.Message:
				// if err := consume(msg); err != nil {
				// 	done <- err
				// 	return
				// }
				if err := consume(msg.Channel, room, msg.Data); err != nil {
					done <- err
					return
				}
			case redis.Subscription:
				if msg.Count == 0 {
					// all channels are unsubscribed
					done <- nil
					return
				}
			}
		}
	}()

	// health check
	tick := time.NewTicker(time.Minute)
	defer tick.Stop()
	for {
		select {
		case <-ctx.Done():
			if err := psc.Unsubscribe(); err != nil {
				return fmt.Errorf("redis pubsub unsubscribe err: %v", err)
			}
			return nil
		case err := <-done:
			return err
		case <-tick.C:
			if err := psc.Ping(""); err != nil {
				return err
			}
		}
	}
}

func RedisSub(subarr []string) {
	r := NewRedisClient()
	ctx := context.Background()
	for _, name := range subarr {
		go r.Subscribe(ctx, reciveConsumer, name, name+"-room-vts")
	}
}

func reciveConsumer(channel string, room string, message []byte) error {
	log.Printf("receive message[%s] at the channel[%s] room:%s\n", string(message), channel, room)
	websocket.PubtoHub(room, message)
	return nil
}
