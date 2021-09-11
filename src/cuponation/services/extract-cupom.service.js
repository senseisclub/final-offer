
module.exports = async (browser, url, cupomId) => {
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

  await newPage.close();

  return cupom;
}