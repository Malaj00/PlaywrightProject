import { test, expect } from '@playwright/test';
import { LoginData } from '../test-data/automationexercise.data';
import { RegisterPage } from '../pages/automationexercise.page';

test.describe('Register and login tests', () => {
  let registerPage: RegisterPage;
  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await page.goto('http://automationexercise.com');
    await expect(page.locator('#slider-carousel')).toBeVisible();
    await page.getByRole('button', { name: 'Consent' }).click();
    await page.getByRole('link', { name: ' Signup / Login' }).click();
    await expect(page.getByText('Login to your account')).toHaveText(
      'Login to your account',
    );
    await expect(page.getByText('New User Signup!')).toHaveText(
      'New User Signup!',
    );
  });
  test('TC1 - Register User', async ({ page }) => {
    //Arrange

    //Act
    await expect(page.getByText('New User Signup!')).toBeVisible;
    await expect(page.getByText('New User Signup!')).toHaveText(
      'New User Signup!',
    );
    await page.getByRole('textbox', { name: 'Name' }).fill('NewUser1337');
    await page
      .locator('[data-qa="signup-email"]')
      .fill('newuser1337@pampampam.com');
    await page.getByRole('button', { name: 'Signup' }).click();
    await expect(page.getByText('Enter Account Information')).toBeVisible;
    await expect(page.getByText('Enter Account Information')).toHaveText(
      'Enter Account Information',
    );
    await page.getByRole('radio', { name: 'Mr.' }).check();
    await page.locator('#days').selectOption('10');
    await page.locator('#months').selectOption('10');
    await page.locator('#years').selectOption('1990');
    await page.getByRole('textbox', { name: 'Password *' }).fill('Password123');
    await page
      .getByRole('checkbox', { name: 'Sign up for our newsletter!' })
      .check();
    await page
      .getByRole('checkbox', { name: 'Receive special offers from' })
      .check();
    await page
      .getByRole('textbox', { name: 'Company', exact: true })
      .fill('Company1');
    await page
      .getByRole('textbox', { name: 'First name *' })
      .fill('Firstname1');
    await page.getByRole('textbox', { name: 'Last name *' }).fill('Lastname1');
    await page
      .getByRole('textbox', { name: 'Address * (Street address, P.' })
      .fill('Address1, 00-000, Companyname');
    await page.getByRole('textbox', { name: 'Address 2' }).fill('Address2');
    await page.getByLabel('Country *').selectOption('United States');
    await page.getByRole('textbox', { name: 'State *' }).fill('State1');
    await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('City1');
    await page.locator('#zipcode').fill('Zipcode1');
    await page
      .getByRole('textbox', { name: 'Mobile Number *' })
      .fill('123123123');
    await page.getByRole('button', { name: 'Create Account' }).click();
    await expect(page.locator('[data-qa="account-created"]')).toBeVisible;
    await expect(page.locator('[data-qa="account-created"]')).toHaveText(
      'Account Created!',
    );
    // await page.getByRole('link', { name: 'Continue' }).click();
    // await page.getByRole('link', { name: ' Delete Account' }).click();
    // await page.getByText('Account Deleted!').click();
    // await page.getByRole('link', { name: 'Continue' }).click();
  });

  test('TC2 - Login', async ({ page }) => {
    //Arrange
    const userMail = LoginData.userMail;
    const userPassword = LoginData.userPassword;
    //Act
    await registerPage.login(userMail, userPassword);
    //Assert
    await expect(page.getByText('Logged in as NewUser1337')).toHaveText(
      'Logged in as NewUser1337',
    );
    // await page.getByRole('link', { name: ' Delete Account' }).click();
    // await page.getByText('Account Deleted!').click();
    // await page.getByRole('link', { name: 'Continue' }).click();
  });
  test('TC3 - Login with incorrect data', async ({ page }) => {
    //Arrange
    const userMail = 'blabla@mail.com'
    const userPassword = 'blabla'
    //Act
    await registerPage.mailInput.fill(userMail);
    await registerPage.passwordInput.fill(userPassword);
    await registerPage.loginButton.click();
    //Assert
    await expect(page.getByText('Your email or password is incorrect!')).toHaveText('Your email or password is incorrect!');
  });
  test('TC4 - Logout User', async ({ page }) => {
    //Arrange
    //Act
    //Assert
  });
});
