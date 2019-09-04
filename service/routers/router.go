package routers

import (
	"remoteback/controllers"
	"remoteback/rpcx"
	"remoteback/websocket"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/plugins/cors"
)

func init() {
	beego.InsertFilter("*", beego.BeforeRouter, cors.Allow(&cors.Options{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Authorization", "Access-Control-Allow-Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length", "Access-Control-Allow-Origin"},
		AllowCredentials: true}))

	//設定靜態文件路徑
	// beego.SetStaticPath("static", "build/static")
	// beego.SetStaticPath("static/css", "build/static/css")
	// beego.SetStaticPath("static/js", "build/static/js")
	// beego.SetStaticPath("static/media", "build/static/media")
	// // beego.SetStaticPath("index.css", "build/index.css")
	// beego.SetStaticPath("logo.png", "build/favicon.png")
	// beego.SetStaticPath("service-worker.js", "build/service-worker.js")

	beego.Router("/Room/*", &controllers.WebController{})
	beego.Router("/api/v1/room", &controllers.RoomController{})
	beego.Router("/ws/:token", &websocket.MyWebSocketController{})
	beego.Handler("/_rpcx_", rpcx.Server)
}
