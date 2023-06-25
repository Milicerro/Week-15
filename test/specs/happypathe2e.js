import HomePage from "../pageobjects/homePage.js";
import LogIn from "../pageobjects/logIn.js";
import ProductsPage from "../pageobjects/productsPage.js";
import CheckoutPage from "../pageobjects/checkoutPage.js";
import FooterPage from "../pageobjects/footerPage.js";
import MenuPage from "../pageobjects/menuPage.js";

describe("Products interaction correct user.", () => {
  beforeAll("Open browser", () => {
    browser.setWindowSize(1920, 1080);
    browser.url("https://www.saucedemo.com");
  });

  it ("Successfuly login process.", async () => {
    await expect(LogIn.loginLogo).toBeDisplayed();
    await expect(LogIn.userNameInput).toBeDisplayed();
    await expect(LogIn.passwordInput).toBeDisplayed();
    await LogIn.login("standard_user", "secret_sauce");
    await LogIn.btnLoginClick();
  });

  it ("Verify user welcome page.", async () => {
    await expect(HomePage.welcomePage).toBeDisplayed();
    await expect(HomePage.welcomePage).toHaveTextContaining("Products");
    await expect(HomePage.correctImage).toBeDisplayed();
  });

  it("Test Filters - A to Z.", async () => {
    await ProductsPage.sortMenu.click();
    await ProductsPage.sortByNameAZ.click();
    await browser.pause(1000);
  });

  it("Test Filters - Z to A.", async () => {
    await ProductsPage.sortMenu.click();
    await ProductsPage.sortByNameZA.click();
    await browser.pause(1000);
  });

  it("Test Filters - Low to High.", async () => {
    await ProductsPage.sortMenu.click();
    await ProductsPage.sortByLowToHigh.click();
    await browser.pause(1000);
  });

  it("Test Filters - High to Low.", async () => {
    await ProductsPage.sortMenu.click();
    await ProductsPage.sortByHighToLow.click();
    await browser.pause(1000);
  });

  it("Testing access to shopping cart.", async () => {
    await ProductsPage.cartBtn.click();
    await browser.pause(1000);
    await ProductsPage.contShoppBtn.click();
    await browser.pause(1000);
  });

  it("testing adding/removing products to cart from item's description page", async () => {
    await ProductsPage.addBackpack.click();
    await browser.pause(1000);
    await ProductsPage.addBikelight.click();
    await browser.pause(1000);

    await ProductsPage.cartBtn.click();
    await browser.pause(2000);

    expect(await ProductsPage.bpackDescrBtn.isExisting()).toBe(true);
    expect(await ProductsPage.backlightDescrBtn.isExisting()).toBe(true);

    await ProductsPage.removeBackpack.click();
    await browser.pause(1000);
    await ProductsPage.removeBikelight.click();
    await browser.pause(1000);

    expect(await ProductsPage.bpackDescrBtn.isExisting()).toBe(false);
    expect(await ProductsPage.backlightDescrBtn.isExisting()).toBe(false);
    await browser.pause(1000);

    await ProductsPage.contShoppBtn.click();
    await browser.pause(1000);
  });

  it("Testing adding products to cart from Inventory page", async () => {
    await ProductsPage.addBackpack.click();
    await browser.pause(1000);
    await ProductsPage.addBikelight.click();
    await browser.pause(1000);
    await ProductsPage.cartBtn.click();
    await browser.pause(2000);

    await CheckoutPage.checkBtn.click();
    await browser.pause(1000);
  });

  it("Verify Checkout page is correctly displayed.", async () => {
    await browser.pause(1000);
    await expect(browser).toHaveUrl("https://www.saucedemo.com/checkout-step-one.html");
    await expect(CheckoutPage.title).toHaveText("Checkout: Your Information");
  });

  it("Filling blanks correctly.", async () => {
    await CheckoutPage.cancelBtn.click();
    await CheckoutPage.checkBtn.click();
    await CheckoutPage.firstNameInput.setValue("Mili");
    await CheckoutPage.lastNameInput.setValue("Cerro");
    await CheckoutPage.zipCodeInput.setValue("2000");
    await CheckoutPage.continueBtn.click();

    await expect(CheckoutPage.errorMsg).not.toExist();
    await browser.pause(1000);
  });

  it("Cancel Button works correctly, redirecting back to inventory page", async () => {
    await CheckoutPage.cancelBtn.click();
    await browser.pause(2000);

    await expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");
  });

  it("Adding products and proceed to cart - checkout.", async () => {
    await ProductsPage.cartBtn.click();
    await browser.pause(1000);

    await CheckoutPage.checkBtn.click();
    await browser.pause(1000);
    await CheckoutPage.firstNameInput.setValue("Mili");
    await CheckoutPage.lastNameInput.setValue("Cerro");
    await CheckoutPage.zipCodeInput.setValue("2000");
    await CheckoutPage.continueBtn.click();
  });

  it("The information related to the complete purchase process should be displayed correctly.", async () => {
    await browser.pause(1000);
    await expect(CheckoutPage.title).toHaveTextContaining("Checkout: Overview");
    await expect(CheckoutPage.paymentInfo).toBeDisplayed();
    await expect(CheckoutPage.elementDescr).toBeDisplayed();
    await expect(CheckoutPage.total).toBeDisplayed();
  });

  it("Finish button works correctly, leading to a complete-checkout page.", async () => {
    await CheckoutPage.finishBtn.click();
    await browser.pause(1000);
    await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html');
  });

  it("Verify Checkout page is displayed and has this title.", async () => {
    await expect(browser).toHaveUrl("https://www.saucedemo.com/checkout-complete.html");
    await expect(CheckoutPage.title).toHaveText("Checkout: Complete!");
    await CheckoutPage.goBackBtn.click();
    await browser.pause(1000);
    await expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");
    await browser.pause(1000);
  });

  it("Test redirection to social network pages work correctly.", async () => {
    await FooterPage.twitter.click();
    await browser.switchWindow("https://twitter.com/saucelabs");
    await expect(browser).toHaveUrl("https://twitter.com/saucelabs");
    await browser.closeWindow();
    await browser.switchWindow("https://www.saucedemo.com/inventory.html");

    await FooterPage.facebook.click();
    await browser.pause(2000);
    await browser.switchWindow("https://www.facebook.com/saucelabs");
    await expect(browser).toHaveUrl("https://www.facebook.com/saucelabs");
    await browser.closeWindow();
    await browser.switchWindow("https://www.saucedemo.com/inventory.html");

    await FooterPage.linkedin.click();
    await browser.pause(2000);
    await browser.switchWindow("https://www.linkedin.com/company/sauce-labs/");
    await browser.closeWindow();
    await browser.switchWindow("https://www.saucedemo.com/inventory.html");
  });

  it("Checking Sidebar page and the log-out.", async () => {
    await browser.pause(3000);
    await MenuPage.menuBtn.click();
    await browser.pause(2000);
    await expect(MenuPage.sideBar).toBeDisplayed();
    await expect(MenuPage.menuCrossBtn).toBeDisplayed();
    await expect(MenuPage.allItemsBtn).toBeDisplayed();
    await expect(MenuPage.aboutBtn).toBeDisplayed();
    await expect(MenuPage.resetBtn).toBeDisplayed();
    await MenuPage.logOutBtn.click();
  });
});