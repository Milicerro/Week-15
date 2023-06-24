import logIn from "../pageobjects/logIn.js";
import homePage from "../pageobjects/homePage.js";
import menuPage from "../pageobjects/menuPage.js";

describe ("Login with the wrong and not spected users", () => {
    beforeAll("Open browser", () =>{
        browser.setWindowSize (1920, 1080);
        browser.url("https://www.saucedemo.com");
    });

    it ("Verify login process of locked out user login process.", async () => {
        await expect(logIn.loginLogo).toBeDisplayed()
        await expect(logIn.userNameInput).toBeDisplayed();
        await expect(logIn.passwordInput).toBeDisplayed();
        await logIn.login("locked_out_user", "secret_sauce");
        await logIn.btnLoginClick();
    });

    it ("Verify error message.", async () => {
        await expect(logIn.errorMessage).toBeDisplayed();
        await expect(logIn.errorMessage).toHaveTextContaining("Epic sadface: Sorry, this user has been locked out.");
        await browser.pause(2000);
        await browser.refresh();
    });

    it ("Verify login process of problem user.", async () => {
        await expect(logIn.loginLogo).toBeDisplayed()
        await expect(logIn.userNameInput).toBeDisplayed();
        await expect(logIn.passwordInput).toBeDisplayed();
        await logIn.login("problem_user", "secret_sauce");
        await logIn.btnLoginClick();
    });

    it ("Verify if this user can enter to the home page.", async () => {
        await expect(homePage.wrongImage).toBeDisplayed();
        expect(await homePage.correctImage.isExisting()).toBe(true);
    });

    it("Checking Sidebar log-out.", async () => {
        await menuPage.menuBtn.click();
        await browser.pause(2000);
        await menuPage.logOutBtn.click();
        await browser.pause(2000);
        await browser.refresh();
    });

    it ("Verify login process slow login process.", async () => {
        await expect(logIn.userNameInput).toBeDisplayed();
        await expect(logIn.passwordInput).toBeDisplayed();
        await expect(logIn.loginLogo).toBeDisplayed()
        const startTime = Date.now();
    });

    it ("Verify login process slow login process.", async () => {
        await expect(logIn.userNameInput).toBeDisplayed();
        await expect(logIn.passwordInput).toBeDisplayed();
        await expect(logIn.loginLogo).toBeDisplayed()
        const startTime = Date.now();

        await logIn.login("performance_glitch_user", "secret_sauce");
        await logIn.btnLoginClick();

        const endTime = Date.now();
        const executionTime = endTime - startTime;
        console.log(`Login execution time: ${executionTime} ms`);

        await expect(homePage.wrongImage).toBeDisplayed();
        await expect(executionTime).toBeLessThan(3000);
    });
});