import { Locator, Page } from '@playwright/test';

export class SauceDemo {
  loginInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;

  constructor(private page: Page) {
    this.loginInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]')
  }

  async login(userName: string, userPassword: string) {
    await this.loginInput.fill(userName);
    await this.passwordInput.fill(userPassword);
    await this.loginButton.click();
  }

  async cartAdd(){
    await this.page.locator('#add-to-cart-sauce-labs-backpack').click();
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }
}
