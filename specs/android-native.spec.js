

describe("Android Native Features Test", () => {

  xit("Access an Activity directly", async () => {

    await driver.startActivity("io.appium.android.apis","io.appium.android.apis.app.AlertDialogSamples");
    //click on Element
    await driver.pause(3000);
    //Assert
    await expect($('//*[@text()="App/Alert Dialogs"]')).toExist();
  });

  
  xit("Working with Alert Dialog box", async () => {
    await driver.startActivity("io.appium.android.apis","io.appium.android.apis.app.AlertDialogSamples")
    //click on Element
    await driver.pause(3000);
    //Assert
    // const actionBarOption = await $("~Action Bar");
    await expect($('//*[@text()="Accessibility/Accessibility Service"]')).toExist();
  });

});
