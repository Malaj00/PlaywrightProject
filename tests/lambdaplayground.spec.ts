import { test, expect } from '@playwright/test';
import { LambdaTests } from '../pages/lambdaplayground.page';

test.describe('First row tests', () => {
  let lambdaPG: LambdaTests;
  test.beforeEach(async ({ page }) => {
    lambdaPG = new LambdaTests(page);
    await page.goto('https://www.lambdatest.com/selenium-playground/');
    await expect(lambdaPG.mainText).toHaveText('Selenium Playground');
  });

  test('Ajax Form Submit', async ({ page }) => {
    // Arrange:
    const name = 'NameBox';
    const message = 'New Message';
    const submitMess = 'Ajax Request is Processing!';
    // Act:
    await lambdaPG.ajaxForm.click();
    await lambdaPG.nameForm.fill(name);
    await lambdaPG.messageForm.fill(message);
    await lambdaPG.submitButton.click();
    // Assert:
    await expect(lambdaPG.submitProcess).toHaveText(submitMess);
  });

  test('Auto healing', async ({ page }) => {
    // Arrange:
    const usrName = 'Username';
    const password = 'Password';
    const succMess = 'Login Successful';
    // Act:
    await lambdaPG.autoHealing.click();
    await page.waitForLoadState('domcontentloaded');
    await lambdaPG.healUsername.fill(usrName);
    await lambdaPG.healPass.fill(password);
    await lambdaPG.submitBtn.click();
    await expect(lambdaPG.loginSucces).toHaveText(succMess);
    await lambdaPG.chagngeDOM.click();
    await lambdaPG.submitBtn.click();
    // Assert:
    await expect(lambdaPG.loginSucces).toHaveText(succMess);
  });

  test('Bootstrap Alerts', async ({ page }) => {
    // Arrange:
    const autoSuccess = 'Autocloseable success message. Hide in 5 seconds.';
    const normalSuccess =
      'Normal success message. To close use the close button.';
    const autocloseInfo = 'Autocloseable info message. Hide in 5 seconds.';
    const normalInfo = 'Normal info message.To close use the close button.';
    // Act:
    await lambdaPG.bootstrapAlert.click();
    await lambdaPG.autocloseSuccess.click();
    await expect(lambdaPG.alertSuccess).toHaveText(autoSuccess);
    await page.waitForTimeout(5050);
    await expect(lambdaPG.alertSuccess).toBeHidden();
    await lambdaPG.normalSuccess.click();
    await expect(lambdaPG.alertNormalSuccess).toContainText(normalSuccess);
    await lambdaPG.closeAlert.first().click();
    await lambdaPG.autocloseInfo.click();
    await expect(lambdaPG.alertInfo).toHaveText(autocloseInfo);
    await page.waitForTimeout(5050);
    await expect(lambdaPG.alertInfo).toBeHidden();
    await lambdaPG.normalInfo.click();
    await expect(lambdaPG.autoInfoAlert).toContainText(normalInfo);
    await lambdaPG.closeAlert.first().click();
    // Assert:
  });

  test('Bootstrap Date Picker', async ({ page }) => {
    // Arrange:
    // Act:
    // Assert:
  });
});
