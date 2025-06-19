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
  Cheeks: Locator;
  EyesMake: Locator;
  FaceMake: Locator;
  Lips: Locator;
  Nails: Locator;
  ValueSets: Locator;
  EyesSkin: Locator;
  FaceSkin: Locator;
  HandsNails: Locator;
  GiftSets: Locator;
  Sun: Locator;
  MenFragn: Locator;
  WomenFragn: Locator;
  BodyShower: Locator;
  FragnanceSets: Locator;
  Shaving: Locator;
  MenSkincare: Locator;
  Conditioner: Locator;
  Shampoo: Locator;
  AudioCD: Locator;
  Paperback: Locator;

  constructor(private page: Page) {
    this.MenSkincare = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=58_60"]',
    );
    this.Shaving = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=58_61"]',
    );
    this.FragnanceSets = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=58_59"]',
    );
    this.BodyShower = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=58_63"]',
    );
    this.Paperback = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=65_67"]',
    );
    this.AudioCD = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=65_66"]',
    );
    this.Shampoo = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=52_53"]',
    );
    this.Conditioner = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=52_54"]',
    );
    this.MenFragn = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=49_51"]',
    );
    this.WomenFragn = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=49_50"]',
    );
    this.Sun = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=43_44"]',
    );
    this.GiftSets = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=43_45"]',
    );
    this.HandsNails = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=43_48"]',
    );
    this.FaceSkin = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=43_46"]',
    );
    this.EyesSkin = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=43_47"]',
    );
    this.HandsNails = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=43_48"]',
    );
    this.ValueSets = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=36_37"]',
    );
    this.Nails = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=36_42"]',
    );
    this.Lips = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=36_41"]',
    );
    this.FaceMake = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=36_38"]',
    );
    this.EyesMake = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=36_39"]',
    );
    this.Cheeks = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=36_40"]',
    );
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
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=49"]',
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
