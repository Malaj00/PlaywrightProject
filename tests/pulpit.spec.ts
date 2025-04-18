import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  let pulpitPage: PulpitPage;
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const loginPage = new LoginPage(page);
    pulpitPage = new PulpitPage(page);

    await page.goto('/');
    await loginPage.login(userId, userPassword) 
  });

  test('Quick payment with correct data', async ({ page }) => {
    // Arrange
    const reciverId = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReceiver = 'Chuck Demobankowy';

    //Act
    await pulpitPage.paymentReceiver.selectOption(reciverId);
    await pulpitPage.paymentAmount.fill(transferAmount);
    await pulpitPage.paymentTitle.fill(transferTitle);
    await pulpitPage.paymentSubmit.click();
    await pulpitPage.popupClose.click();

    //Assert
    await expect(pulpitPage.expectedTrasnferMessage).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('successful mobile top-up', async ({ page }) => {
    // Arrange
    const receiverTopup = '500 xxx xxx';
    const transferAmount = '150';
    const finalText = 'Doładowanie wykonane!';
    const expectedMessage = `${finalText} ${transferAmount},00PLN na numer ${receiverTopup}`;

    //Act

    await pulpitPage.topupReceiver.selectOption(receiverTopup);
    await pulpitPage.topupAmount.fill(transferAmount);
    await pulpitPage.topupCheckbox.click();
    await pulpitPage.topupSubmit.click();

    //Assert
    await expect(pulpitPage.expectedTrasnferMessage).toHaveText(
      expectedMessage,
    );
  });

  test('coreect balance after successful mobile top-up', async ({ page }) => {
    // Arrange
    const receiverTopup = '500 xxx xxx';
    const transferAmount = '150';
    const initialBalance = await pulpitPage.topupBalance.innerText();
    const expectedBalance = Number(initialBalance) - Number(transferAmount);

    //Act
    await pulpitPage.topupReceiver.selectOption(receiverTopup);
    await pulpitPage.topupAmount.fill(transferAmount);
    await pulpitPage.topupCheckbox.click();
    await pulpitPage.topupSubmit.click();
    await pulpitPage.popupClose.click();

    //Assert

    await expect(pulpitPage.topupBalance).toHaveText(`${expectedBalance}`);
  });
});
