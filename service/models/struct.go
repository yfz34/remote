package models

type CreateRoomRequest struct {
	RoomID      string
	PlayerState PlayerState
}
type PlayerState struct {
	Mute   bool    `json:"mute"`
	Speed  float32 `json:"speed"`
	Volume float32 `json:"volume"`
	Play   bool    `json:"play"`
	Loop   bool    `json:"loop"`
	Count  int     `json:"count"`
	Full   bool    `json:"full"`
}

type PlayerInfo struct {
	PlayerState  PlayerState `json:"playerState"`
	PlayList     []Video     `json:"playList"`
	PlayingVideo Playing     `json:"playingVideo"`
}

type Video struct {
	ChannelTitle string `json:"channelTitle"`
	Description  string `json:"description"`
	Id           string `json:"id"`
	Title        string `json:"title"`
}

type Playing struct {
	VideoId string `json:"videoId"`
	Count   int    `json:"count"`
	Type    string `json:"type"`
}
