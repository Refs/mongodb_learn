const express = require("express");
// 引入路径合并模块
const path = require('path');

// init APP
const app = express();

// set view dir
app.set('views', path.join(__dirname, 'views'));
// load View Engine
app.set('view engine', 'pug');

// Home router
app.get("/", (req, res) => {
  // res.send("Hello world");
  res.render('index',{
    title: "hello"
  })
});

// start server
app.listen(3000, function() {
  console.log("node server in runing on port 3000...");
});
