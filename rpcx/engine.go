package rpcx

import (
	"log"

	"github.com/astaxie/beego"
	"github.com/smallnest/rpcx/server"
)

var Server *server.Server
var addr = beego.AppConfig.String("host")

func init() {
	Server = server.NewServer()
	Server.RegisterName("Arith", new(Arith), "")
	log.Print(addr)
	go Server.Serve("http", addr)
}

func Register() {
	log.Print("rpc")
	s := server.NewServer()
	s.RegisterName("Arith", new(Arith), "")
	s.Serve("tcp", addr)
	beego.Handler("/rpc", s)
}
