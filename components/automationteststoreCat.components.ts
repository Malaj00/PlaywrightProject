import { Locator, Page } from '@playwright/test';

export class AutoStoreCat {
  ApparelAcc: Locator;
  Makeup: Locator;
  Skincare: Locator;
  Fragrnance: Locator;
  Men: Locator;
  HairCare: Locator;
  Books: Locator;
  Shoes: Locator;
  Tshirts: Locator;
  constructor(private page: Page) {
    this.ApparelAcc = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=68"]',
    );
    this.Makeup = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=36"]',
    );
    this.Skincare = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=43"]',
    );
    this.Fragrnance = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=49""]',
    );
    this.Men = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=58"]',
    );
    this.HairCare = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=52"]',
    );
    this.Books = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=65"]',
    );
    this.Shoes = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=68_69"]',
    );
    this.Tshirts = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=68_70"]',
    );
  }
}
