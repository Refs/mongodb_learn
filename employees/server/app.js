module.exports = function(app) {

    var mongoose =  require('mongoose');
    
    // 输不对 就去官方文档上面去粘
    var dbPath = 'mongodb://localhost:27017/nodekb';
    
    mongoose.connect(dbPath);
    
    mongoose.Promise = global.Promise;
    
    var EmployeeModel =  require('./models/employee.model.server');
    
    app.get('/api/employees',findAllEmployees);

    function findAllEmployees(req,res) {

        EmployeeModel.findAllEmployees()
            .then(
                (response) =>{
                    console.log(response);
                }
            )
            
    }

}