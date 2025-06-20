import { Locator, Page } from '@playwright/test';
import { TopMenuComponent } from '../components/top-menu.components';

export class AutomationExercise {
  mailInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  continueButton: Locator;
  deleteAcc: Locator;
  accDeleted: Locator;
  topMenu: TopMenuComponent;
  nameBox: Locator;
  consentButton: Locator;
  sliderCarousel: Locator;
  loginToAcc: Locator;
  newUserSignup: Locator;
  mailReg: Locator;
  signupButton: Locator;
  accInf: Locator;
  titleReg: Locator;
  daysReg: Locator;
  monthsReg: Locator;
  yearsReg: Locator;
  passwordReg: Locator;
  checkboxNwstr: Locator;
  checkboxOffer: Locator;
  companyReg: Locator;
  firstNReg: Locator;
  lastNReg: Locator;
  addressReg: Locator;
  countryReg: Locator;
  stateReg: Locator;
  cityReg: Locator;
  zipReg: Locator;
  mobileReg: Locator;
  createAccButton: Locator;
  nameCard: Locator;
  numberCard: Locator;
  numberCvc: Locator;
  expiryMonth: Locator;
  expiryYear: Locator;
  payButton: Locator;
  logoutButton: Locator;
  mailSignup: Locator;
  accDel: Locator;
  getinTouch: Locator;
  emailContact: Locator;
  subjectBox: Locator;
  contactMess: Locator;
  uploadFile: Locator;
  submitButton: Locator;
  contactPage: Locator;
  homeButton: Locator;
  textCenter: Locator;
  allProducts: Locator;
  featuresItems: Locator;
  viewProduct: Locator;
  blueTop: Locator;
  categoryTops: Locator;
  priceProduct: Locator;
  availabilityProduct: Locator;
  conditionProduct: Locator;
  brandProduct: Locator;
  searchProduct: Locator;
  submitSearch: Locator;
  searchedProducts: Locator;
  blueTopSearched: Locator;
  footerPage: Locator;
  subsribeMail: Locator;
  subButton: Locator;
  subSucces: Locator;
  dataProduct1: Locator;
  dataProduct2: Locator;
  shoppingButton: Locator;
  viewCart: Locator;
  productOne: Locator;
  productTwo: Locator;
  cartP1Price: Locator;
  cartP2Price: Locator;
  cartP1Total: Locator;
  cartP2Total: Locator;
  cartP1Quantity: Locator;
  cartP2Quantity: Locator;
  viewProd8: Locator;
  rsText: Locator;
  quantityProduct: Locator;
  addToCart: Locator;
  cartProduct: Locator;
  cartQuantity: Locator;
  shoppingCart: Locator;
  gotoCheckout: Locator;
  reglogLink: Locator;
  accCreated: Locator;
  contButton: Locator;
  deliveryFName: Locator;
  invoiceFName: Locator;
  cartItems: Locator;
  formControl: Locator;
  placeOrder: Locator;
  alertSucces: Locator;
  emptyCart: Locator;
  sideBarCat: Locator;
  panelGroup: Locator;
  womenLink: Locator;
  dressLink: Locator;
  titleText: Locator;
  badgeClass: Locator;
  jeansLink: Locator;
  sideBarBrand: Locator;
  navClass: Locator;
  productInfo: Locator;
  reviewText: Locator;
  nameReview: Locator;
  emailReview: Locator;
  reviewTextBox: Locator;
  reviewButton: Locator;
  reviewSection: Locator;
  itemsRecomm: Locator;
  recommendedCart: Locator;
  continueCart: Locator;
  orderMsg: Locator;
  downloadInvoice: Locator;
  scrllUp: Locator;
  tdLocator: Locator;

  constructor(private page: Page) {
    this.scrllUp = page.locator('#scrollUp');
    this.downloadInvoice = page.getByRole('link', { name: 'Download Invoice' });
    this.orderMsg = page.locator('#ordermsg .form-control');
    this.continueCart = page.getByRole('button', { name: 'Continue On Cart' });
    this.recommendedCart = page.locator(
      '#recommended-item-carousel .add-to-cart',
    );
    this.itemsRecomm = page.locator('.recommended_items');
    this.reviewSection = page.locator('#review-section');
    this.nameReview = page.locator('#name');
    this.emailReview = page.locator('#email');
    this.reviewTextBox = page.locator('#review');
    this.reviewButton = page.locator('#button-review');
    this.reviewText = page.locator('a[href="#reviews"]');
    this.productInfo = page.locator('.productinfo p:has-text("Blue Top")');
    this.navClass = page.locator('.nav');
    this.sideBarBrand = page.locator('.left-sidebar h2:has-text("Brands")');
    this.jeansLink = page.getByRole('link', { name: 'Jeans' });
    this.badgeClass = page.locator('.badge');
    this.sideBarCat = page.locator('.left-sidebar h2:has-text("Category")');
    this.panelGroup = page.locator('.panel-group');
    this.womenLink = page.getByRole('link', { name: 'Women' });
    this.dressLink = page.getByRole('link', { name: 'Dress' });
    this.titleText = page.locator('.title');
    this.emptyCart = page.locator('#empty_cart');
    this.alertSucces = page.locator('.alert-success');
    this.placeOrder = page.getByRole('link', { name: 'Place Order' });
    this.formControl = page.locator('.form-control');
    this.cartItems = page.locator('#cart_items');
    this.invoiceFName = page.locator('#address_invoice .address_firstname');
    this.deliveryFName = page.locator('#address_delivery .address_firstname');
    this.contButton = page.locator('[data-qa="continue-button"]');
    this.accCreated = page.locator('[data-qa="account-created"]');
    this.reglogLink = page.getByRole('link', { name: 'Register / Login' });
    this.gotoCheckout = page.getByText('Proceed To Checkout');
    this.shoppingCart = page.getByText('Shopping Cart');
    this.cartProduct = page.locator('.cart_product');
    this.cartQuantity = page.locator('.cart_quantity .disabled');
    this.addToCart = page.getByRole('button', { name: ' Add to cart' });
    this.quantityProduct = page.locator('#quantity');
    this.rsText = page.getByText('Rs.');
    this.viewProd8 = page.locator(
      '.features_items a[href="/product_details/8"]',
    );
    this.cartP1Quantity = page.locator('#product-1 .cart_quantity .disabled');
    this.cartP2Quantity = page.locator('#product-2 .cart_quantity .disabled');
    this.cartP1Total = page.locator('#product-1 .cart_total_price');
    this.cartP2Total = page.locator('#product-2 .cart_total_price');
    this.cartP2Price = page.locator('#product-2 .cart_price');
    this.cartP1Price = page.locator('#product-1 .cart_price');
    this.productOne = page.locator('#product-1');
    this.productTwo = page.locator('#product-2');
    this.viewCart = page.getByRole('link', { name: 'View Cart' });
    this.shoppingButton = page.getByRole('button', {
      name: 'Continue Shopping',
    });
    this.dataProduct1 = page.locator('[data-product-id="1"]');
    this.dataProduct2 = page.locator('[data-product-id="2"]');
    this.subSucces = page.getByText('You have been successfully');
    this.subButton = page.locator('#subscribe');
    this.subsribeMail = page.locator('#susbscribe_email');
    this.footerPage = page.locator('#footer');
    this.blueTopSearched = page.locator('.features_items  .col-sm-4  p');
    this.submitSearch = page.locator('#submit_search');
    this.searchedProducts = page.locator('h2:has-text("Searched Products")');
    this.searchProduct = page.getByRole('textbox', { name: 'Search Product' });
    this.mailInput = page
      .locator('form')
      .filter({ hasText: 'Login' })
      .getByPlaceholder('Email Address');
    this.mailSignup = page
      .locator('form')
      .filter({ hasText: 'Signup' })
      .getByPlaceholder('Email Address');
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.continueButton = page.getByRole('link', { name: 'Continue' });
    this.deleteAcc = page.getByRole('link', { name: ' Delete Account' });
    this.accDeleted = page.getByText('Account Deleted!');
    this.topMenu = new TopMenuComponent(this.page);
    this.nameBox = page.getByRole('textbox', { name: 'Name' });
    this.consentButton = page.getByRole('button', { name: 'Consent' });
    this.sliderCarousel = page.locator('#slider-carousel');
    this.loginToAcc = page.getByText('Login to your account');
    this.newUserSignup = page.getByText('New User Signup!');
    this.mailReg = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.getByRole('button', { name: 'Signup' });
    this.accInf = page.getByText('Enter Account Information');
    this.titleReg = page.getByRole('radio', { name: 'Mr.' });
    this.daysReg = page.locator('#days');
    this.monthsReg = page.locator('#months');
    this.yearsReg = page.locator('#years');
    this.passwordReg = page.getByRole('textbox', { name: 'Password *' });
    this.checkboxNwstr = page.getByRole('checkbox', {
      name: 'Sign up for our newsletter!',
    });
    this.checkboxOffer = page.getByRole('checkbox', {
      name: 'Receive special offers from',
    });
    this.companyReg = page.getByRole('textbox', {
      name: 'Company',
      exact: true,
    });
    this.firstNReg = page.getByRole('textbox', { name: 'First name *' });
    this.lastNReg = page.getByRole('textbox', { name: 'Last name *' });
    this.addressReg = page.getByRole('textbox', {
      name: 'Address * (Street address, P.',
    });
    this.countryReg = page.getByLabel('Country *');
    this.stateReg = page.getByRole('textbox', { name: 'State *' });
    this.cityReg = page.getByRole('textbox', { name: 'City * Zipcode *' });
    this.zipReg = page.locator('#zipcode');
    this.mobileReg = page.getByRole('textbox', { name: 'Mobile Number *' });
    this.createAccButton = page.getByRole('button', { name: 'Create Account' });
    this.nameCard = page.locator('[data-qa="name-on-card"]');
    this.numberCard = page.locator('[data-qa="card-number"]');
    this.numberCvc = page.locator('[data-qa="cvc"]');
    this.expiryMonth = page.locator('[data-qa="expiry-month"]');
    this.expiryYear = page.locator('[data-qa="expiry-year"]');
    this.payButton = page.locator('[data-qa="pay-button"]');
    this.logoutButton = page.getByRole('link', { name: ' Logout' });
    this.accDel = page.locator('[data-qa="account-deleted"]');
    this.getinTouch = page.getByRole('heading', { name: 'Get In Touch' });
    this.emailContact = page.getByRole('textbox', { name: 'Email' }).first();
    this.subjectBox = page.getByRole('textbox', { name: 'Subject' });
    this.contactMess = page.getByRole('textbox', { name: 'Your Message Here' });
    this.uploadFile = page.locator('input[name="upload_file"]');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.contactPage = page.locator('#contact-page');
    this.homeButton = page.getByRole('link', { name: ' Home' });
    this.textCenter = page.locator('.title.text-center');
    this.allProducts = page.getByRole('heading', { name: 'All Products' });
    this.featuresItems = page.locator('.features_items');
    this.viewProduct = page.getByText('View Product');
    this.blueTop = page.locator('h2:has-text("Blue Top")');
    this.categoryTops = page.getByText('Category: Women > Tops');
    this.priceProduct = page.getByText('Rs.');
    this.availabilityProduct = page.locator('p:has-text("Availability:")');
    this.conditionProduct = page.locator('p:has-text("Condition:")');
    this.brandProduct = page.locator('p:has-text("Brand:")');
  }
  async login(userMail: string, userPassword: string): Promise<void> {
    await this.mailInput.fill(userMail);
    await this.passwordInput.fill(userPassword);
    await this.loginButton.click();
  }
  async deleteAccount(): Promise<void> {
    await this.deleteAcc.click();
    await this.continueButton.click();
  }
  async register(
    userName: string,
    userMail: string,
    userPassword: string,
    days: string,
    month: string,
    year: string,
    company: string,
    firstName: string,
    lastName: string,
    address: string,
    mobile: string,
    country: string,
    state: string,
    city: string,
    zipcode: string,
  ): Promise<void> {
    await this.nameBox.fill(userName);
    await this.mailReg.fill(userMail);
    await this.signupButton.click();
    await this.titleReg.check();
    await this.daysReg.selectOption(days);
    await this.monthsReg.selectOption(month);
    await this.yearsReg.selectOption(year);
    await this.passwordReg.fill(userPassword);
    await this.checkboxNwstr.check();
    await this.checkboxOffer.check();
    await this.companyReg.fill(company);
    await this.firstNReg.fill(firstName);
    await this.lastNReg.fill(lastName);
    await this.addressReg.fill(address);
    await this.countryReg.selectOption(country);
    await this.stateReg.fill(state);
    await this.cityReg.fill(city);
    await this.zipReg.fill(zipcode);
    await this.mobileReg.fill(mobile);
    await this.createAccButton.click();
  }
  async cardPay(
    nameOnCard: string,
    cardNumber: string,
    cvcNumber: string,
    exprMonth: string,
    exprYears: string,
  ): Promise<void> {
    await this.nameCard.fill(nameOnCard);
    await this.numberCard.fill(cardNumber);
    await this.numberCvc.fill(cvcNumber);
    await this.expiryMonth.fill(exprMonth);
    await this.expiryYear.fill(exprYears);
    await this.payButton.click();
  }
}
