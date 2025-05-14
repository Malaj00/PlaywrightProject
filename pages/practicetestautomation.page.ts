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
  instructionRow: Locator;

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
    this.rowSaved = page.locator('#confirmation');
    this.editButton = page.getByRole('button', { name: 'Edit' })
    this.instructionRow = page.locator('#instructions');
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
}
