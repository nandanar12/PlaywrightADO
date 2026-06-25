import { expect } from '@playwright/test';
import { test } from '../../business/fixtures/pageObjectFixture';
import { registerUsers } from '../data/uat/bugs-form.data';

test.describe('User Registration Tests', () => {

  // Setup before every test
  test.beforeEach(async ({ registrationAction }) => {
    await registrationAction.openRegistrationForm();
  });

  // Teardown after every test
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      const safeTitle = testInfo.title.replace(/[<>:"/\\|?*\x00-\x1F]/g, '_');
      await page.screenshot({
        path: `test-results/screenshots/${safeTitle}.png`,
        fullPage: true,
      });
    }
  });

  test('Register with valid data', { tag: ['@smoke', '@regression'] }, async ({ bugsFormPage, registrationAction }) => {
    await expect(bugsFormPage.termsAndConditions).toBeDisabled();
    await registrationAction.submitRegistrationForm(registerUsers.validUser);
    await expect(bugsFormPage.registrationResponse).toContainText('Successfully registered the following information');
  });

  test('Register without Email', { tag: '@regression' }, async ({ bugsFormPage, registrationAction }) => {
    await registrationAction.submitRegistrationForm(registerUsers.noEmail);
    await expect(bugsFormPage.registrationResponse).toContainText('Email is required');
  });

  test('Register without Password', { tag: '@regression' }, async ({ bugsFormPage, registrationAction }) => {
    await registrationAction.submitRegistrationForm(registerUsers.noPassword);
    await expect(bugsFormPage.registrationResponse).toContainText('The password should contain between [6,20] characters!');
  });
});
