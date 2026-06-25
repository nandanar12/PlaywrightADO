import { test as base, expect } from '@playwright/test';
import { RegistrationAction } from '../actions/registration.action';
import { HomePage } from '../pages/home-page';
import { BugsFormPage } from '../pages/bugs-form.page';

type Pages = {
  homePage: HomePage;
  bugsFormPage: BugsFormPage;
  registrationAction: RegistrationAction;
};

export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  bugsFormPage: async ({ page }, use) => {
    await use(new BugsFormPage(page));
  },

  registrationAction: async ({ homePage, bugsFormPage }, use) => {
    await use(new RegistrationAction(homePage, bugsFormPage));
  },
});

export { expect };
