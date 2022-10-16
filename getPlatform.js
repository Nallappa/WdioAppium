/* eslint-disable no-empty */



class OSPlatform {

  //####################################################################################################
  //Function Name		 : getcurrentOSPlatform
  //Description      	 : This function is used to get the current OS running platform.
  //Parameters Used  	 : None
  //########################################################################################################
  getcurrentOSPlatform() {
    const platform = browser.capabilities.platformName.toLowerCase();
      try {
        if(platform === 'ios'){
           return "ios";
      }else {
            return "android";
         }
      } catch (e) {
        console.log("Error while fetching the current running os platform", e);
      }
   
  }

}
module.exports = new OSPlatform();