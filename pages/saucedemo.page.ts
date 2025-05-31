import { Locator, Page } from '@playwright/test';

export class SauceDemo {
  loginInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  titleText: Locator;
  errorMessage: Locator;
  inventoryItemName: Locator;
  labsBackpackCart: Locator;
  labsTshirtCart: Locator;
  cartButton: Locator;
  cartBadge: Locator;
  removeLabsBackpack: Locator;
  removeButton: Locator;
  removeLabsTshirt: Locator;
  itemQuantity: Locator;
  checkoutButton: Locator;
  firstName: Locator;
  lastName: Locator;
  postalCode: Locator;
  continueButton: Locator;
  itemPrice: Locator;
  taxLabel: Locator;
  totalLabel: Locator;
  finishButton: Locator;
  completeHeader: Locator;
  backProdButton: Locator;
  sortContainer: Locator;

  constructor(private page: Page) {
    this.loginInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.titleText = page.getByTestId('title');
    this.errorMessage = page.getByTestId('error');
    this.cartButton = page.getByTestId('shopping-cart-link');
    this.inventoryItemName = page.getByTestId('inventory-item-name');
    this.labsBackpackCart = page.locator('#add-to-cart-sauce-labs-backpack');
    this.labsTshirtCart = page.locator('#add-to-cart-sauce-labs-bolt-t-shirt');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.removeLabsBackpack = page.locator('#remove-sauce-labs-backpack');
    this.removeLabsTshirt = page.locator('#remove-sauce-labs-bolt-t-shirt');
    this.removeButton = page.getByRole('button', { name: 'Remove' });
    this.itemQuantity = page.getByTestId('item-quantity');
    this.checkoutButton = page.locator('#checkout');
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.postalCode = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.itemPrice = page.getByTestId('inventory-item-price');
    this.taxLabel = page.getByTestId('tax-label');
    this.totalLabel = page.getByTestId('total-label')
    this.finishButton = page.locator('#finish')
    this.completeHeader = page.getByTestId('complete-header')
    this.backProdButton = page.locator('#back-to-products')
    this.sortContainer = page.getByTestId('product-sort-container')
  }

  async login(userName: string, userPassword: string) {
    await this.loginInput.fill(userName);
    await this.passwordInput.fill(userPassword);
    await this.loginButton.click();
  }

  async cartAdd() {
    await this.labsBackpackCart.click();
    await this.cartButton.click();
  }
}
