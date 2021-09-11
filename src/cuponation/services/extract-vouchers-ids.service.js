module.exports = async (browser, url) => {
    const page = await browser.newPage();
    await page.goto(url);

    console.log(`scraping: ${url}`);
    const vouchersIds = await page.evaluate(() =>
        Array.from(document.querySelectorAll('div.main_vouchers .v.c:not(.best, .best-banner)'))
            .map(voucherElement => voucherElement.id)
    );

    await page.close();

    return vouchersIds;
}