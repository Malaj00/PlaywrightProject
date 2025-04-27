import { test, expect } from '@playwright/test';
import { LoginData } from '../test-data/automationexercise.data';
import { RegisterPage } from '../pages/automationexercise.page';

test.describe('Register and login tests', () => {
  let registerPage: RegisterPage;
  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await page.goto('http://automationexercise.com');
    await page.getByRole('button', { name: 'Consent' }).click();
    await expect(page.locator('#slider-carousel')).toBeVisible();
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
    const userMail = LoginData.userMail;
    const userId = LoginData.userName;
    const userPassword = LoginData.userPassword;
    //Act
    await expect(page.getByText('New User Signup!')).toBeVisible;
    await expect(page.getByText('New User Signup!')).toHaveText(
      'New User Signup!',
    );
    await page.getByRole('textbox', { name: 'Name' }).fill(userId);
    await page.locator('[data-qa="signup-email"]').fill(userMail);
    await page.getByRole('button', { name: 'Signup' }).click();
    await expect(page.getByText('Enter Account Information')).toBeVisible;
    await expect(page.getByText('Enter Account Information')).toHaveText(
      'Enter Account Information',
    );
    await page.getByRole('radio', { name: 'Mr.' }).check();
    await page.locator('#days').selectOption('10');
    await page.locator('#months').selectOption('10');
    await page.locator('#years').selectOption('1990');
    await page.getByRole('textbox', { name: 'Password *' }).fill(userPassword);
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
    await expect(page.locator('[data-qa="account-created"]')).toHaveText(
      'Account Created!',
    );
    // await page.getByRole('link', { name: 'Continue' }).click();
    // await page.getByRole('link', { name: ' Delete Account' }).click();
    // await expect(page.getByText('Account Deleted!')).toHaveText("Account Deleted!");
    // await page.getByRole('link', { name: 'Continue' }).click();
  });

  test('TC2 - Login', async ({ page }) => {
    //Arrange
    const userMail = LoginData.userMail;
    const userPassword = LoginData.userPassword;
    //Act
    await registerPage.login(userMail, userPassword);
    // await page.getByRole('link', { name: ' Delete Account' }).click();
    // await expect(page.getByText('Account Deleted!')).toHaveText("Account Deleted!");
    // await page.getByRole('link', { name: 'Continue' }).click();
    //Assert
    await expect(page.getByText('Logged in as NewUser1337')).toHaveText(
      'Logged in as NewUser1337',
    );
  });
  test('TC3 - Login with incorrect data', async ({ page }) => {
    //Arrange
    const userIncMail = 'blabla@mail.com';
    const userIncPassword = 'blabla';
    //Act
    await registerPage.mailInput.fill(userIncMail);
    await registerPage.passwordInput.fill(userIncPassword);
    await registerPage.loginButton.click();
    //Assert
    await expect(
      page.getByText('Your email or password is incorrect!'),
    ).toHaveText('Your email or password is incorrect!');
  });
  test('TC4 - Logout User', async ({ page }) => {
    //Arrange
    const userMail = LoginData.userMail;
    const userPassword = LoginData.userPassword;
    //Act
    await registerPage.login(userMail, userPassword);
    await expect(page.getByText('Logged in as NewUser1337')).toHaveText(
      'Logged in as NewUser1337',
    );
    await page.getByRole('link', { name: ' Logout' }).click();
    //Assert
    await expect(page.getByText('Login to your account')).toHaveText(
      'Login to your account',
    );
  });
  test('TC5 - Register User with existing email', async ({ page }) => {
    //Arrange
    const userId = LoginData.userName;
    const userMail = LoginData.userMail;
    //Act
    await page.getByRole('textbox', { name: 'Name' }).fill(userId);
    await page
      .locator('form')
      .filter({ hasText: 'Signup' })
      .getByPlaceholder('Email Address')
      .fill(userMail);
    await page.getByRole('button', { name: 'Signup' }).click();
    //Assert
    await expect(page.getByText('Email Address already exist!')).toHaveText(
      'Email Address already exist!',
    );
  });
});

test.describe('Other Pages', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://automationexercise.com');
    await page.getByRole('button', { name: 'Consent' }).click();
    await expect(page.locator('#slider-carousel')).toBeVisible();
  });
  test('TC6 - Contact Us Form', async ({ page }) => {
    //Arrange
    const userMail = LoginData.userMail;
    const userId = LoginData.userName;
    const subjestMess = 'AnySubject123';
    const suppMess = 'Randomly generated message.';
    //Act
    await page.getByRole('link', { name: ' Contact us' }).click();
    await page.getByRole('heading', { name: 'Get In Touch' }).click();
    await page
      .getByRole('textbox', { name: 'Email', exact: true })
      .fill(userMail);
    await page.getByRole('textbox', { name: 'Name' }).fill(userId);
    await page.getByRole('textbox', { name: 'Subject' }).fill(subjestMess);
    await page
      .getByRole('textbox', { name: 'Your Message Here' })
      .fill(suppMess);
    await page.locator('input[name="upload_file"]').setInputFiles('README.md');
    page.once('dialog', async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      expect(dialog.message()).toContain('Press OK to proceed!');
      await dialog.accept();
    });
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(
      page
        .locator('#contact-page')
        .getByText('Success! Your details have been submitted successfully.'),
    ).toHaveText('Success! Your details have been submitted successfully.');
    await page.getByRole('link', { name: ' Home' }).click();
    //Assert
    await expect(page.locator('#slider-carousel')).toBeVisible();
  });

  test('TC7 - Verify Test Cases Page', async ({ page }) => {
    //Arrange

    //Act
    await page
      .getByRole('link', { name: /Test Cases/ })
      .first()
      .click();
    //Assert
    await expect(page.locator('h2:has-text("Test Cases")')).toBeVisible();
  });
  test.only('TC8 - Verify All Products and product detail page', async ({
    page,
  }) => {
    //Arrange
    //Act
    await page.getByRole('link', { name: /Products/ }).click();
    await expect(
      page.getByRole('heading', { name: 'All Products' }),
    ).toBeVisible();
    await expect(page.locator('.features_items')).toBeVisible();
    await page.getByText('View Product').first().click();
    //Assert
    await expect(page.locator('h2:has-text("Blue Top")')).toBeVisible();
    await expect(page.getByText('Category: Women > Tops')).toBeVisible();
    await expect(page.getByText('Rs.')).toBeVisible();
    await expect(page.getByText('Availability:')).toBeVisible();
    await expect(page.getByText('Condition:')).toBeVisible();
    await expect(page.getByText('Brand:')).toBeVisible();
  });
});
