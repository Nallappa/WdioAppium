const path = require('path');
const { config } = require('./wdio.shared.conf');


// ====================
// Runner Configuration
// ====================
//
config.port = 4723;

//
// ============
// Specs
// ============
config.specs = [
  path.join(process.cwd(), './specs/android-findElements.spec.js')
  // path.join(process.cwd(), './specs/*.spec.js')
];

//
// ============
// Capabilities
// ============
config.capabilities = [
  {
    platformName: "Android",
    "appium:platformVersion": "11",
    "appium:deviceName": "OnePlus Nord",
    "appium:automationName": "UIAutomator2",
    // "appium:appPackage": "io.appium.android.apis",
    "appium:appActivity": ".ApiDemos",
    "appium:app": path.join(process.cwd(), "./app/android/ApiDemos-debug.apk"),
    // "browserName": "chrome",


    // "appium:platformVersion": "12.0",
    // "appium:deviceName": "Nexus 6",
    // "appium:automationName": "UIAutomator2",
    // "appium:app": path.join(process.cwd(), "./app/android/ApiDemos-debug.apk"),

    //"chromedriverExecutableDir": "<Path of chrome driver>",

    "appium:autoGrantPermissions": true
  }
]

//
// Test runner services
// Services take over a specific job you don't want to take care of. They enhance
// your test setup with almost no effort. Unlike plugins, they don't add new
// commands. Instead, they hook themselves up into the test process.
config.services = ['appium'];
// appium: {
//   command: 'appium --chromedriver-executable /Users/harsha.sharmagelato.com/Dev/work/sandbox/gelato-api-mobile/integration-tests/node_modules/appium-chromedriver/chromedriver/mac/chromedriver_mac64_v91.0.4472.101',
//   // args: ['--allow-insecure', 'chromedriver_autodownload'],
// },

exports.config = config;
