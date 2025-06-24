import { test as base } from '@playwright/test';
import autostoreCredential from '../test-data/automationstore.json';

// Mówimy TypeScriptowi, że fixture będzie miał obiekt `user`
type MyFixtures = {
  user: {
    email: string;
    password: string;
  };
};

// Tworzymy własną wersję `test`, która ma dostęp do `user`
export const test = base.extend<MyFixtures>({
  user: async ({}, use) => {
    const testUser = {
      email: autostoreCredential.userMail,
      password: autostoreCredential.userPassword,
    };

    await use(testUser);
  },
});
