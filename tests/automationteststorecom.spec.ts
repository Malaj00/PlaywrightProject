import { test, expect } from '@playwright/test';
import { AutomationStore } from '../pages/automationteststorecom.page';
import autostoreCredential from '../test-data/automationstore.json';

test.describe('Login and Register functionality', () => {
  let storePage: AutomationStore;
  test.beforeEach(async ({ page }) => {
    storePage = new AutomationStore(page);
    await page.goto('https://automationteststore.com/');
    await expect(storePage.welcomeMsg).toContainText(
      'Welcome to the Automation Test Store!',
    );
    await storePage.loginPage.click();
  });

  test('User Register', async ({ page }) => {
    // Arrange:
    const createdAccount = ' Your Account Has Been Created!';
    const registeredMail = 'Error: E-Mail Address is already registered!';
    // Act:
    await expect(storePage.radioRegister).toBeChecked();
    await storePage.continueButton.click();
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
    await expect(storePage.errorAlert).toContainText(registeredMail);
    //await expect(storePage.mainText).toHaveText(createdAccount); //Asser for new account
  });

  test('Correct User login', async ({ page }) => {
    // Arrange:
    const myAcc = ' My Account';
    // Act:
    await storePage.login(
      autostoreCredential.userName,
      autostoreCredential.userPassword,
    );
    // Assert:
    await expect(storePage.mainText).toHaveText(myAcc);
    await expect(storePage.subText).toHaveText(autostoreCredential.firstName);
  });

  test('Incorrect username login', async ({ page }) => {
    // Arrange:
    const incName = 'loginName';
    const errorMess = 'Error: Incorrect login or password provided.';
    // Act:
    await storePage.loginInput.fill(incName);
    await storePage.passwordInput.fill(autostoreCredential.userPassword);
    await storePage.loginButton.click();
    // Assert:
    await expect(storePage.errorAlert).toContainText(errorMess);
  });

  test('Incorrect password login', async ({ page }) => {
    // Arrange:
    const incPass = 'passWord';
    const errorMess = 'Error: Incorrect login or password provided.';
    // Act:
    await storePage.loginInput.fill(autostoreCredential.userName);
    await storePage.passwordInput.fill(incPass);
    await storePage.loginButton.click();
    // Assert:
    await expect(storePage.errorAlert).toContainText(errorMess);
  });

  test('Forgot password positive', async ({ page }) => {
    // Arrange:
    const correctMess =
      'Success: Password reset link has been sent to your e-mail address.';
    // Act:
    await storePage.forgotPass.click();
    await storePage.forgotLogInput.fill(autostoreCredential.userName);
    await storePage.forgotEmlInput.fill(autostoreCredential.userMail);
    await storePage.continueButton.click();
    // Assert:
    await expect(storePage.succesAlert).toContainText(correctMess);
  });

  test('Forgot password negative', async ({ page }) => {
    // Arrange:
    const errorMess =
      'Error: No records found matching information your provided, please check your information and try again!';
    // Act:
    await storePage.forgotPass.click();
    await storePage.forgotLogInput.fill('test123');
    await storePage.forgotEmlInput.fill(autostoreCredential.userMail);
    await storePage.continueButton.click();
    // Assert:
    await expect(storePage.errorFrgPass).toContainText(errorMess);
  });

  test('Forgot login positive', async ({ page }) => {
    // Arrange:
    const correctMess =
      'Success: Your login name reminder has been sent to your e-mail address.';
    // Act:
    await storePage.forgotLogin.click();
    await storePage.forgotLNameInput.fill(autostoreCredential.lastName);
    await storePage.forgotEmlInput.fill(autostoreCredential.userMail);
    await storePage.continueButton.click();
    // Assert:
    await expect(storePage.succesAlert).toContainText(correctMess);
  });

  test('Forgot login negative', async ({ page }) => {
    // Arrange:
    const errorMess =
      'Error: No records found matching information your provided, please check your information and try again!';
    // Act:
    await storePage.forgotLogin.click();
    await storePage.forgotLNameInput.fill('test123');
    await storePage.forgotEmlInput.fill(autostoreCredential.userMail);
    await storePage.continueButton.click();
    // Assert:
    await expect(storePage.errorFrgPass).toContainText(errorMess);
  });
});

test.describe('Cart tests', () => {
  let storePage: AutomationStore;
  test.use({ testIdAttribute: 'data-id' });
  test.beforeEach(async ({ page }) => {
    storePage = new AutomationStore(page);
    await page.goto('https://automationteststore.com/');
    await expect(storePage.welcomeMsg).toContainText(
      'Welcome to the Automation Test Store!',
    );
    await storePage.loginPage.click();
    await storePage.login(
      autostoreCredential.userName,
      autostoreCredential.userPassword,
    );
  });

  test('Add product to cart while logged', async ({ page }) => {
    // Arrange:
    // Act:
    await storePage.homeButton.click();
    await storePage.product52.click();
    await storePage.cartMenuButton.click();
    // Assert:
    await expect(storePage.bellaBambaCart).toBeVisible();
    await expect(storePage.quantity52).toBeVisible;
  });

  test('Checkout page', async ({ page }) => {
    // Arrange:
    const checkoutAddress = 'TE 12 ST Thais Guera 03405 Chad';
    const checkoutShip = 'Flat Shipping Rate';
    const checkoutPayment = 'Cash On Delivery';
    // Act:
    await storePage.homeButton.click();
    await storePage.product52.click();
    await storePage.cartMenuButton.click();
    await storePage.cartCheckout.click();
    // Assert:
    await expect(storePage.checkoutTable.first()).toHaveText(
      `${autostoreCredential.firstName} ${autostoreCredential.lastName}`,
    );
    await expect(storePage.checkoutTable.nth(1)).toHaveText(checkoutAddress);
    await expect(storePage.checkoutTable.nth(2)).toHaveText(checkoutShip);
    await expect(storePage.checkoutTable.nth(3)).toHaveText(
      `${autostoreCredential.firstName} ${autostoreCredential.lastName}`,
    );
    await expect(storePage.checkoutTable.nth(4)).toHaveText(checkoutAddress);
    await expect(storePage.checkoutTable.nth(5)).toHaveText(checkoutPayment);
  });

  test('Confirm order', async ({ page }) => {
    // Arrange:
    const successOrder = 'Your Order Has Been Processed!';
    // Act:
    await storePage.homeButton.click();
    await storePage.product52.click();
    await storePage.cartMenuButton.click();
    await storePage.cartCheckout.click();
    await storePage.checkoutButton.click();
    // Assert:
    await expect(storePage.mainText).toContainText(successOrder);
  });

  test('Check your order', async ({ page }) => {
    // Arrange:
    const orderID = '#53424';
    // Act:
    await storePage.accountText.nth(2).hover();
    await storePage.checkOrderLink.click();
    await storePage.checkOrderView.first().click();
    // Assert:
    await expect(storePage.orderIdDetails).toContainText(orderID);
  });
});
//53424
