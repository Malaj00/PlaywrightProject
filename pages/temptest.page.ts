import { Locator, Page } from '@playwright/test';

export class NowyTest {
  loginHeading: Locator;
  loginSubHeading: Locator;
  loginInput: Locator;
  passwordInput: Locator;
  sumbitButton: Locator;
  wrongID: Locator;
  practiceTab: Locator;
  testExceptions: Locator;
  addRow: Locator;
  rowAdded: Locator;
  saveButton: Locator;
  rowSaved: Locator;
  visibleTextbox: Locator;
  editButton: Locator;

  constructor(private page: Page) {
    this.loginHeading = this.page.getByRole('heading', {
      name: 'Logged In Successfully',
    });
    this.wrongID = this.page.locator('#error');
    this.loginSubHeading = this.page.getByText('Congratulations student. You');
    this.loginInput = this.page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
    this.sumbitButton = this.page.getByRole('button', { name: 'Submit' });
    this.practiceTab = page.getByRole('link', {
      name: 'Practice',
      exact: true,
    });
    this.testExceptions = page.getByRole('link', { name: 'Test Exceptions' });
    this.addRow = page.getByRole('button', { name: 'Add' });
    this.rowAdded = page.getByRole('textbox');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.rowSaved = page.getByText('Row 2 was saved');
    this.editButton = page.getByRole('button', { name: 'Edit' })
  }
  async login(userID: string, userPassword: string) {
    await this.loginInput.fill(userID);
    await this.passwordInput.fill(userPassword);
    await this.sumbitButton.click();
  }

  async rowAdd() {
    await this.practiceTab.click();
    await this.testExceptions.click();
    await this.addRow.click();
  }
  // getVisibleTextbox(): Locator {
  //   return this.page
  //     .getByRole('textbox')
  //     .filter({ has: this.page.locator(':visible') })
  //     .first();
}
