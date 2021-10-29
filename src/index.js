const { remote } = require("webdriverio");
const getResults = require("./getResults");
const fs = require("fs");

(async () => {
  let results = [];
  const browser = await remote({
    capabilities: { browserName: "chrome" },
  });
  await browser.navigateTo("https://olx.uz");

  const searchInput = await browser.$("#headerSearch");
  const searchBtn = await browser.$("#submit-searchmain");

  await searchInput.setValue("Iphone 12");
  await searchBtn.click();

  // First page
  let searchResults = await browser.$$("div.offer-wrapper");
  let res = await getResults(searchResults);
  results = res;

  // Other Pages
  const url = await browser.getUrl();
  const pages = await browser.$$("span.item");
  const lastPage = await pages[pages.length - 1].getText();
  for (let i = 2; i <= +lastPage; i++) {
    await browser.navigateTo(`${url}/?page=${i}`);
    searchResults = await browser.$$("div.offer-wrapper");
    let res = await getResults(searchResults);
    results = [...results, ...res];
  }

  fs.writeFile("./tmp/result.txt", JSON.stringify(results), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });

  await browser.deleteSession();
})();
