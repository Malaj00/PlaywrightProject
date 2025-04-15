import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const expectedUserName = 'Jan Demobankowy';
    const loginPage = new LoginPage(page);

    //Act
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    // Arrange
    const incorrectuserId = 'test';
    const expectedError = 'identyfikator ma min. 8 znaków';
    const loginPage = new LoginPage(page);

    //Act
    await loginPage.loginInput.fill(incorrectuserId);
    await loginPage.passwordInput.click();

    //Assert
    await expect(loginPage.loginError).toHaveText(expectedError);
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    //Arrange
    const expectedError = 'hasło ma min. 8 znaków';
    const userId = loginData.userId;
    const incorrectPassword = '1231';
    const loginPage = new LoginPage(page);

    //Act
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(incorrectPassword);
    await loginPage.passwordInput.blur();

    //Assert
    await expect(loginPage.passwordError).toHaveText(expectedError);
  });
});
