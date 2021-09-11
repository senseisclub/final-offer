const puppeteer = require('puppeteer');

const cuponationUrl = 'https://www.cuponation.com.br';

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  const stores = await extractStores(browser, cuponationUrl + '/todaslojas');

  const cupons = await extractCupons(browser, stores[0].url);

  console.log(cupons);

  await browser.close();
})();

async function extractStores(browser, url) {
  const page = await browser.newPage();
  await page.goto(url);

  console.log(`scraping: ${url}`);
  const stores = await page.evaluate(() =>
    Array.from(document.querySelectorAll('ul.alphabet-list a[href]'))
      .map(store => ({ name: store.innerText, url: store.href }))
  );

  await page.close();

  return stores;
}

async function extractCupons(browser, url) {
  const page = await browser.newPage();
  await page.goto(url);

  console.log(`scraping: ${url}`);

  const cuponsIds = await page.evaluate(() =>  
    Array.from(document.querySelectorAll('div.main_vouchers .v.c'))
      .map(cupomElement => cupomElement.id)
  );

  await page.close();
  
  let cupons = [];
  for(const cupomId of cuponsIds){
    const cupom = await extractCupom(browser, url, cupomId);

    cupons.push(cupom);
  }

  return cupons;
}

async function extractCupom(browser, url, cupomId) {
  const actualPage = await browser.newPage();
  await actualPage.goto(url);
  console.log(`scraping cupom: ${cupomId}`);

  await actualPage.click(`#${cupomId} div.go`);
  await actualPage.waitForNavigation();
  
  let pages = await browser.pages();

  await actualPage.close();
  const newPage = pages[pages.length - 1];
  await newPage.bringToFront();
  await newPage.waitForFunction('loadScript');
  
  const cupom = await newPage.evaluate(() => {
    const element = document.querySelector('div.copy-code');
    return element.getAttribute('data-clipboard-text');
  });

  return cupom;
}