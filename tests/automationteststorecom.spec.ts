import { test, expect } from '@playwright/test';
import { AutomationStore } from '../pages/automationteststorecom.page';
import autostoreCredential from '../test-data/automationstore.json';

test.describe('Login and Register functionality', () => {
  let storePage: AutomationStore;
  test.beforeEach(async ({ page }) => {
    storePage = new AutomationStore(page);
    await page.goto('https://automationteststore.com/');
    await expect(page.locator('#maincontainer .welcome_msg')).toContainText(
      'Welcome to the Automation Test Store!',
    );
    await storePage.loginPage.click();
  });

  test('User Register', async ({ page }) => {
    // Arrange:
    // Act:
    await expect(page.locator('#accountFrm_accountregister')).toBeChecked();
    await page.getByTitle('Continue').click();
    await storePage.register(
      autostoreCredential.userName,
      autostoreCredential.userMail,
      autostoreCredential.userPassword,
      autostoreCredential.firstName,
      autostoreCredential.lastName,
      autostoreCredential.address,
      autostoreCredential.country,
      autostoreCredential.state,
      autostoreCredential.city,
      autostoreCredential.zipcode,
    );
    // Assert:
    await expect(page.locator('.maintext')).toHaveText(
      ' Your Account Has Been Created!',
    );
  });

  test('Correct User login', async ({ page }) => {
    // Arrange:
    // Act:
    await storePage.login(
      autostoreCredential.userName,
      autostoreCredential.userPassword,
    );
    // Assert:
    await expect(page.locator('.maintext')).toHaveText(' My Account');
    await expect(page.locator('.subtext')).toHaveText(
      autostoreCredential.firstName,
    );
  });

  test('Incorrect username login', async ({ page }) => {
    // Arrange:
    const incName = 'loginName';
    const errorMess = 'Error: Incorrect login or password provided.';
    // Act:
    await page.locator('#loginFrm_loginname').fill(incName);
    await page
      .locator('#loginFrm_password')
      .fill(autostoreCredential.userPassword);
    await page.getByRole('button', { name: 'Login' }).click();
    // Assert:
    await expect(page.locator('.alert.alert-error.alert-danger')).toContainText(
      errorMess,
    );
  });

  test('Incorrect password login', async ({ page }) => {
    // Arrange:
    const incPass = 'passWord';
    const errorMess = 'Error: Incorrect login or password provided.';
    // Act:
    await page
      .locator('#loginFrm_loginname')
      .fill(autostoreCredential.userName);
    await page.locator('#loginFrm_password').fill(incPass);
    await page.getByRole('button', { name: 'Login' }).click();
    // Assert:
    await expect(page.locator('.alert.alert-error.alert-danger')).toContainText(
      errorMess,
    );
  });

  test('Forgot password positive', async ({ page }) => {
    // Arrange:
    const forgotPasshref = `href="https://automationteststore.com/index.php?rt=account/forgotten/password"`;
    const correctMess =
      'Success: Password reset link has been sent to your e-mail address.';
    // Act:
    await page.locator(`a[${forgotPasshref}]`).click();
    await page
      .locator('#forgottenFrm_loginname')
      .fill(autostoreCredential.userName);
    await page
      .locator('#forgottenFrm_email')
      .fill(autostoreCredential.userMail);
    await page.getByRole('button', { name: 'Continue' }).click();
    // Assert:
    await expect(page.locator('.alert.alert-success')).toContainText(
      correctMess,
    );
  });
});
