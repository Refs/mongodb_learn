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


var promiseFactory = () => {
  return EmployeeModel.find();
}

var promise = promiseFactory();

promise.then(
  (data)=>{
    console.log(data);
  },
  (error)=>{
    console.log(error);
  }
)






