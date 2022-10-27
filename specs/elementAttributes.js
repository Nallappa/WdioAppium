
// import HomeScreen from "./PageObjects/homepage";
const homepage = require('../PageObjects/homepage');


describe("Android Element tests", () => {

  xit("Find Element by Accessbility id", async () => {
    //Accessibilty id : supports both android and ios.
    //Find Element by Accessibility id.
    // const appOption = await $("~App");
    //click on Element
    // await appOption.click();
    await homepage.clickApp();
    //Assert
    const actionBarOption = await $("~Action Bar");
    await expect(actionBarOption).toBeExisting();
  });


});
