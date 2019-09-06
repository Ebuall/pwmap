// @ts-check
const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const puppeteer = require("puppeteer");
const uniqWith = require("lodash/uniqWith");
const isEqual = require("lodash/isEqual");

const source = {
  wood1: "3074",
  wood2: "3075",
  wood3: "3076",
  wood4: "3077",
  wood5: "3078",
  metal1: "3079",
  metal2: "3080",
  metal3: "3081",
  metal4: "3082",
  metal5: "3083",
  stone1: "3084",
  stone2: "3085",
  stone3: "3086",
  stone4: "3087",
  stone5: "3088",
  energy1: "3089",
  energy2: "3090",
  energy3: "3091",
  energy4: "3092",
  energy5: "3093",
};
const mineBaseURL = "http://pwdatabase.com/ru/mine/";

// async function main() {

// }
// main();

async function main() {
  const browser = await puppeteer.launch();
  const ps = Object.entries(source)
    // .slice(0, 1)
    .map(async ([k, v]) => {
      const page = await browser.newPage();
      await page.goto(mineBaseURL + v);
      await page.waitForSelector("#wcoord");
      // const res = await page.evaluate(
      //   wcoord => [...wcoord.children].map(c => c.innerHTML),
      //   wcoord,
      // );
      // const res = await page.$$eval(".wmapres", els => els.map(el => el.style))
      const MapCoordinats = await page.evaluate("MapCoordinats");
      return [
        k,
        uniqWith(MapCoordinats.world, isEqual).map(val => ({
          x: val.x,
          y: val.z,
          z: val.y,
        })),
      ];
    });

  const data = await Promise.all(ps);
  // const distinct = data.map(([k, v]) => [k, [...new Set(v)]]);
  const c = browser.close();
  const w = writeFile(
    "src/data.json",
    JSON.stringify(Object.fromEntries(data)),
  );
  await Promise.all([c, w]);
}
main();
