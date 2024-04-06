import puppeteer, { Browser, Page } from 'puppeteer';

describe("Rick & Morty app testing", () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:5173/");
  });

  it("Navigate to episode's characters list", async () => {
    await page.waitForSelector(".primary__info");
    await page.click(".primary__info"); //go to episode's characters

    expect(page.url()).toContain("/characters");

    const state = await page.evaluate(() => window.history.state);
    expect(state.key).toBeDefined();
  }, 20000);

  it("Navigate to character's details", async () => {
    await page.waitForSelector(".primary__info");
    await page.click(".primary__info"); //go to episode's characters
    await page.waitForSelector(".primary__info");
    await page.click(".primary__info"); //go to character's details

    expect(page.url()).toContain("/details");
    const state = await page.evaluate(() => window.history.state);
    expect(state.key).toBeDefined();
  }, 20000);

  it("Navigate to character's details and go back to episodes list", async () => {
    await page.waitForSelector(".primary__info");
    await page.click(".primary__info"); //go to episode's characters
    await page.waitForSelector(".primary__info");
    await page.click(".primary__info"); //go to character's details
    await page.waitForSelector(".button__back");
    await page.click(".button__back"); //go back
    await page.waitForSelector(".button__back");
    await page.click(".button__back"); //go back

    expect(page.url()).toEqual("http://localhost:5173/");
  }, 30000);

  afterAll(async () => {
    await browser.close();
  });
});
