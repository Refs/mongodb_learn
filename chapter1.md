
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

> error:  when starting mongod.exe, getting error of missing api-ms-win-crt-runtime-l1-1-0.dll
> https://stackoverflow.com/questions/43165669/when-starting-mongod-exe-getting-error-of-missing-api-ms-win-crt-runtime-l1-1-0
>  遇到更新不能安装，很可能是自己将windows update 的服务关闭了，打开方式win + r--> services.msc --> windows update 服务开启；

4. start the mongodb server

```bash
net start mongodb

```

5. start mongodb compass(GUI) to connect to mongodb server

> 或者自己配置启动文件

electron 用于开发桌面的应用程序；像自己以前接触的软件，现在都可以用此来开发；

6. 使用mongo.exe链接我们的mongo服务，注意以前韶在演示的时候，要打开两个命令行，其中一个是用于开启mongodb的服务，另外一个用于连接mongodb服务 并操作数据库；

```bash
# connet to mongodb service
mongo
# list current database
show dbs
# new database nodekb
use nodekb
# new collection
db.createCollection('articles')
# remove collection == db.COLLECTION_NAME.drop()
db.articels.drop()
# list current database's collections
show collections
# instert document into spec collection - - articles
db.articles.insert({
  title: "article one",
  author: "liu peng",
  body: "this is article one"
})
# list documents of the article collection
db.articles.find()
# beautiful the output format
db.articles.find().pretty()

# involve find method with a filter
db.articles.find({title: "article one"});

# uupdate method
# the first parameter ,the first JSON object is treat as the filter
# the second param is used as the actrual update data you want to change;
db.articles.update()
db.articles.uptdate({title: "article one"},{
  title: "article one uptdate"
})
# with $set
# this is mean this is a not a field , should not be interpreted as fuel instead it is interpreted as  a command
# $set is one of the mommon ones that i want to set the following field or fields | 即我们要改变的仅仅是一个doc的单个 字段， 而非是整个doc;
db.articles.update({title: "article one"},{
  $set:{
    title: "article one updaate with set"
  }
})

# remove operator
db.articles.remove() # don't do anything
# remove any documnet of the spec collections
db.articles.remove({})
# invoce the remove method with a filter
db.articels.remove({
  title: "article one"
})

```

## mongoose

* start by three line code

```js
// app.js中
var mongoose = require('mongoose');

mongoose.connect('mongodb://locallhost/test',{

});

mongoose.Promise = global.Promise;

// 1. Schema 
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String
  // we can spec the collection this data is being stored is in a collection called employee;
},{collection: 'employee'})

// 2. Model : The model is going to be the object that is going to allow us to starting interacting with the database;  it allow us to send commands to database just like we would  if we are in command line ,that is about create document, find documents, update documents and remove documents

// 关于mongoose.model()方法的第一个参数，有一个坑点， 官方解释： The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural version of your model name. Thus, for the example above, the model Tank is for the tanks collection in the database.  即第一个参数是我们模型model所对应的数据库的collection的名字的单数形式，即若collection的名字是employees 则我们的第一个参数应传'Employee' 之所以第一个字母大写 是因为我们的model是一个构造函数，第一个名称应该大写；这是一个容易混淆的地方；
// 假设我们的数据库中没有名为employees的 collection是，当我们去调用 mongoose.model('Employee',any)方法 并利用方法产生的model去实例化一个document的时候，mongodb 会自动的创建一个 名为employees的collection 以 与我们的操作相对应； 这就是两者的对应关系；
// 我们也可以去通过向mongoose.Schema() 方法中去传递参数，以指定我们要使用的collection  var dataSchema = new Schema({..}, { collection: 'data' }); 这样通过dataSchema compile的model 就会默认的使用 data  collection
var EmployeeModel = mongoose.model('EmployeeModel');

// 2. retrive doc from dbs; find is a asynchronous function , node.js server or node.js fole is running in its little process and need to communicate with a different process where the Mongo database is running  
EmployeeModel.find()


``` 
机箱 显卡 cpu 固态硬盘 内存 电源 

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


<!-- a model is a class with which we construct documents. int this case, each document will be a kitten with properties and behavious as declared in our schema. let's create a litten document   -->

##  安装并使用mongoose

```bash

npm install mongoose --save

```

* 在app.js中实例化我们要操作的数据库；db

```js
const express = require("express");
// 引入路径合并模块
const path = require('path');

const mongoose = require('mongooose');

mongoose.connect('mongodb://locallhost/nodekb');

let db = mongoose.connection;

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

* 在项目的目录去新建一个目录modules 在models目录里面新建一个文件article.js

```js
// 在/models/artical.js中

let mongoose =  require('mongoose');

// Artical Achema
let articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

let Article = module.exports = mongoose.model('Article', articleSchema)



```
