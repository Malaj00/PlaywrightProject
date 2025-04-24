import { Locator, Page } from '@playwright/test';

export class RegisterPage {
    mailInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;


    constructor(private page: Page) {
        this.mailInput = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }
    async login (userMail: string, userPassword: string): Promise<void> {
        await this.mailInput.fill(userMail);
        await this.passwordInput.fill(userPassword);
        await this.loginButton.click();
    }
}