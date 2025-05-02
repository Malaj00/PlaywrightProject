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
  });

  test('TC2 - Login', async ({ page }) => {
    //Arrange
    const userMail = LoginData.userMail;
    const userPassword = LoginData.userPassword;
    const correctLogin = 'Logged in as NewUser1337';
    //Act
    await autoExer.login(userMail, userPassword);
    //Assert
    await expect(page.getByText(correctLogin)).toHaveText(correctLogin);
  });
  test('TC3 - Login with incorrect data', async ({ page }) => {
    //Arrange
    const userIncMail = 'blabla@mail.com';
    const userIncPassword = 'blabla';
    const incorrectInput = 'Your email or password is incorrect!';
    //Act
    await autoExer.mailInput.fill(userIncMail);
    await autoExer.passwordInput.fill(userIncPassword);
    await autoExer.loginButton.click();
    //Assert
    await expect(page.getByText(incorrectInput)).toHaveText(incorrectInput);
  });
  test('TC4 - Logout User', async ({ page }) => {
    //Arrange
    const userMail = LoginData.userMail;
    const userPassword = LoginData.userPassword;
    const correctLogin = 'Logged in as NewUser1337';
    const logoutMessage = 'Login to your account';
    //Act
    await autoExer.login(userMail, userPassword);
    await expect(page.getByText(correctLogin)).toHaveText(correctLogin);
    await page.getByRole('link', { name: ' Logout' }).click();
    //Assert
    await expect(page.getByText(logoutMessage)).toHaveText(logoutMessage);
  });
  test('TC5 - Register User with existing email', async ({ page }) => {
    //Arrange
    const userId = LoginData.userName;
    const userMail = LoginData.userMail;
    const emailExist = 'Email Address already exist!';
    //Act
    await page.getByRole('textbox', { name: 'Name' }).fill(userId);
    await page
      .locator('form')
      .filter({ hasText: 'Signup' })
      .getByPlaceholder('Email Address')
      .fill(userMail);
    await page.getByRole('button', { name: 'Signup' }).click();
    //Assert
    await expect(page.getByText(emailExist)).toHaveText(emailExist);
  });
  test('TC0 - Deleting Account', async ({ page }) => {
    //Arrange
    const userMail = LoginData.userMail;
    const userPassword = LoginData.userPassword;
    //Act
    await autoExer.login(userMail, userPassword);
    await autoExer.topMenu.deleteButton.click();
    //Assert
    await expect(page.locator('[data-qa="account-deleted"]')).toBeVisible();
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
    const subjectMess = 'AnySubject123';
    const suppMess = 'Randomly generated message.';
    const submitMessage =
      'Success! Your details have been submitted successfully.';
    //Act
    await autoExer.topMenu.contactButton.click();
    await page.getByRole('heading', { name: 'Get In Touch' }).click();
    await page
      .getByRole('textbox', { name: 'Email', exact: true })
      .fill(userMail);
    await page.getByRole('textbox', { name: 'Name' }).fill(userId);
    await page.getByRole('textbox', { name: 'Subject' }).fill(subjectMess);
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
      page.locator('#contact-page').getByText(submitMessage),
    ).toHaveText(submitMessage);
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
    await expect(page.locator('p:has-text("Availability:")')).toHaveText(
      /^Availability:\s*\w.+/,
    );
    await expect(page.locator('p:has-text("Condition:")')).toHaveText(
      /^Condition:\s*\w.+/,
    );
    await expect(page.locator('p:has-text("Brand:")')).toHaveText(
      /^Brand:\s*\w.+/,
    );
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
    await expect(page.locator('#product-1').locator('.cart_price')).toHaveText(
      /Rs\.\s*\d+/,
    );
    await expect(page.locator('#product-2').locator('.cart_price')).toHaveText(
      /Rs\.\s*\d+/,
    );
    await expect(
      page.locator('#product-1').locator('.cart_total_price'),
    ).toHaveText(/Rs\.\s*\d+/);
    await expect(
      page.locator('#product-2').locator('.cart_total_price'),
    ).toHaveText(/Rs\.\s*\d+/);
    await expect(
      page.locator('#product-1').locator('.cart_quantity').locator('.disabled'),
    ).toBeVisible();
    await expect(
      page.locator('#product-2').locator('.cart_quantity').locator('.disabled'),
    ).toBeVisible();
  });

  test('TC13 - Verify Product quantity in Cart', async ({ page }) => {
    //Arrange

    //Act
    await autoExer.topMenu.productsButton.click();
    await page
      .locator('.product-image-wrapper a:has-text("View Product")')
      .nth(6)
      .click();
    await expect(page.getByText('Rs.')).toContainText(/^Rs\.\s*\d+/);
    await expect(page.locator('p:has-text("Availability:")')).toHaveText(
      /^Availability:\s*\w.+/,
    );
    await expect(page.locator('p:has-text("Condition:")')).toHaveText(
      /^Condition:\s*\w.+/,
    );
    await expect(page.locator('p:has-text("Brand:")')).toHaveText(
      /^Brand:\s*\w.+/,
    );
    await page.locator('#quantity').fill('4');
    await page.getByRole('button', { name: ' Add to cart' }).click();
    await page.getByRole('link', { name: 'View Cart' }).click();
    await page.locator('.active').waitFor({ state: 'visible', timeout: 10000 });
    await expect(page.locator('.cart_product')).toBeVisible();
    await expect(page.locator('.cart_quantity .disabled')).toHaveText(/\d+/);
    //Assert
  });

  test('TC14 - Place Order: Register while Checkout', async ({ page }) => {
    //Arrange
    const userMail = LoginData.userMail;
    const userId = LoginData.userName;
    const userPassword = LoginData.userPassword;
    const correctLogin = 'Logged in as NewUser1337';
    const expectedmessagePayment = 'You have been successfully subscribed!';
    //Act
    await autoExer.topMenu.productsButton.click();
    await page.locator('[data-product-id="1"]').nth(0).click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await autoExer.topMenu.cartButton.click();
    await expect(page.getByText('Shopping Cart')).toBeVisible();
    await page.getByText('Proceed To Checkout').click();
    await page.getByRole('link', { name: 'Register / Login' }).click();
    await autoExer.register(userId, userMail, userPassword);
    await expect(page.locator('[data-qa="account-created"]')).toHaveText(
      'Account Created!',
    );
    await page.locator('[data-qa="continue-button"]').click();
    await expect(page.getByText(correctLogin)).toHaveText(correctLogin);
    await autoExer.topMenu.cartButton.click();
    await page.getByText('Proceed To Checkout').click();
    await expect(
      page.locator('#address_delivery').locator('.address_firstname'),
    ).toContainText('Mr. Firstname1 Lastname1');
    await expect(
      page.locator('#address_invoice').locator('.address_firstname'),
    ).toContainText('Mr. Firstname1 Lastname1');
    await expect(
      page.locator('#cart_items').locator('h2:has-text("Review Your Order")'),
    ).toBeVisible();
    await expect(page.locator('#product-1')).toBeVisible();
    await page
      .locator('#ordermsg')
      .locator('.form-control')
      .fill('Testmessage');
    await page.getByRole('link', { name: 'Place Order' }).click();
    await page.locator('[data-qa="name-on-card"]').fill('NameOnCard');
    await page.locator('[data-qa="card-number"]').fill('777666555444');
    await page.locator('[data-qa="cvc"]').fill('777');
    await page.locator('[data-qa="expiry-month"]').fill('01');
    await page.locator('[data-qa="expiry-year"]').fill('1990');
    await page.locator('[data-qa="pay-button"]').click();
    await expect(page.locator('.alert-success')).toHaveText(
      expectedmessagePayment,
    );
    await autoExer.deleteAccount();
    //Assert
  });
  test('TC15 - Place Order: Register while Checkout', async ({ page }) => {
    //Arrange
    const userMail = LoginData.userMail;
    const userId = LoginData.userName;
    const userPassword = LoginData.userPassword;
    const correctLogin = 'Logged in as NewUser1337';
    const expectedmessagePayment = 'You have been successfully subscribed!';
    //Act
    await autoExer.topMenu.signupLogin.click();
    await autoExer.register(userId, userMail, userPassword);
    await expect(page.locator('[data-qa="account-created"]')).toHaveText(
      'Account Created!',
    );
    await page.locator('[data-qa="continue-button"]').click();
    await expect(page.getByText(correctLogin)).toHaveText(correctLogin);
    await autoExer.topMenu.productsButton.click();
    await page.locator('[data-product-id="1"]').nth(0).click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await autoExer.topMenu.cartButton.click();
    await expect(page.getByText('Shopping Cart')).toBeVisible();
    await page.getByText('Proceed To Checkout').click();
    await expect(
      page.locator('#address_delivery').locator('.address_firstname'),
    ).toContainText('Mr. Firstname1 Lastname1');
    await expect(
      page.locator('#address_invoice').locator('.address_firstname'),
    ).toContainText('Mr. Firstname1 Lastname1');
    await expect(
      page.locator('#cart_items').locator('h2:has-text("Review Your Order")'),
    ).toBeVisible();
    await expect(page.locator('#product-1')).toBeVisible();
    await page
      .locator('#ordermsg')
      .locator('.form-control')
      .fill('Testmessage');
    await page.getByRole('link', { name: 'Place Order' }).click();
    await page.locator('[data-qa="name-on-card"]').fill('NameOnCard');
    await page.locator('[data-qa="card-number"]').fill('777666555444');
    await page.locator('[data-qa="cvc"]').fill('777');
    await page.locator('[data-qa="expiry-month"]').fill('01');
    await page.locator('[data-qa="expiry-year"]').fill('1990');
    await page.locator('[data-qa="pay-button"]').click();
    await expect(page.locator('.alert-success')).toHaveText(
      expectedmessagePayment,
    );
    await autoExer.deleteAccount();
    //Assert
  });
  test('TC16 - Place Order: Login before Checkout', async ({ page }) => {
    //Arrange
    const userMail = LoginData.userMail;
    const userPassword = LoginData.userPassword;
    const correctLogin = 'Logged in as NewUser1337';
    const expectedmessagePayment = 'You have been successfully subscribed!';
    //Act
    await autoExer.topMenu.signupLogin.click();
    await autoExer.login(userMail, userPassword);
    await expect(page.getByText(correctLogin)).toHaveText(correctLogin);
    await page.locator('[data-product-id="1"]').nth(0).click();
    await autoExer.topMenu.cartButton.click();
    await expect(page.getByText('Shopping Cart')).toBeVisible();
    await page.getByText('Proceed To Checkout').click();
    await expect(
      page.locator('#address_delivery').locator('.address_firstname'),
    ).toContainText('Mr. Firstname1 Lastname1');
    await expect(
      page.locator('#address_invoice').locator('.address_firstname'),
    ).toContainText('Mr. Firstname1 Lastname1');
    await expect(
      page.locator('#cart_items').locator('h2:has-text("Review Your Order")'),
    ).toBeVisible();
    await expect(page.locator('#product-1')).toBeVisible();
    await page
      .locator('#ordermsg')
      .locator('.form-control')
      .fill('Testmessage');
    await page.getByRole('link', { name: 'Place Order' }).click();
    await page.locator('[data-qa="name-on-card"]').fill('NameOnCard');
    await page.locator('[data-qa="card-number"]').fill('777666555444');
    await page.locator('[data-qa="cvc"]').fill('777');
    await page.locator('[data-qa="expiry-month"]').fill('01');
    await page.locator('[data-qa="expiry-year"]').fill('1990');
    await page.locator('[data-qa="pay-button"]').click();
    await expect(page.locator('.alert-success')).toHaveText(
      expectedmessagePayment,
    );
    await autoExer.deleteAccount();
    //Assert
  });
  test('TC17 - Remove Products From Cart', async ({ page }) => {
    //Arrange
    //Act
    await page.locator('[data-product-id="1"]').nth(0).click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await autoExer.topMenu.cartButton.click();
    await expect(page.getByText('Shopping Cart')).toBeVisible();
    await page.locator('[data-product-id="1"]').locator('.fa').first().click();
    //Assert
    await expect(page.locator('#empty_cart')).toBeVisible();
  });
  test('TC18 - View Category Products', async ({ page }) => {
    //Arrange
    //Act
    await expect(
      page.locator('.left-sidebar h2:has-text("Category")'),
    ).toBeVisible();
    await expect(page.locator('.panel-group')).toBeVisible();
    await page.getByRole('link', { name: 'Women' }).click();
    await page.getByRole('link', { name: 'Dress' }).click();
    await expect(page.locator('.title')).toBeVisible();
    await page.locator('.badge').nth(1).click();
    await page.getByRole('link', { name: 'Jeans' }).click();
    await expect(page.locator('.title')).toBeVisible();
    //Assert
  });
  test('TC19 - View & Cart Brand Products', async ({ page }) => {
    //Arrange
    //Act
    autoExer.topMenu.productsButton.click();
    await expect(
      page.locator('.left-sidebar h2:has-text("Brands")'),
    ).toBeVisible();
    await page.locator('.nav').first().click();
    await expect(page.locator('.title')).toBeVisible();
    await page.locator('.nav').nth(1).click();
    await expect(page.locator('.title')).toBeVisible();
    //Assert
  });
  test('TC20 - Search Products and Verify Cart After Login', async ({
    page,
  }) => {
    //Arrange
    const userMail = LoginData.userMail;
    const userPassword = LoginData.userPassword;
    //Act
    autoExer.topMenu.productsButton.click();
    await expect(
      page.getByRole('heading', { name: 'All Products' }),
    ).toBeVisible();
    await page.locator('#search_product').fill('Blue Top');
    await page.locator('#submit_search').click();
    await expect(
      page.locator('.productinfo p:has-text("Blue Top")'),
    ).toBeVisible();
    await page.locator('[data-product-id="1"]').first().click();
    autoExer.topMenu.cartButton.click();
    autoExer.topMenu.signupLogin.click();
    await autoExer.login(userMail, userPassword);
    autoExer.topMenu.cartButton.click();
    await expect(page.locator('#product-1')).toBeVisible();
    //Assert
  });
  test('TC21 - Add review on product', async ({ page }) => {
    //Arrange
    const userMail = LoginData.userMail;
    const userId = LoginData.userName;
    const addReview = 'Adding New Review';
    const revMessage = 'Thank you for your review.';
    //Act
    autoExer.topMenu.productsButton.click();
    page.getByRole('heading', { name: 'All Products' }),
      await expect(
        page.getByRole('heading', { name: 'All Products' }),
      ).toBeVisible();
    await page.getByText('View Product').first().click();
    await expect(
      page.locator('.category-tab .nav a[href="#reviews"]'),
    ).toHaveText('Write Your Review');
    await page.locator('#name').fill(userId);
    await page.locator('#email').fill(userMail);
    await page.locator('#review').fill(addReview);
    await page.locator('#button-review').click();
    //Assert
    await expect(page.locator('#review-section')).toHaveText(revMessage);
  });
  test('TC22 - Add to cart from Recommended items', async ({ page }) => {
    //Arrange

    //Act
    await expect(page.locator('.recommended_items')).toBeVisible();
    await page
      .locator('#recommended-item-carousel')
      .locator('.add-to-cart')
      .first()
      .click();
    await page
      .locator('.modal-content .text-center a[href="/view_cart"]')
      .click();
    //Assert
    await expect(page.locator('#product-1')).toBeVisible();
  });
  test('TC23 - Verify address details in checkout page', async ({ page }) => {
    //Arrange
    const userMail = LoginData.userMail;
    const userId = LoginData.userName;
    const userPassword = LoginData.userPassword;
    const correctLogin = 'Logged in as NewUser1337';

    //Act
    autoExer.topMenu.signupLogin.click();
    await autoExer.register(userId, userMail, userPassword);
    await expect(page.locator('[data-qa="account-created"]')).toHaveText(
      'Account Created!',
    );
    await page.locator('[data-qa="continue-button"]').click();
    await expect(page.getByText(correctLogin)).toHaveText(correctLogin);
    await page.locator('[data-product-id="1"]').nth(0).click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await autoExer.topMenu.cartButton.click();
    await expect(page.getByText('Shopping Cart')).toBeVisible();
    await page.getByText('Proceed To Checkout').click();
    await expect(
      page.locator('#address_delivery').locator('.address_firstname'),
    ).toContainText('Mr. Firstname1 Lastname1');
    await expect(
      page.locator('#address_invoice').locator('.address_firstname'),
    ).toContainText('Mr. Firstname1 Lastname1');
    //Assert
    await autoExer.deleteAcc.click();
    await expect(page.locator('[data-qa="account-deleted"]')).toBeVisible();
  });

  test('TC24 - Download Invoice after purchase order', async ({ page }) => {
    //Arrange
    const userMail = LoginData.userMail;
    const userId = LoginData.userName;
    const userPassword = LoginData.userPassword;
    const correctLogin = 'Logged in as NewUser1337';
    const expectedmessagePayment = 'You have been successfully subscribed!';

    //Act
    await page.locator('[data-product-id="1"]').nth(0).click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await autoExer.topMenu.cartButton.click();
    await expect(page.getByText('Shopping Cart')).toBeVisible();
    await page.getByText('Proceed To Checkout').click();
    await page.getByRole('button', { name: 'Continue On Cart' }).click();
    await autoExer.topMenu.signupLogin.click();
    await autoExer.register(userId, userMail, userPassword);
    await expect(page.locator('[data-qa="account-created"]')).toHaveText(
      'Account Created!',
    );
    await page.locator('[data-qa="continue-button"]').click();
    await expect(page.getByText(correctLogin)).toHaveText(correctLogin);
    await autoExer.topMenu.cartButton.click();
    await page.getByText('Proceed To Checkout').click();
    await expect(
      page.locator('#address_delivery').locator('.address_firstname'),
    ).toContainText('Mr. Firstname1 Lastname1');
    await expect(
      page.locator('#address_invoice').locator('.address_firstname'),
    ).toContainText('Mr. Firstname1 Lastname1');
    await expect(
      page.locator('#cart_items').locator('h2:has-text("Review Your Order")'),
    ).toBeVisible();
    await expect(page.locator('#product-1')).toBeVisible();
    await page
      .locator('#ordermsg')
      .locator('.form-control')
      .fill('Testmessage');
    await page.getByRole('link', { name: 'Place Order' }).click();
    await page.locator('[data-qa="name-on-card"]').fill('NameOnCard');
    await page.locator('[data-qa="card-number"]').fill('777666555444');
    await page.locator('[data-qa="cvc"]').fill('777');
    await page.locator('[data-qa="expiry-month"]').fill('01');
    await page.locator('[data-qa="expiry-year"]').fill('1990');
    await page.locator('[data-qa="pay-button"]').click();
    await expect(page.locator('.alert-success')).toHaveText(
      expectedmessagePayment,
    );
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('link', { name: 'Download Invoice' }).click();
    await page.getByRole('link', { name: 'Continue' }).click();
    //Assert
    await autoExer.topMenu.deleteButton.click();
    await expect(page.locator('[data-qa="account-deleted"]')).toBeVisible();
  });

  test('TC25 - Verify Scroll Up using Arrow button and Scroll Down functionality', async ({
    page,
  }) => {
    //Arrange
    const expectedMess =
      'Full-Fledged practice website for Automation Engineers';
    //Act
    await expect(
      page.locator('#footer').locator('h2:has-text("Subscription")'),
    ).toHaveText('Subscription');
    await page.locator('.grippy-host').click();
    await page.evaluate(() => {
      window.scrollBy(0, 700);
    });
    await page.locator('#scrollUp').click();
    await page.waitForTimeout(200);
    //Assert
    await expect(page.locator('#slider-carousel')).toBeInViewport();
    await expect(page.locator('#slider-carousel')).toContainText(expectedMess);
  });
  test('TC26 - Verify Scroll Up using Arrow button and Scroll Down functionality', async ({
    page,
  }) => {
    //Arrange
    const expectedMess =
      'Full-Fledged practice website for Automation Engineers';
    //Act
    await expect(
      page.locator('#footer').locator('h2:has-text("Subscription")'),
    ).toHaveText('Subscription');
    await page.locator('.grippy-host').click();
    await page.evaluate(() => {
      window.scrollBy(0, 700);
    });
    await page.evaluate(() => {
      window.scrollBy(0, -700);
    });
    //Assert
    await expect(page.locator('#slider-carousel')).toBeInViewport();
    await expect(page.locator('#slider-carousel')).toContainText(expectedMess);
  });
});
