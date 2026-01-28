import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/base.page';

export class HomePage extends BasePage {
    readonly registrationForm: Locator;

    constructor(page: Page) {
        super(page);
        this.registrationForm = page.locator('#bugs-form');
    }

    //Navigate to the home page
    async navigateToHomePage() {
        const baseUrl = process.env.BASE_URL;
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
