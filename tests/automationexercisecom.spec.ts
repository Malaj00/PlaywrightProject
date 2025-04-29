import { test, expect } from '@playwright/test';
import { LoginData } from '../test-data/automationexercise.data';
import { AutomationExercise } from '../pages/automationexercise.page';

test.describe('Register and login tests', () => {
  let autoExer: AutomationExercise;
  test.beforeEach(async ({ page }) => {
    autoExer = new AutomationExercise(page);
    await page.goto('http://automationexercise.com');
    await page.getByRole('button', { name: 'Consent' }).click();
    await expect(page.locator('#slider-carousel')).toBeVisible();
    await autoExer.topMenu.signupLogin.click();
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
    await expect(page.getByText('Enter Account Information')).toBeVisible();
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
    await autoExer.login(userMail, userPassword);
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
    await autoExer.mailInput.fill(userIncMail);
    await autoExer.passwordInput.fill(userIncPassword);
    await autoExer.loginButton.click();
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
    await autoExer.login(userMail, userPassword);
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
  let autoExer: AutomationExercise;
  test.beforeEach(async ({ page }) => {
    autoExer = new AutomationExercise(page);
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
    await autoExer.topMenu.contactButton.click();
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
    await autoExer.topMenu.testcasesButton.click();
    //Assert
    await expect(page.locator('h2:has-text("Test Cases")')).toBeVisible();
  });
  test('TC8 - Verify All Products and product detail page', async ({
    page,
  }) => {
    //Arrange
    //Act
    await autoExer.topMenu.productsButton.click();
    await expect(
      page.getByRole('heading', { name: 'All Products' }),
    ).toBeVisible();
    await expect(page.locator('.features_items')).toBeVisible();
    await page.getByText('View Product').first().click();
    //Assert
    await expect(page.locator('h2:has-text("Blue Top")')).toBeVisible();
    await expect(page.getByText('Category: Women > Tops')).toBeVisible();
    await expect(page.getByText('Rs.')).toContainText(/^Rs\.\s*\d+/);
    await expect(page.locator('p:has-text("Availability:")')).toHaveText(/^Availability:\s*\w.+/);
    await expect(page.locator('p:has-text("Condition:")')).toHaveText(/^Condition:\s*\w.+/);
    await expect(page.locator('p:has-text("Brand:")')).toHaveText(/^Brand:\s*\w.+/);

  });
  test('TC9 - Search Product', async ({ page }) => {
    //Arrange

    //Act
    await autoExer.topMenu.productsButton.click();
    await expect(
      page.getByRole('heading', { name: 'All Products' }),
    ).toBeVisible();
    await page
      .getByRole('textbox', { name: 'Search Product' })
      .fill('Blue Top');
    await page.locator('#submit_search').click();
    await expect(
      page.locator('h2:has-text("Searched Products")'),
    ).toBeVisible();

    //Assert
    await expect(
      page.locator('.features_items  .col-sm-4  p').first(),
    ).toContainText('Blue Top');
  });
  test('TC10 - Verify Subscription in home page', async ({ page }) => {
    //Arrange
    const userMail = LoginData.userMail;
    //Act
    await expect(
      page.locator('#footer').locator('h2:has-text("Subscription")'),
    ).toHaveText('Subscription');
    await page.locator('#susbscribe_email').fill(userMail);
    await page.getByRole('button', { name: '' }).click();
    //Assert
    await expect(page.getByText('You have been successfully')).toBeVisible();
    await expect(page.getByText('You have been successfully')).toHaveText(
      'You have been successfully subscribed!',
    );
  });
  test('TC11 - Verify Subscription in Cart page', async ({ page }) => {
    //Arrange
    const userMail = LoginData.userMail;
    //Act
    await autoExer.topMenu.cartButton.click();
    await expect(
      page.locator('#footer').locator('h2:has-text("Subscription")'),
    ).toHaveText('Subscription');
    await page.locator('#susbscribe_email').fill(userMail);
    await page.getByRole('button', { name: '' }).click();
    //Assert
    await expect(page.getByText('You have been successfully')).toBeVisible();
    await expect(page.getByText('You have been successfully')).toHaveText(
      'You have been successfully subscribed!',
    );
  });
  test('TC12 - Add Products in Cart', async ({ page }) => {
    //Arrange
    //Act
    await autoExer.topMenu.productsButton.click();
    await page.locator('[data-product-id="1"]').nth(0).click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await page.locator('[data-product-id="2"]').nth(0).click();
    await page.getByRole('link', { name: 'View Cart' }).click();

    //Assert
    await expect(page.locator('#product-1')).toBeVisible();
    await expect(page.locator('#product-2')).toBeVisible();
    await expect(page.locator('#product-1').locator('.cart_price')).toHaveText(/Rs\.\s*\d+/);
    await expect(page.locator('#product-2').locator('.cart_price')).toHaveText(/Rs\.\s*\d+/);
    await expect(page.locator('#product-1').locator('.cart_total_price')).toHaveText(/Rs\.\s*\d+/);
    await expect(page.locator('#product-2').locator('.cart_total_price')).toHaveText(/Rs\.\s*\d+/);
    await expect(page.locator('#product-1').locator('.cart_quantity').locator('.disabled')).toBeVisible();
    await expect(page.locator('#product-2').locator('.cart_quantity').locator('.disabled')).toBeVisible();
  });

test('TC13 - Verify Product quantity in Cart', async ({ page }) => {
  //Arrange

  //Act
  await page.goto('https://automationexercise.com/products');
  await page.locator('div:nth-child(7) > .product-image-wrapper > .choose > .nav > li > a').click();
  await expect(page.getByText('Rs.')).toBeVisible();
  await expect(page.getByText('Availability:')).toBeVisible();
  await expect(page.getByText('Condition:')).toBeVisible();
  await expect(page.getByText('Brand:')).toBeVisible();
  await page.locator('#quantity').fill('4');
  await page.getByRole('button', { name: ' Add to cart' }).click();
  await page.getByRole('link', { name: 'View Cart' }).click();
  await page.getByRole('cell', { name: '4', exact: true }).click();
  await page.getByRole('button', { name: '4' }).click();
  //Assert
 });
});

