const async = require("async");
var concurrencyCount = 0;
var fetchUrl = function(url, callback) {
  var delay = parseInt((Math.random() * 10000000) % 2000, 10);
  concurrencyCount++;
  console.log(
    " 现在的并发数是",
    concurrencyCount,
    "，正在抓取的是",
    url,
    "，耗时" + delay + " 毫秒"
  );
  setTimeout(function() {
    concurrencyCount--;
    callback(null, url + " html content");
  }, delay);
};

var urls = [];
for (var i = 0; i < 30; i++) {
  urls.push("http://datasource_" + i);
}

async.mapLimit(
  urls,
  5,
  function(url, callback) {
    fetchUrl(url, callback);
  },
  function(err, result) {
    console.log("final:");
    console.log(result);
  }
);

// No.2
// const superagent = require("superagent");
// const cheerio = require("cheerio");
// const url = require("url");
// const express = require("express");
// const app = express();

// app.get("/", (req, res, next) => {
//   const sourceUrl = "https://cnodejs.org";
//   const hrefArray = [];
//   const resultArray = [];

//   superagent
//     .get(sourceUrl)
//     .then(received => {
//       const $ = cheerio.load(received.text);
//       $("#topic_list .user_avatar").each((index, current) => {
//         hrefArray.push(url.resolve(sourceUrl, $(current).attr("href")));
//       });

//       let stat = 0;

//       function promiseExecute(url) {
//         stat += 1;
//         console.log(`当前正在执行的任务数量:  ${stat}`);
//         return superagent.get(url).then(current => {
//           let _$ = cheerio.load(current.text);
//           let userMsg = {
//             user: $(_$("#content .dark")[0]).text(),
//             score: _$("#content .big")
//               .text()
//               .trim()
//           };
//           resultArray.push(userMsg);
//           stat -= 1;
//         });
//       }

//       function parallelExecute(cb, paramArray, num, handle) {
//         let tempArray = paramArray.concat();
//         let endFlag = 1;
//         function recursionHandle() {
//           let paramItem = tempArray.pop();
//           if (!paramItem) {
//             endFlag += 1;
//             if (endFlag === num) {
//               cb();
//             }
//             return;
//           }
//           return new Promise(() => {
//             handle(paramItem)
//               .then(() => {
//                 recursionHandle();
//               })
//               .catch(err => {
//                 throw err;
//               });
//           });
//         }
//         for (let i = num - 1; i >= 0; i -= 1) {
//           recursionHandle();
//         }
//       }

//       function resSend() {
//         res.send(JSON.stringify(resultArray));
//         console.log(resultArray);
//       }

//       parallelExecute(resSend, hrefArray, 5, promiseExecute);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// app.listen(3000, () => {
//   console.log("3000 port listening...");
// });
