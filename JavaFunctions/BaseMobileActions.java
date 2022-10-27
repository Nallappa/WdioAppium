package com.se.testfwk.base;

import static io.appium.java_client.touch.offset.PointOption.point;
import static org.junit.Assert.fail;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.Duration;
import java.util.Base64;
import java.util.Collection;
import java.util.List;
import java.util.Properties;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import javax.lang.model.element.Element;

import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.touch.TouchActions;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.google.gson.JsonObject;
import com.relevantcodes.extentreports.ExtentTest;
import com.relevantcodes.extentreports.LogStatus;
import com.se.testfwk.config.ConfigManager;
import com.se.testfwk.config.ConfigParameters;
import com.se.testfwk.utils.CommonUtils;
import com.se.testfwk.utils.FileUtils;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.MobileBy;
import io.appium.java_client.PerformsTouchActions;
import io.appium.java_client.TouchAction;
import io.appium.java_client.touch.WaitOptions;
import io.appium.java_client.touch.offset.PointOption;
import io.cucumber.java.AfterStep;
import io.cucumber.java.Scenario;

public class BaseMobileActions {

	protected static AppiumDriver<WebElement> driver = SessionManager.getDriver();
	private Properties objectRepository;
	ExtentTest logger;
	WebDriverWait wait;
	JsonObject testStepJO;

	public BaseMobileActions(JsonObject testStepJO, Properties objects, ExtentTest logger) {

		this.wait = new WebDriverWait(driver, 40);
		this.testStepJO = testStepJO;
		this.objectRepository = objects;
		this.logger = logger;

	}

	/*
	 * public BaseMobileActions(Properties objects, ExtentTest logger2) { // TODO
	 * Auto-generated constructor stub this.objectRepository = objects; this.logger
	 * = logger2; }
	 */

	/**
	 * Method to notify the test suite execution
	 */
	public void suite() {
		logger.log(LogStatus.INFO, " ", "Test Suite started execution");
	}

	/**
	 * Method to update the start execution of the test case
	 */
	public void testcase() {
		logger.log(LogStatus.INFO, "Test Case '" + testStepJO.get("Description") + "' with ID '" + testStepJO.get("ID")
				+ "' stated execution", " ");
		BaseTest.setConfig(ConfigParameters.TESTCASE_NAME, testStepJO.get("ID").getAsString());

	}

	/**
	 * Method to update the end of the test case execution
	 */
	public void AfterTest() {
		System.out.println("Test Case execution completed");
		logger.log(LogStatus.INFO, "Test Case execution completed", " ");
	}
	/*
	 * public static void selectOptionsFromDropDown(WebElement ele, String value)
	 * throws InterruptedException { Select drp = new Select(ele);
	 * 
	 * Thread.sleep(2000); var drpvalue = drp.getOptions();
	 * 
	 * for (var option : drpvalue) { if (option.getText().equals(value)) {
	 * option.click(); break; } } }
	 */

	public static void selectList(Collection<WebElement> options, String value) throws InterruptedException {
		for (WebElement option : options) {
			if (option.getText().equals(value)) {
				Thread.sleep(5000);
				System.out.println(option);
				option.click();
				break;
			}
		}

	}

	/**
	 * Method to update the end of the test case execution
	 */
	public String addScreenshot() {

		if (ConfigManager.getInstance().getPropertyAsBoolean(ConfigParameters.TAKE_SCREENSHOT))
			return logger.addScreenCapture(CommonUtils.captureOnLoadScreenshot());
		else
			return "";

	}

	/**
	 * Method to Click on Element
	 * 
	 * @throws InterruptedException
	 * 
	 */
	public void clickElement() {

		wait.until(ExpectedConditions
				.visibilityOfElementLocated(getByElement(testStepJO.get("element_name").getAsString()))).click();
		logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(),
				testStepJO.get("Description").getAsString() + " action performed " + addScreenshot());
	}

	/**
	 * Method to Click on Image
	 * 
	 * @throws IOException
	 * @throws URISyntaxException
	 * 
	 * @throws InterruptedException
	 * 
	 */
	public void clickImage() throws URISyntaxException, IOException {

		By sunriseImage = MobileBy.image(getReferenceImageB64());
		WebElement el = wait.until(ExpectedConditions.presenceOfElementLocated(sunriseImage));
		// WebElement el = driver.findElementByImage(getReferenceImageB64());
		el.click();
		logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(),
				testStepJO.get("Description").getAsString() + " action performed " + addScreenshot());
	}

	private String getReferenceImageB64() throws URISyntaxException, IOException {
		System.out.println(getClass().getClassLoader());
		URL refImgUrl = getClass().getClassLoader().getResource("QRCode.png");

		System.out.println(refImgUrl);
		File refImgFile = Paths.get(refImgUrl.toURI()).toFile();
		return Base64.getEncoder().encodeToString(Files.readAllBytes(refImgFile.toPath()));
	}

	/**
	 * Method to hide the keyboard
	 */
	public void hideKeyboard() {
		driver.hideKeyboard();
	}

	/**
	 * Method to navigate back
	 */
	public void navigateBack() {
		driver.navigate().back();
	}

	/**
	 * Method to perform click operation using JavaScript code
	 */
	public void clickElementJS() {
		WebElement ele = wait.until(ExpectedConditions
				.presenceOfElementLocated(getByElement(testStepJO.get("element_name").getAsString())));
		JavascriptExecutor executor = (JavascriptExecutor) driver;
		executor.executeScript("arguments[0].click();", ele);
		logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(),
				testStepJO.get("Description").getAsString() + " - action performed" + addScreenshot());

	}

	/**
	 * Verify the Error code details with the error code details provided in test
	 * data json
	 * 
	 * @throws FileNotFoundException
	 */
	public void clickTextMatches() {

		wait.until(elementFound(getByElement(testStepJO.get("element_name").getAsString())));
		List<WebElement> objectList = driver.findElements(getByElement(testStepJO.get("element_name").getAsString()));

		boolean status = false;
		for (WebElement ionItem : objectList) {

			((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", ionItem);

			String actualValue = ionItem.getText();

			if (testStepJO.get("textToVerify").getAsString().trim().equals(actualValue.trim())) {
				ionItem.click();
				status = true;
				break;
			}
		}
		if (status) {
			logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(),
					"Clicked on element which has the linktext : " + testStepJO.get("textToVerify").getAsString()
							+ addScreenshot());
		} else {
			logger.log(LogStatus.FAIL, testStepJO.get("Description").getAsString(),
					"Unable to find the element with the given linktext"
							+ logger.addScreenCapture(CommonUtils.captureOnLoadScreenshot()));
			fail("Unable to find the element with the given linktext");
		}
	}

	/**
	 * Method to enter Text in the text box field
	 */
	public void enterText() {

		wait.until(
				ExpectedConditions.presenceOfElementLocated(getByElement(testStepJO.get("element_name").getAsString())))
				.clear();
		getWebElement(testStepJO.get("element_name").getAsString())
				.sendKeys(testStepJO.get("textToEnter").getAsString());
		logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(),
				"Entered Text " + testStepJO.get("textToEnter") + addScreenshot());

	}

	/**
	 * Method to verify given text
	 * 
	 */
	public void verifyText() {

		String actualtext = wait
				.until(ExpectedConditions
						.visibilityOfElementLocated(getByElement(testStepJO.get("element_name").getAsString())))
				.getText();
		String expected = testStepJO.get("textToVerify").getAsString().replace("\r\n", "\n");

		if (expected.trim().equals(actualtext.trim())) {
			logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(),
					"Text is as expected, Actual Text displayed is '" + actualtext + "'" + addScreenshot());
		} else {
			logger.log(LogStatus.FAIL, testStepJO.get("Description").getAsString(),
					"Text is not as expected, Expected - " + testStepJO.get("textToVerify").getAsString()
							+ ", Actual text displayed is '" + actualtext + "'"
							+ logger.addScreenCapture(CommonUtils.captureOnLoadScreenshot()));
			fail("Text is not as expected, Expected - '" + testStepJO.get("textToVerify").getAsString()
					+ "', Actual text displayed is ' " + actualtext + " '");
		}
	}

	/**
	 * Method to verify given text
	 * 
	 */
	public void verifyContainsText() {

		String actualtext = wait
				.until(ExpectedConditions
						.presenceOfElementLocated(getByElement(testStepJO.get("element_name").getAsString())))
				.getText();
		String expected = testStepJO.get("textToVerify").getAsString().replace("\r\n", "\n");
		if (actualtext.trim().contains(expected.trim())) {
			logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(),
					"Text is as expected, Actual Text displayed is - '" + actualtext + "'" + addScreenshot());
		} else {
			logger.log(LogStatus.FAIL, testStepJO.get("Description").getAsString(),
					"Text is not as expected " + testStepJO.get("textToVerify").getAsString()
							+ ",Actual text displayed is - '" + actualtext + "'"
							+ logger.addScreenCapture(CommonUtils.captureOnLoadScreenshot()));
			fail("Text is not as expected '" + testStepJO.get("textToVerify").getAsString()
					+ "', Actual text displayed is - '" + actualtext + "'");
		}
	}

	/**
	 * Method to verify given text is same as the attribute
	 * 
	 */
	public void verifyAttributeText() {

		String actualtext = wait
				.until(ExpectedConditions
						.presenceOfElementLocated(getByElement(testStepJO.get("element_name").getAsString())))
				.getAttribute(testStepJO.get("attribute").getAsString());

		if (testStepJO.get("textToVerify").getAsString().trim().equals(actualtext.trim())) {
			logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(),
					"Text is as expected, Actual Text displayed is '" + testStepJO.get("attribute").getAsString() + ":"
							+ actualtext + "'" + addScreenshot());
		} else {
			logger.log(LogStatus.FAIL, testStepJO.get("Description").getAsString(),
					"Text is not as expected, Actual text displayed is ' " + testStepJO.get("attribute").getAsString()
							+ ":" + actualtext + " '" + logger.addScreenCapture(CommonUtils.captureOnLoadScreenshot()));
			fail("Text is not as expected '" + testStepJO.get("textToVerify").getAsString()
					+ "', Actual text displayed is ' " + actualtext + " '");
		}
	}

	/**
	 * Method to verify given element is available
	 * 
	 */
	public void verifyElementAvailability() {

		driver.manage().timeouts().implicitlyWait(2, TimeUnit.SECONDS);
		if (!driver.findElements(getByElement(testStepJO.get("element_name").getAsString())).isEmpty()) {
			logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(),
					"Element available in the sreen" + addScreenshot());
		} else {
			logger.log(LogStatus.FAIL, testStepJO.get("Description").getAsString(),
					"Element not available in the screen"
							+ logger.addScreenCapture(CommonUtils.captureOnLoadScreenshot()));
			fail("Element not available in the screen");
		}
		driver.manage().timeouts().implicitlyWait(
				ConfigManager.getInstance().getPropertyAsInt(ConfigParameters.ELEMENT_TIMEOUT), TimeUnit.SECONDS);
	}

	/**
	 * Method to verify given element is not available
	 * 
	 */
	public void verifyElementNotAvailability() {

		driver.manage().timeouts().implicitlyWait(2, TimeUnit.SECONDS);
		if (driver.findElements(getByElement(testStepJO.get("element_name").getAsString())).isEmpty()) {
			logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(),
					"Element not available in the sreen" + addScreenshot());
		} else {
			logger.log(LogStatus.FAIL, testStepJO.get("Description").getAsString(),
					"Element available in the screen" + logger.addScreenCapture(CommonUtils.captureOnLoadScreenshot()));
			fail("Element available in the screen");
		}
		driver.manage().timeouts().implicitlyWait(
				ConfigManager.getInstance().getPropertyAsInt(ConfigParameters.ELEMENT_TIMEOUT), TimeUnit.SECONDS);
	}

	/**
	 * Method to Scroll vertically
	 * 
	 * @throws BaseException
	 * @throws InterruptedException
	 */
	public void pullToRefresh() throws BaseException, InterruptedException {

		Thread.sleep(1000);
		Dimension size = driver.manage().window().getSize();
		int startX = 0;
		int startY = 0;
		int endX = 0;
		int endY = 0;

		startX = (int) (size.getWidth() * 0.50);
		endX = (int) (size.getWidth() * 0.50);
		startY = (int) (size.getHeight() * 0.50);
		endY = (int) (size.getHeight() * 0.90);

		TouchAction<?> action = new TouchAction<>((PerformsTouchActions) driver);
		action.longPress(point(startX, startY)).moveTo(point(endX, endY)).release().perform();

		logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(),
				"Pull to Referesh performed" + addScreenshot());

	}

	/**
	 * Swipe left on a perticular location
	 */
	public void swipeLeft() {

		int screenWidth = (int) driver.manage().window().getSize().getWidth();
		int screenWidth90 = (int) (.9 * screenWidth);
		// int screenWidth65 = (int) (.65 * screenWidth);
		int screenWidth20 = (int) (.2 * screenWidth);
		// List header height calculation
		/*
		 * WebElement element =
		 * wait.until(elementFound(getByElement(testStepJO.get("element_name1").
		 * getAsString()))); int anchor = element.getSize().getHeight(); //Page header +
		 * Tab + Search bar List<WebElement> elementName =
		 * driver.findElements(getByElement(testStepJO.get("element_name").getAsString()
		 * )); for(WebElement ele : elementName) { anchor =
		 * anchor+ele.getSize().getHeight(); }
		 */

		int anchor = (int) (.5 * driver.manage().window().getSize().getHeight());

		TouchAction<?> touchAction = new TouchAction<>((PerformsTouchActions) driver);

		touchAction.press(PointOption.point(screenWidth90, anchor))
				/*
				 * .waitAction(WaitOptions.waitOptions(Duration.ofMillis(250)))
				 * .moveTo(PointOption.point(screenWidth65, anchor))
				 */ .waitAction(WaitOptions.waitOptions(Duration.ofMillis(250)))
				.moveTo(PointOption.point(screenWidth20, anchor)).release().perform();

		logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(),
				"Swipe left perfromed on " + addScreenshot());

	}

	/**
	 * Method to wait for the given time
	 * 
	 */
	public void waitForGivenTime() {

		try {
			Thread.sleep(Integer.parseInt(testStepJO.get("WaitTIme").getAsString()));
			logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(),
					"Waited for the " + testStepJO.get("WaitTIme").getAsString() + " Milli seconds" + addScreenshot());

		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	public void waitUtilElementiIsVisible() {
		wait = new WebDriverWait(driver, 90);
		wait.until(ExpectedConditions
				.invisibilityOf(wait.until(elementFound(getByElement(testStepJO.get("element_name").getAsString())))));
		logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(),
				"Waited till the element is visible" + addScreenshot());
	}

	public void waitForTextToVisible() {
		wait = new WebDriverWait(driver, 90);
		if (wait.until(ExpectedConditions.textToBePresentInElementLocated(
				getByElement(testStepJO.get("element_name").getAsString()),
				testStepJO.get("textToWait").getAsString()))) {
			logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(),
					"Waited till the text is visible" + addScreenshot());
		}
	}

	/**
	 * Check for COnnect button status in Connect to Device screen
	 */
	public void checkConnectbuttonStatus() {

		WebElement ele = getWebElement(testStepJO.get("element_name").getAsString());
		if (ele.getAttribute("ng-reflect-disabled").contains("true")
				&& testStepJO.get("ConnectButtonStatus").getAsString().equals("disabled")) {
			logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(),
					"Connect button in ''Connect to Device is in Disbaled status" + addScreenshot());
		} else if (ele.getAttribute("ng-reflect-disabled").contains("false")
				&& testStepJO.get("ConnectButtonStatus").getAsString().equals("enabled")) {
			logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(),
					"Connect button is in enabled status" + addScreenshot());
		} else {
			logger.log(LogStatus.FAIL, testStepJO.get("Description").getAsString(),
					"Connect button is not in required status" + addScreenshot());
			fail("Connect button is not in required status");
		}
	}

	/**
	 * Check for Toggle button status
	 */
	public void togglebuttonStatus() {

		WebElement ele = getWebElement(testStepJO.get("element_name").getAsString());
		if (!ele.getAttribute("aria-checked").equalsIgnoreCase(testStepJO.get("ToggleButtonStatus").getAsString())) {
			ele.click();
			logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(),
					"Clicked on Toggle button, Current status of the toggle button is 'aria-checked : '"
							+ ele.getAttribute("aria-checked") + addScreenshot());
		} else {
			logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(),
					"Toggle button is already in expected condition, Current status of the toggle button is 'aria-checked : '"
							+ ele.getAttribute("aria-checked") + addScreenshot());
		}
	}

	/**
	 * Method to scroll to given Element using Java Script code
	 */
	public void scrollToGivenElementJS() {
		WebElement element = wait.until(elementFound(getByElement(testStepJO.get("element_name").getAsString())));
		((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", element);
		logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(),
				"Scrolled to the given element" + addScreenshot());

	}

	/**
	 * Method to shift the context to Webview or NativeApp view as given in step
	 */
	public void shiftContext() {
		Set<String> contextNames = driver.getContextHandles();
		boolean status = false;
		for (String contextName : contextNames) {
			// prints out something like NATIVE_APP \n WEBVIEW_1
			if (contextName.contains(testStepJO.get("contextName").getAsString())) {
				driver.context(contextName); // set context to WEBVIEW_1
				logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(),
						testStepJO.get("Description").getAsString() + " - Shifted to " + contextName
								+ " action performed" + addScreenshot());
				status = true;
				break;
			}
		}
		if (!status) {
			logger.log(LogStatus.FAIL, testStepJO.get("Description").getAsString(),
					"Failed to shift to given context, Please provide valid context name"
							+ logger.addScreenCapture(CommonUtils.captureOnLoadScreenshot()));
			fail("Failed to shift to given context, Please provide valid context name");
		}
	}

	/**
	 * Function to get webElement from UI Map
	 * 
	 * @param elementName
	 * @return
	 */
	WebElement getWebElement(String elementName) {

		String obj[] = objectRepository.getProperty(elementName).split(";");
		switch (obj[1].toLowerCase()) {
		case "xpath":
			return driver.findElement(MobileBy.xpath(obj[0]));
		case "css":
			return driver.findElement(MobileBy.cssSelector(obj[0]));
		case "id":
			return driver.findElement(MobileBy.id(obj[0]));
		case "linktext":
			return driver.findElement(MobileBy.linkText(obj[0]));
		case "tagname":
			return driver.findElement(MobileBy.tagName(obj[0]));
		case "class":
			return driver.findElement(MobileBy.className(obj[0]));
		default:
			return null;
		}
	}

	/**
	 * Function to get webElement from UI Map
	 * 
	 * @param elementName
	 * @return By
	 */
	By getByElement(String elementName) {

		String obj[] = objectRepository.getProperty(elementName).split(";");
		switch (obj[1].toLowerCase()) {
		case "xpath":
			return MobileBy.xpath(obj[0]);
		case "css":
			return MobileBy.cssSelector(obj[0]);
		case "id":
			return MobileBy.id(obj[0]);
		case "linktext":
			return MobileBy.linkText(obj[0]);
		case "tagname":
			return MobileBy.tagName(obj[0]);
		case "class":
			return MobileBy.className(obj[0]);
		default:
			return null;
		}
	}

	/**
	 * Function to get webElements from UI Map
	 * 
	 * @param elementName
	 * @return
	 */
	List<WebElement> getWebElements(String elementName) {

		String obj[] = objectRepository.getProperty(elementName).split(";");
		switch (obj[1].toLowerCase()) {
		case "xpath":
			return driver.findElements(MobileBy.xpath(obj[0]));
		case "css":
			return driver.findElements(MobileBy.cssSelector(obj[0]));
		case "id":
			return driver.findElements(MobileBy.id(obj[0]));
		case "linktext":
			return driver.findElements(MobileBy.linkText(obj[0]));
		case "tagname":
			return driver.findElements(MobileBy.tagName(obj[0]));
		case "class":
			return driver.findElements(MobileBy.className(obj[0]));
		case "iosclasschain":
			return driver.findElements(MobileBy.iOSClassChain(obj[0]));
		case "iosnspredicatestring":
			return driver.findElements(MobileBy.iOSNsPredicateString(obj[0]));
		default:
			return null;
		}
	}

	/**
	 * Custom Explicit Waits
	 * 
	 * @param locator
	 * @return
	 */
	protected ExpectedCondition<WebElement> elementFound(By locator) {
		return new ExpectedCondition<WebElement>() {
			@Override
			public WebElement apply(WebDriver driver) {
				WebElement el = driver.findElement(locator);
				return el;
			}
		};
	}

	/**
	 * Method to Click on Element
	 * 
	 * @throws InterruptedException
	 * 
	 */
	public void clickElementIfExists() {

		if (driver.findElements(getByElement(testStepJO.get("element_name").getAsString())).size() != 0) {
			getWebElement(testStepJO.get("element_name").getAsString()).click();
			logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(),
					" Element was available and Clicked on it " + addScreenshot());
		} else {
			logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(),
					testStepJO.get("Description").getAsString() + " Element is not available " + addScreenshot());
		}

	}

	/**
	 * Method to Scroll vertically
	 * 
	 * @param direction
	 * @throws BaseException
	 * @throws InterruptedException
	 */
	public void scrollUp() throws BaseException, InterruptedException {

		Thread.sleep(1000);
		Dimension size = driver.manage().window().getSize();
		int startX = 0;
		int startY = 0;
		int endX = 0;
		int endY = 0;
		startX = (int) (size.getWidth() * 0.50);
		endX = (int) (size.getWidth() * 0.50);
		startY = (int) (size.getHeight() * 0.90);
		endY = (int) (size.getHeight() * 0.30);

		TouchAction<?> action = new TouchAction<>((PerformsTouchActions) driver);
		action.longPress(point(startX, startY)).moveTo(point(endX, endY)).release().perform();
		logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(), "performed" + addScreenshot());
	}

	/**
	 * Verify the Error code details with the error code details provided in test
	 * data json
	 * 
	 * @throws FileNotFoundException
	 */
	public void clickAttributeMatches() {

		wait.until(elementFound(getByElement(testStepJO.get("element_name").getAsString())));
		List<WebElement> objectList = driver.findElements(getByElement(testStepJO.get("element_name").getAsString()));
		System.out.println(objectList.size() + "---" + testStepJO.get("textToVerify").getAsString().trim());
		boolean status = false;
		for (WebElement ionItem : objectList) {

			// ((JavascriptExecutor)
			// driver).executeScript("arguments[0].scrollIntoView(true);", ionItem);

			String actualValue = ionItem.getAttribute(testStepJO.get("attribute").getAsString());

			if (testStepJO.get("textToVerify").getAsString().trim().equals(actualValue.trim())) {
				ionItem.click();
				status = true;
				break;
			}
		}
		if (status) {
			logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(),
					"Clicked on element which has the linktext : " + testStepJO.get("textToVerify").getAsString()
							+ addScreenshot());
		} else {
			logger.log(LogStatus.FAIL, testStepJO.get("Description").getAsString(),
					"Unable to find the element with the given linktext"
							+ logger.addScreenCapture(CommonUtils.captureOnLoadScreenshot()));
			fail("Unable to find the element with the given linktext");
		}

	}

	/**
	 * Method to Scroll to the element, Not working
	 * 
	 * @throws BaseException
	 * @throws InterruptedException
	 */
	public void scrollToElement() throws BaseException, InterruptedException {

		WebElement element = getWebElement(testStepJO.get("element_name").getAsString());
		TouchActions action = new TouchActions(driver);
		action.scroll(element, 10, 100);
		action.perform();

		logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(), "performed" + addScreenshot());

	}

	/**
	 * Method to Check element is available
	 * 
	 * @throws InterruptedException
	 * 
	 */
	public void checkElementAvailable() {

		if (driver.findElements(getByElement(testStepJO.get("element_name").getAsString())).size() != 0) {
			logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(),
					" Element is available " + addScreenshot());
		} else {
			logger.log(LogStatus.FAIL, testStepJO.get("Description").getAsString(),
					testStepJO.get("Description").getAsString() + " Element is not available " + addScreenshot());
			fail(" Element is not available ");
		}

	}

	/**
	 * Method to check wether element is not avialable
	 * 
	 * @throws InterruptedException
	 * 
	 */
	public void checkElementNotAvailable() {

		if (driver.findElements(getByElement(testStepJO.get("element_name").getAsString())).size() != 0) {
			logger.log(LogStatus.FAIL, testStepJO.get("Description").getAsString(),
					" Element is available " + addScreenshot());
			fail(" Element is available ");
		} else {
			logger.log(LogStatus.PASS, testStepJO.get("Description").getAsString(),
					testStepJO.get("Description").getAsString() + " Element is not available " + addScreenshot());

		}

	}
}
