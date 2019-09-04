package main

import (
	_ "remoteback/queue"
	_ "remoteback/routers"

	"github.com/astaxie/beego"
)

func main() {
	beego.Run()
}
