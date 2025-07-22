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

  constructor(private page: Page) {
    this.mainTextDate = page.getByText('Bootstrap Date Pickers Demo');
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
