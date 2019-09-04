# 待辦事項網站

# 關鍵字

- Golang
- Beego
- React
- React-Redux
- Material-UI
- RESTful-API
- JWT

# 說明

此專案練習建構待辦清單網站，後端以 beego建構，前端則以 react建構。利用 material-ui的 Grid system製作 RWD響應式網站。

# 預覽

![image](https://github.com/lya79/todo_app/blob/master/01.png)
![image](https://github.com/lya79/todo_app/blob/master/02.png)
![image](https://github.com/lya79/todo_app/blob/master/03.png)
![image](https://github.com/lya79/todo_app/blob/master/04.png)

# 安裝

STEP 1. 專案 clone至 GOPATH的 src目錄底下

STEP 2. [安裝 beego套件](https://beego.me/)

STEP 3. [安裝 Node.js](https://nodejs.org/en/)

# 附錄

## 測試執行後端
切換至 todo_app/serivce/
```sh
$ cd service
```

啟動後端服務
```sh
$ bee run
```

## 安裝前端相關模組
切換至 todo_app/web/
```sh
$ cd web
```

啟動前端服務
```sh
$ npm install
```


## 測試執行前端
切換至 todo_app/web/
```sh
$ cd web
```

啟動前端服務
```sh
$ npm run start
```

## 安裝 redux相關套件
```sh
$ npm install --save redux
$ npm install --save react-redux
```


# 參考
- [redux介紹](http://taobaofed.org/blog/2016/08/18/react-redux-connect/)
- [redux介紹](http://www.superbug.me/2018/02/06/react-redux-tutorial-for-beginners-learning-redux-in-2018/)
- [react-redux範例程式](https://github.com/xnng/react-redux-practice/tree/master/react-redux)
