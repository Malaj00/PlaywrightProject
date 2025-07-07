import { test as base, Page } from '@playwright/test';
import { AutomationStore } from '../pages/automationteststorecom.page';
import autostoreCredential from '../test-data/automationstore.json';

const test = base.extend<{
  storePage: AutomationStore;
  loggedIn: boolean;
}>({
  loggedIn: [false, { option: true }], // default: NIEZALOGOWANY

  storePage: async ({ page, loggedIn }, use) => {
    const store = new AutomationStore(page);

    //main page site separate from logging
    await page.goto('https://automationteststore.com/');
    
    
    if (loggedIn) {
      await store.loginPage.click(); //note about logging logic and login page
      await store.login(
        autostoreCredential.userName,
        autostoreCredential.userPassword,
      );
    }

    await use(store);
  },
});

export { test };