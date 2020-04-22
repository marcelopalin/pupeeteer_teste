const puppeteer = require("puppeteer");
const fs = require('fs');
const ini = require('ini');
const config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
const website = config.producao.URL;

console.log(`Consultando ${website}`);
config.desenvolvimento.host = '127.0.0.1';
config.producao.porta = '3308';
config.producao.novaChave = 'Esta é uma nova chave!'
fs.writeFileSync('./config_modified.ini', ini.stringify(config))


let scrape = async () => {
  try {
    // Troque headless para false para visualizar o Browser
    // hadless: true oculta o Browser
    const browser = await puppeteer.launch({
      headless: config.desenvolvimento.puppeteer_headless,
      devtools: config.desenvolvimento.puppeteer_devtools,
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (iPhone; CPU iPhone OS 9_0_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13A404 Safari/601.1"
    );
    page.on("requestfailed", (http) => {
      console.log("http failed");
    });
    const URL = config.desenvolvimento.URL;

    await page.goto(URL, {timeout: 60000}).catch((err) => { console.log(err); });
    await page.waitFor(10000);

    // await page.goto(URL, {waitUntil: 'networkidle0'});
    await page.waitForSelector(".portlet-body");
    await page.screenshot({ path: "exemplo2.png" });
    await page.click(
      "#portlet_leituradou_INSTANCE_GKE7NRmaCXgl > div > div.portlet-content-container > div > div.row.reading-title > div.col-md-6.btn-options > button.btn-diario-completo"
    );
    // await page.waitForNavigation();
    await page.screenshot({ path: "exemplo3.png" });
    await browser.close();
  } catch (e) {
    console.log("erro", e);
  }
}

scrape().then((value) => {
    console.log(value);
})
