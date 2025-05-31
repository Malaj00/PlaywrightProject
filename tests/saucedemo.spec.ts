import { test, expect } from '@playwright/test';
import { sauceLogin } from '../test-data/saucedemo.data';
import { SauceDemo } from '../pages/saucedemo.page';
import saucedemoCredentials from '../test-data/saucedemoCredentials.json';

test.describe('Login tests', () => {
  test.use({ testIdAttribute: 'data-test' });
  let sauceDemo: SauceDemo;
  test.beforeEach(async ({ page }) => {
    sauceDemo = new SauceDemo(page);
    await page.goto('https://www.saucedemo.com/');
  });

  test('TC1 - Positive Login test', async ({ page }) => {
    //Arrange
    const products = 'Products';
    //Act
    await sauceDemo.login(
      saucedemoCredentials.userName,
      saucedemoCredentials.userPassword,
    );
    //Assert
    await expect(sauceDemo.titleText).toHaveText(products);
  });

  test('TC2 - Negative Login test - Incorrect password', async ({ page }) => {
    //Arrange
    const incPass = '123';
    //Act
    await sauceDemo.loginInput.fill(saucedemoCredentials.userName);
    await sauceDemo.passwordInput.fill(incPass);
    await sauceDemo.loginButton.click();
    //Assert
    await expect(sauceDemo.errorMessage).toBeVisible();
  });

  test('TC3 - Negative Login test - Incorrect username', async ({ page }) => {
    //Arrange
    const incUsername = 'l05in';
    //Act
    await sauceDemo.loginInput.fill(incUsername);
    await sauceDemo.passwordInput.fill(saucedemoCredentials.userPassword);
    await sauceDemo.loginButton.click();
    //Assert
    await expect(sauceDemo.errorMessage).toBeVisible();
  });
});

test.describe('Shop Cart tests', () => {
  let sauceDemo: SauceDemo;
  test.use({ testIdAttribute: 'data-test' });
  test.beforeEach(async ({ page }) => {
    sauceDemo = new SauceDemo(page);
    await page.goto('https://www.saucedemo.com/');
    await sauceDemo.login(
      saucedemoCredentials.userName,
      saucedemoCredentials.userPassword,
    );
    await expect(sauceDemo.titleText).toHaveText('Products');
  });

  test('TC4 - Lookup on product', async ({ page }) => {
    //Arrange
    const labsBackpack = 'Sauce Labs Backpack';
    //Act
    await sauceDemo.inventoryItemName.first().click();
    //Assert
    await expect(sauceDemo.inventoryItemName).toHaveText(labsBackpack);
  });

  test('TC6 - Adding product to cart', async ({ page }) => {
    //Arrange
    const labsBackpack = 'Sauce Labs Backpack';
    //Act
    await sauceDemo.labsBackpackCart.click();
    await expect(sauceDemo.cartBadge).toBeVisible();
    await expect(sauceDemo.removeLabsBackpack).toBeVisible();
    await sauceDemo.cartButton.click();
    //Assert
    await expect(sauceDemo.inventoryItemName).toHaveText(labsBackpack);
  });

  test('TC7 - Removing product from cart', async ({ page }) => {
    //Arrange
    const labsBackpack = 'Sauce Labs Backpack';
    //Act
    await sauceDemo.labsBackpackCart.click();
    await expect(sauceDemo.removeLabsBackpack).toBeVisible();
    await expect(sauceDemo.cartBadge).toBeVisible();
    await sauceDemo.cartButton.click();
    await expect(sauceDemo.inventoryItemName).toHaveText(labsBackpack);
    await sauceDemo.removeButton.click();
    //Assert
    await expect(sauceDemo.inventoryItemName).toHaveCount(0);
    await expect(sauceDemo.cartBadge).toHaveCount(0);
  });

  test('TC8 - More than one product in cart', async ({ page }) => {
    //Arrange
    const labsTshirt = 'Sauce Labs Bolt T-Shirt';
    const labsBackpack = 'Sauce Labs Backpack';
    const oneQunatity = '1';
    //Act
    await sauceDemo.labsTshirtCart.click();
    await sauceDemo.labsBackpackCart.click();
    await expect(sauceDemo.removeLabsBackpack).toBeVisible();
    await expect(sauceDemo.removeLabsTshirt).toBeVisible();
    await expect(sauceDemo.cartBadge).toBeVisible();
    await sauceDemo.cartButton.click();
    //Assert
    await expect(sauceDemo.inventoryItemName.nth(0)).toHaveText(labsTshirt);
    await expect(sauceDemo.inventoryItemName.nth(1)).toHaveText(labsBackpack);
    await expect(sauceDemo.itemQuantity.nth(0)).toHaveText(oneQunatity);
    await expect(sauceDemo.itemQuantity.nth(1)).toHaveText(oneQunatity);
  });

  test('TC9 - Checkout in cart', async ({ page }) => {
    //Arrange
    const itemTotal = '29.99';
    const tax = '2.40';
    const summary = Number(itemTotal) + Number(tax);
    const checkoutInfo = 'Checkout: Your Information';
    const checkoutOvr = 'Checkout: Overview';
    const labsBackpack = 'Sauce Labs Backpack';
    const orderMess = 'Thank you for your order!';
    const products = 'Products';
    //Act
    await sauceDemo.cartAdd();
    await sauceDemo.checkoutButton.click();
    await expect(sauceDemo.titleText).toHaveText(checkoutInfo);
    await sauceDemo.firstName.fill(saucedemoCredentials.firstname);
    await sauceDemo.firstName.blur();
    await expect(sauceDemo.firstName).toHaveValue(
      saucedemoCredentials.firstname,
    );
    await sauceDemo.lastName.fill(saucedemoCredentials.lastname);
    await sauceDemo.lastName.blur();
    await expect(sauceDemo.lastName).toHaveValue(saucedemoCredentials.lastname);
    await sauceDemo.postalCode.fill(saucedemoCredentials.zipcode);
    await sauceDemo.continueButton.click();
    await expect(sauceDemo.titleText).toHaveText(checkoutOvr);
    await expect(sauceDemo.inventoryItemName).toHaveText(labsBackpack);
    await expect(sauceDemo.itemQuantity).toHaveText('1');
    await expect(sauceDemo.itemPrice).toContainText(itemTotal);
    await expect(sauceDemo.taxLabel).toContainText(tax);
    await expect(sauceDemo.totalLabel).toContainText(`${summary}`);
    await sauceDemo.finishButton.click();
    await expect(sauceDemo.completeHeader).toContainText(orderMess);
    await sauceDemo.backProdButton.click();
    //Assert:
    await expect(sauceDemo.titleText).toHaveText(products);
  });

  test('TC10 - Checkout validation', async ({ page }) => {
    //Arrange
    const yourCart = 'Your Cart';
    const errorFName = 'Error: First Name is required';
    const errorLName = 'Error: Last Name is required';
    const errorPostal = 'Error: Postal Code is required';
    //Act
    await sauceDemo.cartButton.click();
    await expect(sauceDemo.titleText).toHaveText(yourCart);
    await sauceDemo.checkoutButton.click();
    await sauceDemo.continueButton.click();
    await expect(sauceDemo.errorMessage).toHaveText(errorFName);
    await sauceDemo.firstName.fill(saucedemoCredentials.firstname);
    await sauceDemo.continueButton.click();
    await expect(sauceDemo.errorMessage).toHaveText(errorLName);
    await sauceDemo.lastName.fill(saucedemoCredentials.lastname);
    await sauceDemo.continueButton.click();
    //Assert
    await expect(sauceDemo.errorMessage).toHaveText(errorPostal);
  });
});

test.describe('Other Page tests', () => {
  let sauceDemo: SauceDemo;
  test.use({ testIdAttribute: 'data-test' });
  test.beforeEach(async ({ page }) => {
    sauceDemo = new SauceDemo(page);
    await page.goto('https://www.saucedemo.com/');
    await sauceDemo.login(
      saucedemoCredentials.userName,
      saucedemoCredentials.userPassword,
    );
    await expect(sauceDemo.titleText).toHaveText('Products');
  });

  test('TC11 - Sorting products on page ', async ({ page }) => {
    //Arrange
    const labsBackpack = 'Sauce Labs Backpack';
    const expectedSort = 'az';
    const sortOption = 'lohi';
    const labsOnesie = 'Sauce Labs Onesie';
    //Act
    await expect(sauceDemo.sortContainer).toHaveValue(expectedSort);
    await expect(sauceDemo.inventoryItemName.first()).toHaveText(labsBackpack);
    await sauceDemo.sortContainer.selectOption(sortOption);
    //Assert
    await expect(sauceDemo.inventoryItemName.first()).toHaveText(labsOnesie);
  });
});
