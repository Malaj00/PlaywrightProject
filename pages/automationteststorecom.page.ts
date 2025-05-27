import { Locator, Page } from '@playwright/test';

export class AutomationStore {
  loginPage: Locator;

  constructor(private page: Page) {
    this.loginPage = page.getByText('Login or register');
  }
  async register(
    userName: string,
    userMail: string,
    userPassword: string,
    firstName: string,
    lastName: string,
    address: string,
    country: string,
    state: string,
    city: string,
    zipcode: string,
  ): Promise<void> {
    await this.page.locator('#AccountFrm_firstname').fill(firstName);
    await this.page.locator('#AccountFrm_lastname').fill(lastName);
    await this.page.locator('#AccountFrm_email').fill(userMail);
    await this.page.locator('#AccountFrm_address_1').fill(address);
    await this.page.locator('#AccountFrm_city').fill(city);
    await this.page.locator('#AccountFrm_country_id').selectOption(country);
    await this.page.locator('#AccountFrm_zone_id').selectOption(state);
    await this.page.locator('#AccountFrm_postcode').fill(zipcode);
    await this.page.locator('#AccountFrm_loginname').fill(userName);
    await this.page.locator('#AccountFrm_password').fill(userPassword);
    await this.page.locator('#AccountFrm_confirm').fill(userPassword);
    await this.page.locator('#AccountFrm_newsletter0').click();
    await this.page.locator('#AccountFrm_agree').click();
    await this.page.getByTitle('Continue').click();
  }

  async login(userName: string, userPassword: string){
    await this.page.locator('#loginFrm_loginname').fill(userName)
    await this.page.locator('#loginFrm_password').fill(userPassword)
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

}
