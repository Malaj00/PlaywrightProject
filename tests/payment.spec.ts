import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';

test.describe('Payment tests', () => {
  let paymentPage: PaymentPage;
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const loginPage = new LoginPage(page);
    paymentPage = new PaymentPage(page);

    await page.goto('/');
    await loginPage.login(userId, userPassword);
    //menu boczne
    await paymentPage.sideMenu.paymentButton.click();
  });

  test('Simple payment',   { tag: ['@payment', '@integration'] }, async ({ page }) => {
    //Arrange
    const transferReceiver = 'Jan Nowak';
    const transferAccount = '12 1239 2939 2399 2939 2498 85772';
    const transferAmount = '222';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;

    //Act
    await paymentPage.makeTransfer(
      transferReceiver,
      transferAccount,
      transferAmount,
    );

    //Assert
    await expect(paymentPage.expectedMessage).toHaveText(expectedMessage);
  });
});
