const puppeteer = require("puppeteer");

async function switchWindow() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://music.taihe.com", { waitUntil: "networkidle2" });

  // 关闭广告
  const ad = await page.waitForSelector("#__qianqian_pop_closebtn");
  ad.click();

  const link = await page.waitForSelector("div.mod-tag-box>h3"); // 默认选择第一个
  await link.click();

  const target = await browser.waitForTarget(t => t.url().includes("tag"));
  const newPage = await target.page();

  await newPage.waitForSelector('ul[select="20"]');
  const text = await newPage.$eval('ul[select="20"]', ele => ele.innerText);
  console.log(text);
}

switchWindow();
