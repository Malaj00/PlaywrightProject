import { test, expect } from '@playwright/test';
import { AutomationExercise } from '../pages/automationexercise.page';
import userCredentials from '../test-data/userCredentials.json';
import { pathToFileURL } from 'url';

test.describe.configure({ mode: 'serial' });

test.describe('Register and login tests', () => {
  let autoExer: AutomationExercise;
  test.beforeEach(async ({ page }) => {
    autoExer = new AutomationExercise(page);
    await page.goto('http://automationexercise.com');
    await autoExer.consentButton.click();
    await expect(autoExer.sliderCarousel).toBeVisible();
    await autoExer.topMenu.signupLogin.click();
    await expect(autoExer.loginToAcc).toHaveText('Login to your account');
    await expect(autoExer.newUserSignup).toHaveText('New User Signup!');
  });

  test('TC1 - Register User', { tag: '@register' }, async ({ page }) => {
    //Arrange

    //Act
    await autoExer.register(
      userCredentials.userName,
      userCredentials.userMail,
      userCredentials.userPassword,
      userCredentials.days,
      userCredentials.month,
      userCredentials.year,
      userCredentials.company,
      userCredentials.firstName,
      userCredentials.lastName,
      userCredentials.address,
      userCredentials.mobile,
      userCredentials.country,
      userCredentials.state,
      userCredentials.city,
      userCredentials.zipcode,
    );

    //Assert
  });

  test('TC2 - Login', { tag: '@login' }, async ({ page }) => {
    //Arrange
    const correctLogin = 'Logged in as NewUser1337';
    //Act
    await autoExer.login(
      userCredentials.userMail,
      userCredentials.userPassword,
    );
    //Assert
    await expect(page.getByText(correctLogin)).toHaveText(correctLogin);
  });
  test(
    'TC3 - Login with incorrect data',
    { tag: '@login' },
    async ({ page }) => {
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
    },
  );
  test('TC4 - Logout User', { tag: '@login' }, async ({ page }) => {
    //Arrange
    const correctLogin = 'Logged in as NewUser1337';
    const logoutMessage = 'Login to your account';
    //Act
    await autoExer.login(
      userCredentials.userMail,
      userCredentials.userPassword,
    );
    await expect(page.getByText(correctLogin)).toHaveText(correctLogin);
    await autoExer.logoutButton.click();
    //Assert
    await expect(page.getByText(logoutMessage)).toHaveText(logoutMessage);
  });
  test(
    'TC5 - Register User with existing email',
    { tag: '@register' },
    async ({ page }) => {
      //Arrange
      const emailExist = 'Email Address already exist!';
      //Act
      await autoExer.nameBox.fill(userCredentials.userName);
      await autoExer.mailSignup.fill(userCredentials.userMail);
      await autoExer.signupButton.click();
      //Assert
      await expect(page.getByText(emailExist)).toHaveText(emailExist);
    },
  );
  test('TC0 - Deleting Account', { tag: '@delete' }, async ({ page }) => {
    //Arrange
    //Act
    await autoExer.login(
      userCredentials.userMail,
      userCredentials.userPassword,
    );
    await autoExer.topMenu.deleteButton.click();
    //Assert
    await expect(autoExer.accDel).toBeVisible();
  });
});

test.describe('Other Pages', () => {
  let autoExer: AutomationExercise;
  test.beforeEach(async ({ page }) => {
    autoExer = new AutomationExercise(page);
    await page.goto('http://automationexercise.com');
    await autoExer.consentButton.click();
    await expect(autoExer.sliderCarousel).toBeVisible();
  });
  test('TC6 - Contact Us Form', { tag: '@topmenu' }, async ({ page }) => {
    //Arrange
    const subjectMess = 'AnySubject123';
    const suppMess = 'Randomly generated message.';
    const submitMessage =
      'Success! Your details have been submitted successfully.';
    //Act
    await autoExer.topMenu.contactButton.click();
    await autoExer.getinTouch.click();
    await autoExer.emailContact.fill(userCredentials.userMail);
    await autoExer.nameBox.fill(userCredentials.userName);
    await autoExer.subjectBox.fill(subjectMess);
    await autoExer.contactMess.fill(suppMess);
    await autoExer.uploadFile.setInputFiles('README.md');
    page.once('dialog', async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      expect(dialog.message()).toContain('Press OK to proceed!');
      await dialog.accept();
    });
    await autoExer.submitButton.click();
    await expect(autoExer.contactPage.getByText(submitMessage)).toHaveText(
      submitMessage,
    );
    await autoExer.homeButton.click();
    //Assert
    await expect(autoExer.sliderCarousel).toBeVisible();
  });

  test(
    'TC7 - Verify Test Cases Page',
    { tag: '@topmenu' },
    async ({ page }) => {
      //Arrange
      const textTC = 'Test Cases';
      //Act
      await autoExer.topMenu.testcasesButton.click();
      //Assert
      await expect(autoExer.textCenter).toHaveText(textTC);
    },
  );
  test(
    'TC8 - Verify All Products and product detail page',
    { tag: '@topmenu' },
    async ({ page }) => {
      //Arrange
      //Act
      await autoExer.topMenu.productsButton.click();
      await expect(autoExer.allProducts).toBeVisible();
      await expect(autoExer.featuresItems).toBeVisible();
      await autoExer.viewProduct.first().click();
      //Assert
      await expect(autoExer.blueTop).toBeVisible();
      await expect(autoExer.categoryTops).toBeVisible();
      await expect(autoExer.priceProduct).toContainText(/^Rs\.\s*\d+/);
      await expect(autoExer.availabilityProduct).toHaveText(
        /^Availability:\s*\w.+/,
      );
      await expect(autoExer.conditionProduct).toHaveText(/^Condition:\s*\w.+/);
      await expect(autoExer.brandProduct).toHaveText(/^Brand:\s*\w.+/);
    },
  );
  test('TC9 - Search Product', { tag: '@search' }, async ({ page }) => {
    //Arrange
    const productName = 'Blue Top';
    //Act
    await autoExer.topMenu.productsButton.click();
    await expect(autoExer.allProducts).toBeVisible();
    await autoExer.searchProduct.fill(productName);
    await autoExer.submitSearch.click();
    await expect(autoExer.searchedProducts).toBeVisible();
    //Assert
    await expect(autoExer.blueTopSearched.first()).toContainText(productName);
  });
  test(
    'TC10 - Verify Subscription in home page',
    { tag: '@subscription' },
    async ({ page }) => {
      //Arrange
      const sub = 'Subscription';
      const subbed = 'You have been successfully subscribed!';
      //Act
      await expect(autoExer.footerPage).toContainText(sub);
      await autoExer.subsribeMail.fill(userCredentials.userMail);
      await autoExer.subButton.click();
      //Assert
      await expect(autoExer.subSucces).toBeVisible();
      await expect(autoExer.subSucces).toHaveText(subbed);
    },
  );
  test(
    'TC11 - Verify Subscription in Cart page',
    { tag: '@subscription' },
    async ({ page }) => {
      //Arrange
      const subbed = 'You have been successfully subscribed!';
      const sub = 'Subscription';
      //Act
      await autoExer.topMenu.cartButton.click();
      await expect(autoExer.footerPage).toContainText(sub);
      await autoExer.subsribeMail.fill(userCredentials.userMail);
      await autoExer.subButton.click();
      //Assert
      await expect(autoExer.subSucces).toBeVisible();
      await expect(autoExer.subSucces).toHaveText(subbed);
    },
  );
  test('TC12 - Add Products in Cart', { tag: '@cart' }, async ({ page }) => {
    //Arrange
    //Act
    await autoExer.topMenu.productsButton.click();
    await autoExer.dataProduct1.nth(0).click();
    await autoExer.shoppingButton.click();
    await autoExer.dataProduct2.nth(0).click();
    await autoExer.viewCart.click();
    //Assert
    await expect(autoExer.productOne).toBeVisible();
    await expect(autoExer.productTwo).toBeVisible();
    await expect(autoExer.cartP1Price).toHaveText(/Rs\.\s*\d+/);
    await expect(autoExer.cartP2Price).toHaveText(/Rs\.\s*\d+/);
    await expect(autoExer.cartP1Total).toHaveText(/Rs\.\s*\d+/);
    await expect(autoExer.cartP2Total).toHaveText(/Rs\.\s*\d+/);
    await expect(autoExer.cartP1Quantity).toBeVisible();
    await expect(autoExer.cartP2Quantity).toBeVisible();
  });

  test(
    'TC13 - Verify Product quantity in Cart',
    { tag: '@cart' },
    async ({ page }) => {
      //Arrange

      //Act
      await autoExer.topMenu.productsButton.click();
      await autoExer.viewProd8.click();
      await expect(autoExer.rsText).toContainText(/^Rs\.\s*\d+/);
      await expect(autoExer.availabilityProduct).toHaveText(
        /^Availability:\s*\w.+/,
      );
      await expect(autoExer.conditionProduct).toHaveText(/^Condition:\s*\w.+/);
      await expect(autoExer.brandProduct).toHaveText(/^Brand:\s*\w.+/);
      await autoExer.quantityProduct.fill('4');
      await autoExer.addToCart.click();
      await autoExer.viewCart.click();
      //Assert
      await expect(autoExer.cartProduct).toBeVisible();
      await expect(autoExer.cartQuantity).toHaveText(/\d+/);
    },
  );

  test(
    'TC14 - Place Order: Register while Checkout',
    { tag: '@register' },
    async ({ page }) => {
      //Arrange
      const correctLogin = `Logged in as ${userCredentials.userName}`;
      const expectedmessagePayment = 'You have been successfully subscribed!';
      //Act
      await autoExer.topMenu.productsButton.click();
      await page.locator('[data-product-id="1"]').nth(0).click();
      await page.getByRole('button', { name: 'Continue Shopping' }).click();
      await autoExer.topMenu.cartButton.click();
      await expect(page.getByText('Shopping Cart')).toBeVisible();
      await page.getByText('Proceed To Checkout').click();
      await page.getByRole('link', { name: 'Register / Login' }).click();
      await autoExer.register(
        userCredentials.userName,
        userCredentials.userMail,
        userCredentials.userPassword,
        userCredentials.days,
        userCredentials.month,
        userCredentials.year,
        userCredentials.company,
        userCredentials.firstName,
        userCredentials.lastName,
        userCredentials.address,
        userCredentials.mobile,
        userCredentials.country,
        userCredentials.state,
        userCredentials.city,
        userCredentials.zipcode,
      );
      await expect(page.locator('[data-qa="account-created"]')).toHaveText(
        'Account Created!',
      );
      await page.locator('[data-qa="continue-button"]').click();
      await expect(page.getByText(correctLogin)).toHaveText(correctLogin);
      await autoExer.topMenu.cartButton.click();
      await page.getByText('Proceed To Checkout').click();
      await expect(
        page.locator('#address_delivery').locator('.address_firstname'),
      ).toContainText(
        `Mr. ${userCredentials.firstName} ${userCredentials.lastName}`,
      );
      await expect(
        page.locator('#address_invoice').locator('.address_firstname'),
      ).toContainText(
        `Mr. ${userCredentials.firstName} ${userCredentials.lastName}`,
      );
      await expect(
        page.locator('#cart_items').locator('h2:has-text("Review Your Order")'),
      ).toBeVisible();
      await expect(page.locator('#product-1')).toBeVisible();
      await page
        .locator('#ordermsg')
        .locator('.form-control')
        .fill('Testmessage');
      await page.getByRole('link', { name: 'Place Order' }).click();
      await autoExer.cardPay(
        userCredentials.nameOnCard,
        userCredentials.cardNumber,
        userCredentials.cvcNumber,
        userCredentials.exprMonth,
        userCredentials.exprYears,
      );
      //Assert
      await expect(page.locator('.alert-success')).toHaveText(
        expectedmessagePayment,
      );
      await autoExer.deleteAccount();
    },
  );
  test(
    'TC15 - Place Order: Register while Checkout',
    { tag: '@register' },
    async ({ page }) => {
      //Arrange
      const correctLogin = `Logged in as ${userCredentials.userName}`;
      const expectedmessagePayment = 'You have been successfully subscribed!';
      //Act
      await autoExer.deleteAccount;
      await autoExer.topMenu.signupLogin.click();
      await autoExer.register(
        userCredentials.userName,
        userCredentials.userMail,
        userCredentials.userPassword,
        userCredentials.days,
        userCredentials.month,
        userCredentials.year,
        userCredentials.company,
        userCredentials.firstName,
        userCredentials.lastName,
        userCredentials.address,
        userCredentials.mobile,
        userCredentials.country,
        userCredentials.state,
        userCredentials.city,
        userCredentials.zipcode,
      );
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
      ).toContainText(
        `Mr. ${userCredentials.firstName} ${userCredentials.lastName}`,
      );
      await expect(
        page.locator('#address_invoice').locator('.address_firstname'),
      ).toContainText(
        `Mr. ${userCredentials.firstName} ${userCredentials.lastName}`,
      );
      await expect(
        page.locator('#cart_items').locator('h2:has-text("Review Your Order")'),
      ).toBeVisible();
      await expect(page.locator('#product-1')).toBeVisible();
      await page
        .locator('#ordermsg')
        .locator('.form-control')
        .fill('Testmessage');
      await page.getByRole('link', { name: 'Place Order' }).click();
      await autoExer.cardPay(
        userCredentials.nameOnCard,
        userCredentials.cardNumber,
        userCredentials.cvcNumber,
        userCredentials.exprMonth,
        userCredentials.exprYears,
      );
      //Assert
      await expect(page.locator('.alert-success')).toHaveText(
        expectedmessagePayment,
      );
      await autoExer.deleteAccount();
    },
  );
  test(
    'TC16 - Place Order: Login before Checkout',
    { tag: '@login' },
    async ({ page }) => {
      //Arrange
      const correctLogin = `Logged in as ${userCredentials.userName}`;
      const expectedmessagePayment = 'You have been successfully subscribed!';
      //Act
      await autoExer.topMenu.signupLogin.click();
      await autoExer.register(
        userCredentials.userName,
        userCredentials.userMail,
        userCredentials.userPassword,
        userCredentials.days,
        userCredentials.month,
        userCredentials.year,
        userCredentials.company,
        userCredentials.firstName,
        userCredentials.lastName,
        userCredentials.address,
        userCredentials.mobile,
        userCredentials.country,
        userCredentials.state,
        userCredentials.city,
        userCredentials.zipcode,
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
      ).toContainText(
        `Mr. ${userCredentials.firstName} ${userCredentials.lastName}`,
      );
      await expect(
        page.locator('#address_invoice').locator('.address_firstname'),
      ).toContainText(
        `Mr. ${userCredentials.firstName} ${userCredentials.lastName}`,
      );
      await expect(
        page.locator('#cart_items').locator('h2:has-text("Review Your Order")'),
      ).toBeVisible();
      await expect(page.locator('#product-1')).toBeVisible();
      await page
        .locator('#ordermsg')
        .locator('.form-control')
        .fill('Testmessage');
      await page.getByRole('link', { name: 'Place Order' }).click();
      await autoExer.cardPay(
        userCredentials.nameOnCard,
        userCredentials.cardNumber,
        userCredentials.cvcNumber,
        userCredentials.exprMonth,
        userCredentials.exprYears,
      );
      //Assert
      await expect(page.locator('.alert-success')).toHaveText(
        expectedmessagePayment,
      );
      await autoExer.deleteAccount();
    },
  );
  test(
    'TC17 - Remove Products From Cart',
    { tag: '@cart' },
    async ({ page }) => {
      //Arrange
      //Act
      await page.locator('[data-product-id="1"]').nth(0).click();
      await page.getByRole('button', { name: 'Continue Shopping' }).click();
      await autoExer.topMenu.cartButton.click();
      await expect(page.getByText('Shopping Cart')).toBeVisible();
      await page
        .locator('[data-product-id="1"]')
        .locator('.fa')
        .first()
        .click();
      //Assert
      await expect(page.locator('#empty_cart')).toBeVisible();
    },
  );
  test(
    'TC18 - View Category Products',
    { tag: '@category' },
    async ({ page }) => {
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
      //Assert
      await expect(page.locator('.title')).toBeVisible();
    },
  );
  test(
    'TC19 - View & Cart Brand Products',
    { tag: '@cart' },
    async ({ page }) => {
      //Arrange
      //Act
      autoExer.topMenu.productsButton.click();
      await expect(
        page.locator('.left-sidebar h2:has-text("Brands")'),
      ).toBeVisible();
      await page.locator('.nav').first().click();
      await expect(page.locator('.title')).toBeVisible();
      await page.locator('.nav').nth(1).click();
      //Assert
      await expect(page.locator('.title')).toBeVisible();
    },
  );
  test(
    'TC20 - Search Products and Verify Cart After Login',
    { tag: ['@cart', '@login'] },
    async ({ page }) => {
      //Arrange
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
      await autoExer.login(
        userCredentials.userMail,
        userCredentials.userPassword,
      );
      autoExer.topMenu.cartButton.click();
      //Assert
      await expect(page.locator('#product-1')).toBeVisible();
    },
  );
  test('TC21 - Add review on product', { tag: '@revuew' }, async ({ page }) => {
    //Arrange
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
    await page.locator('#name').fill(userCredentials.userName);
    await page.locator('#email').fill(userCredentials.userMail);
    await page.locator('#review').fill(addReview);
    await page.locator('#button-review').click();
    //Assert
    await expect(page.locator('#review-section')).toHaveText(revMessage);
  });
  test(
    'TC22 - Add to cart from Recommended items',
    { tag: '@cart' },
    async ({ page }) => {
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
    },
  );
  test(
    'TC23 - Verify address details in checkout page',
    { tag: '@register' },
    async ({ page }) => {
      //Arrange
      const correctLogin = `Logged in as ${userCredentials.userName}`;
      //Act
      autoExer.topMenu.signupLogin.click();
      await autoExer.register(
        userCredentials.userName,
        userCredentials.userMail,
        userCredentials.userPassword,
        userCredentials.days,
        userCredentials.month,
        userCredentials.year,
        userCredentials.company,
        userCredentials.firstName,
        userCredentials.lastName,
        userCredentials.address,
        userCredentials.mobile,
        userCredentials.country,
        userCredentials.state,
        userCredentials.city,
        userCredentials.zipcode,
      );
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
      ).toContainText(
        `Mr. ${userCredentials.firstName} ${userCredentials.lastName}`,
      );
      await expect(
        page.locator('#address_invoice').locator('.address_firstname'),
      ).toContainText(
        `Mr. ${userCredentials.firstName} ${userCredentials.lastName}`,
      );
      //Assert
      await autoExer.deleteAcc.click();
      await expect(page.locator('[data-qa="account-deleted"]')).toBeVisible();
    },
  );

  test(
    'TC24 - Download Invoice after purchase order',
    { tag: ['@invoice', '@register'] },
    async ({ page }) => {
      //Arrange
      const correctLogin = `Logged in as ${userCredentials.userName}`;
      const expectedmessagePayment = 'You have been successfully subscribed!';
      //Act
      await page.locator('[data-product-id="1"]').nth(0).click();
      await page.getByRole('button', { name: 'Continue Shopping' }).click();
      await autoExer.topMenu.cartButton.click();
      await expect(page.getByText('Shopping Cart')).toBeVisible();
      await page.getByText('Proceed To Checkout').click();
      await page.getByRole('button', { name: 'Continue On Cart' }).click();
      await autoExer.topMenu.signupLogin.click();
      await autoExer.register(
        userCredentials.userName,
        userCredentials.userMail,
        userCredentials.userPassword,
        userCredentials.days,
        userCredentials.month,
        userCredentials.year,
        userCredentials.company,
        userCredentials.firstName,
        userCredentials.lastName,
        userCredentials.address,
        userCredentials.mobile,
        userCredentials.country,
        userCredentials.state,
        userCredentials.city,
        userCredentials.zipcode,
      );
      await expect(page.locator('[data-qa="account-created"]')).toHaveText(
        'Account Created!',
      );
      await page.locator('[data-qa="continue-button"]').click();
      await expect(page.getByText(correctLogin)).toHaveText(correctLogin);
      await autoExer.topMenu.cartButton.click();
      await page.getByText('Proceed To Checkout').click();
      await expect(
        page.locator('#address_delivery').locator('.address_firstname'),
      ).toContainText(
        `Mr. ${userCredentials.firstName} ${userCredentials.lastName}`,
      );
      await expect(
        page.locator('#address_invoice').locator('.address_firstname'),
      ).toContainText(
        `Mr. ${userCredentials.firstName} ${userCredentials.lastName}`,
      );
      await expect(
        page.locator('#cart_items').locator('h2:has-text("Review Your Order")'),
      ).toBeVisible();
      await expect(page.locator('#product-1')).toBeVisible();
      await page
        .locator('#ordermsg')
        .locator('.form-control')
        .fill('Testmessage');
      await page.getByRole('link', { name: 'Place Order' }).click();
      await autoExer.cardPay(
        userCredentials.nameOnCard,
        userCredentials.cardNumber,
        userCredentials.cvcNumber,
        userCredentials.exprMonth,
        userCredentials.exprYears,
      );
      await expect(page.locator('.alert-success')).toHaveText(
        expectedmessagePayment,
      );
      const downloadPromise = page.waitForEvent('download');
      await page.getByRole('link', { name: 'Download Invoice' }).click();
      await page.getByRole('link', { name: 'Continue' }).click();
      //Assert
      await autoExer.topMenu.deleteButton.click();
      await expect(page.locator('[data-qa="account-deleted"]')).toBeVisible();
    },
  );

  test(
    'TC25 - Verify Scroll Up using Arrow button and Scroll Down functionality',
    { tag: '@scroll' },
    async ({ page }) => {
      //Arrange
      const expectedMess =
        'Full-Fledged practice website for Automation Engineers';
      //Act
      await expect(
        page.locator('#footer').locator('h2:has-text("Subscription")'),
      ).toHaveText('Subscription');
      await page.evaluate(() => {
        window.scrollBy(0, 700);
      });
      await page.locator('#scrollUp').click();
      await page.waitForTimeout(200);
      //Assert
      await expect(page.locator('#slider-carousel')).toBeInViewport();
      await expect(page.locator('#slider-carousel')).toContainText(
        expectedMess,
      );
    },
  );
  test(
    'TC26 - Verify Scroll Up using Arrow button and Scroll Down functionality',
    { tag: '@scroll' },
    async ({ page }) => {
      //Arrange
      const expectedMess =
        'Full-Fledged practice website for Automation Engineers';
      //Act
      await expect(
        page.locator('#footer').locator('h2:has-text("Subscription")'),
      ).toHaveText('Subscription');
      //await page.locator('.grippy-host').click();
      await page.evaluate(() => {
        window.scrollBy(0, 700);
      });
      await page.evaluate(() => {
        window.scrollBy(0, -700);
      });
      //Assert
      await expect(page.locator('#slider-carousel')).toBeInViewport();
      await expect(page.locator('#slider-carousel')).toContainText(
        expectedMess,
      );
    },
  );
});
