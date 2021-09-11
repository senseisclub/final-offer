
module.exports = async (browser, url, voucherId) => {
  const actualPage = await browser.newPage();
  await actualPage.goto(url, { waitUntil: 'domcontentloaded' });

  console.log(`scraping voucher: ${voucherId}`);

  actualPage.click(`#${voucherId} div.go`);

  await browser.waitForTarget(
    (target) => {
      const voucherUrl = `${url}#${voucherId.split('v')[0]}`;
      return target.url().includes(voucherUrl);
    }
  );

  let pages = await browser.pages();
  let newPage = pages[pages.length - 1];

  // wait get new page with voucher
  while (actualPage === newPage) {
    pages = await browser.pages();
    newPage = pages[pages.length - 1];
  }

  await actualPage.close();
  await newPage.bringToFront();
  await newPage.waitForFunction('loadScript');
  await newPage.waitForSelector('div.copy-code');

  const voucher = await newPage.evaluate(() => {
    const element = document.querySelector('div.copy-code');
    return element.getAttribute('data-clipboard-text');
  });

  await newPage.close();

  return voucher;
}