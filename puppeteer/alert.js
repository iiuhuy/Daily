const puppeteer = require("puppeteer");

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1200, height: 700 },
    ignoreDefaultArgs: ["--enable-automation"],
    slowMo: 200,
    args: ["--window-size=1200,700"]
  });
  const page = await browser.newPage();

  await page.goto("http://localhost:8080/alert.html", {
    waitUntil: "networkidle2"
  });

  page.on("dialog", async dialog => {
    console.log(dialog.message());

    await dialog.accept("helloworld");
  });

  const btn1 = await page.waitForSelector("#btn1");
  await btn1.click();
  const btn2 = await page.waitForSelector("#btn2");
  await btn2.click();
}

run();
