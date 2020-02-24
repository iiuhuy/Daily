const pupeteer = require("puppeteer");

async function upload() {
  const browser = await pupeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.baidu.com");

  const soutuBtn = await page.waitForSelector("span.soutu-btn");
  await soutuBtn.click();
  const uploadPic = await page.waitForSelector("input.upload-pic");
  await uploadPic.uploadFile("./assert/c4d.jpg");
  // await uploadPic.uploadFile("/media/alvinmi/Data/yuhui/githubProj/Daily/puppeteer/assert/c4d.jpg");
  // await uploadPic.uploadFile("/home/alvinmi/图片/2019UP一花一世界/02.jpg");
}
upload();
