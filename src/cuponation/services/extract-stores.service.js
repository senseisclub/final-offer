module.exports = async (browser, url) => {
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