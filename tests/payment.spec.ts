import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Payment tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const loginPage = new LoginPage(page);
    const paymentPage = new PaymentPage(page);

    await page.goto('/');
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
    
    //menu boczne
    await paymentPage.sideMenu.paymentButton.click();
    //await page.getByRole('link', { name: 'płatności' }).click();
  });

  test('Simple payment', async ({ page }) => {
    //Arrange
    const transferReceiver = 'Jan Nowak';
    const transferAccount = '12 1239 2939 2399 2939 2498 85772';
    const transferAmount = '222';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;
    const paymentPage = new PaymentPage(page);

    //Act

    await paymentPage.trasnferReceiver.fill(transferReceiver);
    await paymentPage.transferReceiverNumber.fill(transferAccount);
    await paymentPage.transferAmount.fill(transferAmount);
    await paymentPage.transferSubmit.click();
    await paymentPage.popupClose.click();

    //Assert
    await expect(paymentPage.expectedMessage).toHaveText(expectedMessage);
  });
});
