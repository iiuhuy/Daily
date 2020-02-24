const puppeteer = require("puppeteer");

// puppeteer.launch({ headless: false }).then(brower => {
//   brower.newPage().then(page => {
//     page.goto("https://www.baidu.com");
//   });
// });

async function run() {
  const brower = await puppeteer.launch({ headless: false });
  const page = await brower.newPage();
  await page.goto("https://www.baidu.com");
  const input_area = await page.$("#kw"); // 定位元素
  await input_area.type("Hello World");

  // 做一个搜索
  const serch_btn = await page.$("#su");
  await serch_btn.click();

  // 获取文本元素
  await page.waitFor("div#content_left > div.result-op.c-container.xpath-log", {
    visible: true
  });

  let resultText = await page.$eval(
    "div#content_left > div.result-op.c-container.xpath-log",
    ele => ele.innerText
  );
  console.log("result Text= ", resultText);
}

run();
