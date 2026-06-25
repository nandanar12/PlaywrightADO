import { Page, Locator } from '@playwright/test';
import { RegisterFormDTO } from '../../test/data/model/register-form.dto';
import { getRegistrationDetails } from '../../core/utils/extract-user-registration-details';
import { BasePage } from './base.page';

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
    // readonly registrationResponseMessage: Locator;
    

    constructor(page: Page) {
        super(page);
        this.headerText = page.locator('h2');
        // Locators for the registration form fields
        this.firstName = page.getByRole('textbox', { name: 'First Name' });
        this.lastName = page.getByRole('textbox', { name: 'Last Name' });
        this.phoneNumber = page.getByRole('textbox', { name: 'Phone Number' });
        this.country = page.locator('#countries_dropdown_menu');
        // The email doesnt have a label
        this.emailAddress = page.getByPlaceholder('Enter email');
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.termsAndConditions = page.getByRole('checkbox', { name: 'I agree with the terms and conditions' });
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.registrationResponse = page.getByRole('alert');
        // this.registrationResponseMessage = page.locator('#message');
    }

    async waitForRegistrationFormLoaded() {
        await this.page.waitForURL('**/bugs-form');
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
        return this.registrationResponse.innerText();
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
