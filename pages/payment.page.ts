import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.components';
export class PaymentPage {
  trasnferReceiver: Locator;
  transferReceiverNumber: Locator;
  transferAmount: Locator;
  transferSubmit: Locator;
  popupClose: Locator;
  expectedMessage: Locator;
  sideMenu: SideMenuComponent;

  constructor(private page: Page) {
    this.sideMenu = new SideMenuComponent(this.page)
    this.trasnferReceiver = this.page.getByTestId('transfer_receiver');
    this.transferReceiverNumber = this.page.getByTestId('form_account_to');
    this.transferAmount = this.page.getByTestId('form_amount');
    this.transferSubmit = this.page.getByRole('button', {
      name: 'wykonaj przelew',
    });
    this.popupClose = this.page.getByTestId('close-button');
    this.expectedMessage = page.locator('#show_messages');
  }
}
