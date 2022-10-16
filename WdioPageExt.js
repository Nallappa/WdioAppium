/* eslint-disable no-undef */
/**
* Java Script Web test automation framework - Common functions
* Last updated By: SESA620164 Date: Nov-2021	Version: 1.0
* Update History
*/

/* manages all the common operations of an application
 */
chai = require('chai');
// const EC = require('wdio-wait-for');

// browser.waitUntil(EC.vis, { timeout: 5000, timeoutMsg: 'Failed, after waiting for the alert to be present' })
// browser.waitUntil(invisibilityOf('.header'))

var commonPage = function () {
  var currentRootDirectory = process.cwd();
  var path = require('path');
  var fs = require('fs');

  //var appDr = require("../../Scripts/appDriver")
  var utils = require('@se-shared/seat-wdio/ConfigParser/Scripts/utils');
  //const seatConfig = require(currentRootDirectory + "//SEAT.Config.json");

  var configPath = currentRootDirectory + "/runTimeConfig.json"
  if (fs.existsSync(configPath)) {
    //run time file exists
    var seatConfig = require(currentRootDirectory + '/runTimeConfig.json');
  } else {
    //default file
    var seatConfig = require(currentRootDirectory + '/SEAT.Config.json');
  }


  if (seatConfig.dragdropFilepath) {
    var script = fs.readFileSync(currentRootDirectory + seatConfig.dragdropFilepath, 'utf8');
  }
  var expect = chai.expect;

  //####################################################################################################
  //Function Name		   : getElementUsing
  //Description      	 : This function can be used to get the element locator.
  //Parameters Used  	 : None
  //########################################################################################################
  // To enter any value
  async function getElementUsing(locator, selector) {
    //wdio
    utils.print('selector' + selector);
    utils.print('locator' + locator);
    let currentlocator;
    return new Promise(async function (resolve, reject) {
      try {
        currentlocator = await $(locator);
        resolve(currentlocator);
        }catch (e) {
          utils.printError("Error while forming the loctor" + locator, e);
          reject(currentlocator);
        }
    });
  }


  //####################################################################################################
  //Function Name		   : getAllElementsUsing
  //Description      	 : This function can be used to get the all element locators.
  //Parameters Used  	 : None
  //########################################################################################################
  async function getAllElementsUsing(locator, selector) {
    //wdio
    utils.print('selector' + selector);
    utils.print('locator' + locator);
    let currentlocator;
    return new Promise(async function (resolve, reject) {
      try {
        currentlocator = await $$(locator);
        resolve(currentlocator);
        }catch (e) {
          utils.printError("Error while forming the loctor for findelements" + locator, e);
          reject(currentlocator);
        }
      });
  }


  //####################################################################################################
  //Function Name		   : getElementAttribute
  //Description      	 : This function can be used to get the element attribute value.
  //Parameters Used  	 : Reading element_name and expected_text parameters from excel.
  //########################################################################################################
  async function getElementAttribute(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = await getElementUsing(element[0], element[1])
    let actualText;
    return new Promise(async function (resolve, reject) {
      try {
        actualText =  await element_name.getAttribute(testData["attlocator"]);
        expect(actualText).to.include(testData["expected_text"]);
        resolve(true);
        }catch (e) {
          utils.printError(`Error while validating the Element attribute ${testData["attlocator"]}`, e);
          reject(false);
        }
    });
  }


  //####################################################################################################
  //Function Name		   : getAllElementAttribute
  //Description      	 : This function can be used to get all the elements attribute value.
  //Parameters Used  	 : Reading element_name and expected_text parameters from excel.
  //########################################################################################################
  async function getAllElementAttribute (testData) {
    var element = testData["element_name"].split(';')
    var expected_text = testData["expected_text"].split(',')
    var tempArray = []
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_names = await getAllElementsUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      try {
          console.log(`type is`  + typeof element_names);
          for (let element_name of element_names) {
            const actual_text = await element_name.getAttribute(testData["attlocator"]);
            tempArray.push(actual_text);
         } 
         expect(tempArray).to.include.members(expected_text);
         resolve(true);
       }catch (e) {
        utils.printError("error while validating the getAllElementAttribute function", e);
        reject(false);
       }
    });
  }


  //####################################################################################################
  //Function Name		   : setTextValue
  //Description      	 : This function can be used to set the value in textbox
  //Parameters Used  	 : Reading element_name and enterValue parameters from excel.
  //########################################################################################################
  async function setTextValue (testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = await getElementUsing(element[0], element[1])
    var enterValue = testData["enterValue"];
    return new Promise(async function (resolve, reject) {
      try {
        await element_name.waitForExist();
        await element_name.setValue(enterValue);
          utils.print("Value entered: " + enterValue);
          resolve(true);
      } 
      catch (e) {
        utils.printError("Error while validating the function setTextValue", e);
        reject(false);
      };
    });
  }


  //####################################################################################################
  //Function Name		   : setTextAllElements
  //Description      	 : This function can be used to set all the values in textboxes
  //Parameters Used  	 : Reading element_name and enterValue parameters from excel.
  //########################################################################################################   
  async function setTextAllElements(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_names = await getAllElementsUsing(element[0], element[1])
    var enterValue = testData["enterValue"];
    return new Promise(async function (resolve, reject) {
      try {
        for (let element_name of element_names) {
          // await element_name.clearValue();
          await  element_name.waitForExist();
          await  element_name.setValue(enterValue);
        }
        resolve(true);
    }catch (e) {
      utils.printError("Error while setting the text " + testData["enterValue"] , e);
      reject(false);
    }
    })
  }


  //####################################################################################################
  //Function Name		   : selectDropDownValue
  //Description      	 : This function can be used to select a value from the Dropdown
  //Parameters Used  	 : Reading element_name and enterValue parameters from excel.
  //########################################################################################################  
  async function selectDropDownValue(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = await getElementUsing(element[0], element[1])
    var enterValue = testData["enterValue"]
    return new Promise(async function (resolve, reject) {
      try {
        await element_name.click();
        await element_name.selectByAttribute("value", enterValue);
        utils.print("Value entered: " + enterValue);
        resolve(true);
      }
      catch (e) {
        utils.printError("Error while executing the function selectDropDownValue", e);
        reject(false);
      };
    });
  }
 

  //####################################################################################################
  //Function Name		   : selectAllDropDownByIndex
  //Description      	 : This function can be used to select all element value based on the index from the Dropdown
  //Parameters Used  	 : Reading element_name and enterValue parameters from excel.
  //########################################################################################################
  async function selectAllDropDownByIndex(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = await getElementUsing(element[0], element[1])
    var element_names = testData["enterValue"].split(',');
    return new Promise(async function (resolve, reject) {
      try {
        for (let index of element_names) {
          await element_name.click();
          await element_name.selectByIndex(index);
        }
        resolve(true);
      }catch (e) {
      utils.printError("Error while selecting the dropdown values with index  by using the function selectAllDropDownByIndex", e);
      reject(false);
     }
    })
  }


  //####################################################################################################
  //Function Name		   : selectDropDownByIndex
  //Description      	 : This function can be used to select a element value based on the index from the Dropdown
  //Parameters Used  	 : Reading element_name and enterValue parameters from excel.
  //########################################################################################################
  async function selectDropDownByIndex(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = await getElementUsing(element[0], element[1])
    var index = parseInt(testData["enterValue"])
    return new Promise(async function (resolve, reject) {
      try {
        await element_name.click();
        await element_name.selectByIndex(index);
        resolve(true);
      }catch (e) {
      utils.printError("Error while executing the function selectDropDownByIndex", e);
      reject(false);
     }
    })
  }

  //####################################################################################################
  //Function Name		   : selectByVisibleText
  //Description      	 : This function can be used to select a element value based on visible text in the Dropdown
  //Parameters Used  	 : Reading element_name and enterValue parameters from excel.
  //########################################################################################################
  async function selectByVisibleText(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = await getElementUsing(element[0], element[1])
    var value = testData["enterValue"];
    return new Promise(async function (resolve, reject) {
      try {
        await element_name.click();
        await element_name.selectByVisibleText(value);
        resolve(true);
      }catch (e) {
      utils.printError("Error while executing the function selectByVisibleText", e);
      reject(false);
     }
    })
  }

  //####################################################################################################
  //Function Name		   : getTextValue
  //Description      	 : This function can be used to get the text from a element
  //Parameters Used  	 : Reading element_name and expected_text parameters from excel.
  //########################################################################################################
  async function getTextValue(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = await getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      try {
        await element_name.waitForExist();
        const actual_text = await element_name.getText();
        utils.print("getText Value : " + actual_text)
        expect(actual_text).to.include(testData["expected_text"]);
        resolve(true);
      }
      catch (e) {
        utils.printError("failed in getTextValue validation function ", e);
        reject(false);
      };
    });
  }


  //####################################################################################################
  //Function Name		   : matchRegExpression
  //Description      	 : This function can be used to check the regular expression of a element
  //Parameters Used  	 : Reading element_name and regexp parameters from excel.
  //########################################################################################################
  async function matchRegExpression(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name =await getAllElementsUsing(element[0], element[1])
    var regexp = testData["regexp"]
    return new Promise(async function (resolve, reject) {
      try {
        await element_name.waitForExist();
        const actual_text = await element_name.getText();
        expect(actual_text).to.match(new RegExp(regexp));
        resolve(true);
      }
      catch (e) {
        utils.printError("Error while executing the function matchRegExpression", e);
        reject(false);
      };
    });
  }

  //####################################################################################################
  //Function Name		   : checkBackgroundColor
  //Description      	 : This function can be used to check the background color of a element
  //Parameters Used  	 : Reading element_name and bgColor parameters from excel.
  //######################################################################################################## 
  async function checkBackgroundColor(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = await getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      try {
        await element_name.waitForExist();
        const bgColor = await (await element_name.getCSSProperty('background-color')).value;
        expect(bgColor).to.include(testData["bgvColor"]);
        resolve(true);
      }
      catch (e) {
        utils.printError("Error while validating the function checkBackgroundColor", e);
        reject(false);
      };
    });
  }


  //####################################################################################################
  //Function Name		   : checkBackgroundColorAllelements
  //Description      	 : This function can be used to check the background color of all the elements
  //Parameters Used  	 : Reading element_name and bgColor parameters from excel.
  //######################################################################################################## 
  async function checkBackgroundColorAllelements(testData) {
    var element = testData["element_name"].split(';');
    utils.print("element:" + element[0] + "locator:" + element[1]);
    var element_names =await getAllElementsUsing(element[0], element[1]);
    return new Promise(async function (resolve, reject) {
	   try {
      for (let element_name of element_names) {
          const bgColor = (await element_name.getCSSProperty('background-color')).value;
          expect(testData["bgvColor"]).to.include(bgColor);
        }
        resolve(true);
      }catch (e) {
		  utils.printError("Error while validating the background color of all elements in checkBackgroundColorAllelements function", e);
		  reject(false);
      }
    });
  }


  //####################################################################################################
  //Function Name		   : getAllElementTextValue
  //Description      	 : This function can be used to get the textvalue for all the elements
  //Parameters Used  	 : Reading element_name and expected_text parameters from excel.
  //######################################################################################################## 
  async function getAllElementTextValue(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_names = await getAllElementsUsing(element[0], element[1])
    var expected_text = testData["expected_text"].split(',')
    var tempArray = [];
    return new Promise(async function (resolve, reject) {
      try {
        for (let element_name of element_names) {
          const actual_text = await element_name.getText();
          utils.print("actual_text : " + actual_text);
          tempArray.push(actual_text);
        };
        expect(tempArray).to.include.members(expected_text);
        resolve(true);
        }
      catch (e) {
        utils.printError("error while validating the getAllElementTextValue function", e);
        reject(false);
        }
    });
  }


  //####################################################################################################
  //Function Name		   : getAllElementTitle
  //Description      	 : This function can be used to get the title for all the elements
  //Parameters Used  	 : Reading element_name and expected_text parameters from excel.
  //######################################################################################################## 
  this.getAllElementTitle = async function (testData) {
    var element = testData["element_name"].split(';')
    var element_name = getAllElementsUsing(element[0], element[1]);
    var expected_text = testData["expected_text"].split(',');
    var tempArray = [];
    return new Promise(async function (resolve, reject) {
      await element_name.map(async (eleText, index) => {
        await eleText.getTitle().then((actual_text) => {
          utils.print("actual_text : " + actual_text);
          tempArray.push(actual_text);
        })
      }).then(function () {
        expect(tempArray).to.include.members(expected_text);
        resolve(true);
      }).catch((e) => {
        utils.printError("Error while executing the function  get", e);
        reject(false);
      });
    });
  }

  //####################################################################################################
  //Function Name		   : getElementCountValue
  //Description      	 : This function can be used to get count of elements
  //Parameters Used  	 : Reading element_name and regexp parameters from excel.
  //######################################################################################################## 
  async function getElementCountValue(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = await getAllElementsUsing(element[0], element[1])
    var expected = parseInt(testData["expected_count"])
    return new Promise(async function (resolve, reject) {
      try {
          const count =  await element_name.length;
          utils.print("count Value : " + count);
          expect(count).to.equal(expected);
          resolve(true);
      }
      catch (e) {
        utils.printError("Error while executing the function getelementCountValue", e);
        reject(false);
      };
    });
  }

  //####################################################################################################
  //Function Name		   : validatePageContainsText
  //Description      	 : This function can be used to validate the element based on text of the element with 
  //element and Text argument
  //Parameters Used  	 : Reading element_name parameters from excel.
  //######################################################################################################## 
  async function validatePageContainsTextUsingElement(testData) {
    var visibleText = testData["visibleText"];
    var element = testData["element"];
    utils.print("visibleText: " + visibleText)
    return new Promise(async function (resolve, reject) {
      try {
        var locator = element + '*=' + visibleText;
        var element_name = await $(locator);
        let isPresent = await element_name.isDisplayed();
        expect(isPresent).to.equal(true);
        resolve(isPresent);
       }catch (e) {
        utils.printError("error while validating the validatePageContainsTextUsingClass function", e);
        reject(false);
       }
    });
  }

  
  //####################################################################################################
  //Function Name		   : validatePageContainsText
  //Description      	 : This function can be used to validate the element based on text of the element
  //Parameters Used  	 : Reading element_name parameters from excel.
  //######################################################################################################## 
  async function validatePageContainsText(visibleText) {
    var locator = "//*[contains(text(),'" + visibleText + "')]";
    return new Promise(async function (resolve, reject) {
      try {
        var element_name =  await $(locator);
        const isPresent = await element_name.isDisplayed();
        resolve(isPresent);
      }
      catch (e) {
        utils.printError("element with text " + visibleText + " is not present in the page", e);
        reject(false);
      };
    })
  }


  //####################################################################################################
  //Function Name		   : validateAllElementContainsText
  //Description      	 : This function can be used to validate the element based on text of the element
  //Parameters Used  	 : Reading element_name parameters from excel.
  //######################################################################################################## 
  async function validateAllElementContainsText(testData) {
    // to check text on any page
    var element_names = testData["element_name"].split(',')
    return new Promise(async function (resolve, reject) {
      try {
          console.log(`type is`  + typeof element_names);
          for (let element_name of element_names) {
            const retFlag = await validatePageContainsText(element_name);
            expect(retFlag).to.equal(true);
         }
        resolve(true);
      }
      catch (e) {
        utils.printError("Error while validating the text contains in the page " + expectedTextArray, e);
        reject(false);
      };
    })
  }


  //####################################################################################################
  //Function Name		   : validatePageContainsText
  //Description      	 : This function can be used to validate the element based on text of the element with 
  //class and Text argument
  //Parameters Used  	 : Reading element_name parameters from excel.
  //######################################################################################################## 
  async function validatePageContainsTextUsingClass(testData) {
    var visibleText = testData["visibleText"]
    var className = testData["className"]
    return new Promise(async function (resolve, reject) {
      try {
        var locator = "." + className + '*=' + visibleText;
        var element_name = await $(locator)
        let isPresent = await element_name.isDisplayed();
        expect(isPresent).to.equal(true)
        resolve(isPresent);
       }catch (e) {
        utils.printError("error while validating the validatePageContainsTextUsingClass function", e);
        reject(false);
       }
    });
  }


  //####################################################################################################
  //Function Name		   : ClickPageContainsText
  //Description      	 : This function can be used to click the element based on text of the element using ClassName
  //Parameters Used  	 : Reading element_name and expected_count parameters from excel.
  //######################################################################################################## 
  async function ClickPageContainsTextUsingClassName(testData) {
    var visibleText = testData["visibleText"]
    var className = testData["className"]
    return new Promise(async function (resolve, reject) {
      try {
        var locator = "." + className + '*=' + visibleText;
        var element_name = await $(locator);
        await element_name.click();
        utils.print("element clicked in the page");
        resolve(true);
      }
      catch (e) {
        utils.printError("error while validating the ClickPageContainsTextUsingClassName function", e);
        reject(false);
      };
    })
  }


  //####################################################################################################
  //Function Name		   : ClickPageContainsText
  //Description      	 : This function can be used to click the element based on text of the element
  //Parameters Used  	 : Reading element_name and expected_count parameters from excel.
  //######################################################################################################## 
  async function ClickPageContainsText(testData) {
    var locator = "//*[contains(text(),'" + testData["element_name"] + "')]";
    utils.print("element  =" + locator);
    var element_name = await $(locator);
    return new Promise(async function (resolve, reject) {
      try {
        await element_name.waitForExist();
        await element_name.click();
        utils.print("element clicked in the page");
        resolve(true);
      }
      catch (e) {
        utils.printError("element not present in the page", e);
        reject(false);
      };
    })
  }

  //####################################################################################################
  //Function Name		   : clickPageContainsText
  //Description      	 : This function can be used to click the element based on text of the element
  //Parameters Used  	 : Reading element_name and expected_count parameters from excel.
  //######################################################################################################## 
  async function clickPageContainsText(visibleText) {
    var locator = "//*[contains(text(),'" + visibleText + "')]";
    utils.print("element  =" + locator);
    var element_name = await $(locator);
    return new Promise(async function (resolve, reject) {
      try {
        await element_name.waitForExist();
        await element_name.click();
        utils.print("element clicked in the page");
        resolve(true);
      }
      catch (e) {
        utils.printError("element not present in the page", e);
        reject(false);
      };
    })
  }


  //SESA436017: added clickChildElement
  //####################################################################################################
  //Function Name		   : clickChildElement
  //Description      	 : This function can be used to click the child element based on text of the element
  //Parameters Used  	 : Reading element_name and visible text parameters from excel.
  //######################################################################################################## 
  async function clickChildElement(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_names = await getAllElementsUsing(element[0], element[1])
    var visibleText = testData["visibleText"]
    utils.print(element_names + " :visibleText: " + visibleText)
    // get list of child elements
    try {
    let names = [];
    for (let elem of element_names) {
        names.push(await elem.getText());
    };
    // click on child element with visible text same as test data paramter
    for (let name of names) {
        await clickPageContainsText(name);
      }
    return true;
  }
  catch (e) {
    utils.printError("Error while executing the function clickChildElement", e);
    reject(false);
  };
  }


  //####################################################################################################
  //Function Name		   : convertExcelDataSheetToJson
  //Description      	 : This function can be used to read the excel data and convert to json
  //Parameters Used  	 : Reading excel data file and sheet name parameter from excel.
  //######################################################################################################## 
  this.convertExcelDataSheetToJson = async function (testData) {
    var runTimeValues = require(currentRootDirectory + seatConfig.DownloadPath + '/runTimeValues.json');
    if (testData["data_key"]) {
      runTimeValues["excelDataKey"] = testData["data_key"];
    }
    if (testData["column_name"]) {
      runTimeValues["ScenarioName"] = testData["column_name"];
    }
    runTimeValues["testSetname"] = testData["sheet_name"];
    var excelFilename = currentRootDirectory + seatConfig.DownloadPath + "/" + testData["excel_file"];;
    var jsonFilename = path.basename(excelFilename).replace(".xlsx", ".json");
    jsonFilename = currentRootDirectory + seatConfig.DownloadPath + "/" + jsonFilename;
    runTimeValues["excelDataPath"] = excelFilename;
    fs.writeFileSync(currentRootDirectory + seatConfig.DownloadPath + '/runTimeValues.json', JSON.stringify(runTimeValues));

    // to set the file and sheet for excel based data driven testing
    var excelSuite = require('@se-shared/seat-wdio/ConfigParser/Scripts/mainMod')().start();
    var ExlDataObj = await excelSuite.readExcelFile(testData["sheet_name"]);
    fs.writeFileSync(jsonFilename, JSON.stringify(ExlDataObj));

    utils.print("Datasheet converted to json");
    return true;
  }


  //####################################################################################################
  //Function Name		   : clickAllElementContainsText
  //Description      	 : This function can be used to click the element based on text of the element
  //Parameters Used  	 : Reading element_name and expected_count parameters from excel.
  //######################################################################################################## 
  async function clickAllElementContainsText(testData) {
    var element_names = testData["element_name"].split(',');
    utils.print(element_names);
    return new Promise(async function (resolve, reject) {
      try {
        for (let element_name of element_names) {
          const retFlag = await clickPageContainsText(element_name);
          expect(retFlag).to.equal(true);
        };
        resolve(true);
        }catch (e) {
          utils.printError("error while clickAllElementContainsText in the page", e);
          reject(false);
        }
    });
  }


  //####################################################################################################
  //Function Name		   : verifyAllElementsPresent
  //Description      	 : This function can be used to verify the all the elements are present in the page
  //Parameters Used  	 : Reading element_name and expected_count parameters from excel.
  //########################################################################################################
  async function verifyAllElementsPresent(testData) {
    var element = testData["element_name"].split(';');
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_names = await getAllElementsUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      try {
        for (let element_name of element_names) {
          let retFlag = await element_name.isDisplayed();
          expect(retFlag).to.equal(true);
        }
        resolve(true);
        }catch (e) {
          utils.printError("Error while verify the verifyAllElementsPresent function", e);
          reject(false);
        }
    });
  }


  //####################################################################################################
  //Function Name		   : isElementPresent
  //Description      	 : This function can be used to verify a element are present in the page
  //Parameters Used  	 : Reading element_name from excel.
  //########################################################################################################
  async function isElementPresent(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = await getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      try{
      let isPresent = await element_name.isDisplayed();
        utils.print("isPresent=" + isPresent);
        expect(isPresent).to.equal(true);
        resolve(true);
      } catch(e) {
        if (testData["SKIP-TESTSET-ONFAIL"]) {
          utils.print("*** SKIP Test set on fail: " + testData["SKIP-TESTSET-ONFAIL"]);
          utils.setDictValues("SKIP-TESTSET", "TRUE");
        }
        utils.printError("Error while checking the presence of element in the page", e);
        reject(false);
      }
    })
  }

  
  //####################################################################################################
  //Function Name		   : isElementNotPresent
  //Description      	 : This function can be used to verify a element are present in the page
  //Parameters Used  	 : Reading element_name from excel.
  //########################################################################################################
  async function isElementNotPresent(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = await getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      try{
      let isPresent = await element_name.isDisplayed();
        utils.print("isPresent=" + isPresent);
        expect(isPresent).to.equal(false);
        resolve(true);
      } catch(e) {
        if (testData["SKIP-TESTSET-ONFAIL"]) {
          utils.print("*** SKIP Test set on fail: " + testData["SKIP-TESTSET-ONFAIL"]);
          utils.setDictValues("SKIP-TESTSET", "TRUE");
        }
        utils.printError("Error while checking the absence of element in the page", e);
        reject(false);
      }
    })
  }

  //####################################################################################################
  //Function Name		   : isElementExists in Dom
  //Description      	 : This function can be used to verify a element are present in the page
  //Parameters Used  	 : Reading element_name from excel.
  //########################################################################################################
  async  function isElementPresentonDom(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element: " + element[0] + "locator: " + element[1])
    var element_name = await getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      try {
       let isPresent = await element_name.isExisting();
       expect(isPresent).to.equal(true);
       resolve(true);
      }
      catch (e) {
        if (testData["SKIP-TESTSET-ONFAIL"]) {
          utils.print("*** SKIP Test set on fail: " + testData["SKIP-TESTSET-ONFAIL"]);
          utils.setDictValues("SKIP-TESTSET", "TRUE");
        }
        utils.printError("Error while checking the presence of element in the dom", e);
        reject(false);
      };
    })
  }


  //####################################################################################################
  //Function Name		   : clickElement
  //Description      	 : This function can be used to click a element in the page
  //Parameters Used  	 : Reading element_name from excel.
  //########################################################################################################
  async  function clickElement(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element: " + element[0] + "locator: " + element[1])
    var element_name = await getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      try {
        utils.print("click element:")
       await waitForElementToBeClickable(testData);
       await element_name.click();
        resolve(true);
      }
      catch (e) {
        utils.printError("error in clickelement", e);
        reject(false);
      };
    })
  }


  //####################################################################################################
  //Function Name		   : scrollToClickElement
  //Description      	 : This function can be used to scroll to click a element in the page
  //Parameters Used  	 : Reading element_name from excel.
  //######################################################################################################## 
 async function scrollToClickElement(testData) {
  var element = testData["element_name"].split(';')
  utils.print("element: " + element[0] + "locator: " + element[1])
  var element_name = await getElementUsing(element[0], element[1])
  return new Promise(async function (resolve, reject) {
    try {
      await element_name.scrollIntoView();
      await element_name.click();
      resolve(true);
    }catch(e){
      utils.printError("error in scrollToClickElement", e);
      reject(false);
    }
  })
}


  //####################################################################################################
  //Function Name		   : scrollToViewElement
  //Description      	 : This function can be used to scroll to view a element in the page
  //Parameters Used  	 : Reading element_name from excel.
  //######################################################################################################## 
  async function scrollToViewElement(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element: " + element[0] + "locator: " + element[1])
    var element_name = await getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      try {
        await element_name.scrollIntoView();
          resolve(true);
      }catch(e){
        utils.printError("Error while scrolling to the element", e);
        reject(false);
      }
    })
  }

  //####################################################################################################
  //Function Name		   : doubleClickElement
  //Description      	 : This function can be used to double click on element in the page
  //Parameters Used  	 : Reading element_name from excel.
  //######################################################################################################## 
  async function doubleClickElement(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = await getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      try{
        await waitForElementToBeClickable(testData);
        await element_name.doubleClick();
        resolve(true);
      }catch (e) {
        utils.printError("error in doubleClickElement", e);
        reject(false);
      };
    })
  }

  //####################################################################################################
  //Function Name		   : doubleClickElement
  //Description      	 : This function can be used to double click on element in the page
  //Parameters Used  	 : Reading element_name from excel.
  //######################################################################################################## 
  async function doubleClickElementExt(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = await getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      try{
        // await waitForElementToBeClickable(testData);
        await element_name.doubleClick();
        resolve(true);
      }catch (e) {
        utils.printError("error in doubleClickElement", e);
        reject(false);
      };
    })
  }

  //####################################################################################################
  //Function Name		   : deleteAlreadyDownloadedFiles
  //Description      	 : This function can be used to delete all the files from Downloads folder.
  //Parameters Used  	 : none
  //########################################################################################################  
  this.deleteAlreadyDownloadedFiles = function (testData) {
    //const directory = browser.params.userTemplatesTempPath
    const directory = currentRootDirectory + seatConfig.DownloadPath
    fs.readdir(directory, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
          utils.print("File deleted..!")
        });
      }
    });
  }

  //####################################################################################################
  //Function Name		   : deleteFilesFromDirectory 
  //Description      	 : To delete all the files from the directory.
  //Parameters Used  	 : directory
  //########################################################################################################  
  this.deleteFilesFromDirectory = function (testData) {
    const directory = testData["directory"];
    fs.readdir(directory, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
          utils.print("File deleted from: " + directory)
        });
      }
    });
  }


  //####################################################################################################
  //Function Name		   : verifyFileDownload
  //Description      	 : This function can be used to verify all the files downloaded in the directory.
  //Parameters Used  	 : Reading fileName from excel.
  //########################################################################################################  
  this.verifyFileDownload = function (testData) {
    return new Promise(function (resolve, reject) {
      utils.print('entering in to verify method 1');
      //filepath = browser.params.userTemplatesTempPath + testData["fileName"];
      filepath = currentRootDirectory + seatConfig.DownloadPath + testData["fileName"];
      //browser.driver.wait(async function () {
      // browser.pause(5000)
      fs.exists(filepath, (exists) => {
        if (exists) {
          utils.print('file exist');
          // utils.print(filepath);
          resolve(true)
        } else {
          console.error('file does not exist');
          reject(false)
        }
      })
    })
  }

  //####################################################################################################
  //Function Name		   : uploadFile
  //Description      	 : This function can be used to upload a file  
  //Parameters Used  	 : Reading element_name,filename from excel. The default path is seatConfig.DownloadPath 
  //########################################################################################################	
  async function uploadFile(testData) {
    var element = testData["element_name"].split(';')
    var fileToUpload;
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name =await $(element[0]);
    var filename = testData["filename"]
    var foldername = testData["foldername"]
    return new Promise(async function (resolve, reject) {
      if(foldername){
        fileToUpload = currentRootDirectory + seatConfig.DownloadPath + "\\" + foldername + "\\" + filename;
      }else {
        fileToUpload = currentRootDirectory + seatConfig.DownloadPath + "\\" + filename;
      }
      try{
        await browser.pause(1000);
        await element_name.setValue(fileToUpload);
        await browser.pause(1000);
        resolve(true);
      }catch(e) {
        utils.printError("error in while uploading the file" +filename , e);
        reject(false);
      }
    })
  }

  //####################################################################################################
  //Function Name		   : uploadAllFiles
  //Description      	 : This function can be used to upload a file to all the elements 
  //Parameters Used  	 : Reading element_name,filename from excel. The default path is seatConfig.DownloadPath
  //########################################################################################################	
  async function uploadAllFiles(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = await getElementUsing(element[0], element[1])
    var filenames = testData["filename"].split(',')

    return new Promise(async function (resolve, reject) {
      try {
        for (let filename of filenames) {
        var fileToUpload = currentRootDirectory + seatConfig.DownloadPath + "\\" + filename
        var absolutePath = path.resolve(__dirname, fileToUpload);
         await element_name.sendKeys(absolutePath);
        };
          resolve(true);
      }catch(e) {
        utils.printError("error in uploadAllFiles", e);
        reject(false);
      }
    })
  }
  
  //####################################################################################################
  //Function Name		   : isElementEnabled
  //Description      	 : This function can be used to check element is enabled or not. 
  //Parameters Used  	 : Reading element_name from excel. 
  //########################################################################################################
  async function isElementEnabled(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = await getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      try {
        const isEnabled = await element_name.isEnabled();
        utils.print("isEnabled=" + isEnabled);
        expect(isEnabled).to.equal(true);
        resolve(isEnabled);
      }catch(e) {
        utils.printError(`element with locator ${element[0]} is not enabled in the page`, e);
        reject(false);
      }
    })
  }

  

  //####################################################################################################
  //Function Name		   : elementNotEnabled
  //Description      	 : This function can be used to verify a element IS NOT enabled in the page
  //Parameters Used  	 : Reading element_name from excel.
  //########################################################################################################
  async function elementNotEnabled(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element: " + element[0] + "locator: " + element[1])
    var element_name = await getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      try {
        const isDisabled = await element_name.isEnabled();
        utils.print("retFlag=" + isDisabled);
        expect(isDisabled).to.equal(false);
        resolve(true);
        }catch (e) {
          utils.printError("Error while executing the function elementNotEnabled", e);
          reject(false);
        }
    })
  }



  //####################################################################################################
  //Function Name		   : isElementEnabledAll
  //Description      	 : This function can be used to check list of elements is enabled or not. 
  //Parameters Used  	 : Reading element_name from excel. 
  //########################################################################################################
  async function isElementEnabledAll(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_names = await getAllElementsUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      try {
        console.log(`type is`  + typeof element_names);
        for (let element_name of element_names) {
            const isEnabled = await element_name.isEnabled();
            if (isEnabled === true) {
              utils.print("isEnabled=" + isEnabled);
              expect(isEnabled).to.equal(true)
            } else {
              utils.print("element disabled=" + isEnabled);
              expect(isEnabled).to.equal(false)
            }
      }
      resolve(true);
     }catch (e) {
        utils.printError("Error while checking the elements are enabled or not", e);
        reject(false);
     }
    })
  }


  //####################################################################################################
  //Function Name		   : doubleClickValidateElements
  //Description      	 : This function can be used to double click and check element text. 
  //Parameters Used  	 : Reading element_name and expected_text from excel. 
  //########################################################################################################
  async function doubleClickValidateElements(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_names = await getAllElementsUsing(element[0], element[1])
    var data = testData["data"].split(',')
    return new Promise(async function (resolve, reject) {
      try {
        console.log(`type is`  + typeof element_names);
        for (let element_name of element_names) {
          await element_name.doubleClick();
          utils.print("element double clicked");
          for (let expected_text of data) {
            let retFlag = await validatePageContainsText(expected_text);
              utils.print("retFlag=" + retFlag);
              expect(retFlag).to.equal(true);
            };
        }
      resolve(true);
     }catch (e) {
      utils.printError("Error while validating the function doubleClickValidateElements", e);
      reject(false);
     }
    })
  }


  //####################################################################################################
  //Function Name		   : elementPresent
  //Description      	 : This function can be used to check element is present or not. 
  //Parameters Used  	 : Reading element_name from excel. 
  //########################################################################################################
  async function elementPresent(testData) {
    var element_name =await getElementUsing(testData["element_name"], testData["locator"])
    return new Promise(async function (resolve, reject) {
      try {
        const isPresent =  await element_name.isDisplayed();
        utils.print("isPresent=" + isPresent);
        expect(isPresent).to.equal(true);
        resolve(true); 
        }catch (e) {
          utils.printError("element not present in the page", e);
          reject(false);
        }
    })
  }


  //####################################################################################################
  //Function Name		 : SetAlertText
  //Description      	 : This function can be used to set the alert text 
  //Parameters Used  	 : Reading element_name and expected_text from excel. 
  //########################################################################################################
  async function SetAlertText(testData) {
    var enterValue = testData["enterValue"];
    return new Promise(async function (resolve, reject) {
      try {
        await browser.sendAlertText(enterValue);
        resolve(true);
        }catch (e) {
          utils.printError("Error while setting the alert text", e);
          reject(false);
        }
    });
  }


  //####################################################################################################
  //Function Name		 : ValidateAlertText
  //Description      	 : This function can be used to validate the alert text 
  //Parameters Used  	 : Reading element_name and expected_text from excel. 
  //########################################################################################################
  async function ValidateAlertText(testData) {
    return new Promise(async function (resolve, reject) {
      try {
        const actualText =  await browser.getAlertText();
        expect(actualText).to.include(testData["expected_text"]);
        resolve(true);
        }catch (e) {
          utils.printError("Error while validation the alert Text", e);
          reject(false);
        }
    });
  }


  //####################################################################################################
  //Function Name		 : clickAlertPrompt
  //Description      	 : This function can be used to accept or dismiss the alert prompt. 
  //Parameters Used  	 : Reading element_name and expected_text from excel. 
  //########################################################################################################
  async function clickAlertPopup(testData) {
    // var element = testData["element_name"].split(';')
    // utils.print("element:" + element[0] + "locator:" + element[1])
    // var element_name = await getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      try {
                await browser.acceptAlert();
                resolve(true);

        }catch (e) {
          if (testData["AlertPrompt"] == 'Yes') {
            utils.printError("error in Accept the alert", e);
          }else {
            utils.printError("error in Dismiss the alert", e);
          }
          reject(false);
        }
    });
  }

  //####################################################################################################
  //Function Name		 : dismissAlertPrompt
  //Description      	 : This function can be used to accept or dismiss the alert prompt. 
  //Parameters Used  	 : Reading element_name and expected_text from excel. 
  //########################################################################################################
  async function dismissAlertPrompt(testData) {
    // var element = testData["element_name"].split(';')
    // utils.print("element:" + element[0] + "locator:" + element[1])
    // var element_name = await getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      try {
           
              await browser.dismissAlert()
                resolve(true);
            

        }catch (e) {
          if (testData["AlertPrompt"] == 'Yes') {
            utils.printError("error in Accept the alert", e);
          }else {
            utils.printError("error in Dismiss the alert", e);
          }
          reject(false);
        }
    });
  }


  //####################################################################################################
  //Function Name		 : dragAndDropUsingCords
  //Description      	 : This function can be used to drag and drop an element using x and y cords. 
  //Parameters Used  	 : Reading element_name and X and Y Cords from excel. 
  //########################################################################################################
  async function dragAndDropUsingCords(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = await getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      try {
        await element_name.waitForClickable(testData);
        await element_name.scrollIntoView();
        await element_name.dragAndDrop({ x: parseInt(testData["Xcord"]), y: parseInt(testData["Ycord"]) });
        resolve(true);
     }catch (e) {
      utils.printError("Error while dragging and dropping the element", e);
      reject(false);
     }
    });
  }


  //####################################################################################################
  //Function Name		 : dragAndDropElementExtent
  //Description      	 : This function can be used to drag and drop an element which is specified in DragDrop.js file. 
  //Parameters Used  	 : Reading from DragDrop.js file. 
  //########################################################################################################
  async function dragAndDropElementExtent (testData) {
    return new Promise(async function (resolve, reject) {
      try {
        await browser.executeScript(script)
        resolve(true);
        }catch (e) {
          utils.printError("element not present in the page", e);
          reject(false);
        }
    });
  }


  //####################################################################################################
  //Function Name		 : clearTextValue
  //Description      	 : This function can be used to clear the text value. 
  //Parameters Used  	 : Reading from element_name 
  //########################################################################################################
  async function clearTextValue(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1]);
    var element_name = await getElementUsing(element[0], element[1]);
    return new Promise(async function (resolve, reject) {
      try {
        await element_name.waitForExist();
        await element_name.clearValue();
        utils.print("Value cleared:");
        resolve(true);
        }catch (e) {
          utils.printError("Error while executing clearTextValue", e);
          reject(false);
        }
    });
  }


  //####################################################################################################
  //Function Name		 : dragAndDropElement
  //Description      	 : This function can be used to drag and drop an element uisng source and destination elements. 
  //Parameters Used  	 : Reading source_name and dest_element from excel.
  //########################################################################################################
  async function dragAndDropNode(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = await getElementUsing(element[0], element[1])
    var delement = testData["dest_element"].split(';')
    var dest_element = await getElementUsing(delement[0], delement[1])
    return new Promise(async function (resolve, reject) {
      try {
        await element_name.waitForClickable(testData);
        await element_name.scrollIntoView();
        await element_name.dragAndDrop(dest_element);
        resolve(true);
        }catch (e) {
          utils.printError("Error while dragging and dropping the element with coordinates", e);
          reject(false);
        }
    });
  }
 

  //####################################################################################################
  //Function Name		   : mouseMoveAction
  //Description      	 : This function can be used to move the mouse to an element 
  //Parameters Used  	 : Reading element_name from excel.
  //########################################################################################################
  async function mouseMoveAction(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = await getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      try {
        await element_name.moveTo();
        resolve(true);
        }catch (e) {
          utils.printError("Error while moving the mouse action mouseMoveAction", e);
          reject(false);
        }
    })
  }

  
  /* Wait for element to be clickable 
*/
  async function waitForObjectToBeClickable(obj) {
    //wdio
    //var isClickable = global.EC.elementToBeClickable(obj);
    //var isClickable = await obj.isClickable();
    utils.print("waitForObjectToBeClickable");
    await obj.waitForClickable({ timeout: 10000 });
    //browser.wait(isClickable, 5000); //wait for an element to become clickable
  }

  /* parameters:
    * oRef - Object which has to be clicked
    */
  async function click(oRef, name) {
    //wdio
    try {
      //return oRef().click();
      return await oRef.click();
    } catch (e) {
      var m = "Error in Clicking the element"
      if (name) m += " " + name
      //utils.print(m, e)
      utils.printError(m, e)
    }
  }

  /* parameters:
   * oRef - Object which has to be set. Can be Text/Textarea etc. types
   * val - alpha numeric value to be set
   */

  async function setValue(oRef, val, name) {
    //wdio
    try {
      //return oRef().sendKeys(val);
      return await oRef.setValue(val);
    } catch (e) {
      var m = "Error in sending keys "
      if (name) m += " " + name
      utils.print(m, e)
    }
  }

  // following functions to be tested and verified

  /* parameters:
   * url - Full Url to launch the application
   */
  async function launch(url) {
    //wdio
    try {
      //browser.get(url);
      await browser.url(url);
      //browser.waitForAngular();
      //browser.driver.manage().window().maximize();
    } catch (e) {
      // utils.print("Error in launching app with url: " + url, e)
      utils.printError("Error in launching app with url: " + url, e)
    }
  }
  /* parameters:
   * obj - parent Object which has child option tags
   * index - start from 0 - n as visible on screen
   */
  async function selectOptionByIndex(obj, index) {
    // Need to check
    // obj.all(by.tagName('option')).then(function (options) {
    try {
      await obj.selectByIndex(index);
      return true;
    } catch (e) {
      utils.printError("Error in selecting Option by index", obj, index, e)
    }

  }


  /* parameters:
   * oRef - Object which has to be clicked
   */
  async function getText(oRef, name) {
    try {
      //return oRef().getText();
      //wdio
      return await oRef.getText();
    } catch (e) {
      var m = "Error in getting the element text"
      if (name) m += " " + name
      //utils.print(m, e)
      utils.printError(m, e)
    }
  }

  /* returns the current url on screen
   */
  async function getCurrentUrl() {
    let url;
    return new Promise(async function (resolve, reject) {
      try {
        const url = await browser.getCurrentUrl();
        resolve(url);
        }catch (e) {
          utils.printError("Error while getting the current url", e);
          reject(url);
        }
    });
  }

  /* returns the current title of the browser
   */
  async function getTitle() {
    let url;
    return new Promise(async function (resolve, reject) {
      try {
        const url = await browser.getTitle();
        resolve(url);
        }catch (e) {
          utils.printError("Error in getting page tile: ", e)
          reject(url);
        }
    });
  }

  /* Switches to the newly opened tab
   */
  async function switchToNewTab() {
    return new Promise(async function (resolve, reject) {
      try {
        let handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);
        resolve(true);
        }catch (e) {
          utils.printError("Error while swithchig to new window", e);
          reject(false);
        }
    });
  }

    /* Close current window
   */
    async function closeNewTab() {
      return new Promise(async function (resolve, reject) {
        try {
          await browser.closeWindow();
          resolve(true);
          }catch (e) {
            utils.printError("Error while closing the new window", e);
            reject(false);
          }
      });
    }

  /* Switches back to main tab by closing the new tab
   */
  async function switchBackToMainTab() {
    return new Promise(async function (resolve, reject) {
      try {
        await closeNewTab();
        let handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[0]);
        resolve(true);
        }catch (e) {
          utils.printError("Error while swithchig to main window", e);
          reject(false);
        }
    });
  }

  /* Wait for element to be visible 
   */
  async function waitForObjectToBeVisible(obj) {
    //var EC = protractor.ExpectedConditions;
    //wdio
    //var isClickable = EC.elementToBeVisible(obj);
    utils.print("waitForObjectToBeVisible");
    await obj.waitForDisplayed({ timeout: 10000 })
    //browser.wait(isClickable, 5000); //wait for an element to become clickable
  }

  async function quitAll() {
    return new Promise(async function (resolve, reject) {
      try {
        const handles = await browser.getWindowHandles();
          if (handles.length > 1) {
            for (var i = handles.length - 1; i >= 0; i--) {
              await browser.switchToWindow(handles[i]);
              await browser.closeWindow();
            }
          }
        resolve(true);
        }catch (e) {
          utils.printError("Error while closing the window", e);
          reject(false);
        }
    });
  }

  function reportExpectMsg(m) {
    expect("Msg:" + m).toContain(m)
  }

  function checkExpectStr(s, txt, paramName) {
    if (txt.includes(s)) {
      var oStr = "Checked Value: <b><i>" + s + "</i></b>"
      if (paramName)
        oStr = "Checked " + paramName + ": <b><i>" + s + "</i></b>"
      reportExpectMsg(oStr);
    }
    else
      expect(txt).toContain(s)
  }

  async function restart() {
    return new Promise(async function (resolve, reject) {
      try {
        await browser.reloadSession();
        resolve(true);
        }catch (e) {
          utils.printError("Error While restarting", e)
          reject(false);
        }
    });
}

  async function scrollToView(el) {
    //wdio
    // await browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
    await el.scrollIntoView();
  }


  //####################################################################################################
  //Function Name		   : OpenURL
  //Description      	 : This function can be used to To open URL of the application with return of the promise
  //Parameters Used  	 : {array} testData:  test data for the action
  //########################################################################################################
  async function OpenURL(testData) {
    //wdio
  return new Promise(async function (resolve, reject) {
    var url = testData["url"];
    try {
      await browser.url(url);
      await browser.maximizeWindow();
      resolve(true);
      }catch (e) {
        utils.printError("Error while opening the url " + url, e);
        reject(false);
      }
  });
}

  /*Function:OpenURLNewTab: can be called automatically from data file using Test case handler...
    Mandatory Parameter: Each function should have only single parameter (testData object)
     * @param {array} testData:  test data for each action
     * @return {boolean} true (no validation for login)
    */
  // To open URL of the application in another tab
  async function OpenURLNewTab(testData) {
    var url = testData["url"];
    utils.print("Open in new tab: " + url);
    return new Promise(async function (resolve, reject) {
      try {
        await browser.newWindow(url, {windowName: 'blank window'});
        await switchToNewTab();
        resolve(true);
        }catch (e) {
          utils.printError("Error while opening the new tab", e);
          reject(false);
        }
    });
  }

  // To Set focus on new tab
  this.openFaqTab = async function (testData) {
    //wdio
    //await browser.waitForAngularEnabled(false);
    let windowHandles = await browser.getWindowHandles();
    var url = testData["url"];

    // for some places: ignore sync based on browser and angular page
    if (browser.browserName !== 'chrome') {
      //for edge: before url get function
      browser.ignoreSynchronization = true;
    }
    utils.print("Open in new tab: " + url);
    await browser.getWindowHandles().then(async function (handles) {
      await browser.switchToWindow(handles[1]);
    });
    // await appDr.switchToNewTab();


    //loping opened windows and navigating to main tab
    await browser.getWindowHandles().then(async function (handles) {
      await browser.switchToWindow(handles[0])
    })
    return true;
  }

  //####################################################################################################
  //Function Name		   : syncTimeSetup
  //Description      	 : This function can be used to To syc time and obj repo optinal setting to json
  //Parameters Used  	 : {array} testData:  test data for the action
  //########################################################################################################
  async function syncTimeSetup(testData) {

    // set wait time: read from test data file
    if (testData["SLEEP"]) {
      if (testData["SLEEP"] == "2000") {
        await browser.pause(2000);
      } else if (testData["SLEEP"] == "4000") {
        await browser.pause(4000);
      } else if (testData["SLEEP"] == "8000") {
        await browser.pause(8000); 
      } else {
        utils.print("sleep: wait for: " + testData["SLEEP"]);
        await browser.pause(parseInt(testData["SLEEP"]));
      }
    }

    /* Load object repository file json or global data text file
      *  This is used to load object repository required to execute actions execute or validate
    */
    if (testData["OBJ_REPO"]) {
      if (testData["OBJ_REPO"] == "TEXT") {
        global.objProps = "";
      } else {
        utils.print("JSON Repo: Read object properties")
        global.objProps = require(currentRootDirectory + "\\" + testData["OBJ_REPO"]);
      }
    }
    
    if (testData["WAIT_PROPS"]) {
      //wait for element
      var waitProps = testData["WAIT_PROPS"];
      var element = testData["element_name"].split(';')
      utils.print("element:" + element[0] + "locator:" + element[1])
      var element_name = await getElementUsing(element[0], element[1])
      return new Promise(async function (resolve, reject) {
        try {
          switch (waitProps) {
            case "elementToBeClickable":
              const el = await $(element[0]);
              let clickable = await el.isClickable();
              console.log(clickable); // outputs: true or false
              // wait for element to be clickable
              await browser.waitUntil(() => el.isClickable());
              break;
            case "visibilityOf":
               await element_name.waitForDisplayed({ timeout: 10000 });
              break;
            default:
              throw ('This wait is not handled in common page');
              break;
          }
          resolve(true);
        }
        catch (e) {
          //utils.print("element not present in the page=" + e);
          utils.printError("failed in syncTimeSetup waitProps: ", e);
          reject(false);
        };

      });

    }
  }

  //####################################################################################################
  //Function Name		   : keySelection
  //Description      	 : This function can be used to To send keys to the page in focus
  //Parameters Used  	 : {array} testData:  test data for the action
  //########################################################################################################
  async function keySelection(testData) {
    //  https://www.w3.org/TR/webdriver/#keyboard-actions
    return new Promise(async function (resolve, reject) {
      try {
        utils.print("******* Send Key to the focussed page: " + testData["KEY"])
        if (testData["KEY"] == "ESCAPE") {
          await browser.keys("Escape");
        } else if (testData["KEY"] == "ENTER") {
          await browser.keys("Enter");
        } else if (testData["KEY"] == "BACK_SPACE") {
          await browser.keys("Backspace");
        } else if (testData["KEY"] == "TAB") {
          await browser.keys("Tab");
        } else if (testData["KEY"] == "REFRESH") {
          await browser.refresh();
        } else if (testData["KEY"] == "CONTROL") {
          await browser.keys("Control");
        } else if (testData["KEY"] == "CLEAR") {
          await browser.keys("Clear");
        } else if (testData["KEY"] == "ALT") {
          await browser.keys("Alt");
        } else if (testData["KEY"] == "DELETE") {
          await browser.keys("Delete");
        } else if (testData["KEY"] == "CONTROLPLUS") {
          await browser.keys(['Control', '+']);
        } else if (testData["KEY"] == "CONTROLMINUS") {
          await browser.keys(['Control', '-']);
        } else {
          await browser.keys(testData["KEY"]);
        }
        resolve(true);
        }catch (e) {
          utils.printError("Error while clicking the keyword " + testData["KEY"], e);
          reject(false);
        }
    });
  
    }
  //####################################################################################################
  //Function Name		 : executeBroswerScript
  //Description      	 : This function can be used to execute any browser java script 
  //Parameters Used  	 : Reading from SCRIPT name 
  //########################################################################################################
  async function executeBroswerScript(testData) {
    var scriptPath = testData["SCRIPT"];
    if (scriptPath) {
      var script = fs.readFileSync(process.cwd() + "/" + scriptPath, 'utf8');
      return new Promise(async function (resolve, reject) {
        try {
          await browser.executeScript(script);
          resolve(true);
        }
        catch(e) {
          utils.printError("error in executeBroswerScript", e);
          reject(false);
        }
      });
    }
  }


  //####################################################################################################
  //Function Name		   : elementNotDisplayed
  //Description      	 : This function can be used to verify a element IS NOT present in the page
  //Parameters Used  	 : Reading element_name from excel.
  //########################################################################################################
  async function elementNotDisplayed(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element: " + element[0] + "locator: " + element[1])
    var element_name = await getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      try {
        const isPresent = await element_name.isDisplayed();
        utils.print("retFlag=" + isPresent);
        expect(isPresent).to.equal(false);
        resolve(true);
        }catch (e) {
          utils.printError("Error while executing the function elementNotDisplayed", e);
          reject(false);
        }
    })
  }


  //####################################################################################################
  //Function Name		   : clickElementContainsText
  //Description      	 : This function can be used to click the element based on text of the element
  //Parameters Used  	 : Reading element_name visible text from excel.
  //######################################################################################################## 
  async function clickElementContainsText(testData) {
    var element_name = testData["element_name"];
    utils.print(element_name);
    return new Promise(async function (resolve, reject) {
      try{
       const retFlag = await clickPageContainsText(element_name);
       utils.print("retFlag=" + retFlag);
       expect(retFlag).to.equal(true);
       resolve(true);
      }catch (e) {
        utils.printError("clickElementContainsText: element not present in the page", e);
        reject(false);
      }
    })
  }


  //####################################################################################################
  //Function Name		   : validateElementContainsText
  //Description      	 : This function can be used to validate the element based on text of the element
  //Parameters Used  	 : Reading element_name visible text from excel.
  //######################################################################################################## 
  async function validateElementContainsText(testData) {
    var element_name = testData["element_name"];
    utils.print(element_name);
    return new Promise(async function (resolve, reject) {
      try{
         const retFlag = await validatePageContainsText(element_name);
         utils.print("retFlag=" + retFlag);
         expect(retFlag).to.equal(true);
         resolve(true);
        }catch (e) {
          utils.printError("validateElementContainsText: element not present in the page", e);
          reject(false);
        }
    })

  }


  //####################################################################################################
  //Function Name		   : isElementSelected
  //Description      	 : This function can be used to check element is selected or not
  //Parameters Used  	 : Reading element_name from excel. 
  //########################################################################################################
  async  function isElementSelected(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = await getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      try{
         const isSelected = await element_name.isSelected();
         utils.print("isSelected=" + isSelected);
         expect(isSelected).to.equal(true);
         resolve(true);
        }catch (e) {
          utils.printError("isElementSelected: element not selected in the page", e);
          reject(false);
        }
    })
  }


  //####################################################################################################
  //Function Name		   : waitForElementToBeClickable
  //Description      	 : This function can be used to wait for the element to be clickable
  //Parameters Used  	 : {array} testData:  test data for the action
  //######################################################################################################## 
  async function  waitForElementToBeClickable(testData) {
    var clickFlag = false;
    if (testData["clickFlag"]) {
      if (testData["clickFlag"] == "TRUE") {
        clickFlag = true;
      }
    }
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = await getElementUsing(element[0], element[1])

    return new Promise(async function (resolve, reject) {
      try {
        await element_name.waitForClickable({ timeout: 15000 });
        resolve(true);
      }
      catch (e) {
        utils.printError("failed in waitForElementToBeClickable: ", e);
        reject(false);
      };
    });
  }


  //####################################################################################################
  //Function Name		   : getLatestDownloadedfile
  //Description      	 : This function can be used to get the file name of the downloaded file
  //Parameters Used  	 : Reading testdata file name extension
  //########################################################################################################
  this.getLatestDownloadedfile = async function (testData) {
    //wdio
    var startFileWith = testData["file_start_with"];
    var downloadFilePath = path.resolve(__dirname, currentRootDirectory + seatConfig.DownloadPath);
    utils.print("File Download directory path: " + downloadFilePath);

    await getLatestFile({ directory: downloadFilePath, extension: startFileWith }, async (filename = null) => {
      utils.print("Downloads-getLatestFile: " + filename);
      //readWriteRunTimeValues("IPLStatusDataFile",filename);
      await readWriteRunTimeValues(startFileWith, filename);
      expect(filename).to.include(startFileWith);
    });

    return true;
  }

  //internal method for getLatestDownloadedfile - to write run time values for IPLStatusDataFile
  async function readWriteRunTimeValues(paramName, paramData) {
    //wdio
    //read run time values
    var runTimeValues = require(currentRootDirectory + seatConfig.DownloadPath + '/runTimeValues.json');
    //store run time values
    runTimeValues[paramName] = paramData;
    fs.writeFileSync(currentRootDirectory + seatConfig.DownloadPath + '/runTimeValues.json', JSON.stringify(runTimeValues));

    return true;
  }

  //internal method for getLatestDownloadedfile - to check file start with
  async function getLatestFile({ directory, extension }, callback) {
    //wdio
    fs.readdir(directory, (_, dirlist) => {
      const latest = dirlist.map(_path => ({ stat: fs.lstatSync(path.join(directory, _path)), dir: _path }))
        .filter(_path => _path.stat.isFile())
        .filter(_path => extension ? _path.dir.startsWith(`${extension}`) : 1)
        .sort((a, b) => b.stat.mtime - a.stat.mtime)
        .map(_path => _path.dir);
      callback(latest[0]);
    });
  }
  //internal method for getLatestDownloadedfile - to check file end with  :NOT USED
  function getLatestFileExtn({ directory, extension }, callback) {
    fs.readdir(directory, (_, dirlist) => {
      const latest = dirlist.map(_path => ({ stat: fs.lstatSync(path.join(directory, _path)), dir: _path }))
        .filter(_path => _path.stat.isFile())
        .filter(_path => extension ? _path.dir.endsWith(`.${extension}`) : 1)
        .sort((a, b) => b.stat.mtime - a.stat.mtime)
        .map(_path => _path.dir);
      callback(latest[0]);
    });
  }


  //####################################################################################################
  //Function Name		   : readDownloadedExcelData
  //Description      	 : This function can be used to read the data of the downloaded excel file
  //Parameters Used  	 : Reading testdata file (from a run time values variable) and sheet name
  //########################################################################################################
  this.readDownloadedExcelData = async function (testData) {
    var startFileWith = testData["file_start_with"]; // this holds run time variable which contains actual file name
    var sheetName = testData["sheet_name"];
    //var sheetName = "IPLStatus";
    //read run time values
    var runTimeValues = require(currentRootDirectory + seatConfig.DownloadPath + '/runTimeValues.json');

    var sourceFile = currentRootDirectory + seatConfig.DownloadPath + "/" + runTimeValues[startFileWith];
    var targetFile = currentRootDirectory + seatConfig.DownloadPath + "/latest-" + runTimeValues[startFileWith];
    //var targetFile = currentRootDirectory + seatConfig.DownloadPath + "/" + "latest-IPL Status-2021_07_02_13_24_13.xlsx";
    //store run time values
    runTimeValues["testSetname"] = sheetName;
    //runTimeValues["excelDataPath"] = currentRootDirectory + seatConfig.DownloadPath + "/" + runTimeValues["IPLStatusDataFile"];
    runTimeValues["excelDataPath"] = targetFile;
    fs.writeFileSync(currentRootDirectory + seatConfig.DownloadPath + '/runTimeValues.json', JSON.stringify(runTimeValues));

    fs.writeFileSync(targetFile, fs.readFileSync(sourceFile));
    // to read contents of excel 
    var excelSuite = require('@se-shared/seat-wdio/ConfigParser/Scripts/mainMod')().start();
    var objExcelData = await excelSuite.readExcelFile(sheetName); // ExcelData is the global variable from config
    utils.print("Datasheet object ======>>>>>>>: " + objExcelData);
    // convert to json
    var jsonFilename = path.basename(targetFile).replace(".xlsx", ".json");
    jsonFilename = currentRootDirectory + seatConfig.DownloadPath + "/" + jsonFilename;
    fs.writeFileSync(jsonFilename, JSON.stringify(objExcelData));
    utils.print("Datasheet converted to json");

    return true;
  }
  //####################################################################################################
  //Function Name		   : getAllElementCountValue
  //Description      	 : This function can be used to get count of elements
  //Parameters Used  	 : Reading element_name and expected_count parameters from excel.
  //######################################################################################################## 
  async function getAllElementCountValue(testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = await getAllElementsUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      try {
          const count =  await element_name.length;
          utils.print("count Value : " + count)
          expect(count).to.equal(parseInt(testData["expected_count"]))
          resolve(true);
      }
      catch (e) {
        utils.printError("Error while retriving the elemeent count for element " + element[0], e);
        reject(false);
      };
    });
  }


  //####################################################################################################
  //Function Name		   : getBrowserName
  //Description      	 : This function can be used to the current browser
  //Parameters Used  	 : Reading expected_text  from excel.
  //######################################################################################################## 
  async function getBrowserName(testData) {
    var browsername = testData["expected_text"]
    return new Promise(async function (resolve, reject) {
      try {
          let actual_browser = await browser.capabilities.browserName;
          console.log(actual_browser);
          expect(actual_browser).to.equal(testData["expected_text"]);
          resolve(true);
      }
      catch (e) {
        utils.printError("Error while retriving the elemeent count for element " + element[0], e);
        reject(false);
      };
    });
  }

  
  //####################################################################################################
  //Function Name		   : uploadFileExt
  //Description      	 : This function can be used to upload a file  - using addValue method
  //Parameters Used  	 : Reading element_name,filename from excel. The default path is seatConfig.DownloadPath 
  //########################################################################################################
  this.uploadFileExt = async function (testData) {
    let testRunResults = require(currentRootDirectory + "/.test-run/testRunResults.json");
    var uplSelector = testData["class_name"];
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = await getElementUsing(element[0], element[1])
    var filename = testData["filename"]
    var foldername = testData["foldername"]
    var fileToUpload;
    //wdio
    return new Promise(async function (resolve, reject) {
      if(foldername){
        fileToUpload = currentRootDirectory + seatConfig.DownloadPath + "\\" + foldername + "\\" + filename;
      }else {
        fileToUpload = currentRootDirectory + seatConfig.DownloadPath + "\\" + filename;
      }
      try {
        await browser.execute(
          function () {
            document.getElementByClassName(uplSelector).style.display = 'block'
          }
        )
      } catch (e) {
        utils.print("error in uploadBtn=" + e);
      }

      try {
       await element_name.addValue(fileToUpload);
            resolve(true);
      }catch(e) {
          testRunResults["uploadFile-" + utils.getTS()] = " :Fail Reason: " + e;
          fs.writeFileSync(currentRootDirectory + "/.test-run/testRunResults.json", JSON.stringify(testRunResults));
          utils.printError("error in uploadBtn", e);
          reject(false);
      }
    })
  } 


 async function verifySitesRiskColor(testData) {
    var allSitesRiskColor = await getAllElementsUsing("risk-legend", "class")
    // var allSitesRiskColor = await getAllElementsUsing("//button[@class='ui-button ui-corner-all ui-widget']")
    var element1 = testData["element1"];
    var element2 = testData["element2"];
    return new Promise(async function (resolve, reject) {
      var elementsCount = allSitesRiskColor.length;
        utils.print(elementsCount);
        for(let i=1; i<elementsCount;i++) {
          var bgColor = (await allSitesRiskColor[i].getCssProperty("background-color")).value;
          if ((bgColor == element1) || (bgColor == element2)) {
            utils.print("Current Color is: " + bgColor + "Expected is: " + element1 + " or " + element2)
            utils.print("Test Pass");
            resolve(true)
          }else {
            utils.print("Current Color is: " + bgColor + "Expected is: " + element1 + " or " + element2)
            utils.print("Test Fail");
            reject(false)
          }
  
        }
  
    })
  
  }

  return {
    launch: launch,
    restart: restart,
    setValue: setValue,
    selectOptionByIndex: selectOptionByIndex,
    click: click,
    getText: getText,
    getCurrentUrl: getCurrentUrl,
    getAllElementsUsing: getAllElementsUsing,
    getTitle: getTitle,
    getElementUsing: getElementUsing,
    switchToNewTab: switchToNewTab,
    waitForObjectToBeVisible: waitForObjectToBeVisible,
    switchBackToMainTab: switchBackToMainTab,
    reportExpectMsg: reportExpectMsg,
    checkExpectStr: checkExpectStr,
    scrollToView: scrollToView,
    quitAll: quitAll,
    waitForObjectToBeClickable: waitForObjectToBeClickable,
    ClickPageContainsText: ClickPageContainsText,
    clickPageContainsText: clickPageContainsText,
    checkBackgroundColorAllelements: checkBackgroundColorAllelements,
    clickElement: clickElement,
    isElementPresent: isElementPresent,
    setTextValue: setTextValue,
    getTextValue: getTextValue,
    getAllElementTextValue: getAllElementTextValue,
    checkBackgroundColor: checkBackgroundColor,
    matchRegExpression: matchRegExpression,
    getElementCountValue: getElementCountValue,
    doubleClickElement: doubleClickElement,
    uploadFile: uploadFile,
    isElementEnabled: isElementEnabled,
    isElementEnabledAll: isElementEnabledAll,
    clickAllElementContainsText: clickAllElementContainsText,
    uploadAllFiles: uploadAllFiles,
    verifyAllElementsPresent: verifyAllElementsPresent,
    doubleClickValidateElements: doubleClickValidateElements,
    getAllElementAttribute: getAllElementAttribute,
    setTextAllElements: setTextAllElements,
    selectDropDownValue: selectDropDownValue,
    selectDropDownByIndex: selectDropDownByIndex,
    selectAllDropDownByIndex: selectAllDropDownByIndex,
    getAllElementTitle: getAllElementTitle,
    getElementAttribute: getElementAttribute,
    scrollToViewElement: scrollToViewElement,
    scrollToClickElement: scrollToClickElement,
    deleteFilesFromDirectory: deleteFilesFromDirectory,
    verifyFileDownload: verifyFileDownload,
    deleteAlreadyDownloadedFiles: deleteAlreadyDownloadedFiles,
    clickChildElement: clickChildElement,
    convertExcelDataSheetToJson: convertExcelDataSheetToJson,
    dragAndDropNode: dragAndDropNode,
    clearTextValue: clearTextValue,
    dragAndDropElementExtent: dragAndDropElementExtent,
    dragAndDropUsingCords: dragAndDropUsingCords,
    mouseMoveAction: mouseMoveAction,
    validateAllElementContainsText: validateAllElementContainsText,
    OpenURL: OpenURL,
    OpenURLNewTab: OpenURLNewTab,
    openFaqTab: openFaqTab,
    syncTimeSetup: syncTimeSetup,
    keySelection: keySelection,
    executeBroswerScript: executeBroswerScript,
    elementNotDisplayed: elementNotDisplayed,
    validateElementContainsText: validateElementContainsText,
    clickElementContainsText: clickElementContainsText,
    isElementSelected: isElementSelected,
    waitForElementToBeClickable: waitForElementToBeClickable,
    getLatestDownloadedfile: getLatestDownloadedfile,
    readDownloadedExcelData: readDownloadedExcelData,
    validatePageContainsTextUsingElement: validatePageContainsTextUsingElement,
    validatePageContainsTextUsingClass: validatePageContainsTextUsingClass,
    validatePageContainsText: validatePageContainsText,
    ClickPageContainsTextUsingClassName: ClickPageContainsTextUsingClassName,
    readWriteRunTimeValues: readWriteRunTimeValues,
    getLatestFile: getLatestFile,
    getAllElementCountValue: getAllElementCountValue,
    isElementPresentonDom: isElementPresentonDom,
    selectByVisibleText: selectByVisibleText,
    verifySitesRiskColor:verifySitesRiskColor,
    SetAlertText:SetAlertText,
    ValidateAlertText:ValidateAlertText,
    elementPresent:elementPresent,
    clickAlertPopup:clickAlertPopup,
    uploadFileExt:uploadFileExt,
    dismissAlertPrompt:dismissAlertPrompt,
    doubleClickElementExt:doubleClickElementExt,
    closeNewTab:closeNewTab,
    getBrowserName:getBrowserName,
    isElementNotPresent:isElementNotPresent,
    elementNotEnabled:elementNotEnabled

  }
};
module.exports = commonPage();

