/* eslint-disable no-unused-vars */
const platform = browser.capabilities.platformName.toLowerCase();
const data = require('./../data/homepage.json');
const homePage_or = require(`./../ObjectRepository/${platform}/homepage.json`);
const commonPage = require("./../utils/commonpage.js");

describe("Alert Dialog", () => {

    // it("Access an Activity directly", async () => {

    //   await driver.startActivity("io.appium.android.apis","io.appium.android.apis.app.AlertDialogSamples");
    //   //click on Element
    //   await driver.pause(3000);
    //   //Assert
    //   await expect($('//*[@text()="App/Alert Dialogs"]')).toExist();
    // });

    it("acceptAlert", async () => {
      await commonPage.startActivity(data.appPackage,data.AlertAppActivity);

      //Click on first dialog box 
      await commonPage.waitForElement(homePage_or.AlertDialogBox,10);
      await commonPage.clickElement(homePage_or.AlertDialogBox);
 
       //Accept alert
       await commonPage.acceptAlert();
       //assertion - Alert box no longer visible
      // await expect($('//*[@resouce-id="android:id/alertTitle"]')).not.toExist();

      });



  });