const getResults = async (arr) => {
  const res = [];
  let titleObj, priceObj, title, price, ready;
  for (let i = 0; i < arr.length; i++) {
    try {
      titleObj = await arr[i].$("h3 > a > strong");
      priceObj = await arr[i].$("p.price > strong");
      title = await titleObj.getText();
      price = await priceObj.getText();
      ready = { title: title, price: price };
      res.push(ready);
      console.log(ready);
    } catch (e) {}
  }
  return res;
};

module.exports = getResults;
