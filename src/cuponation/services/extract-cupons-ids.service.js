module.exports = async (browser, url) => {
    const page = await browser.newPage();
    await page.goto(url);

    console.log(`scraping: ${url}`);
    const cuponsIds = await page.evaluate(() =>
        Array.from(document.querySelectorAll('div.main_vouchers .v.c'))
            .map(cupomElement => cupomElement.id)
    );

    await page.close();

    return cuponsIds;
}