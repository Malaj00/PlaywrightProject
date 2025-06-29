import { Locator, Page } from '@playwright/test';
import { AutoStoreCat } from '../components/automationteststoreCat.components';

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
  currencyHover: Locator;
  priceDollarCart: Locator;
  priceEuroCart: Locator;
  euroSet: Locator;
  categoryMenu: AutoStoreCat;
  subCat: Locator;
  brdBenefit: Locator;
  contactFName: Locator;
  contactEmail: Locator;
  contactEnquiry: Locator;
  submitButton: Locator;
  contactPage: Locator;
  contentPanel: Locator;
  contactReset: Locator;
  removeButton: Locator;
  bronzerStick: Locator;
  nameOfProduct: Locator;
  productReview: Locator;
  fiveStar: Locator;
  reviewName: Locator;
  reviewText: Locator;
  productTag: Locator;
  makeupTag: Locator;
  searchKeyword: Locator;
  addToWish: Locator;
  removeFromWish: Locator;
  accButton: Locator;
  wishList: Locator;
  couponBox: Locator;
  couponButton: Locator;
  couponRemove: Locator;
  cartUpadate: Locator;
  shipCountry: Locator;
  estimateButton: Locator;
  shippingRate: Locator;
  totalAmount: Locator;
  wishlistRemove: Locator;
  menuAccount: Locator;
  editAcc: Locator;
  lastNameInput: Locator;
  addressBook: Locator;
  newAddress: Locator;
  firstNameInput: Locator;
  addresInput: Locator;
  cityInput: Locator;
  regionInput: Locator;
  zipInput: Locator;
  countryInput: Locator;
  lastNameAddress: Locator;
  addressRadio: Locator;
  addressBox: Locator;
  addressDelete: Locator;
  notifyButton: Locator;
  notifyCheckbox: Locator;
  changePass: Locator;
  currentPass: Locator;
  newPass: Locator;
  newPassConfirm: Locator;

  constructor(private page: Page) {
    this.newPassConfirm = page.locator('#PasswordFrm_confirm')
    this.newPass = page.locator('#PasswordFrm_password')
    this.currentPass = page.locator('#PasswordFrm_current_password')
    this.changePass = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=account/password"]',
    );
    this.notifyCheckbox = page.locator('#imFrm_settingsnewsletteremail');
    this.notifyButton = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=account/notification"]',
    );
    this.addressDelete = page.getByTitle('Delete');
    this.addressBox = page.locator('.genericbox.border-bottom');
    this.addressRadio = page.locator('#AddressFrm_default0');
    this.countryInput = page.locator('#AddressFrm_country_id');
    this.zipInput = page.locator('#AddressFrm_postcode');
    this.regionInput = page.locator('#AddressFrm_zone_id');
    this.cityInput = page.locator('#AddressFrm_city');
    this.addresInput = page.locator('#AddressFrm_address_1');
    this.firstNameInput = page.locator('#AddressFrm_firstname');
    this.lastNameAddress = page.locator('#AddressFrm_lastname');
    this.lastNameInput = page.locator('#AccountFrm_lastname');
    this.newAddress = page.getByTitle('New Address');
    this.addressBook = page.getByTitle('Manage Address Book');
    this.editAcc = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=account/edit"]',
    );
    this.menuAccount = page.locator('.menu_account');
    this.wishlistRemove = page.locator('.btn.btn-sm.btn-default.btn-remove');
    this.totalAmount = page.locator('.bold.totalamout');
    this.shippingRate = page
      .locator('#totals_table')
      .locator('td')
      .filter({ has: page.getByText('$2.00') });
    this.estimateButton = page.getByTitle('Estimate');
    this.shipCountry = page.locator('#estimate_country');
    this.cartUpadate = page.locator('#cart_update');
    this.couponRemove = page.locator('#remove_coupon_btn');
    this.couponButton = page.locator('#apply_coupon_btn');
    this.couponBox = page.locator('#coupon_coupon');
    this.wishList = page.locator('.sidewidt').getByText('My wish list');
    this.accButton = page.getByRole('link', { name: '  Account' });
    this.addToWish = page.locator('.wishlist_add.btn.btn-large');
    this.removeFromWish = page.locator('.wishlist_remove.btn.btn-large');
    this.searchKeyword = page.locator('#keyword');
    this.makeupTag = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=product/search&keyword=makeup"]',
    );
    this.productTag = page.locator('a[href="#producttag"]');
    this.reviewText = page.locator('#text');
    this.reviewName = page.locator('#name');
    this.fiveStar = page.locator('#rating5');
    this.productReview = page.locator('a[href="#review"]');
    this.nameOfProduct = page.locator('.productname .bgnone');
    this.bronzerStick = page.getByTitle('Skinsheen Bronzer Stick');
    this.removeButton = page.locator('.btn.btn-sm.btn-default');
    this.contactReset = page.getByRole('button', { name: 'Reset' });
    this.contentPanel = page.locator('.contentpanel');
    this.contactPage = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=content/contact"]',
    );
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.contactEnquiry = page.locator('#ContactUsFrm_enquiry');
    this.contactEmail = page.locator('#ContactUsFrm_email');
    this.contactFName = page.locator('#ContactUsFrm_first_name');
    this.brdBenefit = page.locator('.internal');
    this.categoryMenu = new AutoStoreCat(this.page);
    this.priceEuroCart = page.getByRole('row').nth(1);
    //.filter({ has: page.getByText('26.28€') });
    this.euroSet = page.locator(
      'a[href="https://automationteststore.com/index.php?rt=checkout/cart&currency=EUR"]',
    );
    this.priceDollarCart = page.getByRole('row').nth(1);
    //.filter({ has: page.getByText('$28.00') });
    this.currencyHover = page.locator('.dropdown.hover');
    this.searchBox = page.locator('#filter_keyword');
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
