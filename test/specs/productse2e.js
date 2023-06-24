import homePage from "../pageobjects/homePage.js";
import logIn from "../pageobjects/logIn.js";
import productsPage from "../pageobjects/productsPage.js";

describe("Products interaction correct user.", () => {
  beforeAll("Open browser", () => {
    browser.setWindowSize(1920, 1080);
    browser.url("https://www.saucedemo.com");
  });

  it ("Successfuly login process.", async () => {
    await expect(logIn.loginLogo).toBeDisplayed();
    await expect(logIn.userNameInput).toBeDisplayed();
    await expect(logIn.passwordInput).toBeDisplayed();
    await logIn.login("standard_user", "secret_sauce");
    await logIn.btnLoginClick();
  });

  it ("Verify user welcome page.", async () => {
    await expect(homePage.welcomePage).toBeDisplayed();
    await expect(homePage.welcomePage).toHaveTextContaining("Products");
    await expect(homePage.correctImage).toBeDisplayed();
  });

  it("Test Filters - A to Z.", async () => {
    await productsPage.sortMenu.click();
    await productsPage.sortByNameAZ.click();
    await browser.pause(1000);
  });

  it("Test Filters - Z to A.", async () => {
    await productsPage.sortMenu.click();
    await productsPage.sortByNameZA.click();
    await browser.pause(1000);
  });

  it("Test Filters - Low to High.", async () => {
    await productsPage.sortMenu.click();
    await productsPage.sortByLowToHigh.click();
    await browser.pause(1000);
  });

  it("Test Filters - High to Low.", async () => {
    await productsPage.sortMenu.click();
    await productsPage.sortByHighToLow.click();
    await browser.pause(1000);
  });

  it("Testing access to shopping cart.", async () => {
    await productsPage.cartBtn.click();
    await browser.pause(1000);
    await productsPage.contShoppBtn.click();
    await browser.pause(1000);
  });

  it("testing adding/removing products to cart from item's description page", async () => {
    await productsPage.addBackpack.click();
    await browser.pause(1000);
    await productsPage.addBikelight.click();
    await browser.pause(1000);

    await productsPage.cartBtn.click();
    await browser.pause(2000);

    expect(await productsPage.bpackDescrBtn.isExisting()).toBe(true);
    expect(await productsPage.backlightDescrBtn.isExisting()).toBe(true);

    await productsPage.removeBackpack.click();
    await browser.pause(1000);
    await productsPage.removeBikelight.click();
    await browser.pause(1000);

    expect(await productsPage.bpackDescrBtn.isExisting()).toBe(false);
    expect(await productsPage.backlightDescrBtn.isExisting()).toBe(false);
    await browser.pause(1000);

    await productsPage.contShoppBtn.click();
    await browser.pause(1000);
  });

  it("Testing adding products to cart from Inventory page", async () => {
    await productsPage.addBackpack.click();
    await browser.pause(1000);
    await productsPage.addBikelight.click();
    await browser.pause(1000);

    await productsPage.cartBtn.click();
  });

  it("Verify Checkout page.", async () => {
    await productsPage.contShoppBtn.click();
    await browser.pause(1000);
  });
});