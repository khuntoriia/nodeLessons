/**
 * Created by sylvie on 2016/6/1.
 */
var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var async = require('async');
var url = require('url');
var cnodeUrl = 'https://cnodejs.org/';
superagent.get(cnodeUrl).end(function(err,res){
    if (err){
        return console.error(err);
    }
    var topicUrls =[];
    var $ = cheerio.load(res.text);
    $('#topic_list .topic_title').each(function(){
        var href = url.resolve(cnodeUrl,$(this).attr('href'));
        topicUrls.push(href);
    });
    console.log(topicUrls.length);

    //使用eventproxy实现并发，监听所有的源完成之后触发程序
    /*var ep = new eventproxy();
    ep.after('search_event',topicUrls.length,function(list){
        var arr = {};
        var items =[];
        list.forEach(function(val){
            var url = val.url;
            var result = val.res;
            var $ = cheerio.load(result);

            arr.title = $('.topic_full_title').text().trim();
            arr.comment =$('.reply_content').eq(0).text().trim();
            arr.href = url;
            items.push({
                title:arr.title,
                comment:arr.comment,
                url:arr.href
            });
        });
        console.log(items);
    });
    topicUrls.forEach(function(url){
        superagent.get(url).end(function(err,res){
            ep.emit('search_event',{"url":url,"res":res.text});
            //console.log(arr);

        });
    });*/
//    evetproxy结束

//    使用async控制并发数量，队列思想
    var concurrencyCount = 0;
    var fetchUrl = function(url, callback){
        var titles =[];
        superagent.get(url).end(function(err,res){
            if (err){
                console.error(err);
            }
            var $ = cheerio.load(res.text);
            var title = $('.topic_full_title').text().trim();
            titles.push(title);
        });
        var delay = parseInt(2000);
        concurrencyCount++;
        console.log("现在并发数为："+concurrencyCount+"，现在抓取的是："+url+"，耗时："+delay);
        setTimeout(function(){
            concurrencyCount--;
            callback(null,titles);
        },delay);
    };
    async.mapLimit(topicUrls,5,function(url,callback){
        fetchUrl(url,callback);
    },function(err,result){
        if(err){
            return console.error(err);
        }
        console.log(result);
    });
//    使用async结束

});