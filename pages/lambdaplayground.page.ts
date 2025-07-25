import { Locator, Page } from '@playwright/test';

export class LambdaTests {
  mainText: Locator;
  ajaxForm: Locator;
  nameForm: Locator;
  messageForm: Locator;
  submitButton: Locator;
  submitProcess: Locator;
  autoHealing: Locator;
  healUsername: Locator;
  healPass: Locator;
  submitBtn: Locator;
  chagngeDOM: Locator;
  loginSucces: Locator;
  autocloseSuccess: Locator;
  normalSuccess: Locator;
  autocloseInfo: Locator;
  normalInfo: Locator;
  bootstrapAlert: Locator;
  alertSuccess: Locator;
  alertNormalSuccess: Locator;
  closeAlert: Locator;
  alertInfo: Locator;
  autoInfoAlert: Locator;
  bootstrapDate: Locator;
  dateBirtday: Locator;
  startDate: Locator;
  endDate: Locator;
  datePick: Locator;
  dateYear: Locator;
  dateMonth: Locator;
  dateDay: Locator;
  mainTextDate: Locator;
  bootDualList: Locator;
  dualListLeft: Locator;
  dualListRight: Locator;
  listItem: Locator;
  searchBox: Locator;
  moveRight: Locator;
  bootstrapModal: Locator;
  launchModal: Locator;
  modalSave: Locator;
  modalClose: Locator;
  multipleModal: Locator;
  modalBody: Locator;
  singleModal: Locator;
  launchInModal: Locator;
  progressBar: Locator;
  startDwnl: Locator;
  progress100: Locator;
  complDwnl: Locator;
  brokenImg: Locator;
  checkboxDemo: Locator;
  singleCheck: Locator;
  optionOne: Locator;
  optionTwo: Locator;
  optionThree: Locator;
  optionFour: Locator;
  checkAll: Locator;
  multiFirst: Locator;
  multiSecond: Locator;
  multiThird: Locator;
  multiFourth: Locator;
  unCheckAll: Locator;

  constructor(private page: Page) {
    this.multiFirst = page
      .locator('.flex')
      .getByText('Option 1')
      .getByRole('checkbox');
    this.multiSecond = page
      .locator('.flex')
      .getByText('Option 2')
      .getByRole('checkbox');
    this.multiThird = page
      .locator('.flex')
      .getByText('Option 3')
      .getByRole('checkbox');
    this.multiFourth = page
      .locator('.flex')
      .getByText('Option 4')
      .getByRole('checkbox');
    this.checkAll = page.getByRole('button', { name: 'Check All' });
    this.unCheckAll = page.getByRole('button', { name: 'Uncheck All' });
    this.optionFour = page
      .locator('.mt-40')
      .getByText('Option 4')
      .getByRole('checkbox');
    this.optionThree = page
      .locator('.mt-40')
      .getByText('Option 3')
      .getByRole('checkbox');
    this.optionTwo = page
      .locator('.mt-40')
      .getByText('Option 2')
      .getByRole('checkbox');
    this.optionOne = page
      .locator('.mt-40')
      .getByText('Option 1')
      .getByRole('checkbox');
    this.singleCheck = page
      .getByText('Click on check box')
      .getByRole('checkbox');
    this.checkboxDemo = page.locator(
      'a[href="https://www.lambdatest.com/selenium-playground/checkbox-demo"]',
    );
    this.brokenImg = page.locator(
      'a[href="https://www.lambdatest.com/selenium-playground/broken-image"]',
    );
    this.complDwnl = page.locator('.success');
    this.progress100 = page.locator('.counter');
    this.startDwnl = page.locator('#dwnBtn');
    this.progressBar = page.locator(
      'a[href="https://www.lambdatest.com/selenium-playground/bootstrap-download-progress-demo"]',
    );
    this.launchInModal = page.getByTestId('#mySecondModal');
    this.singleModal = page.locator('#myModal');
    this.multipleModal = page.locator('#myMultiModal');
    this.modalClose = page.getByRole('button', { name: 'Close' });
    this.modalSave = page.getByRole('button', { name: 'Save Changes' });
    this.launchModal = page.getByRole('button', { name: 'Launch Modal' });
    this.bootstrapModal = page.locator(
      'a[href="https://www.lambdatest.com/selenium-playground/bootstrap-modal-demo"]',
    );
    this.moveRight = page.getByRole('button', { name: '>' });
    this.searchBox = page.getByPlaceholder('search');
    this.listItem = page.locator('.list-group-item');
    this.dualListLeft = page.locator('.dual-list.list-left');
    this.dualListRight = page.locator('.dual-list.list-right');
    this.bootDualList = page.locator(
      'a[href="https://www.lambdatest.com/selenium-playground/bootstrap-dual-list-box-demo"]',
    );
    this.datePick = page.locator('.datepicker-switch');
    this.dateYear = page.locator('.year');
    this.dateMonth = page.locator('.month');
    this.dateDay = page.locator('.day');
    this.endDate = page.getByPlaceholder('End date');
    this.startDate = page.getByPlaceholder('Start date');
    this.dateBirtday = page.locator('#birthday');
    this.bootstrapDate = page.locator(
      'a[href="https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo"]',
    );
    this.autoInfoAlert = page.locator('.alert.alert-info').filter({
      has: page.getByText('Normal info message.To close use the close button.'),
    });
    this.normalInfo = page.getByRole('button', { name: 'Normal Info Message' });
    this.autocloseInfo = page.getByRole('button', {
      name: 'Autoclosable Info Message',
    });
    this.alertInfo = page.locator('.alert.alert-info').filter({
      has: page.getByText('Autocloseable info message. Hide in 5 seconds.'),
    });
    this.closeAlert = page.locator('.close.absolute');
    this.alertNormalSuccess = page.locator('.alert.alert-success').filter({
      has: page.getByText(
        'Normal success message. To close use the close button.',
      ),
    });
    this.normalSuccess = page.getByRole('button', {
      name: 'Normal Success Message',
    });
    this.alertSuccess = page.locator('.alert.alert-success').filter({
      has: page.getByText('Autocloseable success message. Hide in 5 seconds.'),
    });
    this.autocloseSuccess = page.getByRole('button', {
      name: 'Autoclosable Success Message',
    });
    this.bootstrapAlert = page.locator(
      'a[href="https://www.lambdatest.com/selenium-playground/bootstrap-alert-messages-demo"]',
    );
    this.loginSucces = page.getByText('Login Successful');
    this.chagngeDOM = page.getByText('Change DOM ID');
    this.submitBtn = page.getByRole('button', { name: 'Submit' });
    this.healUsername = page.getByRole('textbox', { name: 'username' });
    this.healPass = page.locator('#password');
    this.autoHealing = page.locator(
      'a[href="https://www.lambdatest.com/selenium-playground/auto-healing"]',
    );
    this.submitProcess = page.locator('#submit-control');
    this.submitButton = page.locator('#btn-submit');
    this.nameForm = page.locator('#title');
    this.messageForm = page.locator('#description');
    this.mainText = page.locator('.sp__main');
    this.ajaxForm = page.locator(
      'a[href="https://www.lambdatest.com/selenium-playground/ajax-form-submit-demo"]',
    );
  }
}
