import { Page, Browser, launch } from "puppeteer";

class Actions {
  /**
   * name
   */
  public async goUrl(page: Page, url: string) {
    await page.goto(url);
  }
}
async function main() {
  const action = new Actions();
  let browser: Browser = await launch({ headless: false });
  let page: Page = await browser.newPage();
  action.goUrl(page, "http://www.baidu.com");
}

main();
