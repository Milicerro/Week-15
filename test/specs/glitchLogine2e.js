import HomePage from "../pageobjects/homePage.js";
import LogIn from "../pageobjects/logIn.js";
import ProductsPage from "../pageobjects/productsPage.js";
import CheckoutPage from "../pageobjects/checkoutPage.js";
import MenuPage from "../pageobjects/menuPage.js";

describe ("Login with the performance glitch user.", () => {
    beforeAll("Open browser", () =>{
        browser.setWindowSize (1920, 1080);
        browser.url("https://www.saucedemo.com");
    });

    it ("Verify login process slow login process.", async () => {
        await expect(LogIn.userNameInput).toBeDisplayed();
        await expect(LogIn.passwordInput).toBeDisplayed();
        await expect(LogIn.loginLogo).toBeDisplayed()
        const startTime = Date.now();

        await LogIn.login("performance_glitch_user", "secret_sauce");
        await LogIn.btnLoginClick();

        const endTime = Date.now();
        const executionTime = endTime - startTime;
        console.log(`Login execution time: ${executionTime} ms`);

        await expect(HomePage.wrongImage).toBeDisplayed();
        await expect(executionTime).toBeLessThan(3000);
    });

    it ("testing adding/removing products to cart from Inventory page.", async ()=> {
        await ProductsPage.addBackpack.click();
        await browser.pause(1000);
        await ProductsPage.addBikelight.click();
        await browser.pause(1000);

        await ProductsPage.removeBackpack.click();
        await browser.pause(1000);
        await ProductsPage.removeBikelight.click();
        await browser.pause(1000);

        await ProductsPage.addBoltTshirt.click();
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

    it("Cancel Button works correctly, redirecting back to inventory page.", async () => {
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