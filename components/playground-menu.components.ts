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
  verifyText: Locator;
  progressBar: Locator;
  visibility: Locator;
  sampleApp: Locator;
  mouseOver: Locator;
  nonBreaking: Locator;
  overlapped: Locator;
  shadowDOM: Locator;
  alerts: Locator;
  fileUpload: Locator;
  animatedButton: Locator;
  disabledInput: Locator;
  autoWait: Locator;

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
    this.dynamicTable = page.locator(
      '#overview .container a[href="/dynamictable"]',
    );
    this.verifyText = page.locator(
      '#overview .container a[href="/verifytext"]',
    );
    this.progressBar = page.locator(
      '#overview .container a[href="/progressbar"]',
    );
    this.visibility = page.locator(
      '#overview .container a[href="/visibility"]',
    );
    this.sampleApp = page.locator('#overview .container a[href="/sampleapp"]');
    this.mouseOver = page.locator('#overview .container a[href="/mouseover"]');
    this.nonBreaking = page.locator('#overview .container a[href="/nbsp"]');
    this.overlapped = page.locator(
      '#overview .container a[href="/overlapped"]',
    );
    this.shadowDOM = page.locator('#overview .container a[href="/shadowdom"]');
    this.alerts = page.locator('#overview .container a[href="/alerts"]');
    this.fileUpload = page.locator('#overview .container a[href="/upload"]');
    this.animatedButton = page.locator(
      '#overview .container a[href="/animation"]',
    );
    this.disabledInput = page.locator(
      '#overview .container a[href="/disabledinput"]',
    );
    this.autoWait = page.locator('#overview .container a[href="/autowait"]');
  }
}
