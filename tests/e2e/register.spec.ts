import { expect } from '@playwright/test';
import { test } from '../../fixtures/test-fixtures';
import { registerUsers } from '../../test-data/bugs-form.data';

test.describe('User Registration Tests', () => {

  // Setup before every test
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigateToHomePage();
    await homePage.navigateToRegistrationPage();
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

  test('Register with valid data', async ({ bugsFormPage }) => {
    await bugsFormPage.waitForRegistrationFormLoaded();
    await expect(bugsFormPage.headerText).toHaveText('CHALLENGE - Spot the BUGS!');
    await bugsFormPage.fillRegistrationForm(registerUsers.validUser);
    await expect(bugsFormPage.termsAndConditions).toBeDisabled();
    await bugsFormPage.submit();
    await expect(bugsFormPage.registrationResponseMessage).toContainText('Successfully registered the following information');
  });

  test('Register without Email', async ({ bugsFormPage }) => {
    await bugsFormPage.waitForRegistrationFormLoaded();
    await expect(bugsFormPage.headerText).toHaveText('CHALLENGE - Spot the BUGS!');
    await bugsFormPage.fillRegistrationForm(registerUsers.noEmail);
    await bugsFormPage.submit();
    await expect(bugsFormPage.registrationResponseMessage).toContainText('Email is required');
  });

  test('Register without Password', async ({ bugsFormPage }) => {
    await bugsFormPage.waitForRegistrationFormLoaded();
    await expect(bugsFormPage.headerText).toHaveText('CHALLENGE - Spot the BUGS!');
    await bugsFormPage.fillRegistrationForm(registerUsers.noPassword);
    await bugsFormPage.submit();
    await expect(bugsFormPage.registrationResponseMessage).toContainText('The password should contain between [6,20] characters!');
  });
});
