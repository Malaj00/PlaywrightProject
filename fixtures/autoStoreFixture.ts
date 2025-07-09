import { test as base, Page, expect } from '@playwright/test';
import { AutomationStore } from '../pages/automationteststorecom.page';
import autostoreCredential from '../test-data/automationstore.json';

const test = base.extend<{
  storePage: AutomationStore;
  loggedInStorePage: AutomationStore;
}>({
  storePage: async ({ page }, use) => {
    const store = await initStore(page);
    await use(store);
  },

  loggedInStorePage: async ({ page }, use) => {
    const store = await initStore(page);
    await store.login(
      autostoreCredential.userName,
      autostoreCredential.userPassword,
    );
    await use(store);
  },
});

async function initStore(page: Page) {
  const store = new AutomationStore(page);
  await page.goto('https://automationteststore.com/');
  await expect(store.welcomeMsg).toContainText(
    'Welcome to the Automation Test Store!',
  );
  return store;
}
export { test };

// const test = base.extend<{
//   storePage: AutomationStore;
//   loggedIn: boolean;
// }>({
//   loggedIn: [false, { option: true, scope: 'test' }], // default: NOT LOGGED
//   //note about false, option and scope

//   storePage: async ({ page, loggedIn }, use) => {
//     const store = new AutomationStore(page);

//     //main page site separate from logging
//     await page.goto('https://automationteststore.com/');
//     await expect(store.welcomeMsg).toContainText(
//       'Welcome to the Automation Test Store!',
//     );
//     await use(store);
//     if (loggedIn) {
//       //await store.loginPage.click(); //note about logging logic and login page
//       await store.login(
//         autostoreCredential.userName,
//         autostoreCredential.userPassword,
//       );
//     }

//   },
// });
