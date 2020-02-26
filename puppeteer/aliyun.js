// mouse 鼠标事件
const pupeteer = require("puppeteer");

async function aliyun() {
  const browser = await pupeteer.launch({
    headless: false,
    ignoreDefaultArgs: ["--enable-automation"]
  });
  const page = await browser.newPage();

  await page.goto("https://account.aliyun.com/register/register.htm?", {
    waitUntil: "networkidle2"
  });
  const frame = await page
    .frames()
    .find(frame => frame.url().includes("https://passport.aliyun.com"));

  const span = await frame.waitForSelector("#nc_1_n1z");
  const spanInfo = await span.boundingBox();
  console.log(spanInfo);

  const div = await frame.waitForSelector("div#nc_1__scale_text>span");
  const divInfo = await div.boundingBox();

  await page.mouse.move(spanInfo.x, spanInfo.y);
  await page.mouse.down();

  for (let i = 0; i < divInfo.width; i++) {
    await page.mouse.move(spanInfo.x + i, spanInfo.y);
  }

  await page.mouse.up();

  console.log("runing");
}

aliyun();
