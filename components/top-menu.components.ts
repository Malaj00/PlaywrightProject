import { Locator, Page } from "@playwright/test";

export class TopMenuComponent {
    homeButton: Locator;
    productsButton: Locator;
    cartButton: Locator;
    signupLogin: Locator;
    testcasesButton: Locator;
    contactButton: Locator;

    constructor(private page: Page) {
        this.homeButton = page.locator('#header .nav a[href="/test_cases"]');
        this.productsButton = page.locator('#header .nav a[href="/products"]');
        this.cartButton = page.locator('#header .nav a[href="/view_cart"]');
        this.signupLogin = page.locator('#header .nav a[href="/login"]');
        this.testcasesButton =  page.locator('#header .nav a[href="/test_cases"]');
        this.contactButton = page.locator('#header .nav a[href="/contact_us"]');
    }
}
