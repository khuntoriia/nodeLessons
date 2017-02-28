/**
 * Created by sylvie on 2016/6/1.
 */
var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = new express();
app.get('/',function(req,res,next){
    superagent.get('https://cnodejs.org').end(function(err,sres){
        if (err){
            return next(err);
        }
        var $ = cheerio.load(sres.text);
        var items = [];
        $('#topic_list .topic_title').each(function (){
            //var element = $(element);
            items.push({
                title:$(this).attr('title'),
                href:$(this).attr('href')
            });
        });
        res.send(items);
    });
});
app.listen(3000,function(req,res){
    console.log("app is listenin at port 3000");
});

