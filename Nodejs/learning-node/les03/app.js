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

    $("#topic_list .topic_title").each(function(
      idx,
      element
    ) {
      var $element = $(element);
      // console.log(idx);

      items.push({
        title: $element.attr("title"),
        href: $element.attr("href"),
        author: $element.parents('.cell').find('img').attr('title')
      });
    });
    // console.log(items);

    // $("#topic_list .user_avatar.pull-left").each(function(idx, element) {
    //   var $element = $(element);
    //   // console.log($element.attr("href"));
    //   items.map((i, index) => {
    //     // console.log(i);
    //     console.log(index);
    //     items2.push({

    //     })
    //   })
    // });

    // console.log(items);

    res.send(items);
  });

  // superagent.get("https://cnodejs.org/").then(res => {
  //   console.log(res);
  // });
});

app.listen(3000, function() {
  console.log("app is listening at port 3000");
});
