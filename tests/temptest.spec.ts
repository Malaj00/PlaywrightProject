import { test, expect } from '@playwright/test';
import { tempLogin } from '../test-data/templogin.data';
import { NowyTest } from '../pages/temptest.page';

test.describe('User login to ????', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
  });

  test.skip('successful login with correct credentials', async ({ page }) => {
    //Act
    const userID = tempLogin.userID;
    const userPassword = tempLogin.userPassword;
    const expectedMessage = 'Logged In Successfully';
    const tempTest = new NowyTest(page);
    const expectedMessage2 =
      'Congratulations student. You successfully logged in!';

    //Arrange
    await tempTest.loginInput.fill(userID);
    await tempTest.passwordInput.fill(userPassword);
    await tempTest.sumbitButton.click();

    //Assert
    await expect(tempTest.loginHeading).toHaveText(expectedMessage);
    await expect(tempTest.loginSubHeading).toHaveText(expectedMessage2);
  });
});
