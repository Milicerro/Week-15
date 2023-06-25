import HomePage from "../pageobjects/homePage.js";
import LogIn from "../pageobjects/logIn.js";
import MenuPage from "../pageobjects/menuPage.js";

describe ("Login with the locked out users", () => {
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

    it("Checking Sidebar log-out.", async () => {
        await MenuPage.menuBtn.click();
        await browser.pause(2000);
        await MenuPage.logOutBtn.click();
        await browser.pause(2000);
        await browser.refresh();
    });

});