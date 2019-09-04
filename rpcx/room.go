package rpcx

import (
	"context"
	"fmt"
	"remoteback/models"
	"remoteback/redis"
)

type Arith int

type Args struct {
	A int
	B int
}

type Reply struct {
	C int
}

type CreateRoomRequest struct {
	RoomID     string
	PlayerInfo models.PlayerInfo
}
type PlayerState struct {
	Mute   bool
	Speed  float32
	Volume float32
	Play   bool
	Loop   bool
	Count  int
	Full   bool
}
type CreateRoomResponse struct {
	ResultCode int
}

func (t *Arith) Mul(ctx context.Context, args *Args, reply *Reply) error {

	reply.C = args.A * args.B
	fmt.Printf("call: %d * %d = %d\n", args.A, args.B, reply.C)

	return nil
}

func (t *Arith) Add(ctx context.Context, args *Args, reply *Reply) error {
	reply.C = args.A + args.B
	fmt.Printf("call: %d + %d = %d\n", args.A, args.B, reply.C)
	// time.Sleep(5 * time.Second)
	return nil
}

func (t *Arith) Say(ctx context.Context, args *string, reply *string) error {
	*reply = "hello " + *args
	return nil
}

func (t *Arith) CreateRoom(ctx context.Context, request *CreateRoomRequest, response *CreateRoomResponse) error {
	response.ResultCode = 50

	que := []string{request.RoomID}
	redis.RedisSub(que)

	//set redis
	if redis.RoomInitial(request.RoomID, request.PlayerInfo) {
		response.ResultCode = 10
	}

	return nil
}
