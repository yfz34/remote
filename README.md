# 遠端點播系統後台

# 關鍵字

- Golang
- Beego
- RESTful-API
- Redis (Pub/Sub)
- RPCX
- Websocket
- React
- React-Redux
- Material-UI

# 說明

此專案練習建構遠端點播系統，後端以 Beego建構，前端則以Reactjs建構。

# 安裝

STEP 1. 專案 clone至 GOPATH的 src目錄底下

STEP 2. [安裝 beego套件](https://beego.me/)

STEP 3. [安裝 Node.js](https://nodejs.org/en/)

# 附錄

## 測試執行後端
切換至 remote/serivce/
```sh
$ cd service
```

啟動後端服務
```sh
$ bee run
```

## 安裝前端相關模組
切換至 remote/web/
```sh
$ cd web
```

安裝前端所需套件
```sh
$ npm install
```

## 測試執行前端
切換至 remote/web/
```sh
$ cd web
```

啟動前端服務
```sh
$ npm start
```

## 安裝 redux相關套件
```sh
$ npm install --save redux
$ npm install --save react-redux
$ npm install --save redux-logger
$ npm install --save redux-thunk
```


# 參考

