import { test } from '../../fixtures/test-fixtures';
import { registerUsers } from '../../test-data/bugs-form.data';

// Run these tests in parallel
test.describe.parallel('User Registration Tests', () => {
    test('Register with valid data', async ({ homePage, bugsFormPage }) => {
        await homePage.navigateToHomePage();
        await homePage.navigateToRegistrationPage();

        await bugsFormPage.fillRegistrationForm(registerUsers.validUser);
        await bugsFormPage.checkTerms();
        await bugsFormPage.submit();
        await bugsFormPage.verifySuccessMessage();
    });

    test('Register without Email', async ({ homePage, bugsFormPage }) => {
        await homePage.navigateToHomePage();
        await homePage.navigateToRegistrationPage();

        await bugsFormPage.fillRegistrationForm(registerUsers.noEmail);
        await bugsFormPage.submit();

        await bugsFormPage.verifyEmailMissingErrorMessage();
    });


    test('Register without Password', async ({ homePage, bugsFormPage }) => {
        await homePage.navigateToHomePage();
        await homePage.navigateToRegistrationPage();

        await bugsFormPage.fillRegistrationForm(registerUsers.noEmail);
        await bugsFormPage.submit();
        await bugsFormPage.verifyPasswordMissingErrorMessage();
    });
});