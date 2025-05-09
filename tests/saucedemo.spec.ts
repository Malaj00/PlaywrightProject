import { test, expect } from '@playwright/test';
import { sauceLogin } from '../test-data/saucedemo.data';
import { SauceDemo } from '../pages/saucedemo.page';
import saucedemoCredentials from '../test-data/saucedemoCredentials.json';

test.describe('', () => {
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
    await expect(page.locator('[data-test="title"]')).toBeVisible();
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

  test('TC4 - Lookup on product', async ({ page }) => {
    //Arrange
    //Act
    await sauceDemo.login(
      saucedemoCredentials.userName,
      saucedemoCredentials.userPassword,
    );
    await page.locator('[data-test="inventory-item-name"]').first().click();
    //Assert
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(
      'Sauce Labs Backpack',
    );
  });
});


//zrobic tak zeby wszystkie testy byly pass