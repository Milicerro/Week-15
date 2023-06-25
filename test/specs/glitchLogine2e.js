import HomePage from "../pageobjects/homePage.js";
import LogIn from "../pageobjects/logIn.js";
import ProductsPage from "../pageobjects/productsPage.js";
import CheckoutPage from "../pageobjects/checkoutPage.js";
import FooterPage from "../pageobjects/footerPage.js";
import MenuPage from "../pageobjects/menuPage.js";

describe ("Login with the locked out users", () => {
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

    it ("test access to item by clicking title", async ()=> {
        await ProductsPage.addBackpack.click();
        expect (browser).toHaveUrl("https://www.saucedemo.com/inventory-item.html?id=4");
        await ProductsPage.backToProductsBtn.click();

        await ProductsPage.addBikelight.click();
        expect (browser).toHaveUrl("https://www.saucedemo.com/inventory-item.html?id=0");
        await ProductsPage.backToProductsBtn.click();

        await ProductsPage.addBoltTshirt.click();
        expect (browser).toHaveUrl("https://www.saucedemo.com/inventory-item.html?id=1");
        await ProductsPage.backToProductsBtn.click();
    });
});