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
    //Act
    await sauceDemo.login(
      saucedemoCredentials.userName,
      saucedemoCredentials.userPassword,
    );
    //Assert
    await expect(page.getByTestId('title')).toHaveText('Products');
  });

  test('TC2 - Negative Login test - Incorrect password', async ({ page }) => {
    //Arrange
    const incPass = '123';
    //Act
    await page.getByTestId('username').fill(saucedemoCredentials.userName);
    await page.getByTestId('password').fill(incPass);
    await page.getByTestId('login-button').click();
    //Assert
    await expect(page.getByTestId('error')).toBeVisible();
  });

  test('TC3 - Negative Login test - Incorrect username', async ({ page }) => {
    //Arrange
    const incUsername = 'l05in';
    //Act
    await page.getByTestId('username').fill(incUsername);
    await page.getByTestId('password').fill(saucedemoCredentials.userPassword);
    await page.getByTestId('login-button').click();
    //Assert
    await expect(page.getByTestId('error')).toBeVisible();
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
    await expect(page.getByTestId('title')).toHaveText('Products');
  });

  test('TC4 - Lookup on product', async ({ page }) => {
    //Arrange
    //Act
    await page.getByTestId('inventory-item-name').first().click();
    //Assert
    await expect(page.getByTestId('inventory-item-name')).toHaveText(
      'Sauce Labs Backpack',
    );
  });

  test('TC6 - Adding product to cart', async ({ page }) => {
    //Arrange
    //Act
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await expect(page.getByTestId('shopping-cart-badge')).toBeVisible();
    await expect(page.locator('#remove-sauce-labs-backpack')).toBeVisible();
    await page.getByTestId('shopping-cart-link').click();
    //Assert
    await expect(page.getByTestId('inventory-item-name')).toHaveText(
      'Sauce Labs Backpack',
    );
  });

  test('TC7 - Removing product from cart', async ({ page }) => {
    //Arrange
    //Act
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await expect(page.locator('#remove-sauce-labs-backpack')).toBeVisible();
    await expect(page.getByTestId('shopping-cart-badge')).toBeVisible();
    await page.getByTestId('shopping-cart-link').click();
    await expect(page.getByTestId('inventory-item-name')).toHaveText(
      'Sauce Labs Backpack',
    );
    await page.getByRole('button', { name: 'Remove' }).click();
    //Assert
    await expect(page.getByTestId('inventory-item-name')).toHaveCount(0);
    await expect(page.getByTestId('shopping-cart-badge')).toHaveCount(0);
  });

  test('TC8 - More than one product in cart', async ({ page }) => {
    //Arrange
    //Act
    await page.locator('#add-to-cart-sauce-labs-bolt-t-shirt').click();
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await expect(page.locator('#remove-sauce-labs-backpack')).toBeVisible();
    await expect(page.locator('#remove-sauce-labs-bolt-t-shirt')).toBeVisible();
    await expect(page.getByTestId('shopping-cart-badge')).toBeVisible();
    await page.getByTestId('shopping-cart-link').click();
    //Assert
    await expect(page.getByTestId('inventory-item-name').nth(0)).toHaveText(
      'Sauce Labs Bolt T-Shirt',
    );
    await expect(page.getByTestId('inventory-item-name').nth(1)).toHaveText(
      'Sauce Labs Backpack',
    );
    await expect(page.getByTestId('item-quantity').nth(0)).toHaveText('1');
    await expect(page.getByTestId('item-quantity').nth(1)).toHaveText('1');
  });

  test('TC9 - Checkout in cart', async ({ page }) => {
    //Arrange
    const itemTotal = '29.99';
    const tax = '2.40';
    const summary = Number(itemTotal) + Number(tax);
    //Act
    await sauceDemo.cartAdd();
    await page.locator('#checkout').click();
    await expect(page.getByTestId('title')).toHaveText(
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
    await expect(page.getByTestId('title')).toHaveText('Checkout: Overview');
    await expect(page.getByTestId('inventory-item-name')).toHaveText(
      'Sauce Labs Backpack',
    );
    await expect(page.getByTestId('item-quantity')).toHaveText('1');
    await expect(page.getByTestId('inventory-item-price')).toContainText(
      itemTotal,
    );
    await expect(page.getByTestId('tax-label')).toContainText(tax);
    await expect(page.getByTestId('total-label')).toContainText(`${summary}`);
    await page.locator('#finish').click();
    await expect(page.getByTestId('complete-header')).toContainText(
      'Thank you for your order!',
    );
    await page.locator('#back-to-products').click();
    //Assert:
    await expect(page.getByTestId('title')).toHaveText('Products');
  });

  test('TC10 - Checkout validation', async ({ page }) => {
    //Arrange
    //Act
    await page.getByTestId('shopping-cart-link').click();
    await expect(page.getByTestId('title')).toHaveText('Your Cart');
    await page.locator('#checkout').click();
    await page.locator('#continue').click();
    await expect(page.getByTestId('error')).toHaveText(
      'Error: First Name is required',
    );
    await page.locator('#first-name').fill(saucedemoCredentials.firstname);
    await page.locator('#continue').click();
    await expect(page.getByTestId('error')).toHaveText(
      'Error: Last Name is required',
    );
    await page.locator('#last-name').fill(saucedemoCredentials.lastname);
    await page.locator('#continue').click();
    //Assert
    await expect(page.getByTestId('error')).toHaveText(
      'Error: Postal Code is required',
    );
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
    await expect(page.getByTestId('title')).toHaveText('Products');
  });

  test('TC11 - Sorting products on page ', async ({ page }) => {
    //Arrange
    //Act
    await expect(page.getByTestId('product-sort-container')).toHaveValue('az');
    await expect(page.getByTestId('inventory-item-name').first()).toHaveText(
      'Sauce Labs Backpack',
    );
    await page.getByTestId('product-sort-container').selectOption('lohi');
    //Assert
    await expect(page.getByTestId('inventory-item-name').first()).toHaveText(
      'Sauce Labs Onesie',
    );
  });
});
