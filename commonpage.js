/* eslint-disable wdio/no-pause */
/* eslint-disable no-unused-vars */
/* eslint-disable no-async-promise-executor */
/* eslint-disable no-undef */
/**
 * Java Script Mobile test automation framework - Common functions
 * Last updated By: SESA620164 Date: OCT-2022	Version: 1.0
 * Update History
 */

/* manages all the common operations of an application
 */
var currentRootDirectory = process.cwd();
var path = require("path");
var fs = require("fs");
// var utils = require('./utils.js');


//Official Documentation : https://webdriver.io/docs/api/appium/

var commonPage = function () {
  //####################################################################################################
  //Function Name		   : getElementUsing
  //Description      	 : This function can be used to get the element locator.
  //Parameters Used  	 : None
  //########################################################################################################
  // To enter any value
  async function getElementUsing(locator) {
    //wdio
    console.log("locator" + locator);
    let currentlocator;
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async function (resolve, reject) {
      try {
        currentlocator = await $(locator);
        resolve(currentlocator);
      } catch (e) {
        console.log("Error while forming the locator" + locator, e);
        reject(currentlocator);
      }
    });
  }

  //####################################################################################################
  //Function Name		   : getAllElementsUsing
  //Description      	 : This function can be used to get the all element locators.
  //Parameters Used  	 : None
  //########################################################################################################
  async function getAllElementsUsing(locator) {
    //wdio
    console.log("locator" + locator);
    let currentlocator;
    return new Promise(async function (resolve, reject) {
      try {
        currentlocator = await $$(locator);
        resolve(currentlocator);
      } catch (e) {
        console.log(
          "Error while forming the loctor for findelements" + locator,e );
        reject(currentlocator);
      }
    });
  }

  //####################################################################################################
  //Function Name		   : clickElement
  //Description      	 : This function is used to click the element.
  //Parameters Used  	 : locator
  //########################################################################################################
  async function clickElement(locator) {
    //wdio
    console.log("locator" + locator);
    let currentlocator;
    return new Promise(async function (resolve, reject) {
      try {
        currentlocator = await getElementUsing(locator);
        await currentlocator.click();
        resolve(true);
      } catch (e) {
        console.log("Error while clicking the element" + locator, e);
        reject(false);
      }
    });
  }


  //####################################################################################################
  //Function Name		   : clearText
  //Description      	 : This function is used to clear the value in to input box.
  //Parameters Used  	 : Locator,value
  //########################################################################################################
  async function clearText(locator) {
    //wdio
    console.log("locator" + locator);
    let currentlocator;
    return new Promise(async function (resolve, reject) {
      try {
        currentlocator = await getElementUsing(locator);
        await currentlocator.clearValue(value);
        resolve(true);
      } catch (e) {
        console.log("Error while clearing the value" + locator, e);
        reject(false);
      }
    });
  }

  
  //####################################################################################################
  //Function Name		   : getText
  //Description      	 : This function is used to get the text for an element
  //Parameters Used  	 : Locator,value
  //########################################################################################################
  async function getText(locator) {
    //wdio
    console.log("locator" + locator);
    let currentlocator;
    return new Promise(async function (resolve, reject) {
      try {
        currentlocator = await getElementUsing(locator);
        let elementText =  await currentlocator.getText(value);
        resolve(elementText);
      } catch (e) {
        console.log("Error while fething the text the value for an element" + locator, e);
        reject(false);
      }
    });
  }

  //####################################################################################################
  //Function Name		   : setText
  //Description      	 : This function is used to set the value in to input box.
  //Parameters Used  	 : Locator,value
  //########################################################################################################
  async function sendText(locator, value) { 
    //wdio
    console.log("locator" + locator);
    let currentlocator;
    return new Promise(async function (resolve, reject) {
      try {
        currentlocator = await getElementUsing(locator);
        await currentlocator.addValue(value);
        resolve(true);
      } catch (e) {
        console.log("Error while setting the value" + locator, e);
        reject(false);
      }
    });
  }

  async function launchBrowserUrl(urlToLaunch) {
    return new Promise(async function (resolve, reject) {
      try {
        await browser.url(urlToLaunch);
        resolve(true);
      } catch (e) {
        console.log("Error while launching the url in browser" + urlToLaunch, e);
        reject(false);
      }
    });
  }

  async function getTitle() {
    return new Promise(async function (resolve, reject) {
      try {
        await browser.getTitle();
        resolve(true);
      } catch (e) {
         console.log("Error while fetching the url for browser", e);
        reject(false);
      }
    });
  }

  async function launchApp() {
    return new Promise(async function (resolve, reject) {
      try {
        await browser.launchApp();
        resolve(true);
      } catch (e) {
        console.log("Error while launhing the app", e);
        reject(false);
      }
    });
  }

  async function switchToNativeContext() {
    return new Promise(async function (resolve, reject) {
      try {
        await browser.switchContext('NATIVE_APP');
        resolve(true);
      } catch (e) {
        console.log("Error while swithcing to native app", e);
        reject(false);
      }
    });
  }

  async function pause(seconds) {
    return new Promise(async function (resolve, reject) {
      try {
        await browser.pause(seconds * 1000);
        resolve(true);
      } catch (e) {
        console.log("Error while pause", e);
        reject(false);
      }
    });
  }

  async function isElementPresent(locator) {
    console.log("locator" + locator);
    return new Promise(async function (resolve, reject) {
      try {
        let element_name = await getElementUsing(locator);
        const isPresent =  await element_name.isDisplayed() ? true : false;
        resolve(isPresent);
      } catch (e) {
        console.log("Error while checking for the presence of element" + locator, e);
        reject(false);
      }
    });
  }

  async function waitForElement(locator,waitTimeInSeconds) {
    console.log("locator" + locator);
    let element_name;
    return new Promise(async function (resolve, reject) {
      try {
         element_name = await getElementUsing(locator);
        await element_name.waitForDisplayed(waitTimeInSeconds * 1000);
        resolve(true);
      } catch (e) {
        console.log("Error while waiting for an element" + locator, e);
        reject(false);
      }
    });
  }

  async function scrollToElement(locator) {
    console.log("locator" + locator);
    return new Promise(async function (resolve, reject) {
      try {
       await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView(${locator})`);
        resolve();
      } catch (e) {
        console.log("Error while scrolling to the element" + locator, e);
        reject();
      }
    });
  }

  async function backwardHorizantalScroll() {
    console.log("locator" + locator);
    return new Promise(async function (resolve, reject) {
      try {
        await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollBackward()');
        resolve();
      } catch (e) {
        console.log("Error while scrolling the horizantal scroll bar in backward direction");
        reject();
      }
    });
  }

  async function forwardHorizantalScroll() {
    console.log("locator" + locator);
    return new Promise(async function (resolve, reject) {
      try {
        await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()');
        resolve();
      } catch (e) {
        console.log("Error while scrolling the horizantal scroll bar in forward direction");
        reject();
      }
    });
  }

  async function getAlertText() {
    return new Promise(async function (resolve, reject) {
      try {
       let alertText = await driver.getAlertText();
        resolve(alertText);
      } catch (e) {
        console.log("Error while fetching the alert text" );
        reject();
      }
    });
  }

  async function dismissAlert() {
    return new Promise(async function (resolve, reject) {
      try {
       await driver.dismissAlert();
       resolve();
      } catch (e) {
        console.log("Error while dismissing the alert");
        reject();
      }
    });
  }

  async function acceptAlert() {
    return new Promise(async function (resolve, reject) {
      try {
       await driver.acceptAlert();
       resolve();
      } catch (e) {
        console.log("Error while accepting the alert");
        reject();
      }
    });
  }

  
  //####################################################################################################
  //Function Name		   : getTagName
  //Description      	 : This function is used to get the TagName for an element
  //Parameters Used  	 : Locator,value
  //########################################################################################################
  async function getTagName(locator) {
    //wdio
    console.log("locator" + locator);
    let currentlocator;
    return new Promise(async function (resolve, reject) {
      try {
        currentlocator = await getElementUsing(locator);
        let elementText =  await currentlocator.getTagName();
        resolve(elementText);
      } catch (e) {
        console.log("Error while fething the tagname for an element" + locator, e);
        reject(false);
      }
    });
  }
  
  
  //####################################################################################################
  //Function Name		   : getAttribute
  //Description      	 : This function is used to get the attribute for an element
  //Parameters Used  	 : Locator,value
  //########################################################################################################
  async function getAttribute(locator,value) {
    //wdio
    console.log("locator" + locator);
    let currentlocator;
    return new Promise(async function (resolve, reject) {
      try {
        currentlocator = await getElementUsing(locator);
        let elementText =  await currentlocator.getAttribute(value);
        resolve(elementText);
      } catch (e) {
        console.log("Error while fething the attribute for an element" + locator, e);
        reject(false);
      }
    });
  }

  
  //####################################################################################################
  //Function Name		   : isSelected
  //Description      	 : This function is used to Determine if a form or form-like element (checkbox, select, etc...) is selected
  //Parameters Used  	 : Locator
    //########################################################################################################
  async function isSelected(locator) {
    //wdio
    console.log("locator" + locator);
    let currentlocator;
    return new Promise(async function (resolve, reject) {
      try {
        currentlocator = await getElementUsing(locator);
        let elementText =  await currentlocator.isSelected();
        resolve(elementText);
      } catch (e) {
        console.log("Error while checking the selection of checkbox or select" + locator, e);
        reject(false);
      }
    });
  }

  
  //####################################################################################################
  //Function Name		   : isEnabled
  //Description      	 : Determine if an element is currently enabled
  //Parameters Used  	 : Locator
    //########################################################################################################
    async function isEnabled(locator) {
      //wdio
      console.log("locator" + locator);
      let currentlocator;
      return new Promise(async function (resolve, reject) {
        try {
          currentlocator = await getElementUsing(locator);
          let elementText =  await currentlocator.isEnabled();
          resolve(elementText);
        } catch (e) {
          console.log("Error while checking the enable of the element" + locator, e);
          reject(false);
        }
      });
    }

    
  //####################################################################################################
  //Function Name		   : isDisplayed
  //Description      	 : Determine if an element is currently displayed
  //Parameters Used  	 : Locator
    //########################################################################################################
    async function isDisplayed(locator) {
      //wdio
      console.log("locator" + locator);
      let currentlocator;
      return new Promise(async function (resolve, reject) {
        try {
          currentlocator = await getElementUsing(locator);
          let elementText =  await currentlocator.isDisplayed();
          resolve(elementText);
        } catch (e) {
          console.log("Error while checking the element is displayed" + locator, e);
          reject(false);
        }
      });
    }

  //####################################################################################################
  //Function Name		   : getLocation
  //Description      	 : Determine an element's location on the page or screen
  //Parameters Used  	 : Locator
    //########################################################################################################
    async function getLocation(locator) {
      //wdio
      console.log("locator" + locator);
      let currentlocator;
      return new Promise(async function (resolve, reject) {
        try {
          currentlocator = await getElementUsing(locator);
          let elementText =  await currentlocator.getLocation();
          resolve(elementText);
        } catch (e) {
          console.log("Error while fetching the coordinates of an element" + locator, e);
          reject();
        }
      });
    }

    
  //####################################################################################################
  //Function Name		   : getSize
  //Description      	 : Determine an element's size in pixels
  //Parameters Used  	 : Locator
    //########################################################################################################
    async function getSize(locator) {
      //wdio
      console.log("locator" + locator);
      let currentlocator;
      return new Promise(async function (resolve, reject) {
        try {
          currentlocator = await getElementUsing(locator);
          let elementText =  await currentlocator.getSize();
          resolve(elementText);
        } catch (e) {
          console.log("Error while fetching the size of an element" + locator, e);
          reject();
        }
      });
    }

    
  //####################################################################################################
  //Function Name		   : getCSSProperty
  //Description      	 : Query the value of a web element's computed CSS property
  //Parameters Used  	 : Locator,value
    //########################################################################################################
    async function getCSSProperty(locator,value) {
      //wdio
      console.log("locator" + locator);
      let currentlocator;
      return new Promise(async function (resolve, reject) {
        try {
          currentlocator = await getElementUsing(locator);
          let elementText =  await currentlocator.getCSSProperty(value);
          resolve(elementText);
        } catch (e) {
          console.log("Error while fetching the css property of an element" + locator, e);
          reject();
        }
      });
    }

  //####################################################################################################
  //Function Name		   : getElementLocationInView
  //Description      	 : Query the value of a web element's computed CSS property
  //Parameters Used  	 : Locator
    //########################################################################################################
    async function getElementLocationInView(locator) {
      //wdio
      console.log("locator" + locator);
      let currentlocator;
      return new Promise(async function (resolve, reject) {
        try {
          currentlocator = await getElementUsing(locator);
          let elementText =  await driver(currentlocator.elementId);
          resolve(elementText);
        } catch (e) {
          console.log("Error while fetching the getElementLocationInView of an element" + locator, e);
          reject();
        }
      });
    }
    
    
  //####################################################################################################
  //Function Name		   : getContext
  //Description      	 : Get the current context in which Appium is running
    //########################################################################################################
    async function getContext() {
      //wdio
      return new Promise(async function (resolve, reject) {
        try {
          let context = await driver.getContext();
          resolve(context);
        } catch (e) {
          console.log("Error while fetching the context");
          reject();
        }
      });
    }

    
  //####################################################################################################
  //Function Name		   : getAllContexts
  //Description      	 : Get all the contexts available to automate
    //########################################################################################################
    async function getAllContexts() {
      //wdio
      return new Promise(async function (resolve, reject) {
        try {
          let context = await driver.getContexts();
          resolve(context);
        } catch (e) {
          console.log("Error while fetching the context");
          reject();
        }
      });
    }

     
  //####################################################################################################
  //Function Name		   : setContext
  //Description      	 : Set the context being automated
    //########################################################################################################
    async function setContext() {
      //wdio
      return new Promise(async function (resolve, reject) {
        try {
          let contexts = await driver.getContexts();
          await driver.switchContext(contexts[1]);
          resolve();
        } catch (e) {
          console.log("Error while setting the context");
          reject();
        }
      });
    }

    ///Mouse Actions
     
  //####################################################################################################
  //Function Name		   : moveTo
  //Description      	 : Move the mouse by an offset of the specificed element
  //Parameter      	   : Locator
  //########################################################################################################
    async function mousemoveTo(locator) {
      //wdio
      console.log("locator" + locator);
      let currentlocator;
      return new Promise(async function (resolve, reject) {
        try {
          currentlocator = await getElementUsing(locator);
          await currentlocator.moveTo(10, 10);
          resolve();
        } catch (e) {
          console.log("Error while while moving the mouse");
          reject();
        }
      });
    }

  //####################################################################################################
  //Function Name		   : doubleClick
  //Description      	 : Double-clicks at the current mouse coordinates (set by moveto).
  //Parameter      	   : Locator
  //########################################################################################################
  async function doubleClick(locator) {
    //wdio
    console.log("locator" + locator);
    let currentlocator;
    return new Promise(async function (resolve, reject) {
      try {
        currentlocator = await getElementUsing(locator);
        await currentlocator.doubleClick();
        resolve();
      } catch (e) {
        console.log("Error while double cliking the mouse");
        reject();
      }
    });
  }

  //####################################################################################################
  //Function Name		   : mouseBottomDown
  //Description      	 : Click and hold the left mouse button at the current mouse coordinates
  //Parameter      	   : Locator
  //########################################################################################################
  async function mouseBottomDown(locator) {
    //wdio
    console.log("locator" + locator);
    let currentlocator;
    return new Promise(async function (resolve, reject) {
      try {
        currentlocator = await getElementUsing(locator);
        await driver.moveTo(currentlocator);
        await driver.buttonDown();
        resolve();
      } catch (e) {
        console.log("Error while click and hold the left mouse button");
        reject();
      }
    });
  }

  //####################################################################################################
  //Function Name		   : mouseBottomUp
  //Description      	 : Releases the mouse button previously held
  //Parameter      	   : Locator
  //########################################################################################################
  async function mouseBottomUp(locator) {
    //wdio
    console.log("locator" + locator);
    let currentlocator;
    return new Promise(async function (resolve, reject) {
      try {
        currentlocator = await getElementUsing(locator);
        await driver.moveTo(currentlocator);
        await driver.buttonDown();
        await driver.moveTo(currentlocator, 10, 10);
        await driver.buttonUp();
        resolve();
      } catch (e) {
        console.log("Error while click and hold the left mouse up");
        reject();
      }
    });
  }

  //####################################################################################################
  //Function Name		   : singleTap
  //Description      	 : Single tap on the touch enabled device
  //########################################################################################################
  async function singleTap() {
    //wdio
    return new Promise(async function (resolve, reject) {
      try {
       await browser.touchAction({
          action: 'tap',
          x: 30,
          y: 20
        })
        resolve();
      } catch (e) {
        console.log("Error while single tap on element");
        reject();
      }
    });
  }

  //####################################################################################################
  //Function Name		   : doubleTap
  //Description      	 : Double tap on the touch screen using finger motion events
  //########################################################################################################
  async function doubleTap(locator) {
    //wdio
    console.log("locator" + locator);
    let currentlocator;
    return new Promise(async function (resolve, reject) {
      try {
        currentlocator = await getElementUsing(locator);
        await driver.touchDoubleClick(currentlocator.elementId);
        resolve();
      } catch (e) {
        console.log("Error while double tap on element");
        reject();
      }
    });
  }

  //####################################################################################################
  //Function Name		   : touchDown
  //Description      	 : Finger down on the screen
  //########################################################################################################
  async function touchDown() {
    //wdio
    return new Promise(async function (resolve, reject) {
      try {
        await driver.touchDown(10, 10);
        resolve();
      } catch (e) {
        console.log("Error while finger down on the screen");
        reject();
      }
    });
  }

  
  //####################################################################################################
  //Function Name		   : touchUp
  //Description      	 : Finger up on the screen
  //########################################################################################################
  async function touchUp() {
    //wdio
    return new Promise(async function (resolve, reject) {
      try {
        await driver.touchUp(10, 10);
        resolve();
      } catch (e) {
        console.log("Error while finger up on the screen");
        reject();
      }
    });
  }

  
  //####################################################################################################
  //Function Name		   : LongTap
  //Description      	 : Long press on the touch screen using finger motion events
  //########################################################################################################
  async function longTap(locator) {
    //wdio
    console.log("locator" + locator);
    let currentlocator;
    return new Promise(async function (resolve, reject) {
      try {
        currentlocator = await getElementUsing(locator);
       await driver.touchPerform({
          action: 'longPress',
          options: {
            element: currentlocator
          }
        });
        resolve();
      } catch (e) {
        console.log("Error while long press on the element");
        reject();
      }
    });
  }

  //####################################################################################################
  //Function Name		   : fingerScroll
  //Description      	 :Scroll on the touch screen using finger based motion events
  //########################################################################################################
  async function fingerScroll(locator) {
    //wdio
    console.log("locator" + locator);
    let currentlocator;
    return new Promise(async function (resolve, reject) {
      try {
        currentlocator = await getElementUsing(locator);
       await driver.touchScroll(10, 100, currentlocator);
        resolve();
      } catch (e) {
        console.log("Error while scrolling with finger");
        reject();
      }
    });
  }
    
  //####################################################################################################
  //Function Name		   : setTimeOut
  //Description      	 : Configure the amount of time that a particular type of operation can execute for before they are aborted
  //########################################################################################################
  async function setTimeOut(timeoutinmsec) {
    //wdio
    return new Promise(async function (resolve, reject) {
      try {
        await driver.setTimeouts(timeoutinmsec)
        resolve();
      } catch (e) {
        console.log("Error while setting the timeout");
        reject();
      }
    });
  }

    
  //####################################################################################################
  //Function Name		   : implicitWait
  //Description      	 : Set the amount of time the driver should wait when searching for elements
  //########################################################################################################
  async function implicitWait(timeoutinmsec) {
    //wdio
    return new Promise(async function (resolve, reject) {
      try {
        await driver.setImplicitTimeout(timeoutinmsec)
        resolve();
      } catch (e) {
        console.log("Error while setting the implicit wait");
        reject();
      }
    });
  }

  //KeyBoard

  //####################################################################################################
  //Function Name		   : pressKeyCode
  //Description      	 : Press a particular key on an Android Device
  //########################################################################################################
  async function pressKeyCode(keycode) {
    //wdio
    return new Promise(async function (resolve, reject) {
      try {
        await driver.pressKeyCode(parseInt(keycode))
        resolve();
      } catch (e) {
        console.log("Error while pressing the keycode in the device");
        reject();
      }
    });
  }

  //####################################################################################################
  //Function Name		   : longPressKeyCode
  //Description      	 : Press and hold a particular key on an Android Device
  //########################################################################################################
  async function longPressKeyCode(keycode) {
    //wdio
    return new Promise(async function (resolve, reject) {
      try {
        await driver.longPressKeyCode(parseInt(keycode))
        resolve();
      } catch (e) {
        console.log("Error while pressing the longPressKeyCode in the device");
        reject();
      }
    });
  }

  //####################################################################################################
  //Function Name		   : isKeyboardShown
  //Description      	 : Whether or not the soft keyboard is shown
  //########################################################################################################
  async function isKeyboardShown() {
    //wdio
    return new Promise(async function (resolve, reject) {
      try {
        let keboardshown = await driver.isKeyboardShown()
        resolve(keboardshown);
      } catch (e) {
        console.log("Error while checking the keyboard shown in the device");
        reject(false);
      }
    });
  }
  
  //####################################################################################################
  //Function Name		   : hideKeyboard
  //Description      	 : Press and hold a particular key on an Android Device
  //########################################################################################################
  async function hideKeyboard() {
    //wdio
    return new Promise(async function (resolve, reject) {
      try {
        await driver.hideKeyboard()
        resolve();
      } catch (e) {
        console.log("Error while hiding the keyboard");
        reject();
      }
    });
  }

  //####################################################################################################
  //Function Name		   : driverstatus
  //Description      	 : Retrieve the server’s current status
  //########################################################################################################
  async function driverstatus() {
    //wdio
    return new Promise(async function (resolve, reject) {
      try {
        let driverstatus = await driver.status();
        resolve(driverstatus);
      } catch (e) {
        console.log("Error while fething the driver status");
        reject();
      }
    });
  }

  //####################################################################################################
  //Function Name		   : executeMobileCommand
  //Description      	 : executeMobileCommand
  //########################################################################################################
  async function executeMobileCommand() {
    //wdio
    return new Promise(async function (resolve, reject) {
      try {
       await browser.execute('mobile: scroll', {direction: 'down'})
        resolve();
      } catch (e) {
        console.log("Error while executing the mobile command");
        reject();
      }
    });
  }

  
  //####################################################################################################
  //Function Name		   : executedriverScript
  //Description      	 : Run a WebdriverIO script against the current session, allowing execution of many commands in one Appium request.
  //########################################################################################################
  async function executedriverScript(driverScript) {
    //wdio
    return new Promise(async function (resolve, reject) {
      try {
        // const script = `
        // const el = await driver.$('~foo');
        // await el.click();
        // `;
        const script = `${driverScript}`;
       await driver.executeDriver(script);
        resolve();
      } catch (e) {
        console.log("Error while executing the driver script");
        reject();
      }
    });
  }

  //Session
//####################################################################################################
  //Function Name		   : EndSession
  //Description      	 : End the running session
  //########################################################################################################
  async function endSession() {
    //wdio
    return new Promise(async function (resolve, reject) {
      try {
       await driver.deleteSession();
        resolve();
      } catch (e) {
        console.log("Error while ending the session");
        reject();
      }
    });
  }

  //####################################################################################################
  //Function Name		   : getCapabilities
  //Description      	 : Retrieve the capabilities of the specified session
  //########################################################################################################
  async function getCapabilities() {
    //wdio
    return new Promise(async function (resolve, reject) {
      try {
       let capabilities = await driver.getCapabilities();
        resolve(capabilities);
      } catch (e) {
        console.log("Error while retrieving the capabilities");
        reject();
      }
    });
  }

  //####################################################################################################
  //Function Name		   : goBack
  //Description      	 : Navigate backwards in the browser history, if possible (Web context only)
  //########################################################################################################
  async function navigateBack() {
    //wdio
    return new Promise(async function (resolve, reject) {
      try {
        await driver.back();
        resolve();
      } catch (e) {
        console.log("Error while navigating back");
        reject();
      }
    });
  }
  
   //####################################################################################################
  //Function Name		   : getPageSource
  //Description      	 : Get the current application hierarchy XML (app) or page source (web)
  //########################################################################################################
  async function getPageSource() {
    //wdio
    return new Promise(async function (resolve, reject) {
      try {
        let pageSource = await driver.getPageSource();
        resolve(pageSource);
      } catch (e) {
        console.log("Error while retrieving the page source ");
        reject();
      }
    });
  }
//Device Activity
  //####################################################################################################
  //Function Name		   : getCurrentActivity
  //Description      	 : Get the name of the current Android activity
  //########################################################################################################
  async function getCurrentActivity() {
    //wdio
    return new Promise(async function (resolve, reject) {
      try {
        let currentActivity = await driver.getCurrentActivity();
        resolve(currentActivity);
      } catch (e) {
        console.log("Error while retrieving the getCurrentActivity ");
        reject();
      }
    });
  }

  //####################################################################################################
  //Function Name		   : getCurrentPackage
  //Description      	 : Get the name of the current Android Package
  //########################################################################################################
  async function getCurrentPackage() {
    //wdio
    return new Promise(async function (resolve, reject) {
      try {
        let currentPackage = await driver.getCurrentPackage();
        resolve(currentPackage);
      } catch (e) {
        console.log("Error while retrieving the getCurrentPackage ");
        reject();
      }
    });
  }

   //####################################################################################################
  //Function Name		   : installApp
  //Description      	 : Get the name of the current Android Package
  //Parameters : Path of the apk to install
  //########################################################################################################
  async function installApp(apkPath) {
    //wdio
    return new Promise(async function (resolve, reject) {
      try {
         await driver.installApp(apkPath);
        resolve();
      } catch (e) {
        console.log("Error while installing the app ");
        reject();
      }
    });
  }

  //####################################################################################################
  //Function Name		   : isAppInstalled
  //Description      	 : Check whether the specified app is installed on the device
  //########################################################################################################
  async function isAppInstalled(appId) {
    //wdio
    return new Promise(async function (resolve, reject) {
      try {
         let appInstalled = await driver.isAppInstalled(appId);
        resolve(appInstalled);
      } catch (e) {
        console.log("Error while checking the installing the app ");
        reject();
      }
    });
  }

  //####################################################################################################
  //Function Name		   : closeApp
  //Description      	 : Close an app on device
  //########################################################################################################
  async function closeApp() {
    //wdio
    return new Promise(async function (resolve, reject) {
      try {
        await driver.closeApp();
        resolve();
      } catch (e) {
        console.log("Error while closing the app ");
        reject();
      }
    });
  }

  //####################################################################################################
  //Function Name		   : resetApp
  //Description      	 : Reset the currently running app for this session
  //########################################################################################################
  async function resetApp() {
    //wdio
    return new Promise(async function (resolve, reject) {
      try {
        await driver.reset();
        resolve();
      } catch (e) {
        console.log("Error while reset the app ");
        reject();
      }
    });
  }

  //####################################################################################################
  //Function Name		   : removeApp
  //Description      	 : Remove an app from the device
  //Parameters : appId
  //########################################################################################################
  async function removeApp(appId) {
    //wdio
    return new Promise(async function (resolve, reject) {
      try {
         await driver.removeApp(appId);
        resolve();
      } catch (e) {
        console.log("Error while removing the app ");
        reject();
      }
    });
  }

   //####################################################################################################
  //Function Name		   : activateApp
  //Description      	 : Activate the given app onto the device
  //Parameters : appId
  //########################################################################################################
  async function activateApp(appId) {
    //wdio
    return new Promise(async function (resolve, reject) {
      try {
         await driver.activateApp(appId);
        resolve();
      } catch (e) {
        console.log("Error while activating the app ");
        reject();
      }
    });
  }
  
     //####################################################################################################
  //Function Name		   : terminateApp
  //Description      	 : Terminate the given app onto the device
  //Parameters : appId
  //########################################################################################################
  async function terminateApp(appId) {
    //wdio
    return new Promise(async function (resolve, reject) {
      try {
         await driver.terminateApp(appId);
        resolve();
      } catch (e) {
        console.log("Error while terminate the app ");
        reject();
      }
    });
  }

  //####################################################################################################
  //Function Name		   : queryAppState
  //Description      	 : Get the given app status on the device
  //Parameters : appId
  //########################################################################################################
  async function queryAppState(queryAppState) {
    //wdio
    return new Promise(async function (resolve, reject) {
      try {
        let queryAppState =  await driver.queryAppState(queryAppState);
        resolve(queryAppState);
      } catch (e) {
        console.log("Error while getting the query state of the app ");
        reject();
      }
    });
  }
    

  return {
    queryAppState:queryAppState,
    terminateApp:terminateApp,
    activateApp:activateApp,
    removeApp:removeApp,
    resetApp:resetApp,
    closeApp:closeApp,
    isAppInstalled:isAppInstalled,
    installApp:installApp,
    getCurrentPackage:getCurrentPackage,
    getCurrentActivity:getCurrentActivity,
    getPageSource:getPageSource,
    navigateBack:navigateBack,
    endSession:endSession,
    getCapabilities:getCapabilities,
    executedriverScript:executedriverScript,
    executeMobileCommand:executeMobileCommand,
    driverstatus:driverstatus,
    isKeyboardShown:isKeyboardShown,
    hideKeyboard:hideKeyboard,
    longPressKeyCode:longPressKeyCode,
    pressKeyCode:pressKeyCode,
    implicitWait:implicitWait,
    setTimeOut:setTimeOut,
    fingerScroll:fingerScroll,
    longTap:longTap,
    touchUp:touchUp,
    touchDown:touchDown,
    doubleTap:doubleTap,
    singleTap:singleTap,
    mouseBottomUp:mouseBottomUp,
    mouseBottomDown:mouseBottomDown,
    doubleClick:doubleClick,
    mousemoveTo:mousemoveTo,
    setContext:setContext,
    getAllContexts:getAllContexts,
    getContext:getContext,
    getElementLocationInView:getElementLocationInView,
    getCSSProperty:getCSSProperty,
    getSize:getSize,
    getLocation:getLocation,
    isDisplayed:isDisplayed,
    isEnabled:isEnabled,
    isSelected:isSelected,
    getAttribute:getAttribute,
    getTagName:getTagName,
    getAllElementsUsing: getAllElementsUsing,
    getElementUsing: getElementUsing,
    sendText: sendText,
    clickElement: clickElement,
    launchBrowserUrl: launchBrowserUrl,
    getTitle: getTitle,
    launchApp:launchApp,
    switchToNativeContext:switchToNativeContext,
    pause:pause,
    isElementPresent:isElementPresent,
    waitForElement:waitForElement,
    clearText:clearText,
    getText:getText,
    scrollToElement:scrollToElement,
    backwardHorizantalScroll:backwardHorizantalScroll,
    forwardHorizantalScroll:forwardHorizantalScroll,
    getAlertText:getAlertText,
    dismissAlert:dismissAlert,
    acceptAlert:acceptAlert
  };
};
module.exports = commonPage();
