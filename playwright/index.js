// const { chromium, firefox, webkit } = require('playwright');
const playwright = require("playwright");

async function run() {
  const browser = await playwright.chromium.launch({ headless: false }); // Or 'firefox' or 'webkit'.

  // for (const browserType of ["chromium", "firefox", "webkit"]) {
  // const browser = await playwright[browserType].launch();
  // const context = await browser.newContext();
  const page = await browser.newPage();
  await page.goto("http://www.baidu.com/");
  // await page.screenshot({ path: `example-${browserType}.png` });
  // await browser.close();
  // }
  console.log("running");
}

run();
