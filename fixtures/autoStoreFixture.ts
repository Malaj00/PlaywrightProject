import { test as base, Page } from '@playwright/test';
import { AutomationStore } from '../pages/automationteststorecom.page';
import autostoreCredential from '../test-data/automationstore.json';

const test = base.extend<{ loggedInPage: Page }>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new AutomationStore(page);
    await loginPage.login(
      autostoreCredential.userName,
      autostoreCredential.userPassword,
    );
    await use(page);
  },
});
export { test };
