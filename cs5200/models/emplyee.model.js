var mongoose = require('mongoose');
var db = 'mongodb://locallhost/nodekb';

mongoose.connect('db')

var db = mongoose.connection;

db.once('open', ()=>{
    console.log('the databse is already opened!')
});
