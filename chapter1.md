
```bash
# 查看datbase下面的的集合 
show collections 

# persons
# system.indexes
# 系统自动为我们生成的，负责提供索引的一个文档，当我们插入一个document的时候，mongo会自动为我们的document 增加一个_id 

```

## mongodb的安装

1. 自定义的安装目录

C:\mongodb

> 软件安装的时候选择customer 并将软件，安装到此目录；

> 添加 cmder 到右键菜单添加后在任意文件夹中即可打开Cmder，上一步的把 Cmder 加到环境变量就是为此服务的, 在管理员权限的终端输入以下语句即可:

Cmder.exe /REGISTER ALL


2. 在安装目录C:\mongodb下新建目录：

```bash
#  where all of our data will be stored
 data  data/db  
#  our log-log dolder
 log 
```

3. 配置mongodb 的启动项

> https://docs.mongodb.com/manual/reference/configuration-options/

> https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/ 最终解决方案

> 注意一定要使用window 的命令行工具，且以管理员的方式去打开

> 开启： net start MongoDB 关闭： net start MongoDB

Create a folder with the name config in your mongodb directory and a file with the name mongodb.conf in the newly created folder >> (so you should have this arrangement of path) >> C:\mongodb\config\mongodb.conf
add this to the file mongodb.conf


```bash
systemLog:
   destination: file
   path: C:\mongodb\log\mongo.log
   logAppend: true
storage:
   dbPath: C:\mongodb\data\db
net: 
   bindIp: 127.0.0.1
   port: 27017
setParameter:
   enableLocalhostAuthBypass: false
```

run this line of code in CMD

```bash
mongod --config C:\mongodb\config\mongodb.conf --install
```

4. start the mongodb server

```bash
net start mongodb

```

5. start mongodb compass(GUI) to connect to mongodb server 

> 或者自己配置启动文件 

electron 用于开发桌面的应用程序；像自己以前接触的软件，现在都可以用此来开发；



## init our project

### config package.json file 

```bash

cd /c/
mkdir nodekb
cd nodekb/
npm init

# entry point: (index.js) app.js(入口文件设置成为app.js)
```

### 配置npm脚本

> in the package.json you can write a little scripts with NPM to do certain thins they give you this default test

```json
{
  "name": "nodekb",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
// we can get rid of the test and let's say start  we just put the command we want to run 
  "scripts": {
    //"test": "echo \"Error: no test specified\" && exit 1"
    "start": "node app"
  },
  "author": "",
  "license": "ISC"
}

```
### install 必要的 modules

```bash
npm install express --save

```

> 测试 

```js
const express = require('express');
const app = express();
app.get('/',(req, res) => {
    res.send('Hello world');
})

app.listen(3000,function(){
    console.log('node server in runing on port 3000...')
})

```


## pug template engine

> 预备知识

* ./ __dirname 的区别 ：
https://stackoverflow.com/questions/8131344/what-is-the-difference-between-dirname-and-in-node-js

* app.set('view', path): A directory or an array of directories for the application's views. If an array, the views are looked up in the order they occur in the array.
* app.set('view engine', 'pug'): The default engine extension to use when omitted.

```bash
npm install pug --save

mkdir views
touch index.pug


```

```js
const express = require("express");
// 引入路径合并模块
const path = require('path');

// init APP
const app = express();

// set view dir
app.set('views', path.join(__dirname, 'view'));
// load View Engine
app.set('view', 'pug');

// Home router
app.get("/", (req, res) => {
  // res.send("Hello world");
  res.render('index')
});

// start server
app.listen(3000, function() {
  console.log("node server in runing on port 3000...");
});


```
