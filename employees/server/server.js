var express = require('express');
var app = express();

// 其实除了入口文件之外，其它的全部文件都可以看做是一个模块，node是单线程的，他们都是node 在运行的过程中 加载过来的， 即除了入口文件之外的其它任何文件，都要向外去暴露一些东西；

require('./app')(app);

app.listen(3000)
