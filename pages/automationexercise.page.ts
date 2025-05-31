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
  consentButton: Locator;
  sliderCarousel: Locator;
  loginToAcc: Locator;
  newUserSignup: Locator;
  mailReg: Locator;
  signupButton: Locator;
  accInf: Locator;

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
    this.consentButton = page.getByRole('button', { name: 'Consent' });
    this.sliderCarousel = page.locator('#slider-carousel');
    this.loginToAcc = page.getByText('Login to your account');
    this.newUserSignup = page.getByText('New User Signup!');
    this.mailReg = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.getByRole('button', { name: 'Signup' })
    this.accInf = page.getByText('Enter Account Information')
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
    userName: string,
    userMail: string,
    userPassword: string,
    days: string,
    month: string,
    year: string,
    company: string,
    firstName: string,
    lastName: string,
    address: string,
    mobile: string,
    country: string,
    state: string,
    city: string,
    zipcode: string,
  ): Promise<void> {
    await this.nameBox.fill(userName);
    await this.page.locator('[data-qa="signup-email"]').fill(userMail);
    await this.page.getByRole('button', { name: 'Signup' }).click();
    await this.page.getByRole('radio', { name: 'Mr.' }).check();
    await this.page.locator('#days').selectOption(days);
    await this.page.locator('#months').selectOption(month);
    await this.page.locator('#years').selectOption(year);
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
      .fill(company);
    await this.page
      .getByRole('textbox', { name: 'First name *' })
      .fill(firstName);
    await this.page
      .getByRole('textbox', { name: 'Last name *' })
      .fill(lastName);
    await this.page
      .getByRole('textbox', { name: 'Address * (Street address, P.' })
      .fill(address);
    await this.page.getByLabel('Country *').selectOption(country);
    await this.page.getByRole('textbox', { name: 'State *' }).fill(state);
    await this.page
      .getByRole('textbox', { name: 'City * Zipcode *' })
      .fill(city);
    await this.page.locator('#zipcode').fill(zipcode);
    await this.page
      .getByRole('textbox', { name: 'Mobile Number *' })
      .fill(mobile);
    await this.page.getByRole('button', { name: 'Create Account' }).click();
  }
  async cardPay(
    nameOnCard: string,
    cardNumber: string,
    cvcNumber: string,
    exprMonth: string,
    exprYears: string,
  ): Promise<void> {
    await this.page.locator('[data-qa="name-on-card"]').fill(nameOnCard);
    await this.page.locator('[data-qa="card-number"]').fill(cardNumber);
    await this.page.locator('[data-qa="cvc"]').fill(cvcNumber);
    await this.page.locator('[data-qa="expiry-month"]').fill(exprMonth);
    await this.page.locator('[data-qa="expiry-year"]').fill(exprYears);
    await this.page.locator('[data-qa="pay-button"]').click();
  }
}
