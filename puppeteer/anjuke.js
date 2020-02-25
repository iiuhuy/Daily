// 目的: 使用 Frame Api 进行安居客的登录操作.
// 登录表单是在 iframe 里面的, 直接操作是不行的.
const puppeteer = require("puppeteer");

async function ajk() {
  const brower = await puppeteer.launch({ headless: false });
  const page = await brower.newPage();
  await page.goto("https://login.anjuke.com/login/form");

  // 切换 iframe -> 遍历页面的 frame ?
  await page.frames().map(frame => {
    console.log(frame.url());
  });

  const targeFrameUrl = "https://login.anjuke.com/login/iframeform";

  const frame = await page
    .frames()
    .find(frame => frame.url().includes(targeFrameUrl));

  console.log("frame...", frame);

  const phone = await frame.waitForSelector("#phoneIpt");

  await phone.type("13823403259");
}

ajk();
