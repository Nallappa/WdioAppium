/* eslint-disable no-unused-vars */

// import HomeScreen from "./PageObjects/homepage";
const platform = browser.capabilities.platformName.toLowerCase();
const data = require('./../data/homepage.json');
const homePage_or = require(`./../ObjectRepository/${platform}/homepage.json`);
const commonPage = require("./../utils/commonpage.js");
const AppLocator = homePage_or.app;
const voiceRec = homePage_or.Voice;
const activty = homePage_or.Activity;
const secSur = data.SecureSurface;
const secSurObj= homePage_or.SecureSurfaces

describe("Test Common Functions", () => {


  it("isDisplayed", async () => {
    let isDisplay = await commonPage.isDisplayed(AppLocator);
    console.log(`isDisplayed ` + isDisplay);
    await expect(isDisplay).toBeTruthy();
  });

  it("isClickable", async () => {
    let isClikable = await commonPage.isClickable(AppLocator);
    console.log(`Is clickable ` + isClikable);
    await expect(isClikable).toBeTruthy();
  });

  it("getText", async () => {
    let getTextValue = await commonPage.getText(AppLocator);
    console.log(`Is getTextValue ` + getTextValue);
    await expect(getTextValue).toBe('App');
  });

  it("getAttribute", async () => {
    let getAttributeValue = await commonPage.getAttribute(AppLocator,'package');
    console.log(`Is getAttributeValue ` + getAttributeValue);
    await expect(getAttributeValue).toBe('io.appium.android.apis');
  });

  
  it("getAllElementsUsing", async () => {
    const expectedlist = [
      'API Demos', "Access'ibility",
      'Accessibility',"Animation",
      'App',"Content",
      'Graphics',"Media",
      'NFC',"OS",
      'Preference',"Text",
      'Views'
    ];
    const actuallist = []

    // Find the multiple elements
    // const text = await $$("android.widget.TextView");
    let allElementsText = await commonPage.getAllElementsUsing(homePage_or.AllElements)
    //loop through the elements
    for( const textelements of allElementsText) {
      actuallist.push(await textelements.getText())
    }
    //assert the list
    await expect(expectedlist).toEqual(actuallist);
 });

  it("ClickElement", async () => {
    await commonPage.clickElement(AppLocator);
  });

  it("waitForElement", async () => {
    await commonPage.waitForElement(activty,10);
    await commonPage.clickElement(activty);
  });



  it("scrollToElementbyText", async () => {
    await commonPage.scrollToElementbyText(secSur);
    await commonPage.clickElement(secSurObj);
   });

    
  it("Input Field", async () => {
    await commonPage.navigateBack();
    await commonPage.pause(1000);
    await commonPage.navigateBack();
    await commonPage.pause(1000);
    await commonPage.navigateBack();
    await commonPage.clickElement(homePage_or.Views);
    await commonPage.clickElement(homePage_or.AutoComplete);
    await commonPage.clickElement(homePage_or.SreenTop);
    await commonPage.sendText(homePage_or.textField,'Canada');
    await commonPage.clearText(homePage_or.textField);
    await commonPage.sendText(homePage_or.textField,'Canada');
    await expect(await commonPage.getElementUsing(homePage_or.textField)).toHaveText("Canada");
});


it("isEnabled", async () => {
  await commonPage.navigateBack();
  await commonPage.pause(1000);
  await commonPage.navigateBack();
  await commonPage.pause(1000);
  await commonPage.navigateBack();
  await commonPage.clickElement(homePage_or.Views);
  await commonPage.clickElement(homePage_or.Buttons);
  let flag = await commonPage.isEnabled(homePage_or.Normal);
  await expect(flag).toBeTruthy();
});

it("switch to webview", async () => {
  await commonPage.navigateBack();
  await commonPage.pause(1000);
  await commonPage.navigateBack();
  await commonPage.pause(1000);
  // await commonPage.navigateBack();
  await commonPage.clickElement(homePage_or.Views);
  await commonPage.scrollToElementbyText(homePage_or.WebView);
  await commonPage.clickElement(homePage_or.WebView);
});

it("getAllContexts", async () => {
  let getAllContext = await commonPage.getAllContexts();
  console.log(getAllContext);
  await commonPage.setContext();
  await commonPage.navigateBack();
  await commonPage.switchToNativeContext();
  await commonPage.scrollToElementbyText(homePage_or.WebView);
 });


it("acceptAlert", async () => {
  await commonPage.startActivity(data.appPackage,data.AlertAppActivity);
  //Click on first dialog box 
  await commonPage.waitForElement(homePage_or.AlertDialogBox,10);
  await commonPage.clickElement(homePage_or.AlertDialogBox);
   //Accept alert
   await commonPage.acceptAlert();
   //assertion - Alert box no longer visible
   await commonPage.pause(5000);
  // await expect($('//*[@resouce-id="android:id/alertTitle"]')).not.toExist();
  });



 


  // it("Find Element by Accessbility id", async () => {
    
  //   await homepage.clickApp();
  //   //Assert
  //   const actionBarOption = await $("~Action Bar");
  //   await expect(actionBarOption).toBeExisting();
  // });

  // it("Find Element by Class Name ", async () => {
  //   //Find Element by Class Name
  //   const className = await $("android.widget.TextView");
  //   console.log(await className.getText());
  //    //Assert
  //   await expect(className).toHaveText("API Demos");
  // });

  // it("Find Element by xpath", async () => {
  //   //Find Element by xpath
  //    await $('//android.widget.TextView[@content-desc="Alert Dialogs"]').click();
  // });

  // it("Find Element by resource id", async () => {
  //   //Find Element by resource id
  //    await $('//android.widget.Button[@resource-id="io.appium.android.apis:id/select_button"]').click();
  // });

  // it("Find Element by Text", async () => {
  //   //Find Element by text
  //   await $('//android.widget.TextView[@text="Command two"]').click();
  // });

  // it("Find Element by class", async () => {
  //   const myTextAssertion = await $('android.widget.TextView');
  //   await expect(myTextAssertion).toHaveText("You selected: 1 , Command two");
  // });
  
  // it("Find Element UiAutomator", async () => {
  //    await $('android=new UiSelector().textContains("Alert")').click();
  
  // });


//   it("Find the multiple elements", async () => {
//     const expectedlist = [
//       'API Demos', "Access'ibility",
//       'Accessibility',"Animation",
//       'App',"Content",
//       'Graphics',"Media",
//       'NFC',"OS",
//       'Preference',"Text",
//       'Views'
//     ];
//     const actuallist = []

//     // Find the multiple elements
//     const text = await $$("android.widget.TextView");
//     //loop through the elements
//     for( const textelements of text) {
//       actuallist.push(await textelements.getText())
//     }
//     //assert the list
//     await expect(expectedlist).toEqual(actuallist);
//  });

//  it("Working with Input Field", async () => {

//     await $("~Views").click();
//     await $("~Auto Complete").click();
//     await $("~1. Screen Top").click();
//     const textField = await $('//*[@resource-id="io.appium.android.apis:id/edit"]');
//     await textField.addValue("Canada");
//     await expect(textField).toHaveText("Canada");

// });



});


