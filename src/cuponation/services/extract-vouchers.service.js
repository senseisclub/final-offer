const extractVoucher = require('./extract-voucher.service');
const extractVouchersIds = require('./extract-vouchers-ids.service');

module.exports = async (browser, url) => {
    let vouchers = [];

    const vouchersIds = await extractVouchersIds(browser, url);
    for (const voucherId of vouchersIds) {
        const voucher = await extractVoucher(browser, url, voucherId);

        vouchers.push(voucher);
    }

    return vouchers;
}