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
    await bugsFormPage.fillRegistrationForm(registerUsers.validUser);
    await bugsFormPage.checkTerms();
    await bugsFormPage.submit();
    await bugsFormPage.verifySuccessMessage();
  });

  test('Register without Email', async ({ bugsFormPage }) => {
    await bugsFormPage.fillRegistrationForm(registerUsers.noEmail);
    await bugsFormPage.submit();
    await bugsFormPage.verifyEmailMissingErrorMessage();
  });

  test('Register without Password', async ({ bugsFormPage }) => {
    await bugsFormPage.fillRegistrationForm(registerUsers.noPassword);
    await bugsFormPage.submit();
    await bugsFormPage.verifyPasswordMissingErrorMessage();
  });
});
