var express = require("express");
var cheerio = require("cheerio");
var superagent = require("superagent");

var app = express();

app.get("/", function(req, res, next) {
  // 用 superagent 去抓取 http://cnodejs.org/ 的内容
  superagent.get("https://cnodejs.org/").end(function(err, sres) {
    // 处理常规的错误
    if (err) {
      return next(err);
    }
    // sres.text 里面存储着网页的 HTML 内容，将它传给 cheerio.load 之后，
    // 就能得到一个实现了 jQuery 的接口变量， 还是用这个 $ 符号
    // 剩下的就是 jQuery 的内容了
    var $ = cheerio.load(sres.text);
    // console.log(sres.text);
    // res.send(sres.text);
    var items = [];
    $("#topic_list .topic_title").each(function(idx, element) {
      var $element = $(element);
      console.log(element);
      items.push({
        title: $element.attr("title"),
        href: $element.attr("href"),
        author: $element.attr("user_avatar")
      });
    });

    res.send(items);
  });

  // superagent.get("https://cnodejs.org/").then(res => {
  //   console.log(res);
  // });
});

app.listen(3000, function() {
  console.log("app is listening at port 3000");
});
