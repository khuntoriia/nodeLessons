/**
 * Created by sylvie on 2016/6/1.
 */
var express = require('express');
var utility = require('utility');
var app = new express();
app.get('/',function(req,res){
    var q = req.query.q;
    var md5Value = utility.md5(q);
    res.send(md5Value);
});
app.listen(3000,function(req,res){
    console.log("app is listenin at port 3000");
});


