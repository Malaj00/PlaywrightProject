import { test, expect } from '@playwright/test';
import { sauceLogin } from '../test-data/saucedemo.data';
import { SauceDemo } from '../pages/saucedemo.page';
import saucedemoCredentials from '../test-data/saucedemoCredentials.json';

test.describe('Login tests', () => {
  let sauceDemo: SauceDemo;
  test.beforeEach(async ({ page }) => {
    sauceDemo = new SauceDemo(page);
    await page.goto('https://www.saucedemo.com/');
  });

  test('TC1 - Positive Login test', async ({ page }) => {
    //Arrange
    //Act
    await sauceDemo.login(
      saucedemoCredentials.userName,
      saucedemoCredentials.userPassword,
    );
    //Assert
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('TC2 - Negative Login test - Incorrect password', async ({ page }) => {
    //Arrange
    const incPass = '123';
    //Act
    await page
      .locator('[data-test="username"]')
      .fill(saucedemoCredentials.userName);
    await page.locator('[data-test="password"]').fill(incPass);
    await page.locator('[data-test="login-button"]').click();
    //Assert
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  test('TC3 - Negative Login test - Incorrect username', async ({ page }) => {
    //Arrange
    const incUsername = 'l05in';
    //Act
    await page.locator('[data-test="username"]').fill(incUsername);
    await page
      .locator('[data-test="password"]')
      .fill(saucedemoCredentials.userPassword);
    await page.locator('[data-test="login-button"]').click();
    //Assert
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });
});

test.describe('Shop Cart tests', () => {
  let sauceDemo: SauceDemo;
  test.beforeEach(async ({ page }) => {
    sauceDemo = new SauceDemo(page);
    await page.goto('https://www.saucedemo.com/');
    await sauceDemo.login(
      saucedemoCredentials.userName,
      saucedemoCredentials.userPassword,
    );
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('TC4 - Lookup on product', async ({ page }) => {
    //Arrange
    //Act
    await page.locator('[data-test="inventory-item-name"]').first().click();
    //Assert
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(
      'Sauce Labs Backpack',
    );
  });

  test('TC6 - Adding product to cart', async ({ page }) => {
    //Arrange
    //Act
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await expect(
      page.locator('[data-test="shopping-cart-badge"]'),
    ).toBeVisible();
    await expect(page.locator('#remove-sauce-labs-backpack')).toBeVisible();
    await page.locator('[data-test="shopping-cart-link"]').click();
    //Assert
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(
      'Sauce Labs Backpack',
    );
  });

  test('TC7 - Removing product from cart', async ({ page }) => {
    //Arrange
    //Act
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await expect(page.locator('#remove-sauce-labs-backpack')).toBeVisible();
    await expect(
      page.locator('[data-test="shopping-cart-badge"]'),
    ).toBeVisible();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(
      'Sauce Labs Backpack',
    );
    await page.getByRole('button', { name: 'Remove' }).click();
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveCount(
      0,
    );
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(
      0,
    );
    //Assert
  });

  test('TC8 - More than one product in cart', async ({ page }) => {
    //Arrange
    //Act
    await page.locator('#add-to-cart-sauce-labs-bolt-t-shirt').click();
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await expect(page.locator('#remove-sauce-labs-backpack')).toBeVisible();
    await expect(page.locator('#remove-sauce-labs-bolt-t-shirt')).toBeVisible();
    await expect(
      page.locator('[data-test="shopping-cart-badge"]'),
    ).toBeVisible();
    await page.locator('[data-test="shopping-cart-link"]').click();
    //Assert
    await expect(
      page.locator('[data-test="inventory-item-name"]').nth(0),
    ).toHaveText('Sauce Labs Bolt T-Shirt');
    await expect(
      page.locator('[data-test="inventory-item-name"]').nth(1),
    ).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('[data-test="item-quantity"]').nth(0)).toHaveText(
      '1',
    );
    await expect(page.locator('[data-test="item-quantity"]').nth(1)).toHaveText(
      '1',
    );
  });

  test('TC9 - Checkout in cart', async ({ page }) => {
    //Arrange
    const itemTotal = '29.99';
    const tax = '2.40';
    const summary = Number(itemTotal) + Number(tax);
    //Act
    await sauceDemo.cartAdd();
    await page.locator('#checkout').click();
    await expect(page.locator('[data-test="title"]')).toHaveText(
      'Checkout: Your Information',
    );
    await page.locator('#first-name').fill(saucedemoCredentials.firstname);
    await page.locator('#first-name').blur();
    await expect(page.locator('#first-name')).toHaveValue(
      saucedemoCredentials.firstname,
    );
    await page.locator('#last-name').fill(saucedemoCredentials.lastname);
    await page.locator('#last-name').blur();
    await expect(page.locator('#last-name')).toHaveValue(
      saucedemoCredentials.lastname,
    );
    await page.locator('#postal-code').fill(saucedemoCredentials.zipcode);
    await page.locator('#continue').click();
    await expect(page.locator('[data-test="title"]')).toHaveText(
      'Checkout: Overview',
    );
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(
      'Sauce Labs Backpack',
    );
    await expect(page.locator('[data-test="item-quantity"]')).toHaveText('1');
    await expect(
      page.locator('[data-test="inventory-item-price"]'),
    ).toContainText(itemTotal);
    await expect(page.locator('[data-test="tax-label"]')).toContainText(tax);
    await expect(page.locator('[data-test="total-label"]')).toContainText(
      `${summary}`,
    );
    await page.locator('#finish').click();
    await expect(page.locator('[data-test="complete-header"]')).toContainText(
      'Thank you for your order!',
    );
    await page.locator('#back-to-products').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('TC10 - Checkout validation', async ({ page }) => {
    //Arrange
    //Act
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart')
    await page.locator('#checkout').click();
    await page.locator('#continue').click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required')
    await page.locator('#first-name').fill(saucedemoCredentials.firstname);
    await page.locator('#continue').click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: Last Name is required')
    await page.locator('#last-name').fill(saucedemoCredentials.lastname);
    await page.locator('#continue').click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: Postal Code is required')
    //Assert
  });
  
});

test.describe('Other Page tests', () => {
  let sauceDemo: SauceDemo;
  test.beforeEach(async ({ page }) => {
    sauceDemo = new SauceDemo(page);
    await page.goto('https://www.saucedemo.com/');
    await sauceDemo.login(
      saucedemoCredentials.userName,
      saucedemoCredentials.userPassword,
    );
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('TC11 - Sorting products on page ', async ({ page }) => {
    //Arrange
    //Act
    await expect(
      page.locator('[data-test="product-sort-container"]')).toHaveValue('az');
    await expect(
      page.locator('[data-test="inventory-item-name"]').first(),
    ).toHaveText('Sauce Labs Backpack');
    await page
      .locator('[data-test="product-sort-container"]')
      .selectOption('lohi');
    await page
      .locator('[data-test="product-sort-container"]')
      .selectOption('lohi');
    //Assert
        await expect(
      page.locator('[data-test="inventory-item-name"]').first(),
    ).toHaveText('Sauce Labs Onesie');
  });

});
