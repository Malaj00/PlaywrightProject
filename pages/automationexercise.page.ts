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
  titleReg: Locator;
  daysReg: Locator;
  monthsReg: Locator;
  yearsReg: Locator;
  passwordReg: Locator;
  checkboxNwstr: Locator;
  checkboxOffer: Locator;
  companyReg: Locator;
  firstNReg: Locator;
  lastNReg: Locator;
  addressReg: Locator;
  countryReg: Locator;
  stateReg: Locator;
  cityReg: Locator;
  zipReg: Locator;
  mobileReg: Locator;
  createAccButton: Locator;
  nameCard: Locator;
  numberCard: Locator;
  numberCvc: Locator;
  expiryMonth: Locator;
  expiryYear: Locator;
  payButton: Locator;
  logoutButton: Locator;
  mailSignup: Locator;
  accDel: Locator;
  getinTouch: Locator;
  emailContact: Locator;
  subjectBox: Locator;
  contactMess: Locator;
  uploadFile: Locator;
  submitButton: Locator;
  contactPage: Locator;
  homeButton: Locator;
  textCenter: Locator;

  constructor(private page: Page) {
    this.mailInput = page
      .locator('form')
      .filter({ hasText: 'Login' })
      .getByPlaceholder('Email Address');
    this.mailSignup = page
      .locator('form')
      .filter({ hasText: 'Signup' })
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
    this.signupButton = page.getByRole('button', { name: 'Signup' });
    this.accInf = page.getByText('Enter Account Information');
    this.titleReg = page.getByRole('radio', { name: 'Mr.' });
    this.daysReg = page.locator('#days');
    this.monthsReg = page.locator('#months');
    this.yearsReg = page.locator('#years');
    this.passwordReg = page.getByRole('textbox', { name: 'Password *' });
    this.checkboxNwstr = page.getByRole('checkbox', {
      name: 'Sign up for our newsletter!',
    });
    this.checkboxOffer = page.getByRole('checkbox', {
      name: 'Receive special offers from',
    });
    this.companyReg = page.getByRole('textbox', {
      name: 'Company',
      exact: true,
    });
    this.firstNReg = page.getByRole('textbox', { name: 'First name *' });
    this.lastNReg = page.getByRole('textbox', { name: 'Last name *' });
    this.addressReg = page.getByRole('textbox', {
      name: 'Address * (Street address, P.',
    });
    this.countryReg = page.getByLabel('Country *');
    this.stateReg = page.getByRole('textbox', { name: 'State *' });
    this.cityReg = page.getByRole('textbox', { name: 'City * Zipcode *' });
    this.zipReg = page.locator('#zipcode');
    this.mobileReg = page.getByRole('textbox', { name: 'Mobile Number *' });
    this.createAccButton = page.getByRole('button', { name: 'Create Account' });
    this.nameCard = page.locator('[data-qa="name-on-card"]');
    this.numberCard = page.locator('[data-qa="card-number"]');
    this.numberCvc = page.locator('[data-qa="cvc"]');
    this.expiryMonth = page.locator('[data-qa="expiry-month"]');
    this.expiryYear = page.locator('[data-qa="expiry-year"]');
    this.payButton = page.locator('[data-qa="pay-button"]');
    this.logoutButton = page.getByRole('link', { name: ' Logout' });
    this.accDel = page.locator('[data-qa="account-deleted"]');
    this.getinTouch = page.getByRole('heading', { name: 'Get In Touch' });
    this.emailContact = page.getByRole('textbox', { name: 'Email' }).first();
    this.subjectBox = page.getByRole('textbox', { name: 'Subject' });
    this.contactMess = page.getByRole('textbox', { name: 'Your Message Here' });
    this.uploadFile = page.locator('input[name="upload_file"]');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.contactPage = page.locator('#contact-page');
    this.homeButton = page.getByRole('link', { name: ' Home' });
    this.textCenter = page.locator('.title.text-center')
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
    await this.mailReg.fill(userMail);
    await this.signupButton.click();
    await this.titleReg.check();
    await this.daysReg.selectOption(days);
    await this.monthsReg.selectOption(month);
    await this.yearsReg.selectOption(year);
    await this.passwordReg.fill(userPassword);
    await this.checkboxNwstr.check();
    await this.checkboxOffer.check();
    await this.companyReg.fill(company);
    await this.firstNReg.fill(firstName);
    await this.lastNReg.fill(lastName);
    await this.addressReg.fill(address);
    await this.countryReg.selectOption(country);
    await this.stateReg.fill(state);
    await this.cityReg.fill(city);
    await this.zipReg.fill(zipcode);
    await this.mobileReg.fill(mobile);
    await this.createAccButton.click();
  }
  async cardPay(
    nameOnCard: string,
    cardNumber: string,
    cvcNumber: string,
    exprMonth: string,
    exprYears: string,
  ): Promise<void> {
    await this.nameCard.fill(nameOnCard);
    await this.numberCard.fill(cardNumber);
    await this.numberCvc.fill(cvcNumber);
    await this.expiryMonth.fill(exprMonth);
    await this.expiryYear.fill(exprYears);
    await this.payButton.click();
  }
}
