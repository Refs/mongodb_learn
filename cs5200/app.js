var mongoose = require('mongoose');

// utilize the es6 prmise in our mongoose app;
mongoose.Promise = global.Promise;
var db = 'mongodb://localhost:27017/nodekb';

mongoose.connect(db)

console.log(1123);

var Schema = mongoose.Schema;
var employeeSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String
},{collection:'employees'});
// var dataSchema = new Schema({..}, { collection: 'data' });

var EmployeeModel = mongoose.model('EmployeeModel',employeeSchema);

var db = mongoose.connection;
db.on('error', ()=>{
  console.error.bind(console, 'connection error:')
})

db.once('open', ()=>{
    console.log('the databse is already opened!')
});


var findPromiseFactory = () => {
  return EmployeeModel.find();
}
var createPromiseFactory = (employee) => {
  return EmployeeModel.create(employee);
}

// var findPromise = findPromiseFactory();

// findPromise.then(
//   (data)=>{
//     console.log(data);
//   },
//   (error)=>{
//     console.log(error);
//   }
// )

// delete doc by _id
// var deletePromiseFactory = (employeeId) => {
//   return EmployeeModel.remove({
//     _id: employeeId
//   })
// }

// deletePromiseFactory('5ab89f8adb098428e84eeccf').then(
//   (status) =>{
//     console.log(status);
//   }
// )

// var Jim = {
//   username: 'Jim',
//   password: 'Jim123',
//   firstName: 'Aster',
//   lastName: 'Ding'
// }

// createPromiseFactory(Jim).then(
//   (response) => {
//     console.log(response);
//     return findPromiseFactory()
//   }
// ).then(
//   (response) => {
//     console.log(response);
//   }
// )

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

// 我们每执行一次命令实际上都是在向mongo服务器去发送请求；和我们平时上网都是一样的，





