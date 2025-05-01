import { Locator, Page } from '@playwright/test';
import { TopMenuComponent } from '../components/top-menu.components';

export class AutomationExercise {
  mailInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  continueButton: Locator;
  deleteAcc: Locator;
  accDeleted: Locator;
  topMenu: TopMenuComponent;
  nameBox: Locator;

  constructor(private page: Page) {
    this.mailInput = page
      .locator('form')
      .filter({ hasText: 'Login' })
      .getByPlaceholder('Email Address');
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.continueButton = page.getByRole('link', { name: 'Continue' });
    this.deleteAcc = page.getByRole('link', { name: ' Delete Account' });
    this.accDeleted = page.getByText('Account Deleted!');
    this.topMenu = new TopMenuComponent(this.page);
    this.nameBox = page.getByRole('textbox', { name: 'Name' })
  }
  async login(userMail: string, userPassword: string): Promise<void> {
    await this.mailInput.fill(userMail);
    await this.passwordInput.fill(userPassword);
    await this.loginButton.click();
  }
  async deleteAccount(): Promise<void> {
    await this.deleteAcc.click();
    await this.continueButton.click();
  }
  async register(userId: string, userMail: string, userPassword: string): Promise<void> {
    await this.nameBox.fill(userId);
    await this.page.locator('[data-qa="signup-email"]').fill(userMail);
    await this.page.getByRole('button', { name: 'Signup' }).click();

    await this.page.getByRole('radio', { name: 'Mr.' }).check();
    await this.page.locator('#days').selectOption('10');
    await this.page.locator('#months').selectOption('10');
    await this.page.locator('#years').selectOption('1990');
    await this.page.getByRole('textbox', { name: 'Password *' }).fill(userPassword);
    await this.page
      .getByRole('checkbox', { name: 'Sign up for our newsletter!' })
      .check();
    await this.page
      .getByRole('checkbox', { name: 'Receive special offers from' })
      .check();
    await this.page
      .getByRole('textbox', { name: 'Company', exact: true })
      .fill('Company1');
    await this.page
      .getByRole('textbox', { name: 'First name *' })
      .fill('Firstname1');
    await this.page.getByRole('textbox', { name: 'Last name *' }).fill('Lastname1');
    await this.page
      .getByRole('textbox', { name: 'Address * (Street address, P.' })
      .fill('Address1, 00-000, Companyname');
    await this.page.getByRole('textbox', { name: 'Address 2' }).fill('Address2');
    await this.page.getByLabel('Country *').selectOption('United States');
    await this.page.getByRole('textbox', { name: 'State *' }).fill('State1');
    await this.page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('City1');
    await this.page.locator('#zipcode').fill('Zipcode1');
    await this.page
      .getByRole('textbox', { name: 'Mobile Number *' })
      .fill('123123123');
    await this.page.getByRole('button', { name: 'Create Account' }).click();
  }
}
