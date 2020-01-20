const puppeteer = require("puppeteer");

async function parseHTML(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "load", timeout: 0 });
  const bodyHTML = await page.evaluate(() => document.body.innerHTML);
  await browser.close();
  return bodyHTML;
}
// receive message from master process
process.on("message", async message => {
  const htmlText = await parseHTML(message.url);

  // send response to master process
  process.send({ text: htmlText });
});
