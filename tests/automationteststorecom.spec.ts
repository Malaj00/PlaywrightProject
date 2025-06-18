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

test.describe('Store tests', () => {
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
    const payAddress = 'Payment Address';
    // Act:
    await storePage.accountText.nth(2).hover();
    await storePage.checkOrderLink.click();
    await storePage.checkOrderView.first().click();
    // Assert:
    await expect(
      storePage.tdLocator.filter({ hasText: payAddress }),
    ).toContainText(
      `${autostoreCredential.firstName} ${autostoreCredential.lastName}`,
    );
  });

  test('Cart checkout while logged off', async ({ page }) => {
    // Arrange:
    const logoutText = ' Account Logout';
    const checkoutAddress = 'TE 12 ST Thais Guera 03405 Chad';
    const checkoutShip = 'Flat Shipping Rate';
    const checkoutPayment = 'Cash On Delivery';
    const successOrder = 'Your Order Has Been Processed!';
    // Act:
    await storePage.accountText.nth(2).hover();
    await storePage.logoutButton.click();
    await expect(storePage.mainText).toHaveText(logoutText);
    await storePage.continueButton.click();
    await storePage.product52.click();
    await storePage.cartMenuButton.click();
    await storePage.cartCheckout.click();
    await storePage.login(
      autostoreCredential.userName,
      autostoreCredential.userPassword,
    );
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
    await storePage.checkoutButton.click();
    // Assert:
    await expect(storePage.mainText).toContainText(successOrder);
  });

  test('Special Offers', async ({ page }) => {
    // Arrange:
    const specialOff = ' Special Offers';
    const productSale = 'Absolue Eye Precious Cells';
    const shopCart = ' Shopping Cart';
    // Act:
    await storePage.specialsButton.click();
    await expect(storePage.mainText).toHaveText(specialOff);
    await expect(storePage.saleClass.first()).toBeVisible();
    await expect(storePage.productName.first()).toHaveText(productSale);
    await expect(storePage.oldPrice.first()).toBeVisible();
    await expect(storePage.newPrice.first()).toBeVisible();
    await storePage.product65.first().click();
    await storePage.quickBasket.click();
    // Assert:
    await expect(storePage.mainText).toHaveText(shopCart);
  });

  test('Currency change', async ({ page }) => {
    // Arrange:
    const dollar = '$28.00';
    const euro = '26.28€';
    // Act:
    await storePage.homeButton.click();
    await storePage.product52.click();
    await storePage.cartMenuButton.click();
    await expect(storePage.priceDollarCart).toContainText(dollar);
    await storePage.currencyHover.first().hover();
    await storePage.euroSet.click();
    // Assert:
    await expect(storePage.priceEuroCart).toContainText(euro);
  });
});

test.describe('Other tests', () => {
  let storePage: AutomationStore;
  test.beforeEach(async ({ page }) => {
    storePage = new AutomationStore(page);
    await page.goto('https://automationteststore.com/');
    await expect(storePage.welcomeMsg).toContainText(
      'Welcome to the Automation Test Store!',
    );
  });

  test('Newsletter signup - invalid', async ({ page }) => {
    // Arrange:
    const newsLetter = 'Newsletter Signup';
    const subError =
      'Our records indicate that you have an account with us. Please login to your account to manage your newsletter subscription.';
    const captchaError = 'Human verification has failed! Please try agan.';
    // Act:
    await expect(storePage.newsSignup).toContainText(newsLetter);
    await storePage.newsInput.fill(autostoreCredential.userMail);
    await storePage.subButton.click();
    await storePage.subFName.fill(autostoreCredential.firstName);
    await storePage.subLName.fill(autostoreCredential.lastName);
    await storePage.subButton.first().click();
    // Assert:
    await expect(storePage.errorAlert).toContainText(subError);
    await expect(storePage.helpBlock.nth(4)).toHaveText(captchaError);
  });

  test('Scroll up button', async ({ page }) => {
    // Arrange:
    // Act:
    await page.evaluate(() => {
      window.scrollBy(0, 700);
    });
    await storePage.scrollUp.click();
    // Assert:
    await expect(storePage.searchBox).toBeInViewport();
  });

  test('Categories', async ({ page }) => {
    // Arrange:
    const shoes = 'Shoes';
    const tshirts = 'T-shirts';
    const cheeks = 'Cheeks';
    const eyesMake = 'Eyes';
    const faceMake = 'Face';
    const lips = 'Lips';
    const nails = 'Nails';
    const valuesets = 'Value Sets';
    const eyesSkin = 'Eyes';
    const faceSkin = 'Face';
    const giftSets = 'Gift Ideas & Sets';
    const handsNails = 'Hands & Nails';
    const sun = 'Sun';
    const man = 'Men';
    const women = 'Women';

    // Act:
    await storePage.categoryMenu.ApparelAcc.hover();
    await expect(storePage.categoryMenu.Shoes).toHaveText(shoes);
    await expect(storePage.categoryMenu.Tshirts).toHaveText(tshirts);
    await storePage.categoryMenu.Makeup.hover();
    await expect(storePage.categoryMenu.Cheeks).toHaveText(cheeks);
    await expect(storePage.categoryMenu.EyesMake).toHaveText(eyesMake);
    await expect(storePage.categoryMenu.FaceMake).toHaveText(faceMake);
    await expect(storePage.categoryMenu.Lips).toHaveText(lips);
    await expect(storePage.categoryMenu.Nails).toHaveText(nails);
    await expect(storePage.categoryMenu.ValueSets).toHaveText(valuesets);
    await storePage.categoryMenu.Skincare.hover();
    await expect(storePage.categoryMenu.EyesSkin).toHaveText(eyesSkin);
    await expect(storePage.categoryMenu.FaceSkin).toHaveText(faceSkin);
    await expect(storePage.categoryMenu.GiftSets).toHaveText(giftSets);
    await expect(storePage.categoryMenu.HandsNails).toHaveText(handsNails);
    await expect(storePage.categoryMenu.Sun).toHaveText(sun);
    await storePage.categoryMenu.Fragrnance.hover();
    await expect(storePage.categoryMenu.MenFragn).toHaveText(man);
    await expect(storePage.categoryMenu.WomenFragn).toHaveText(women);
    // Assert:
  });
});
