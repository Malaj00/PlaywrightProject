import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.components';
export class PulpitPage {
  paymentReceiver: Locator;
  paymentAmount: Locator;
  paymentTitle: Locator;
  paymentSubmit: Locator;
  popupClose: Locator;
  expectedTrasnferMessage: Locator;
  topupReceiver: Locator;
  topupAmount: Locator;
  topupCheckbox: Locator;
  topupSubmit: Locator;
  topupBalance: Locator;
  correctUserName: Locator;
  sideMenu: SideMenuComponent;

  constructor(private page: Page) {
    this.sideMenu = new SideMenuComponent(this.page);
    this.paymentReceiver = this.page.locator('#widget_1_transfer_receiver');
    this.paymentAmount = this.page.locator('#widget_1_transfer_amount');
    this.paymentTitle = this.page.locator('#widget_1_transfer_title');
    this.paymentSubmit = this.page.getByRole('button', { name: 'wykonaj' });
    this.popupClose = this.page.getByTestId('close-button');
    this.expectedTrasnferMessage = this.page.locator('#show_messages');
    this.topupReceiver = page.locator('#widget_1_topup_receiver');
    this.topupAmount = page.locator('#widget_1_topup_amount');
    this.topupCheckbox = page.locator('#uniform-widget_1_topup_agreement span');
    this.topupSubmit = page.getByRole('button', { name: 'doładuj telefon' });
    this.topupBalance = page.locator('#money_value');
    this.correctUserName = this.page.getByTestId('user-name');
  }
  async quickpayment(
    reciverId: string,
    transferAmount: string,
    transferTitle: string,
  ): Promise<void> {
    await this.paymentReceiver.selectOption(reciverId);
    await this.paymentAmount.fill(transferAmount);
    await this.paymentTitle.fill(transferTitle);
    await this.paymentSubmit.click();
    await this.popupClose.click();
  }
  async topup(receiverTopup: string, transferAmount: string): Promise<void> {
    await this.topupReceiver.selectOption(receiverTopup);
    await this.topupAmount.fill(transferAmount);
    await this.topupCheckbox.click();
    await this.topupSubmit.click();
  }
}
