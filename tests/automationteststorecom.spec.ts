import { test } from '../fixtures/autoStoreFixture';
import { expect } from '@playwright/test';
import { AutomationStore } from '../pages/automationteststorecom.page';
import autostoreCredential from '../test-data/automationstore.json';

test.describe('Login and Register functionality', () => {
  // let storePage: AutomationStore;
  //test.beforeEach(async ({ page }) => {
  //   storePage = new AutomationStore(page);
  //   await page.goto('https://automationteststore.com/');
  //   await expect(storePage.welcomeMsg).toContainText(
  //     'Welcome to the Automation Test Store!',
  //   );
  //await page.context().clearCookies();
  //});

  test('User Register', async ({ storePage }) => {
    // Arrange:
    const createdAccount = ' Your Account Has Been Created!';
    const registeredMail = 'Error: E-Mail Address is already registered!';
    // Act:
    await storePage.loginPage.click();
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
    //await expect(storePage.mainText).toHaveText(createdAccount); //Assert for new account
  });

  test('Correct User login', async ({ loggedInStorePage }) => {
    // Arrange:
    const myAcc = ' My Account';
    // Act:
    // Assert:
    await expect(loggedInStorePage.mainText).toHaveText(myAcc);
    await expect(loggedInStorePage.subText).toHaveText(
      autostoreCredential.firstName,
    );
  });

  test('Incorrect username login', async ({ storePage }) => {
    // Arrange:
    const incName = 'loginName';
    const errorMess = 'Error: Incorrect login or password provided.';
    // Act:
    await storePage.loginPage.click();
    await storePage.loginInput.fill(incName);
    await storePage.passwordInput.fill(autostoreCredential.userPassword);
    await storePage.loginButton.click();
    // Assert:
    await expect(storePage.errorAlert).toContainText(errorMess);
  });

  test('Incorrect password login', async ({ storePage }) => {
    // Arrange:
    const incPass = 'passWord';
    const errorMess = 'Error: Incorrect login or password provided.';
    // Act:
    await storePage.loginPage.click();
    await storePage.loginInput.fill(autostoreCredential.userName);
    await storePage.passwordInput.fill(incPass);
    await storePage.loginButton.click();
    // Assert:
    await expect(storePage.errorAlert).toContainText(errorMess);
  });

  test('Forgot password positive', async ({ storePage }) => {
    // Arrange:
    const correctMess =
      'Success: Password reset link has been sent to your e-mail address.';
    // Act:
    await storePage.loginPage.click();
    await storePage.forgotPass.click();
    await storePage.forgotLogInput.fill(autostoreCredential.userName);
    await storePage.forgotEmlInput.fill(autostoreCredential.userMail);
    await storePage.continueButton.click();
    // Assert:
    await expect(storePage.succesAlert).toContainText(correctMess);
  });

  test('Forgot password negative', async ({ storePage }) => {
    // Arrange:
    const errorMess =
      'Error: No records found matching information your provided, please check your information and try again!';
    // Act:
    await storePage.loginPage.click();
    await storePage.forgotPass.click();
    await storePage.forgotLogInput.fill('test123');
    await storePage.forgotEmlInput.fill(autostoreCredential.userMail);
    await storePage.continueButton.click();
    // Assert:
    await expect(storePage.errorFrgPass).toContainText(errorMess);
  });

  test('Forgot login positive', async ({ storePage }) => {
    // Arrange:
    const correctMess =
      'Success: Your login name reminder has been sent to your e-mail address.';
    // Act:
    await storePage.loginPage.click();
    await storePage.forgotLogin.click();
    await storePage.forgotLNameInput.fill(autostoreCredential.lastName);
    await storePage.forgotEmlInput.fill(autostoreCredential.userMail);
    await storePage.continueButton.click();
    // Assert:
    await expect(storePage.succesAlert).toContainText(correctMess);
  });

  test('Forgot login negative', async ({ storePage }) => {
    // Arrange:
    const errorMess =
      'Error: No records found matching information your provided, please check your information and try again!';
    // Act:
    await storePage.loginPage.click();
    await storePage.forgotLogin.click();
    await storePage.forgotLNameInput.fill('test123');
    await storePage.forgotEmlInput.fill(autostoreCredential.userMail);
    await storePage.continueButton.click();
    // Assert:
    await expect(storePage.errorFrgPass).toContainText(errorMess);
  });

  test('Login - Logout - Login', async ({ loggedInStorePage }) => {
    // Arrange:
    const successLogout =
      'You have been logged off your account. It is now safe to leave the computer.';
    // Act:
    await expect(loggedInStorePage.welcomeBackAcc.first()).toHaveText(
      `Welcome back ${autostoreCredential.firstName}`,
    );
    await loggedInStorePage.welcomeBackAcc.first().hover();
    await loggedInStorePage.welcomeBackLogout.click();
    await expect(loggedInStorePage.contentPanel).toContainText(successLogout);
    await loggedInStorePage.continueButton.click();
    await loggedInStorePage.loginPage.click();
    await loggedInStorePage.login(
      autostoreCredential.userName,
      autostoreCredential.userPassword,
    );
    // Assert:
    await expect(loggedInStorePage.welcomeBackAcc.first()).toHaveText(
      `Welcome back ${autostoreCredential.firstName}`,
    );
  });
});

test.describe('Store tests', () => {
  // let storePage: AutomationStore;
  test.use({ testIdAttribute: 'data-id' });
  // test.beforeEach(async ({ page }) => {
  // storePage = new AutomationStore(page);
  // });

  test('Add product to cart while logged', async ({ cartProducts }) => {
    // Arrange:
    // Act:
    // Assert:
    await expect(cartProducts.bellaBambaCart).toBeVisible();
    await expect(cartProducts.quantity52).toBeVisible;
  });

  test('Remove product from the cart', async ({ cartProducts, page }) => {
    // Arrange:
    const emptyCart = 'Your shopping cart is empty!';
    // Act:
    const removeButtons = cartProducts.removeButton;
    while ((await removeButtons.count()) > 0) {
      await removeButtons.nth(0).click();
      await page.waitForTimeout(100);
    }
    // Assert:
    await expect(cartProducts.contentPanel).toContainText(emptyCart);
  });

  test('Checkout page', async ({ cartProducts }) => {
    // Arrange:
    const checkoutAddress = 'TE 12 ST Thais Guera 03405 Chad';
    const checkoutShip = 'Flat Shipping Rate';
    const checkoutPayment = 'Cash On Delivery';
    // Act:
    await cartProducts.cartCheckout.click();
    // Assert:
    await expect(cartProducts.checkoutTable.first()).toHaveText(
      `${autostoreCredential.firstName} ${autostoreCredential.lastName}`,
    );
    await expect(cartProducts.checkoutTable.nth(1)).toHaveText(checkoutAddress);
    await expect(cartProducts.checkoutTable.nth(2)).toHaveText(checkoutShip);
    await expect(cartProducts.checkoutTable.nth(3)).toHaveText(
      `${autostoreCredential.firstName} ${autostoreCredential.lastName}`,
    );
    await expect(cartProducts.checkoutTable.nth(4)).toHaveText(checkoutAddress);
    await expect(cartProducts.checkoutTable.nth(5)).toHaveText(checkoutPayment);
    const totalPrice = await cartProducts.totalAmount.nth(1).textContent();
    const price = Number(totalPrice?.replace('$', ''));
    await expect(price).toBeGreaterThan(0);
  });

  test('Confirm order', async ({ cartProducts }) => {
    // Arrange:
    const successOrder = 'Your Order Has Been Processed!';
    // Act:
    await cartProducts.cartCheckout.click();
    await cartProducts.checkoutButton.click();
    // Assert:
    await expect(cartProducts.mainText).toContainText(successOrder);
  });

  test('Check your order', async ({ loggedInStorePage }) => {
    // Arrange:
    const payAddress = 'Payment Address';
    // Act:
    await loggedInStorePage.accountText.nth(2).hover();
    await loggedInStorePage.checkOrderLink.click();
    await loggedInStorePage.checkOrderView.first().click();
    // Assert:
    await expect(
      loggedInStorePage.tdLocator.filter({ hasText: payAddress }),
    ).toContainText(
      `${autostoreCredential.firstName} ${autostoreCredential.lastName}`,
    );
  });

  test('Cart checkout while logged off', async ({ loggedInStorePage }) => {
    // Arrange:
    const logoutText = ' Account Logout';
    const checkoutAddress = 'TE 12 ST Thais Guera 03405 Chad';
    const checkoutShip = 'Flat Shipping Rate';
    const checkoutPayment = 'Cash On Delivery';
    const successOrder = 'Your Order Has Been Processed!';
    // Act:
    await loggedInStorePage.accountText.nth(2).hover();
    await loggedInStorePage.logoutButton.click();
    await expect(loggedInStorePage.mainText).toHaveText(logoutText);
    await loggedInStorePage.continueButton.click();
    await loggedInStorePage.product52.click();
    await loggedInStorePage.cartMenuButton.click();
    await loggedInStorePage.cartCheckout.click();
    await loggedInStorePage.login(
      autostoreCredential.userName,
      autostoreCredential.userPassword,
    );
    await expect(loggedInStorePage.checkoutTable.first()).toHaveText(
      `${autostoreCredential.firstName} ${autostoreCredential.lastName}`,
    );
    await expect(loggedInStorePage.checkoutTable.nth(1)).toHaveText(
      checkoutAddress,
    );
    await expect(loggedInStorePage.checkoutTable.nth(2)).toHaveText(
      checkoutShip,
    );
    await expect(loggedInStorePage.checkoutTable.nth(3)).toHaveText(
      `${autostoreCredential.firstName} ${autostoreCredential.lastName}`,
    );
    await expect(loggedInStorePage.checkoutTable.nth(4)).toHaveText(
      checkoutAddress,
    );
    await expect(loggedInStorePage.checkoutTable.nth(5)).toHaveText(
      checkoutPayment,
    );
    await loggedInStorePage.checkoutButton.click();
    // Assert:
    await expect(loggedInStorePage.mainText).toContainText(successOrder);
  });

  test('Special Offers', async ({ storePage }) => {
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

  test('Currency change', async ({ cartProducts }) => {
    // Arrange:
    const dollar = '$';
    const euro = '€';
    // Act:
    await expect(cartProducts.priceDollarCart).toContainText(dollar);
    await cartProducts.currencyHover.first().hover();
    await cartProducts.euroSet.click();
    // Assert:
    await expect(cartProducts.priceEuroCart).toContainText(euro);
  });

  test('Apply invalid coupon', async ({ cartProducts }) => {
    // Arrange:
    const coupon = 'asd123';
    const errorCoupon = `Error: Coupon is either invalid, expired or reached it's usage limit!`;
    const removed = 'Success: Coupon has been removed!';
    const emptyBox = '';
    // Act:
    await cartProducts.couponBox.fill(coupon);
    await cartProducts.couponButton.click();
    await expect(cartProducts.errorAlert).toHaveText(errorCoupon);
    await cartProducts.couponRemove.click();
    // Assert:
    await expect(cartProducts.succesAlert).toContainText(removed);
    await expect(cartProducts.couponBox).toHaveText(emptyBox);
  });

  test('Update cart', async ({ cartProducts }) => {
    // Arrange:
    const quantity4 = '4';
    const quantity2 = '2';
    // Act:
    await cartProducts.quantity52.fill(quantity2);
    await cartProducts.cartUpadate.click();
    const qunatityValueTwo = await cartProducts.quantity52.inputValue();
    await expect(Number(qunatityValueTwo)).toBeGreaterThan(0);
    await cartProducts.quantity52.fill(quantity4);
    await cartProducts.cartUpadate.click();
    // Assert:
    const qunatityValueFour = await cartProducts.quantity52.inputValue();
    await expect(Number(qunatityValueFour)).toBeGreaterThan(2);
  });

  test('Estimate shipping and taxes', async ({ storePage }) => {
    // Arrange:
    const Poland = '170';
    // Act:
    await storePage.homeButton.click();
    await storePage.product52.click();
    await storePage.cartMenuButton.click();
    await storePage.shipCountry.selectOption(Poland);
    await expect(storePage.shipCountry).toHaveValue(Poland);
    await storePage.estimateButton.click();
    // Assert:
    const totalshipRate = await storePage.shippingRate.textContent();
    const shipRate = Number(totalshipRate?.replace('$', ''));
    await expect(shipRate).toBe(2);
  });

  test.use({ testIdAttribute: 'data-id' });
  test('Multiple products in cart', async ({ storePage, page }) => {
    // Arrange:
    // Act:
    await storePage.categoryMenu.Skincare.hover();
    await storePage.categoryMenu.EyesSkin.click();
    await storePage.product96.click();
    await storePage.product65.click();
    await storePage.product97.click();
    await storePage.categoryMenu.Skincare.first().hover();
    await storePage.categoryMenu.GiftSets.click();
    await storePage.product94.click();
    await storePage.product108.click();
    await storePage.product95.click();
    await storePage.product107.click();
    await storePage.categoryMenu.Fragrnance.hover();
    await storePage.categoryMenu.MenFragn.click();
    await storePage.product62.click();
    await storePage.product83.click();
    await storePage.product81.click();
    await storePage.product86.click();
    await storePage.product87.click();
    await storePage.cartMenuButton.click();
    // Assert:
    await expect(storePage.cartRows).toHaveCount(13);
  });

  // test('Stock availability count', async ({ loggedInStorePage, page }) => {
  //   // Arrange:
  //   const removeButtons = loggedInStorePage.removeButton;
  //   // Act:
  //   await loggedInStorePage.cartMenuButton.click();
  //   while ((await removeButtons.count()) > 0) {
  //     await removeButtons.nth(0).click();
  //     await page.waitForTimeout(100);
  //   }
  //   await loggedInStorePage.categoryMenu.Books.hover();
  //   await loggedInStorePage.categoryMenu.AudioCD.click();
  //   await loggedInStorePage.productName.first().click();
  //   const avaText = await page.locator('.productinfo').innerText();
  //   const match = avaText.match(/\d+/);
  //   if (!match) {
  //     throw new Error('Number was not found!');
  //   }
  //   const stock = parseInt(match[0]);
  //   await loggedInStorePage.addCart.click();
  //   await loggedInStorePage.cartCheckout.click();
  //   await loggedInStorePage.checkoutButton.click();
  //   await loggedInStorePage.categoryMenu.Books.hover();
  //   await loggedInStorePage.categoryMenu.AudioCD.click();
  //   await loggedInStorePage.productName.first().click();
  //   const updatedAva = await page.locator('.productinfo').innerText();
  //   const secondMatch = updatedAva.match(/\d+/);
  //   if (!secondMatch) {
  //     throw new Error('Number was not found!');
  //   }
  //   const finalStock = parseInt(secondMatch[0]);
  //   // Assert:
  //   await expect(updatedAva).toBe(stock - 1)
  // });
});

test.describe('Other tests', () => {
  // let storePage: AutomationStore;
  // test.beforeEach(async ({ page }) => {
  //   storePage = new AutomationStore(page);
  //   await page.goto('https://automationteststore.com/');
  //   await expect(storePage.welcomeMsg).toContainText(
  //     'Welcome to the Automation Test Store!',
  //   );
  // });

  test('Newsletter signup - invalid', async ({ storePage }) => {
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

  test('Scroll up button', async ({ storePage, page }) => {
    // Arrange:
    // Act:
    await page.evaluate(() => {
      window.scrollBy(0, 700);
    });
    await storePage.scrollUp.click();
    // Assert:
    await expect(storePage.searchBox).toBeInViewport();
  });

  test('Categories', async ({ storePage }) => {
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
    const bodyShower = 'Body & Shower';
    const fragSet = 'Fragrance Sets';
    const shave = 'Pre-Shave & Shaving';
    const menSkincare = 'Skincare';
    const condition = 'Conditioner';
    const shampoo = 'Shampoo';
    const audioCD = 'Audio CD';
    const paperback = 'Paperback';
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
    await storePage.categoryMenu.Men.hover();
    await expect(storePage.categoryMenu.BodyShower).toHaveText(bodyShower);
    await expect(storePage.categoryMenu.FragnanceSets).toHaveText(fragSet);
    await expect(storePage.categoryMenu.Shaving).toHaveText(shave);
    await expect(storePage.categoryMenu.MenSkincare).toHaveText(menSkincare);
    await storePage.categoryMenu.HairCare.hover();
    await expect(storePage.categoryMenu.Conditioner).toHaveText(condition);
    await expect(storePage.categoryMenu.Shampoo).toHaveText(shampoo);
    await storePage.categoryMenu.Books.hover();
    await expect(storePage.categoryMenu.AudioCD).toHaveText(audioCD);
    await expect(storePage.categoryMenu.Paperback).toHaveText(paperback);
    // Assert:
  });
  test('Brands', async ({ storePage }) => {
    // Arrange:
    const benefit = 'Benefit';
    const pantene = 'Pantene';
    const mac = 'M·A·C';
    const lancome = 'Lancôme';
    const gucci = 'Gucci';
    const giorgio = 'Giorgio Armani';
    const dove = 'Dove';
    const calvin = 'Calvin Klein';
    const bvlgari = 'Bvlgari';
    // Act:
    await storePage.brdBenefit.first().click();
    await expect(storePage.mainText).toHaveText(benefit);
    await storePage.homeButton.click();
    await storePage.brdBenefit.nth(1).click();
    await expect(storePage.mainText).toHaveText(pantene);
    await storePage.homeButton.click();
    await storePage.brdBenefit.nth(2).click();
    await expect(storePage.mainText).toHaveText(mac);
    await storePage.homeButton.click();
    await storePage.brdBenefit.nth(3).click();
    await expect(storePage.mainText).toHaveText(lancome);
    await storePage.homeButton.click();
    await storePage.brdBenefit.nth(4).click();
    await expect(storePage.mainText).toHaveText(gucci);
    await storePage.homeButton.click();
    await storePage.brdBenefit.nth(5).click();
    await expect(storePage.mainText).toHaveText(giorgio);
    await storePage.homeButton.click();
    await storePage.brdBenefit.nth(6).click();
    await expect(storePage.mainText).toHaveText(dove);
    await storePage.homeButton.click();
    await storePage.brdBenefit.nth(7).click();
    await expect(storePage.mainText).toHaveText(calvin);
    await storePage.homeButton.click();
    await storePage.brdBenefit.nth(8).click();
    await expect(storePage.mainText).toHaveText(bvlgari);
    await storePage.homeButton.click();
    // Assert:
  });

  test('Contact Us', async ({ storePage }) => {
    // Arrange:
    const contactUs = ' Contact Us';
    const enquiry = 'TestMessage123##';
    const messSent =
      'Your enquiry has been successfully sent to the store owner!';
    // Act:
    await storePage.contactPage.click();
    await expect(storePage.mainText).toHaveText(contactUs);
    await storePage.contactFName.fill(autostoreCredential.firstName);
    await storePage.contactEmail.fill(autostoreCredential.userMail);
    await storePage.contactEnquiry.fill(enquiry);
    await storePage.submitButton.click();
    // Assert:
    await expect(storePage.contentPanel).toContainText(messSent);
  });

  test('Contact Us - reset', async ({ storePage }) => {
    // Arrange:
    const contactUs = ' Contact Us';
    const enquiry = 'TestMessage123##';
    const reset = '';
    // Act:
    await storePage.contactPage.click();
    await expect(storePage.mainText).toHaveText(contactUs);
    await storePage.contactFName.fill(autostoreCredential.firstName);
    await storePage.contactEmail.fill(autostoreCredential.userMail);
    await storePage.contactEnquiry.fill(enquiry);
    await storePage.contactReset.click();
    // Assert:
    await expect(storePage.contactFName).toHaveText(reset);
    await expect(storePage.contactEmail).toHaveText(reset);
    await expect(storePage.contactEnquiry).toHaveText(reset);
  });

  test('Check review', async ({ storePage }) => {
    // Arrange:
    const tshirts = 'T-shirts';
    const noReview = 'There are no reviews for this product.';
    // Act:
    await storePage.categoryMenu.ApparelAcc.hover();
    await storePage.categoryMenu.Tshirts.click();
    await expect(storePage.mainText).toHaveText(tshirts);
    await storePage.tshirtPack.click();
    await storePage.productReview.click();
    // Assert:
    await expect(storePage.currentReviews).not.toHaveText(noReview);
  });

  test('Review - negative', async ({ storePage }) => {
    // Arrange:
    const bronzer = 'Skinsheen Bronzer Stick';
    const reviewMess = 'Testmesage123#!@0-1';
    const humanVerifi = 'Human verification has failed! Please try again.';
    // Act:
    await storePage.bronzerStick.first().click();
    await expect(storePage.nameOfProduct).toHaveText(bronzer);
    await storePage.productReview.click();
    await storePage.fiveStar.first().click();
    await storePage.reviewName.fill(autostoreCredential.firstName);
    await storePage.reviewText.fill(reviewMess);
    await storePage.submitButton.click();
    // Assert:
    await expect(storePage.errorAlert).toContainText(humanVerifi);
  });

  test('Using tags in product page', async ({ storePage }) => {
    // Arrange:
    const makeup = 'makeup';
    // Act:
    await storePage.bronzerStick.first().click();
    await storePage.productTag.click();
    await storePage.makeupTag.click();
    // Assert:
    await expect(storePage.searchKeyword).toHaveValue(makeup);
    await expect(storePage.bronzerStick).toBeVisible();
  });

  test('Wishlist', async ({ loggedInStorePage, page }) => {
    // Arrange:
    const remove = ' Remove from wish list ';
    const bronzer = 'Skinsheen Bronzer Stick';
    const emptyWish = 'Wish list is empty';
    // Act:
    await loggedInStorePage.homeButton.click();
    await loggedInStorePage.bronzerStick.first().click();
    await loggedInStorePage.addToWish.click();
    await expect(loggedInStorePage.removeFromWish).toHaveText(remove);
    await loggedInStorePage.accButton.click();
    await loggedInStorePage.wishList.click();
    // Assert:
    await expect(loggedInStorePage.contentPanel).toContainText(bronzer);
    await loggedInStorePage.wishlistRemove.click();
    await page.reload();
    await expect(loggedInStorePage.contentPanel).toContainText(emptyWish);
  });

  test('Last Name change and revert change', async ({ loggedInStorePage }) => {
    // Arrange:
    const tempLastName = 'testLastName';
    const successChange =
      'Success: Your account has been successfully updated.';
    // Act:
    await loggedInStorePage.editAcc.nth(1).click();
    await expect(loggedInStorePage.lastNameInput).toHaveValue(
      autostoreCredential.lastName,
    );
    await loggedInStorePage.lastNameInput.clear();
    await loggedInStorePage.lastNameInput.fill(tempLastName);
    await loggedInStorePage.continueButton.click();
    await expect(loggedInStorePage.succesAlert).toContainText(successChange);
    await loggedInStorePage.editAcc.nth(1).click();
    await expect(loggedInStorePage.lastNameInput).toHaveValue(tempLastName);
    await loggedInStorePage.lastNameInput.clear();
    await loggedInStorePage.lastNameInput.fill(autostoreCredential.lastName);
    await loggedInStorePage.continueButton.click();
    await expect(loggedInStorePage.succesAlert).toContainText(successChange);
    await loggedInStorePage.editAcc.nth(1).click();
    // Assert:
    await expect(loggedInStorePage.lastNameInput).toHaveValue(
      autostoreCredential.lastName,
    );
  });

  test('First name change and welcome message', async ({
    loggedInStorePage,
  }) => {
    // Arrange:
    const tempFirstName = 'testLastName';
    const successChange =
      'Success: Your account has been successfully updated.';
    // Act:
    await loggedInStorePage.editAcc.nth(1).click();
    await expect(loggedInStorePage.firstNameAcc).toHaveValue(
      autostoreCredential.firstName,
    );
    await loggedInStorePage.firstNameAcc.clear;
    await loggedInStorePage.firstNameAcc.fill(tempFirstName);
    await loggedInStorePage.continueButton.click();
    await expect(loggedInStorePage.succesAlert).toContainText(successChange);
    await expect(loggedInStorePage.menuText.first()).toHaveText(
      `Welcome back ${tempFirstName}`,
    );
    await loggedInStorePage.editAcc.nth(1).click();
    await loggedInStorePage.firstNameAcc.clear;
    await loggedInStorePage.firstNameAcc.fill(autostoreCredential.firstName);
    await loggedInStorePage.continueButton.click();
    await expect(loggedInStorePage.succesAlert).toContainText(successChange);
    // Assert:
    await expect(loggedInStorePage.menuText.first()).toHaveText(
      `Welcome back ${autostoreCredential.firstName}`,
    );
  });

  test('Add new address', async ({ loggedInStorePage }) => {
    // Arrange:
    const tempFName = 'tempFName';
    const tempLName = 'tempLName';
    const tempAddress = 'tempAddress';
    const tempCity = 'tempCity';
    const tempRegion = '2640';
    const tempZip = '131313';
    const tempCountry = '170';
    const alertSuccess = 'Your address has been successfully inserted';
    // Act:
    await loggedInStorePage.addressBook.click();
    await loggedInStorePage.newAddress.click();
    await loggedInStorePage.firstNameInput.fill(tempFName);
    await loggedInStorePage.lastNameAddress.fill(tempLName);
    await loggedInStorePage.addresInput.fill(tempAddress);
    await loggedInStorePage.cityInput.fill(tempCity);
    await loggedInStorePage.countryInput.selectOption(tempCountry);
    await loggedInStorePage.regionInput.selectOption(tempRegion);
    await loggedInStorePage.zipInput.fill(tempZip);
    await expect(loggedInStorePage.addressRadio).toBeChecked();
    await loggedInStorePage.continueButton.click();
    await expect(loggedInStorePage.succesAlert).toContainText(alertSuccess);
    await expect(loggedInStorePage.addressBox.nth(1)).toContainText(tempFName);
    await expect(loggedInStorePage.addressBox.nth(1)).toContainText(tempLName);
    await loggedInStorePage.addressDelete.click();
    // Assert:
    const boxCount = await loggedInStorePage.addressBox.count();
    await expect(boxCount).toBe(1);
  });

  test('Notification newsletter setting', async ({ loggedInStorePage }) => {
    // Arrange:
    const successAlert =
      'Success: Your notification settings has been successfully updated!';
    // Act:
    await loggedInStorePage.notifyButton.nth(1).click();
    await expect(loggedInStorePage.notifyCheckbox).not.toBeChecked();
    await loggedInStorePage.notifyCheckbox.check();
    await loggedInStorePage.continueButton.click();
    await expect(loggedInStorePage.succesAlert).toContainText(successAlert);
    await loggedInStorePage.notifyButton.nth(1).click();
    await expect(loggedInStorePage.notifyCheckbox).toBeChecked();
    await loggedInStorePage.notifyCheckbox.click();
    await loggedInStorePage.continueButton.click();
    // Assert:
    await expect(loggedInStorePage.succesAlert).toContainText(successAlert);
    //console.log(await loggedInStorePage.succesAlert.textContent());
  });

  test('Change password and revert', async ({ loggedInStorePage }) => {
    // Arrange:
    const newPassword = 'Newpassword123';
    const successAlert =
      'Success: Your password has been successfully updated.';
    // Act:
    await loggedInStorePage.changePass.nth(1).click();
    await loggedInStorePage.currentPass.fill(autostoreCredential.userPassword);
    await loggedInStorePage.newPass.fill(newPassword);
    await loggedInStorePage.newPassConfirm.fill(newPassword);
    await loggedInStorePage.continueButton.click();
    await expect(loggedInStorePage.succesAlert).toContainText(successAlert);
    await loggedInStorePage.changePass.nth(1).click();
    await loggedInStorePage.currentPass.fill(newPassword);
    await loggedInStorePage.newPass.fill(autostoreCredential.userPassword);
    await loggedInStorePage.newPassConfirm.fill(
      autostoreCredential.userPassword,
    );
    await loggedInStorePage.continueButton.click();
    // Assert:
    await expect(loggedInStorePage.succesAlert).toContainText(successAlert);
  });

  test('Search by keyword', async ({ storePage }) => {
    // Arrange:
    const keywordCream = 'Cream';
    // Act:
    await storePage.searchBox.fill(keywordCream);
    await storePage.searchButton.click();
    // Assert:
    await expect(storePage.searchKeyword).toHaveValue(keywordCream);
    await expect(storePage.productName.first()).toContainText(keywordCream);
  });

  test('Sort By options', async ({ storePage }) => {
    // Arrange:
    const nameAZ = 'pd.name-ASC';
    const nameZA = 'pd.name-DESC';
    const productAZ = 'Absolue Eye Precious Cells';
    const productZA =
      'LE ROUGE ABSOLU Reshaping & Replenishing LipColour SPF 15';
    // Act:
    await storePage.specialsButton.first().click();
    await storePage.sortBy.selectOption(nameAZ);
    await expect(storePage.productName.first()).toHaveText(productAZ);
    await storePage.sortBy.selectOption(nameZA);
    await expect(storePage.productName.first()).toHaveText(productZA);
    // Assert:
  });

  test.use({ testIdAttribute: 'data-banner-id' });
  test('Carosuel switcher', async ({ storePage, page }) => {
    // Arrange:
    const autoTest = 'Automation Testing';
    // Act:
    await page.waitForTimeout(1000);
    await storePage.pageCarousel.hover();
    for (let index = 0; index < 2; index++) {
      await storePage.arrowCarousel.click();
      await page.waitForTimeout(1000);
    }
    // Assert:
    await expect(storePage.bannerCarousel17).toHaveText(autoTest);
  });

  test('Keyword category', async ({ storePage }) => {
    // Arrange:
    const allCat = 'All Categories';
    const makeupCat = 'Makeup';
    // Act:
    await storePage.searchBox.click();
    await expect(storePage.categorySelected).toHaveText(allCat);
    const categoryCount = storePage.singleCategory;
    //console.log(await categoryCount.count());
    await expect(storePage.singleCategory).toHaveCount(8);
    await storePage.singleCategory.filter({ hasText: makeupCat }).click();
    // Assert:
    await expect(storePage.categorySelected).toHaveText(makeupCat);
  });
});