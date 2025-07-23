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
    await page.waitForLoadState('domcontentloaded');
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
    const dateBirth = '1999-09-09';
    const year2025 = '2025';
    const july2025 = 'July 2025';
    const apr2025 = 'April 2020';
    const year2020 = '2020';
    const year2029 = '2029';
    const monthApr = 'Apr';
    const monthMay = 'May';
    const day10 = '10';
    const day21 = '21';
    const startDateValue = '10/04/2020';
    const endDateValue = '21/05/2029';
    // Act:
    await lambdaPG.bootstrapDate.click();
    await lambdaPG.dateBirtday.fill(dateBirth);
    await lambdaPG.startDate.click();
    await lambdaPG.datePick.filter({ hasText: july2025 }).click();
    await lambdaPG.datePick.filter({ hasText: year2025 }).nth(1).click();
    await lambdaPG.dateYear.filter({ hasText: year2020 }).click();
    await lambdaPG.dateMonth.filter({ hasText: monthApr }).click();
    await lambdaPG.dateDay.filter({ hasText: day10 }).click();
    await lambdaPG.endDate.click();
    await lambdaPG.datePick.filter({ hasText: apr2025 }).click();
    await lambdaPG.datePick.filter({ hasText: year2020 }).nth(1).click();
    await lambdaPG.dateYear.filter({ hasText: year2029 }).click();
    await lambdaPG.dateMonth.filter({ hasText: monthMay }).click();
    await lambdaPG.dateDay.filter({ hasText: day21 }).click();
    await lambdaPG.dateBirtday.click();
    // Assert:
    await expect(lambdaPG.startDate).toHaveValue(startDateValue);
    await expect(lambdaPG.endDate).toHaveValue(endDateValue);
  });
});

test.describe('Second row', () => {
  let lambdaPG: LambdaTests;
  test.beforeEach(async ({ page }) => {
    lambdaPG = new LambdaTests(page);
    await page.goto('https://www.lambdatest.com/selenium-playground/');
    await expect(lambdaPG.mainText).toHaveText('Selenium Playground');
  });

  test('Bootstrap Dual List Demo', async ({ page }) => {
    // Arrange:
    const Danville = 'Danville';
    const Milan = 'Milan';
    // Act:
    await lambdaPG.bootDualList.click();
    for (let index = 0; index < 3; index++) {
      await lambdaPG.dualListLeft.locator('.list-group-item').first().click();
      await lambdaPG.moveRight.nth(1).click();
    }
    await expect(
      lambdaPG.dualListRight.locator('.list-group-item'),
    ).toHaveCount(6);
    await lambdaPG.searchBox.nth(1).fill(Danville);
    await page.keyboard.press('Enter');
    await expect(
      lambdaPG.dualListRight.locator('.list-group-item:visible'),
    ).toHaveText(Danville);
    await expect(
      lambdaPG.dualListRight.locator('.list-group-item:visible'),
    ).toHaveCount(1);
    await expect(
      lambdaPG.dualListRight.locator('.list-group-item:visible'),
    ).not.toHaveText(Milan);
    await lambdaPG.searchBox.nth(1).clear();
    //Assert:
    await expect(
      lambdaPG.dualListRight.locator('.list-group-item'),
    ).toHaveCount(6);
  });
});
