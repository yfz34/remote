package models

type HandleMessage struct {
	Type string `json:"type"`
}

type OrderVideo struct {
	Type         string `json:"type"`
	ChannelTitle string `json:"channelTitle"`
	Description  string `json:"description"`
	Id           string `json:"id"`
	Title        string `json:"title"`
}

type REMOTEVOLUMECHANGE struct {
	Type   string  `json:"type"`
	Volume float32 `json:"volume"`
}

type REMOTESPEEDCHANGE struct {
	Type  string  `json:"type"`
	Speed float32 `json:"speed"`
}

type REMOTENEXTVIDEO struct {
	Type string `json:"type"`
}

type REMOTEPREVIOUSVIDEO struct {
	Type string `json:"type"`
}

type REMOTEPLAYSTATE struct {
	Type      string `json:"type"`
	PlayState bool   `json:"playState"`
}
