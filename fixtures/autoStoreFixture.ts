import { test as base, Page } from '@playwright/test';
import { AutomationStore } from '../pages/automationteststorecom.page';
import autostoreCredential from '../test-data/automationstore.json';

const test = base.extend<{
  storePage: AutomationStore;
  loggedIn: boolean;
}>({
  loggedIn: [false, { option: true, scope: 'test' }], // default: NOT LOGGED
  //note about false, option and scope


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

// test.use({ loggedIn: true });
// test.use({ loggedIn: false }); - note why it should be added
// storageState: undefined - in config - note about fresh session
// storePage as page in async ({ storePage }) =>
// do not have to use POM login methods fixture covers it
