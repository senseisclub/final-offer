const extractCupom = require('./extract-cupom.service');
const extractCuponsIds = require('./extract-cupons-ids.service');

module.exports = async (browser, url) => {
    let cupons = [];

    const cuponsIds = await extractCuponsIds(browser, url);
    for (const cupomId of cuponsIds) {
        const cupom = await extractCupom(browser, url, cupomId);

        cupons.push(cupom);
    }

    return cupons;
}