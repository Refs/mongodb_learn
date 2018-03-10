const express = require('express');
const app = express();
app.get('/',(req, res) => {
    res.send('Hello world');
})

app.listen(3000,function(){
    console.log('node server in runing on port 3000...')
})