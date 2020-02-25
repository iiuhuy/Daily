const puppeteer = require("puppeteer");

async function jingdong() {
  const brower = await puppeteer.launch({ headless: false });
  const page = await brower.newPage();
  await page.goto("https://www.jd.com");

  const input = await page.$("#key");
  await input.type("手机");
  await page.keyboard.press("Enter");

  await page.waitForSelector("ul.gl-warp>li");

  // $$eval 处理多个元素  
  const list = await page.$$eval("ul.gl-warp>li", eles =>
    eles.map(ele => ele.innerText)
  );

  console.log("list == ", list);

  console.log("runing end");
}

jingdong();




