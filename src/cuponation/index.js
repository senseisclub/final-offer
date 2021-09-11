const puppeteer = require('puppeteer');
const extractStores = require('./services/extract-stores.service');
const extractCupons = require('./services/extract-cupons.service');

module.exports = async () => {
  const browser = await puppeteer.launch({ headless: false });

  const cuponationUrl = 'https://www.cuponation.com.br';

  const stores = await extractStores(browser, cuponationUrl + '/todaslojas');
  const cupons = await extractCupons(browser, stores[0].url);

  await browser.close();

  return cupons;
};