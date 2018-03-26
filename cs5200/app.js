var mongoose = require('mongoose');
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

var bob = new EmployeeModel({
  username: 'bob',
  password: '123',
  firstName: 'b',
  lastName:'ob'
}).save((err,data) => {
    if(err){
      console.log(err);
    }else{
      console.log(data);
    }
})

EmployeeModel.find((err,data)=>{
  if(err){
    console.log(err);
  }else{
    console.log(data)
  }
});


