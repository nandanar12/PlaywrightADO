import { Page, Locator, expect } from '@playwright/test';
import { RegisterFormDTO } from '../../models/register-form.dto';
import { getRegistrationDetails } from '../../utils/extract-user-registration-details';

// This class represents the registration form page and contains methods to interact with the form.
// It includes methods to fill the form, submit it, and verify the registration response.
export class BugsFormPage {
    readonly page: Page;
    readonly headerText: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly phoneNumber: Locator;
    readonly country: Locator;
    readonly emailAddress: Locator;
    readonly password: Locator;
    readonly termsAndConditions: Locator;
    readonly registerButton: Locator;
    readonly registrationResponse: Locator;
    readonly registrationResponseMessage: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.headerText = page.locator('h2');
        // Locators for the registration form fields
        this.firstName = page.locator('#firstName');
        this.lastName = page.locator('#lastName');
        this.phoneNumber = page.locator('#phone');
        this.country = page.locator('#countries_dropdown_menu');
        this.emailAddress = page.locator('#emailAddress');
        this.password = page.locator('#password');
        this.termsAndConditions = page.locator('#exampleCheck1');
        this.registerButton = page.locator('#registerBtn');
        this.registrationResponse = page.locator('#results-section');
        this.registrationResponseMessage = page.locator('#message');
    }

        async isRegistrationFormLoaded() {
        await this.page.waitForURL('**/bugs-form.html');
        await expect(this.headerText).toHaveText('CHALLENGE - Spot the BUGS!');
    }

    //Fill the registration form with the provided user details
    async fillRegistrationForm(registerUser: RegisterFormDTO) {
        await this.firstName.fill(registerUser.firstName || '');
        await this.lastName.fill(registerUser.lastName);
        await this.phoneNumber.fill(registerUser.phoneNumber);
        await this.country.click();
        await this.country.selectOption(registerUser.country || '');
        await this.page.locator('body').click();
        await this.emailAddress.fill(registerUser.emailAddress);
        await this.password.fill(registerUser.password);
    }

    // Check the terms and conditions checkbox
    async checkTerms() {
        await expect(this.termsAndConditions).toBeDisabled();
        await this.termsAndConditions.check();
    }

    // Submit the registration form
    async submit() {
        await this.registerButton.click();
    }

    // Verify the registration response message
    async verifySuccessMessage() {
        await expect(this.registrationResponseMessage).toContainText('Successfully registered the following information');
    }

    // Verify the error messages for missing Email in the registration form
    async verifyEmailMissingErrorMessage() {
        await expect(this.registrationResponseMessage).toContainText('Email is required');
    }

    // Verify the error messages for missing Password in the registration form
    async verifyPasswordMissingErrorMessage() {
        await expect(this.registrationResponseMessage).toContainText('The password should contain between [6,20] characters!');
    }

    // Verify the registration response against the provided user details
    async verifyRegistrationResponse(registerUser: RegisterFormDTO) {

        const response = await this.registrationResponse.innerText();

        const actualFirstName = getRegistrationDetails(response, 'First Name');
        const actualLastName = getRegistrationDetails(response, 'Last Name');
        const actualPhoneNumber = getRegistrationDetails(response, 'Phone Number');
        const actualCountry = getRegistrationDetails(response, 'Country');
        const actualEmailAddress = getRegistrationDetails(response, 'Email');
        expect.soft(actualFirstName).toBe(registerUser.firstName);
        expect.soft(actualLastName).toBe(registerUser.lastName);
        expect.soft(actualPhoneNumber).toBe(registerUser.phoneNumber);
        expect.soft(actualCountry).toBe(registerUser.country);
        expect.soft(actualEmailAddress).toBe(registerUser.emailAddress);

    }
}
