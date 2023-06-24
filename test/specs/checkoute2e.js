import logIn from "../pageobjects/logIn.js";
import productsPage from "../pageobjects/productsPage.js";
import checkoutPage from "../pageobjects/checkoutPage.js";

describe("Accessing the web page correct user.", () => {
    beforeAll(async () => {
        await browser.setWindowSize(1920, 1080);
        await browser.url("https://www.saucedemo.com");
    });

    it("Successfully login process.", async () => {
        await expect(logIn.userNameInput).toBeDisplayed();
        await logIn.login("standard_user", "secret_sauce");
        await logIn.btnLoginClick();
    });

    it("Adding products to cart", async () => {
        await productsPage.addBackpack.click();
        await browser.pause(1000);
        await productsPage.addBikelight.click();
        await browser.pause(1000);

        await productsPage.cartBtn.click();
        await browser.pause(2000);

        await checkoutPage.checkBtn.click();
        await browser.pause(1000);
    });

    it("Verify Checkout page is correctly displayed.", async () => {
        await checkoutPage.checkBtn.click();
        await browser.pause(1000);
        await expect(browser).toHaveUrl("https://www.saucedemo.com/checkout-step-one.html");
        await expect(checkoutPage.title).toHaveText("Checkout: Your Information");
    });

    it("Filling blanks correctly.", async () => {
        await checkoutPage.cancelBtn.click();
        await checkoutPage.checkBtn.click();
        await checkoutPage.firstNameInput.setValue("Mili");
        await checkoutPage.lastNameInput.setValue("Cerro");
        await checkoutPage.zipCodeInput.setValue("2000");
        await checkoutPage.continueBtn.click();

        await expect(checkoutPage.errorMsg).not.toExist();
        await browser.pause(1000);
    });

    it("Cancel Button works correctly, redirecting back to inventory page", async () => {
        await checkoutPage.cancelBtn.click();
        await browser.pause(2000);

        await expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");
    });

    it("Adding products and proceed to cart - checkout.", async () => {
        await productsPage.cartBtn.click();
        await browser.pause(1000);

        await checkoutPage.checkBtn.click();
        await browser.pause(1000);
        await checkoutPage.firstNameInput.setValue("Mili");
        await checkoutPage.lastNameInput.setValue("Cerro");
        await checkoutPage.zipCodeInput.setValue("2000");
        await checkoutPage.continueBtn.click();
    });

    it("The information related to the complete purchase process should be displayed correctly.", async () => {
        await browser.pause(1000);
        await expect(checkoutPage.title).toHaveTextContaining("Checkout: Overview");
        await expect(checkoutPage.paymentInfo).toBeDisplayed();
        await expect(checkoutPage.elementDescr).toBeDisplayed();
        await expect(checkoutPage.total).toBeDisplayed();
    });

    it("Finish button works correctly, leading to a complete-checkout page.", async () => {
        await checkoutPage.finishBtn.click();
        await browser.pause(1000);
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html');
    });

    it("Verify Checkout page is displayed and has this title.", async () => {
        await expect(browser).toHaveUrl("https://www.saucedemo.com/checkout-complete.html");
        await expect(checkoutPage.title).toHaveText("Checkout: Complete!");
        await checkoutPage.goBackBtn.click();
        await browser.pause(1000);
        await expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");
        await browser.pause(1000);
        await browser.reloadSession();
    });
});