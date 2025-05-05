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
    this.nameBox = page.getByRole('textbox', { name: 'Name' });
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
  async register(
    userId: string,
    userMail: string,
    userPassword: string,
    regDays: string,
    regMonth: string,
    regYear: string,
    regCompany: string,
    regFName: string,
    regLName: string,
    regAddres: string,
    regMobile: string,
    regCountry: string,
    regState: string,
    regCity: string,
    regZip: string,
  ): Promise<void> {
    await this.nameBox.fill(userId);
    await this.page.locator('[data-qa="signup-email"]').fill(userMail);
    await this.page.getByRole('button', { name: 'Signup' }).click();
    await this.page.getByRole('radio', { name: 'Mr.' }).check();
    await this.page.locator('#days').selectOption(regDays);
    await this.page.locator('#months').selectOption(regMonth);
    await this.page.locator('#years').selectOption(regYear);
    await this.page
      .getByRole('textbox', { name: 'Password *' })
      .fill(userPassword);
    await this.page
      .getByRole('checkbox', { name: 'Sign up for our newsletter!' })
      .check();
    await this.page
      .getByRole('checkbox', { name: 'Receive special offers from' })
      .check();
    await this.page
      .getByRole('textbox', { name: 'Company', exact: true })
      .fill(regCompany);
    await this.page
      .getByRole('textbox', { name: 'First name *' })
      .fill(regFName);
    await this.page
      .getByRole('textbox', { name: 'Last name *' })
      .fill(regLName);
    await this.page
      .getByRole('textbox', { name: 'Address * (Street address, P.' })
      .fill(regAddres);
    await this.page.getByLabel('Country *').selectOption(regCountry);
    await this.page.getByRole('textbox', { name: 'State *' }).fill(regState);
    await this.page
      .getByRole('textbox', { name: 'City * Zipcode *' })
      .fill(regCity);
    await this.page.locator('#zipcode').fill(regZip);
    await this.page
      .getByRole('textbox', { name: 'Mobile Number *' })
      .fill(regMobile);
    await this.page.getByRole('button', { name: 'Create Account' }).click();
  }
  async cardPay(nameOnCard: string, cardNumber: string, cvcNumber: string, exprMonth: string, exprYears: string): Promise<void> {
    await this.page.locator('[data-qa="name-on-card"]').fill(nameOnCard);
    await this.page.locator('[data-qa="card-number"]').fill(cardNumber);
    await this.page.locator('[data-qa="cvc"]').fill(cvcNumber);
    await this.page.locator('[data-qa="expiry-month"]').fill(exprMonth);
    await this.page.locator('[data-qa="expiry-year"]').fill(exprYears);
    await this.page.locator('[data-qa="pay-button"]').click();
  }
}
