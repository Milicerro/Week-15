import logIn from "../pageobjects/logIn.js";
import menuPage from "../pageobjects/menuPage.js";

describe("Accessing the webpage.", () => {
    beforeAll("Open browser", () =>{
        browser.setWindowSize (1920, 1080);
        browser.url("https://www.saucedemo.com");
    });

    it("Successfully login process.", async () => {
        await logIn.login("standard_user", "secret_sauce");
        await logIn.btnLoginClick();
    });

    it("Checking Sidebar page and the log-out.", async () => {
        await browser.pause(3000);
        await menuPage.menuBtn.click();
        await browser.pause(2000);
        await expect(menuPage.sideBar).toBeDisplayed();
        await expect(menuPage.menuCrossBtn).toBeDisplayed();
        await expect(menuPage.allItemsBtn).toBeDisplayed();
        await expect(menuPage.aboutBtn).toBeDisplayed();
        await expect(menuPage.resetBtn).toBeDisplayed();
        await menuPage.logOutBtn.click();
    });
});