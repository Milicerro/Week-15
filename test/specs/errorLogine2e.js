import LogIn from "../pageobjects/logIn.js";

describe ("Login with the locked out user", () => {
    beforeAll("Open browser", () =>{
        browser.setWindowSize (1920, 1080);
        browser.url("https://www.saucedemo.com");
    });

    it ("Verify login process of locked out user login process.", async () => {
        await expect(LogIn.loginLogo).toBeDisplayed()
        await expect(LogIn.userNameInput).toBeDisplayed();
        await expect(LogIn.passwordInput).toBeDisplayed();
        await LogIn.login("locked_out_user", "secret_sauce");
        await LogIn.btnLoginClick();
    });

    it ("Verify error message.", async () => {
        await expect(LogIn.errorMessage).toBeDisplayed();
        await expect(LogIn.errorMessage).toHaveTextContaining("Epic sadface: Sorry, this user has been locked out.");
        await browser.pause(2000);
        await browser.refresh();
    });
});