const puppeteer = require('puppeteer');
const extractStores = require('./services/extract-stores.service');
const extractVouchers = require('./services/extract-vouchers.service');

module.exports = async () => {
  const browser = await puppeteer.launch({ headless: false });

  const cuponationUrl = 'https://www.cuponation.com.br';

  const stores = await extractStores(browser, cuponationUrl + '/todaslojas');
  const vouchers = await extractVouchers(browser, stores[0].url);

  await browser.close();

  return vouchers;
};