const pupeteer = require("puppeteer");
const { username, password } = require("./config");
// console.log(username, password);

async function weibo() {
  const browser = await pupeteer.launch({
    headless: false,
    defaultViewport: { width: 1200, height: 720 },
    ignoreDefaultArgs: ["--enable-automation"],
    slowMo: 300, // 设置输入的延迟
    args: ["--window-size=1200,720"]
  });
  const page = await browser.newPage();

  // --- 1.到 wifazhuce 获取内容 --- //
  await page.goto("http://wufazhuce.com/", { waitUntil: "networkidle2" });
  // const oneText = await page.$eval("div.fp-one-cita > a", ele => ele.innerText);
  const oneText = await page.$$eval("div.fp-one-cita > a", ele =>
    ele.map(e => e.textContent)
  );
  const index = Math.floor(Math.random() * oneText.length); // 随机值
  oneText[index];
  console.log(oneText[index]);

  // --- 2.到微博登录发布动态 --- //
  await page.goto("https://weibo.com/", { waitUntil: "networkidle2" });
  await page.waitFor(3 * 1000); // 等待三秒
  await page.reload();

  const loginUserInput = await page.waitForSelector("input#loginname");
  await loginUserInput.click(); // 点击一下
  await loginUserInput.type(username);

  const loginUserPassword = await page.waitForSelector(
    'input[type="password"]'
  );
  await loginUserPassword.click();
  await loginUserPassword.type(password);

  const loginBtn = await page.waitForSelector('a[action-type="btn_submit"]');
  await loginBtn.click();

  // 文本输入框
  const textarea = await page.waitForSelector('textarea[class="W_input"]');
  await textarea.click();

  const context = oneText[index] + " puppeteer 抓取内容发布微博动态测试~ ";
  await textarea.type(context);

  // 发布按钮
  const sendBtn = await page.waitForSelector('a[node-type="submit"]');
  await sendBtn.click();

  // ---------------------- //
  console.log("running");
}

weibo();
