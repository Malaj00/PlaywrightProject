import { Locator, Page } from '@playwright/test';

export class AutomationStore {
  loginPage: Locator;
  loginInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  radioRegister: Locator;
  continueButton: Locator;
  welcomeMsg: Locator;
  mainText: Locator;
  subText: Locator;
  errorAlert: Locator;
  forgotPass: Locator;
  forgotLogInput: Locator;
  forgotEmlInput: Locator;
  succesAlert: Locator;
  errorFrgPass: Locator;
  forgotLogin: Locator;
  forgotLNameInput: Locator;
  homeButton: Locator;
  product52: Locator;
  quantity52: Locator;
  cartMenuButton: Locator;
  bellaBambaCart: Locator;
  checkoutTable: Locator;
  cartCheckout: Locator;
  checkoutButton: Locator;
  accountText: Locator;
  checkOrderLink: Locator;
  checkOrderView: Locator;
  orderIdDetails: Locator;
  subSucces: Locator;
  tdLocator: Locator;
  logoutButton: Locator;
  specialsButton: Locator;
  saleClass: Locator;
  productName: Locator;
  product65: Locator;
  oldPrice: Locator;
  newPrice: Locator;
  quickBasket: Locator;
  newsSignup: Locator;
  newsInput: Locator;
  subButton: Locator;
  subFName: Locator;
  subLName: Locator;
  helpBlock: Locator;
  scrollUp: Locator;
  searchBox: Locator;


  constructor(private page: Page) {
    this.searchBox = page.locator('#filter_keyword')
    this.scrollUp = page.locator('#gotop');
    this.helpBlock = page.locator('.help-block');
    this.subLName = page.locator('#SubscriberFrm_lastname');
    this.subFName = page.locator('#SubscriberFrm_firstname');
    this.subButton = page.locator('.btn.btn-orange');
    this.newsInput = page.locator('#appendedInputButton');
    this.newsSignup = page.locator('#newslettersignup');
    this.quickBasket = page.locator('.quick_basket');
    this.newPrice = page.locator('.thumbnail .pricenew');
    this.oldPrice = page.locator('.thumbnail .priceold');
    this.product65 = page.getByTestId('65');
    this.productName = page.locator('.contentpanel .prdocutname');
    this.saleClass = page.locator('.contentpanel .sale');
    this.specialsButton = page.locator('#topnav').getByTestId('menu_specials');
    this.logoutButton = page.getByRole('link').filter({ hasText: 'Logout' });
    this.tdLocator = page.locator('td');
    this.loginPage = page.getByText('Login or register');
    this.loginInput = page.locator('#loginFrm_loginname');
    this.passwordInput = page.locator('#loginFrm_password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.radioRegister = page.locator('#accountFrm_accountregister');
    this.continueButton = page.getByTitle('Continue');
    this.welcomeMsg = page.locator('#maincontainer .welcome_msg');
    this.mainText = page.locator('.maintext');
    this.subText = page.locator('.subtext');
    this.errorAlert = page.locator('.alert.alert-error.alert-danger');
    this.forgotPass = page.locator(
      `a[href="https://automationteststore.com/index.php?rt=account/forgotten/password"]`,
    );
    this.forgotLogin = page.locator(
      `a[href="https://automationteststore.com/index.php?rt=account/forgotten/loginname"]`,
    );
    this.forgotLogInput = page.locator('#forgottenFrm_loginname');
    this.forgotEmlInput = page.locator('#forgottenFrm_email');
    this.succesAlert = page.locator('.alert.alert-success');
    this.errorFrgPass = page.locator('.alert.alert-danger');
    this.forgotLNameInput = page.locator('#forgottenFrm_lastname');
    this.homeButton = page.locator('.active.menu_home');
    this.product52 = page.getByTestId('52');
    this.cartMenuButton = page.locator('#topnav').getByTestId('menu_cart');
    this.bellaBambaCart = page
      .getByRole('row')
      .filter({ has: page.getByText('Benefit Bella Bamba') });
    this.quantity52 = page.locator('#cart_quantity52');
    this.checkoutTable = page.locator('tbody tr td.align_left');
    this.cartCheckout = page.locator('#cart_checkout1');
    this.checkoutButton = page.locator('#checkout_btn');
    this.accountText = page.getByText('Account');
    this.checkOrderLink = page
      .getByRole('link')
      .filter({ hasText: 'Check Your Order' });
    this.checkOrderView = page.getByRole('button').filter({ hasText: 'View' });
    this.orderIdDetails = page
      .locator('.table-responsive')
      .filter({ has: page.getByText('Order ID') });
  }
  async register(
    userName: string,
    userMail: string,
    userPassword: string,
    firstName: string,
    lastName: string,
    address: string,
    country: string,
    state: string,
    city: string,
    zipcode: string,
  ): Promise<void> {
    await this.page.locator('#AccountFrm_firstname').fill(firstName);
    await this.page.locator('#AccountFrm_lastname').fill(lastName);
    await this.page.locator('#AccountFrm_email').fill(userMail);
    await this.page.locator('#AccountFrm_address_1').fill(address);
    await this.page.locator('#AccountFrm_city').fill(city);
    await this.page.locator('#AccountFrm_country_id').selectOption(country);
    await this.page.locator('#AccountFrm_zone_id').selectOption(state);
    await this.page.locator('#AccountFrm_postcode').fill(zipcode);
    await this.page.locator('#AccountFrm_loginname').fill(userName);
    await this.page.locator('#AccountFrm_password').fill(userPassword);
    await this.page.locator('#AccountFrm_confirm').fill(userPassword);
    await this.page.locator('#AccountFrm_newsletter0').click();
    await this.page.locator('#AccountFrm_agree').click();
    await this.page.getByTitle('Continue').click();
  }

  async login(userName: string, userPassword: string) {
    await this.loginInput.fill(userName);
    await this.passwordInput.fill(userPassword);
    await this.loginButton.click();
  }
}
