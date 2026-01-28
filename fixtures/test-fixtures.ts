import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/home/home-page';
import { BugsFormPage } from '../pages/bugs/bugs-form.page';

type Pages = {
  homePage: HomePage;
  bugsFormPage: BugsFormPage;
};

export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  bugsFormPage: async ({ page }, use) => {
    await use(new BugsFormPage(page));
  },
});

export { expect };
