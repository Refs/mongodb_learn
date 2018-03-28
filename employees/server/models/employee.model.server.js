var mongoose = require('mongoose');

var employeeSchema = require('../schemas/employee.schema.server')

var EmployeeModel = mongoose.model('EmployeeModel', employeeSchema);

function findAllEmployees() {
    return EmployeeModel.find();
}

function deleteEmployeeById(employeeId) {
    return EmployeeModel.remove({
        _id: employeeId
    })
}

function createEmployee(employee) {
    return EmployeeModel.create(employee);
}

function updateEmployeeById(employeeId, employeeConfig) {
    return EmployeeModel.update(
        {_id: employeeId},
        {$set:employeeConfig}
    )
}

EmployeeModel.findAllEmployees = findAllEmployees;
EmployeeModel.deleteEmployeeById = deleteEmployeeById;
EmployeeModel.createEmployee = createEmployee;
EmployeeModel.updateEmployeeById = updateEmployeeById;

module.exports = EmployeeModel;