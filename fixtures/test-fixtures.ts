import { test as base, expect } from '@playwright/test';
import { BugsFormPage } from '../pages/bugs/bugs-form.page';
import { HomePage } from '../pages/home/home-page';

type Fixtures = {
  bugsFormPage: BugsFormPage;
  homePage: HomePage;
};

export const test = base.extend<Fixtures>({
  bugsFormPage: async ({ page }, use) => {
    console.log('BugsFormPage type:', typeof BugsFormPage, BugsFormPage);

    await use(new BugsFormPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export { expect };
