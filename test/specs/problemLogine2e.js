import HomePage from "../pageobjects/homePage.js";
import LogIn from "../pageobjects/logIn.js";
import ProductsPage from "../pageobjects/productsPage.js";
import CheckoutPage from "../pageobjects/checkoutPage.js";
import MenuPage from "../pageobjects/menuPage.js";

describe ("Login with the problem user.", () => {
    beforeAll("Open browser", () =>{
        browser.setWindowSize (1920, 1080);
        browser.url("https://www.saucedemo.com");
    });
    it ("Verify login process of problem user.", async () => {
        await expect(LogIn.loginLogo).toBeDisplayed()
        await expect(LogIn.userNameInput).toBeDisplayed();
        await expect(LogIn.passwordInput).toBeDisplayed();
        await LogIn.login("problem_user", "secret_sauce");
        await LogIn.btnLoginClick();
    });

    it ("Verify if this user can enter to the home page.", async () => {
        await expect(HomePage.wrongImage).toBeDisplayed();
        expect(await HomePage.correctImage.isExisting()).toBe(true);
    });

    it ("testing adding/removing products to cart from Inventory page.", async ()=> {
        await ProductsPage.addBackpack.click();
        await ProductsPage.addBikelight.click();
        await ProductsPage.addBoltTshirt.click();
        await ProductsPage.addFlecJacket.click();
        await ProductsPage.addOneesie.click();
        await browser.pause(2000);

        //I want to check that the items cannot be removed, but the whole test crashes

        // await ProductsPage.removeBackpack.click();
        // await ProductsPage.removeBikelight.click();
        // await ProductsPage.removeBoltTshirt.click();
        // await ProductsPage.removeFlecJacket.click();
        // await ProductsPage.removeOneesie.click();

        await ProductsPage.cartBtn.click();
        await browser.pause(2000);
        await CheckoutPage.checkBtn.click();
        await browser.pause(1000);
    });

    it("Verify Checkout page is correctly displayed.", async () => {
        await expect(browser).toHaveUrl("https://www.saucedemo.com/checkout-step-one.html");
        await expect(CheckoutPage.title).toHaveText("Checkout: Your Information");
    });

    it("Filling blanks correctly.", async () => {
        await CheckoutPage.firstNameInput.setValue("Mili");
        await CheckoutPage.lastNameInput.setValue("Cerro");
        await CheckoutPage.zipCodeInput.setValue("2000");
        await CheckoutPage.continueBtn.click();

        await expect(CheckoutPage.errorMsg).toExist();
        await browser.pause(1000);
    });

    it("Cancel Button works correctly, redirecting back to inventory page.", async () => {
        await CheckoutPage.cancelBtn.click();
        await browser.pause(2000);
        await ProductsPage.contShoppBtn.click();

        await expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");
    });

    it("Checking Sidebar log-out.", async () => {
        await MenuPage.menuBtn.click();
        await browser.pause(2000);
        await MenuPage.logOutBtn.click();
        await browser.pause(2000);
    });

});