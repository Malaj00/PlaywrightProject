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

  test.skip('TC1 - Register User', { tag: '@register' }, async ({ page }) => {
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
      const tstMess = 'Testmessage';
      const accountCreated = 'Account Created!';
      const correctLogin = `Logged in as ${userCredentials.userName}`;
      const expectedmessagePayment = 'You have been successfully subscribed!';
      //Act
      await autoExer.topMenu.productsButton.click();
      await autoExer.dataProduct1.nth(0).click();
      await autoExer.shoppingButton.click();
      await autoExer.topMenu.cartButton.click();
      await expect(autoExer.shoppingCart).toBeVisible();
      await autoExer.gotoCheckout.click();
      await autoExer.reglogLink.click();
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
      await expect(autoExer.accCreated).toHaveText(accountCreated);
      await autoExer.contButton.click();
      await expect(page.getByText(correctLogin)).toHaveText(correctLogin);
      await autoExer.topMenu.cartButton.click();
      await autoExer.gotoCheckout.click();
      await expect(autoExer.deliveryFName).toContainText(
        `Mr. ${userCredentials.firstName} ${userCredentials.lastName}`,
      );
      await expect(autoExer.invoiceFName).toContainText(
        `Mr. ${userCredentials.firstName} ${userCredentials.lastName}`,
      );
      await expect(
        autoExer.cartItems.filter({ has: page.getByText('Review Your Order') }),
      ).toBeVisible();
      await expect(autoExer.productOne).toBeVisible();
      await autoExer.formControl.fill(tstMess);
      await autoExer.placeOrder.click();
      await autoExer.cardPay(
        userCredentials.nameOnCard,
        userCredentials.cardNumber,
        userCredentials.cvcNumber,
        userCredentials.exprMonth,
        userCredentials.exprYears,
      );
      //Assert
      await expect(autoExer.alertSucces).toHaveText(expectedmessagePayment);
      await autoExer.deleteAccount();
    },
  );
  test(
    'TC15 - Place Order: Register while Checkout',
    { tag: '@register' },
    async ({ page }) => {
      //Arrange
      const tstMess = 'Testmessage';
      const accCreat = 'Account Created!';
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
      await expect(autoExer.accCreated).toHaveText(accCreat);
      await autoExer.contButton.click();
      await expect(page.getByText(correctLogin)).toHaveText(correctLogin);
      await autoExer.topMenu.productsButton.click();
      await autoExer.dataProduct1.nth(0).click();
      await autoExer.shoppingButton.click();
      await autoExer.topMenu.cartButton.click();
      await expect(autoExer.shoppingCart).toBeVisible();
      await autoExer.gotoCheckout.click();
      await expect(autoExer.deliveryFName).toContainText(
        `Mr. ${userCredentials.firstName} ${userCredentials.lastName}`,
      );
      await expect(autoExer.invoiceFName).toContainText(
        `Mr. ${userCredentials.firstName} ${userCredentials.lastName}`,
      );
      await expect(autoExer.cartItems).toBeVisible();
      await expect(autoExer.productOne).toBeVisible();
      await autoExer.formControl.fill(tstMess);
      await autoExer.placeOrder.click();
      await autoExer.cardPay(
        userCredentials.nameOnCard,
        userCredentials.cardNumber,
        userCredentials.cvcNumber,
        userCredentials.exprMonth,
        userCredentials.exprYears,
      );
      //Assert
      await expect(autoExer.alertSucces).toHaveText(expectedmessagePayment);
      await autoExer.deleteAccount();
    },
  );
  test(
    'TC16 - Place Order: Login before Checkout',
    { tag: '@login' },
    async ({ page }) => {
      //Arrange
      const tstMess = 'Testmessage';
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
      await autoExer.contButton.click();
      await expect(page.getByText(correctLogin)).toHaveText(correctLogin);
      await autoExer.dataProduct1.nth(0).click();
      await autoExer.shoppingButton.click();
      await autoExer.topMenu.cartButton.click();
      await expect(autoExer.shoppingCart).toBeVisible();
      await autoExer.gotoCheckout.click();
      await expect(autoExer.deliveryFName).toContainText(
        `Mr. ${userCredentials.firstName} ${userCredentials.lastName}`,
      );
      await expect(autoExer.invoiceFName).toContainText(
        `Mr. ${userCredentials.firstName} ${userCredentials.lastName}`,
      );
      await expect(autoExer.cartItems).toBeVisible();
      await expect(autoExer.productOne).toBeVisible();
      await autoExer.formControl.fill(tstMess);
      await autoExer.placeOrder.click();
      await autoExer.cardPay(
        userCredentials.nameOnCard,
        userCredentials.cardNumber,
        userCredentials.cvcNumber,
        userCredentials.exprMonth,
        userCredentials.exprYears,
      );
      //Assert
      await expect(autoExer.alertSucces).toHaveText(expectedmessagePayment);
      await autoExer.deleteAccount();
    },
  );
  test(
    'TC17 - Remove Products From Cart',
    { tag: '@cart' },
    async ({ page }) => {
      //Arrange
      const cartEmpty = 'Cart is empty!';
      //Act
      await autoExer.dataProduct1.nth(0).click();
      await autoExer.shoppingButton.click();
      await autoExer.topMenu.cartButton.click();
      await expect(autoExer.shoppingCart).toBeVisible();
      await autoExer.dataProduct1.first().click();
      //Assert
      await expect(autoExer.emptyCart).toContainText(cartEmpty);
    },
  );
  test(
    'TC18 - View Category Products',
    { tag: '@category' },
    async ({ page }) => {
      //Arrange
      //Act
      await expect(autoExer.sideBarCat).toBeVisible();
      await expect(autoExer.panelGroup).toBeVisible();
      await autoExer.womenLink.click();
      await autoExer.dressLink.click();
      await expect(autoExer.titleText).toBeVisible();
      await autoExer.badgeClass.nth(1).click();
      await autoExer.jeansLink.click();
      //Assert
      await expect(autoExer.titleText).toBeVisible();
    },
  );
  test(
    'TC19 - View & Cart Brand Products',
    { tag: '@cart' },
    async ({ page }) => {
      //Arrange
      //Act
      autoExer.topMenu.productsButton.click();
      await expect(autoExer.sideBarBrand).toBeVisible();
      await autoExer.navClass.first().click();
      await expect(autoExer.titleText).toBeVisible();
      await autoExer.navClass.nth(1).click();
      //Assert
      await expect(autoExer.titleText).toBeVisible();
    },
  );
  test(
    'TC20 - Search Products and Verify Cart After Login',
    { tag: ['@cart', '@login'] },
    async ({ page }) => {
      //Arrange
      const blueTop = 'Blue Top';
      //Act
      autoExer.topMenu.productsButton.click();
      await expect(autoExer.allProducts).toBeVisible();
      await autoExer.searchProduct.fill(blueTop);
      await autoExer.submitSearch.click();
      await expect(autoExer.productInfo).toBeVisible();
      await autoExer.dataProduct1.first().click();
      autoExer.topMenu.cartButton.click();
      autoExer.topMenu.signupLogin.click();
      await autoExer.login(
        userCredentials.userMail,
        userCredentials.userPassword,
      );
      autoExer.topMenu.cartButton.click();
      //Assert
      await expect(autoExer.productOne).toBeVisible();
    },
  );
  test('TC21 - Add review on product', { tag: '@revuew' }, async ({ page }) => {
    //Arrange
    const addReview = 'Adding New Review';
    const revMessage = 'Thank you for your review.';
    const writeRev = 'Write Your Review';
    //Act
    autoExer.topMenu.productsButton.click();
    await expect(autoExer.allProducts).toBeVisible();
    await autoExer.viewProduct.first().click();
    await expect(autoExer.reviewText).toHaveText(writeRev);
    await autoExer.nameReview.fill(userCredentials.userName);
    await autoExer.emailReview.fill(userCredentials.userMail);
    await autoExer.reviewTextBox.fill(addReview);
    await autoExer.reviewButton.click();
    //Assert
    await expect(autoExer.reviewSection).toHaveText(revMessage);
  });
  test(
    'TC22 - Add to cart from Recommended items',
    { tag: '@cart' },
    async ({ page }) => {
      //Arrange

      //Act
      await expect(autoExer.itemsRecomm).toBeVisible();
      await autoExer.recommendedCart.first().click();
      await autoExer.viewCart.click();
      //Assert
      await expect(autoExer.productOne).toBeVisible();
    },
  );
  test(
    'TC23 - Verify address details in checkout page',
    { tag: '@register' },
    async ({ page }) => {
      //Arrange
      const accountCreated = 'Account Created!';
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
      await expect(autoExer.accCreated).toHaveText(accountCreated);
      await autoExer.contButton.click();
      await expect(page.getByText(correctLogin)).toHaveText(correctLogin);
      await autoExer.dataProduct1.nth(0).click();
      await autoExer.shoppingButton.click();
      await autoExer.topMenu.cartButton.click();
      await expect(autoExer.shoppingCart).toBeVisible();
      await autoExer.gotoCheckout.click();
      await expect(autoExer.deliveryFName).toContainText(
        `Mr. ${userCredentials.firstName} ${userCredentials.lastName}`,
      );
      await expect(autoExer.invoiceFName).toContainText(
        `Mr. ${userCredentials.firstName} ${userCredentials.lastName}`,
      );
      //Assert
      await autoExer.deleteAcc.click();
      await expect(autoExer.accDel).toBeVisible();
    },
  );

  test(
    'TC24 - Download Invoice after purchase order',
    { tag: ['@invoice', '@register'] },
    async ({ page }) => {
      //Arrange
      const testMess = 'Testmessage';
      const reviewOrder = 'Review Your Order';
      const correctLogin = `Logged in as ${userCredentials.userName}`;
      const expectedmessagePayment = 'You have been successfully subscribed!';
      const accCreated = 'Account Created!';
      //Act
      await autoExer.dataProduct1.nth(0).click();
      await autoExer.shoppingButton.click();
      await autoExer.topMenu.cartButton.click();
      await expect(autoExer.shoppingCart).toBeVisible();
      await autoExer.gotoCheckout.click();
      await autoExer.continueCart.click();
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
      await expect(autoExer.accCreated).toHaveText(accCreated);
      await autoExer.contButton.click();
      await expect(page.getByText(correctLogin)).toHaveText(correctLogin);
      await autoExer.topMenu.cartButton.click();
      await autoExer.gotoCheckout.click();
      await expect(autoExer.deliveryFName).toContainText(
        `Mr. ${userCredentials.firstName} ${userCredentials.lastName}`,
      );
      await expect(autoExer.invoiceFName).toContainText(
        `Mr. ${userCredentials.firstName} ${userCredentials.lastName}`,
      );
      await expect(
        autoExer.cartItems.filter({ has: page.getByText(reviewOrder) }),
      ).toBeVisible();
      await expect(autoExer.productOne).toBeVisible();
      await autoExer.orderMsg.fill(testMess);
      await autoExer.placeOrder.click();
      await autoExer.cardPay(
        userCredentials.nameOnCard,
        userCredentials.cardNumber,
        userCredentials.cvcNumber,
        userCredentials.exprMonth,
        userCredentials.exprYears,
      );
      await expect(autoExer.alertSucces).toHaveText(expectedmessagePayment);
      const downloadPromise = page.waitForEvent('download');
      await autoExer.downloadInvoice.click();
      await autoExer.continueButton.click();
      //Assert
      await autoExer.topMenu.deleteButton.click();
      await expect(autoExer.accDel).toBeVisible();
    },
  );

  test(
    'TC25 - Verify Scroll Up using Arrow button and Scroll Down functionality',
    { tag: '@scroll' },
    async ({ page }) => {
      //Arrange
      const sub = 'Subscription';
      const expectedMess =
        'Full-Fledged practice website for Automation Engineers';
      //Act
      await expect(autoExer.footerPage).toContainText(sub);
      await page.evaluate(() => {
        window.scrollBy(0, 700);
      });
      await autoExer.scrllUp.click();
      await page.waitForTimeout(200);
      //Assert
      await expect(autoExer.sliderCarousel).toBeInViewport();
      await expect(autoExer.sliderCarousel).toContainText(expectedMess);
    },
  );
  test(
    'TC26 - Verify Scroll Up using Arrow button and Scroll Down functionality',
    { tag: '@scroll' },
    async ({ page }) => {
      //Arrange
      const sub = 'Subscription';
      const expectedMess =
        'Full-Fledged practice website for Automation Engineers';
      //Act
      await expect(autoExer.footerPage).toContainText(sub);
      //await page.locator('.grippy-host').click();
      await page.evaluate(() => {
        window.scrollBy(0, 700);
      });
      await page.evaluate(() => {
        window.scrollBy(0, -700);
      });
      //Assert
      await expect(autoExer.sliderCarousel).toBeInViewport();
      await expect(autoExer.sliderCarousel).toContainText(expectedMess);
    },
  );
});
