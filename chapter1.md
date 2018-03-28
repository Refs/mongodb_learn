
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

var EmployeeSchema = new Schema({
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
var EmployeeModel = mongoose.model('EmployeeModel',EmployeeSchema);

// 2. retrive doc from dbs; find is a asynchronous function , node.js server or node.js fole is running in its little process and need to communicate with a different process where the Mongo database is running  
// EmployeeModel.find()

//3. model.find()   promise!  一般在要使用的文档下 写上一句// Use native ES6 promises
mongoose.Promise = global.Promise;

// 官方文档 ： http://mongoosejs.com/docs/promises.html



function findAllEmployees() {
  // 返回的是一个promise, 与以往的使用场景一样，函数调用后 会被立即执行：
  //  the find method send out the request to the database server , node.js thread(线程) 
  return EmployeeModel.find();
}
// what we actrually get back is not the actural array of emplloyees , instead what we get back is what is called promise; remember all this communication is asynchromous won't wait for the database to response , instead it keeps going , and what it's response is a promise ; 即函数被调用后，立即执行，虽然函数体内部有异步请求的调用，但函数不会等待一部返回，而是`直接返回一个promise对象，,然后继续执行； 我们拿到这个方法返回的promise 之后，就去在promise上面去注册(注意是注册而不是立即执行)几个callback函数，然后就直接过了；  
// 调用find()方法，实质上是向mongodb服务器发送请求；只不过其是将这些过程都封装了；
// 学会这种promise 工厂函数的写法， 以后遇到的时候，直接去用就可以了； 这种promise 工厂函数的写法很优雅；
var employeeFindPromise = findAllEmployees();

// 4 register promise's callback function
employeeFindPromise.then(
  (data)=>{
    console.log(data);
  },
  (err)=>{
    console.log(err);
  }
)
// 简写形式： findAllEmployees().then((data)=>{console.log(data)});

// 5. 通过_id 去删除document

function deleteEmployee(employeeId){
  return EmployeeModel.remove({
    _id: employeeId
  })
}

deleteEmployee('5ab89881c562011e74ac5223').then(
  (status)=>{
    // the status information saying whether it was successfull or not and how many doc have removed.
    console.log(status);
  }
)

// 6. insert a document to our employees collection

function createEmployee(employee) {
  return EmployeeModel.create(employee);
}

var dan = {
  username: 'dan',
  password: 'dan123',
  firstName: 'Daniel',
  lastName: 'Craig'
}

createEmployee(dan)
  .then(
    (response)=>{
      console.log(response);
    }
  )

// 7. create and nested promise;

// retrive all employeee from our collection, after we create a new document, note that both process are asynchronouse , we have to make sure , the ctreate operation is processed before retrive operation;
// what we will do is to sycchronize these that we want to force a particular order 

// release #1 :  to straightly put retrive block in to the callback , 方式1 是直接将上面的查询操作，放到then的毁掉函数中去， 虽然这样可以实现，但是不够优雅
createEmployee(dan)
  .then(
    (response)=>{
      console.log(response);
      // retruve all data
      findAllEmployees()
        .then(
          (response) => {
            console.log(response);
          }
        )
  }
)

// releate #2 利用`链式操作的思想去优雅的操作，promise 的嵌套逻辑`， promise代码优雅的两种方式： ==> 工厂函数与链式嵌套：
// 链式嵌套的实质是，在一个promise中去返回另外一个promise;

createEmployee(dan)
  .then(
    (response) => {
      console.log(response);
      return findAllEmployees()
    }
  )
  .then(
    (response) => {
      console.log(response);
      // 如果我们还想在create 与 query操作之后，进行其它的操作，可以类似于上述的方式，继续return 一个promise, 然后继续链式操作，而不是直接将操作，真的嵌套在函数体里面； 这样的代码，看起来优雅 整洁；
    }
  )

// 8. update a spec document; we can use the employeeId filter to query our document, and use newEmployee json object which contain all field we want update.

function updateEmployee(employeeId, newEmployee) {
  return  EmployeeModel.update(
    {_id: employeeId},
    {$set: newEmployee}
  )
}

var newEd = {
  firstName: 'Edward'
}

updateEmployee('5ab89f981fd88324f837310d',newEd)
  .then(
    (response) => {
      console.log(response);
    }
  )

// 9 nest promise findEmployeeById()
updateEmployee('5ab89f981fd88324f837310d',newEd)
  .then(
    (response) => {
      console.log(response);
      return findEmployeeById('5ab89f981fd88324f837310d')
    }
  )
  .then(
    (response) => {
      console.log(response);
    }
  )

``` 

### 重构上面的代码，并打包成模块，以能在其它的项目中去重用；

> one of the good practices is we split up above file into several dedicated files ;

```bash

mkdir models
# it's very common thing to hace a schema file
# maybe the client and the server have their own schemas . to differentiaate for that and make it explicit this is a schema 

touch employee.schema.server.js

vi employee.schema.server.js

~ var mongoose = require('mongoose');
~ var schema = mongoose.Schema;
~ 
~ var employeeSchema = new Schema({
~   username: String,
~   password: String,
~   firstName: String,
~   lastName: String
~ },{collection: 'employee'})
~ 
~ module.exports = employeeSchame

touch employee.model.server.js
vi employee.model.server.js

~ var employeeSchema =  require('./employee.schema.server')
~ var mongoose = require('mongoose')
~ var EmployeeModel = mongoose.model('EmployeeModel',EmployeeSchema);
~ 
~ function findAllEmployees() {
~   return EmployeeModel.find();
~ }
~ 
~ function deleteEmployee(employeeId){
~   return EmployeeModel.remove({
~     _id: employeeId
~   })
~ }
~ 
~ function createEmployee(employee) {
~   return EmployeeModel.create(employee);
~ }
~ 
~ function updateEmployee(employeeId, newEmployee) {
~   return  EmployeeModel.update(
~     {_id: employeeId},
~     {$set: newEmployee}
~   )
~ }
~
~ # now we want make above file reuseable . we need make all these functions available to the outside world . the thing is that module exports only allows you to export one single object .
~ # we're going to group all these functions into one single object and then we'll export that onject 
# we can use EmployeeModel as container of all these functions, so the EmployeeModel we'll exports to outsider will contain our custom method above plus the other method that inherit form Mongoose Model.
~
~ EmployeeModel.findAllEmployees = findAllEmployees;
~ EmployeeModel.deleteEmployee = deleteEmployee;
~ EmployeeModel.createEmployee = createEmployee;
~ EmployeeModel.updateEmployee = updateEmployee;
~
~ # export our  ultimate model;
~ moduel.exports = EmployeeModel;

vi app.js

~ var mongoose = require('mongoose');
~ 
~ var db = 'mongodb://localhost:27017/nodekb';
~ 
~ # import our model
~ var EmployeeModel =  require('./models/employee.model.server')
~ 
~ mongoose.connect(db)
~ 
~ mongoose.Promise = global.Promise;
~ 
~ # try our model
~ EmployeeModel.findAllEmployees()
~   .then(
~     (response) => {
~       console.log(response);
~     }
~   )
~ 

```

### 重构最顶层的app.js 以使其能够作为一个module在其它文件中去引用；主要用来接收最顶层server.js中出传递过来的app实例；

> 关键是要学习，这种松耦合的处理方式

```bash

# // 其实除了入口文件之外，其它的全部文件都可以看做是一个模块，node是单线程的，他们都是node 在运行的过程中 加载过来的， 即除了入口文件之外的其它任何文件，都要向外去暴露一些东西；
# app.js的文件并不是一个入口文件，其也是在入口文件运行的过程中，被加载进来的，即其本身就是一个模块，所以我们要利用一个module.exports 将想要暴露的东西，暴露出去；
# 一般的处理思路，若模块的文件中 是多个方法，一般是将其挂载到某一个对象中， 并暴露这个对象到外面； 而模块文件中主要是 是几个操作步骤（操作逻辑）如下， 则就将其封装到一个带有参数的函数中，参数可以用来接收从外界传递过来的值； 一般这样处理，代码就看起来很优雅了；
# 我们将其作为一个函数流程暴露出去；

# we want to put all code inside of a function and then we're going to exports this so that it can be required from outfile ; the function will receive a argument ,whatever we're passed from outside file; 
# 此处我们要传的是 实例化后的express 对象； var app = express();
module.exports = function(app) {
  var mongoose = require('mongoose');

  var db = 'mongodb://localhost:27017/nodekb';

  var EmployeeModel =  require('./models/employee.model.server')

  mongoose.connect(db)

  mongoose.Promise = global.Promise;

  # find all employees through express web service
  app.get('/api/employee',findAllEmployees);

  function findAllEmployees (req,res) {
    EmployeeModel.findAllEmployees()
      .then(
        (employees) => {
          res.send(employees);
        }
      )
  }
}

```

### server.js中

> 这个文件只负责提供服务，路由在上面中server/app.js 去使用, 在里面去写数据调用的逻辑；

```js
var express =  require('express');
var app = express();

// import app.js above, and I am going to pass in it app which is the instance of express above;
require('./server/app')(app);

app.listen(3000);

```

> 在实际的项目中 服务器 客户端  数据库都是运行在不同的沈北上面的；


## join the angular to use our node service and mongodb database codes above

> the app.js li litening for API employee, is our web service and is listening for get request; in the angular project we need to generate hte URL request to the API.  but programmatically we knoe how to do it manually that's easy. I jst typing the URL and I can do it manually, but we want to generate this URL dynamically  

```bash
# in the angular project 

ng g employee-list

# in the services folder we need to write a client to generate the HTTP request to our web server.
mkdir src/app/services

cd src/app/services

# corresponding to employee.model.server.js ,this file is client side;
touch employee.service.client.ts

import { http,  Response } from "@angular/http";

import 'rxjs/RX';

import{ Injectable } from '@angular/core';

# we'd like to inject EmployeeServiceClient into other folks if we want to use it's mrthod, to  dot that we're going to decorate this as an injectable
@injectble()
# and then to inject this class in other component, we alse need register this as a provider, let's do it ;
# 在 app.module.ts 中 在poviders 数组里面，去声明这一个自定义的类；providers:[ EmployeeServiceClient ]
# 这个自定义，可注入模块的流程自己应该熟悉掌握；；

# wrap EmployeeServiceClient through wxport as a module, so it can be import by other folks
export class EmployeeServiceClient {

  # 所谓的客户端就是用来发送请求与接收数据的，类似于 curl in linux;
  # we'd call this function locally from our code and then this goes out and fetched data from the server 

  # we need to load a couple of libraries that allow us to generate HTTP GET requests . all those requests : gets | puts| posts | delete ，etc live in a service called the HTTP service and encapsulate everything to do with HTTP, dealing with cookies, dealing with HTTP bodies , dealing with headers, dealing with everything .
  # inject the HTTP service to our component.
  constructor(private http: Http) {

  }
  findAllEmployees() {
    const url = 'http://localhost:3000/api/employee';

    # utilize http service to generate a get request;
    # make sense that this process is going to be asynchronous that get request is going to be just the same problem we had of the node server communicating with database, 即我们去调用Model.uodate()实际上是向mongodb数据库去发送请求，而此处我们调用http.get()方法实际上是向node服务器发送请求；都是异步的；
    # 这个文件的employee.service.client.ts 在项目中充当的角色实际上是和实际上和employee.model.server.js 充当的角色是一样的，都是负责发送请求，当无非一个是在server a端，一个实在client 端，这个认识很重要；
    this.http.get(url)

    # above code generate a asynchronous call we need to subscribe to this event when it comes back from server.
    # we need to load rxjs library that knoe how to parse all this communication back and the handshaking between the client and server all that is implemented inside of the Rxjs
    # the rxjs give us a more powerful version of promise , a  promise allow us to deal with just one response. 
    # angular has a more sophisticated mechanism that allow us to return any number of promises right    
    return this.http.get(url)
      .map(
        (response: Response) => {
          return response.json(response);
        }
      )

  }
}





```


> 实际上一个项目有三个服务器 客户端 服务端 数据库， 有人后台的就是服务端与前台的交互，所以前端做的事情，其也会做一部分， 而有的后台做的是与数据库的交互，就是所谓的写接口了；
> https://www.youtube.com/watch?v=MjFLBBwNULA&index=53&list=PL_GGiAMracOUd0dRb-yUXsZMWLgWNjxFh  进行不下去了，因为代码angular 5 关于hhtp这一块，改版了。


















> 建好的model 实际上就建好了我们的数据层；

```js
// in server.js

const express = require('express');
const app = express();

// the req prameter that is coming from the clients tells me everything about the client that their Ip address , the timestamp(时间戳) when the request occured , any cookies that they mignt providing , etc everything from the client 
// 即上面要表达的意思就是，我们要从客户端 获取的一切东西，都来自于这个req参数，缺什么都找它去要，一定要有这样一个认识；
app.get('/',(req, res) => {
    res.send('Hello world');
})

app.listen(3000,function(){
    console.log('node server in runing on port 3000...')
})



```


## 结合express 与 我们的mongodb 数据库的使用；





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


> 重要库： mongoose tutorial course: https://github.com/jakblak/nodeJS_examples/blob/master/mongoose/app2.js
>  mongoose 主要跟的课程cs5200： https://www.youtube.com/watch?v=5J4pD2sYe9I&t=629s  