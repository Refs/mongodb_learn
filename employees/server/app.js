var mongoose =  require('mongoose');

var dbPath = 'mongodb://locallhost:27017/nodekb';

var EmployeeModel =  require('./models/employee.model.server');

mongoose.connect(dbPath);

mongoose.Promise = global.Promise;

EmployeeModel.findAllEmployees()
    .then(
        (response) =>{
            console.log(response);
        }
    )