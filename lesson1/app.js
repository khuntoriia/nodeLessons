/**
 * Created by sylvie on 2016/6/1.
 */
var express = require('express');
var app = express();
app.get('/',function(req,res){
    res.send(req.query.name);
});
app.listen(3000,function(){
    console.log('app is listening at port 3000');
});