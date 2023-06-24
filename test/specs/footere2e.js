import logIn from "../pageobjects/logIn.js";
import footerPage from "../pageobjects/footerPage.js";

describe("Footer, social network.", () => {
    beforeAll("Open browser", () =>{
        browser.setWindowSize (1920, 1080);
        browser.url("https://www.saucedemo.com");
    });

    it("Access SwagLabs website.", async () => {
        await logIn.login("standard_user", "secret_sauce");
        await logIn.btnLoginClick();
        await browser.pause(1000);
        await expect(footerPage.copyRight).toBeDisplayed();
    });

    it("Test redirection to social network pages work correctly.", async () => {
        await browser.pause(2000);
        await footerPage.twitter.click();
        await browser.switchWindow("https://twitter.com/saucelabs");
        await expect(browser).toHaveUrl("https://twitter.com/saucelabs");
        await browser.closeWindow();
        await browser.switchWindow("https://www.saucedemo.com/inventory.html");

        await footerPage.facebook.click();
        await browser.pause(2000);
        await browser.switchWindow("https://www.facebook.com/saucelabs");
        await expect(browser).toHaveUrl("https://www.facebook.com/saucelabs");
        await browser.closeWindow();
        await browser.switchWindow("https://www.saucedemo.com");

        await footerPage.linkedin.click();
        await browser.pause(2000);
        await browser.switchWindow("https://www.linkedin.com/company/sauce-labs/");
        await browser.pause(2000);
        await expect(browser).toHaveUrlContaining("https://www.linkedin.com/company/sauce-labs/");
        await browser.switchWindow("https://www.saucedemo.com");
    });
});