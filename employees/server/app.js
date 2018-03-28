var mongoose =  require('mongoose');

// 输不对 就去官方文档上面去粘
var dbPath = 'mongodb://localhost:27017/nodekb';

var EmployeeModel =  require('./models/employee.model.server');

mongoose.connect(dbPath);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('fasdfasdfasdfasd')
});

mongoose.Promise = global.Promise;

EmployeeModel.findAllEmployees()
    .then(
        (response) =>{
            console.log(response);
        }
    )