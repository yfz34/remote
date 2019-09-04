package controllers

import (
	"encoding/json"
	"log"
	"remoteback/models"
	"remoteback/redis"

	"github.com/astaxie/beego"
)

type RoomController struct {
	beego.Controller
}

type RoomRequest struct {
	Token string `json:"token"`
}
type RoomResponse struct {
	ResultCode int               `json:"result_code"`
	PlayerInfo models.PlayerInfo `json:"playerInfo"`
}

func (c *RoomController) Post() {
	request := RoomRequest{}
	response := RoomResponse{ResultCode: 50}
	if err := json.Unmarshal(c.Ctx.Input.RequestBody, &request); err != nil {
		log.Println("解析失敗:", err)
	} else {
		log.Print("創建房間請求:", request)
		//redis查詢KEY
		if redis.RoomExist(request.Token) {
			//存在

			//取得房間資訊並回傳
			if val, suc := redis.GetRoomData(request.Token); suc {
				response.ResultCode = 10
				response.PlayerInfo = *val
				c.Data["json"] = response
				c.ServeJSON()
			} else {
				log.Print("資料處理失敗，將返回Code:40")
				response.ResultCode = 40
				c.Data["json"] = response
				c.ServeJSON()
			}

		} else {
			//不存在
			log.Print("房間不存在，將返回Code:30")
			response.ResultCode = 30
		}
	}
	c.Data["json"] = response
	c.ServeJSON()
}
