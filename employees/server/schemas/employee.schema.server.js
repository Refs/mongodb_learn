const mongoose =  require('mongoose');

var EmployeeSchema = mongoose.Schema; 

var employeeSchema = new EmployeeSchema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
},{
    collection: 'employees'
}); 

module.exports = employeeSchema;

