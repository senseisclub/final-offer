const cuponation = require('./cuponation');

(async () => {
  const cuponationVouchers = await cuponation();
  console.log(cuponationVouchers);
})();