import { Locator, Page } from '@playwright/test';

// This class represents the home page and contains methods to navigate to the registration form.
export class HomePage {
    readonly page: Page;
    readonly registrationForm: Locator;

    constructor(page: Page) {
        this.page = page;
        this.registrationForm = page.locator('#bugs-form');
    }

    //Navigate to the home page
    //URL is defined in .env file
    async navigateToHomePage() {
        const baseUrl = process.env.URL;
        if (baseUrl) {
            await this.page.goto(baseUrl);
        } else {
            throw new Error('Base URL is not defined in the environment variables.');
        }
    }

    //Navigate to the registration form
    async navigateToRegistrationPage() {
        await this.registrationForm.click();
    }
}
