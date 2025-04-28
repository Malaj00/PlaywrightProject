import { Locator, Page } from "@playwright/test";

export class TopMenuComponent {
    homeButton: Locator;
    productsButton: Locator;
    cartButton: Locator;
    signupLogin: Locator;
    testcasesButton: Locator;
    contactButton: Locator;

    constructor(private page: Page) {
        this.homeButton = page.getByRole('link', { name: /Home/ });
        this.productsButton = page.getByRole('link', { name: /Products/ });
        this.cartButton = page.getByRole('link', { name: /Cart/ });
        this.signupLogin = page.getByRole('link', { name: /Signup/ });
        this.testcasesButton =  page.getByRole('link', { name: /Test Cases/ });
        this.contactButton = page.getByRole('link', { name: /Contact  us/ });
    }
}
