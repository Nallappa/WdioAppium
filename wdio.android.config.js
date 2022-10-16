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
    "appium:app": path.join(process.cwd(), "./app/android/ApiDemos-debug.apk"),

    // "appium:platformVersion": "12.0",
    // "appium:deviceName": "Nexus 6",
    // "appium:automationName": "UIAutomator2",
    // "appium:app": path.join(process.cwd(), "./app/android/ApiDemos-debug.apk"),

    "appium:autoGrantPermissions": true
  }
]
//
// Test runner services
// Services take over a specific job you don't want to take care of. They enhance
// your test setup with almost no effort. Unlike plugins, they don't add new
// commands. Instead, they hook themselves up into the test process.
config.services = ['appium'];

exports.config = config;
