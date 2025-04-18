import { Locator, Page } from '@playwright/test';

export class NowyTest {
  loginHeading: Locator;
  loginSubHeading: Locator;
  loginInput: Locator;
  passwordInput: Locator;
  sumbitButton: Locator;

  constructor(private page: Page) {
    this.loginHeading = this.page.getByRole('heading', {
      name: 'Logged In Successfully',
    });
    this.loginSubHeading = this.page.getByText('Congratulations student. You');
    this.loginInput = this.page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
    this.sumbitButton = this.page.getByRole('button', { name: 'Submit' });
  }
}
