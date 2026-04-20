import { Page, Locator } from '@playwright/test';
import { RegisterFormDTO } from '../../models/register-form.dto';
import { getRegistrationDetails } from '../../utils/extract-user-registration-details';
import { BasePage } from '../base/base.page';

// This class represents the registration form page and contains methods to interact with the form.
// It includes methods to fill the form, submit it, and verify the registration response.
export class BugsFormPage extends BasePage {
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
        super(page);
        this.headerText = page.locator('h2');
        // Locators for the registration form fields
        this.firstName = page.getByRole('textbox', { name: 'First Name' });
        // The challenge page has broken label `for` attributes, so these controls
        // need stable ID-based locators instead of role/name lookups.
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

    async waitForRegistrationFormLoaded() {
        await this.page.waitForURL('**/bugs-form.html');
    }

    //Fill the registration form with the provided user details
    async fillRegistrationForm(registerUser: RegisterFormDTO) {
        await this.firstName.fill(registerUser.firstName || '');
        await this.lastName.fill(registerUser.lastName);
        await this.phoneNumber.fill(registerUser.phoneNumber);
        await this.country.selectOption({ label: registerUser.country || '' });
        await this.page.locator('body').click();
        await this.emailAddress.fill(registerUser.emailAddress);
        await this.password.fill(registerUser.password);
    }

    // Check the terms and conditions checkbox
    async isTermsDisabled() {
        return this.termsAndConditions.isDisabled();
    }

    // Submit the registration form
    async submit() {
        await this.registerButton.click();
    }

    // Verify the registration response message
    async getRegistrationResponseMessage() {
        return this.registrationResponseMessage.innerText();
    }

    // Verify the registration response against the provided user details
    async getRegistrationResponseDetails() {

        const response = await this.registrationResponse.innerText();

        return {
            firstName: getRegistrationDetails(response, 'First Name'),
            lastName: getRegistrationDetails(response, 'Last Name'),
            phoneNumber: getRegistrationDetails(response, 'Phone Number'),
            country: getRegistrationDetails(response, 'Country'),
            emailAddress: getRegistrationDetails(response, 'Email'),
        };
    }
}
