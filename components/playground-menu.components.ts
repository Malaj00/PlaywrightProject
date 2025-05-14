import { Locator, Page } from '@playwright/test';

export class PlaygroundMenu {
  dynamicID: Locator;
  classAtt: Locator;
  hiddLayer: Locator;
  loadDelay: Locator;
  ajaxData: Locator;
  clientSide: Locator;
  click: Locator;
  textInput: Locator;
  scollbars: Locator;
  dynamicTable: Locator;

  constructor(private page: Page) {
    this.dynamicID = page.locator('#overview .container a[href="/dynamicid"]');
    this.classAtt = page.locator('#overview .container a[href="/classattr"]');
    this.hiddLayer = page.locator(
      '#overview .container a[href="/hiddenlayers"]',
    );
    this.loadDelay = page.locator('#overview .container a[href="/loaddelay"]');
    this.ajaxData = page.locator('#overview .container a[href="/ajax"]');
    this.clientSide = page.locator(
      '#overview .container a[href="/clientdelay"]',
    );
    this.click = page.locator('#overview .container a[href="/click"]');
    this.textInput = page.locator('#overview .container a[href="/textinput"]');
    this.scollbars = page.locator('#overview .container a[href="/scrollbars"]');
    this.dynamicTable = page.locator('#overview .container a[href="/dynamictable"]');

  }
}
