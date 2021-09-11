const cuponation = require('./cuponation');

(async () => {
  const cuponationCupons = await cuponation();
  console.log(cuponationCupons);
})();