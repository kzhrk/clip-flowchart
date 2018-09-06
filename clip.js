const puppeteer = require('puppeteer');
const fs = require('fs');

const port = process.env.PORT || 3333;

module.exports = async () => {
  const files = fs.readdirSync('./chart');

  files.forEach(async file => {
    const url = `http://localhost:${port}/chart/${file}`;
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.goto(url, {waitUntil: "networkidle2"});

    const clip = await page.evaluate(s => {
      const el = document.querySelector(s)
      const { width, height, top: y, left: x } = el.getBoundingClientRect()
      return { width, height, x, y }
    }, 'svg');

    if (!fs.existsSync('./dist')) {
      fs.mkdirSync('./dist');
    }

    await page.screenshot({ clip, path: `./dist/${file}.png` });

    browser.close();
  });
}
