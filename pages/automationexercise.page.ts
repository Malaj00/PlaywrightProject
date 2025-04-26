import { Locator, Page } from '@playwright/test';

export class RegisterPage {
    mailInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    continueButton: Locator;
    deleteAcc: Locator;
    accDeleted: Locator;



    constructor(private page: Page) {
        this.mailInput = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.continueButton = page.getByRole('link', { name: 'Continue' });
        this.deleteAcc = page.getByRole('link', { name: ' Delete Account' });
        this.accDeleted = page.getByText('Account Deleted!');
    }
    async login (userMail: string, userPassword: string): Promise<void> {
        await this.mailInput.fill(userMail);
        await this.passwordInput.fill(userPassword);
        await this.loginButton.click();
    }
    async deleteAccount (): Promise<void> {
    await this.deleteAcc.click();
    await this.continueButton.click();
    }
}

