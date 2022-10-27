/* eslint-disable no-async-promise-executor */
/* eslint-disable no-unused-vars */

const platform = browser.capabilities.platformName.toLowerCase();
const OSPlatform = require("../utils/getPlatform.js");
const data = require('./../data/homepage.json');
const homePage_or = require(`./../ObjectRepository/${platform}/homepage.json`);
const commonPage = require("./../utils/commonpage.js");

class HomeScreen { 

  clickApp() {
    console.log(data.Input);
    console.log(platform);
    console.log(OSPlatform.getcurrentOSPlatform());
    const AppLocator = homePage_or.app;
    return new Promise(async function (resolve, reject) {
      try {
        await commonPage.clickElement(AppLocator);
        resolve();
      } catch (e) {
        console.log("Error while clickcing the App button" + AppLocator, e);
        reject();
      }
    });
  }

} //Class Ends

module.exports = new HomeScreen();
