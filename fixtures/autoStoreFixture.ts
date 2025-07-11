import { test as base, Page, expect } from '@playwright/test';
import { AutomationStore } from '../pages/automationteststorecom.page';
import autostoreCredential from '../test-data/automationstore.json';

const test = base.extend<{
  storePage: AutomationStore;
  loggedInStorePage: AutomationStore;
  cartProducts: AutomationStore;
}>({
  storePage: async ({ page }, use) => {
    const storeMainPage = await initStore(page);
    await use(storeMainPage);
  },

  loggedInStorePage: async ({ page }, use) => {
    const storeLogin = await initStore(page);
    await storeLogin.login(
      autostoreCredential.userName,
      autostoreCredential.userPassword,
    );
    await use(storeLogin);
  },

  cartProducts: async ({ page }, use) => {
    const addToCart = await initStore(page);
    await addToCart.login(
      autostoreCredential.userName,
      autostoreCredential.userPassword,
    );
    await addToCart.homeButton.click();
    await addToCart.product52.click();
    await addToCart.cartMenuButton.click();

    await use(addToCart);
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
