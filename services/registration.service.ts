import { Page } from "@playwright/test";
import { RegisterFormDTO } from "../models/register-form.dto";
import { HomePage } from "../pages/home/home-page";
import { BugsFormPage } from "../pages/bugs/bugs-form.page";

export async function createAndSubmitRegistrationForm(page: Page, userData: RegisterFormDTO): Promise<BugsFormPage> {
    const homePage = new HomePage(page);
    const registerForm = new BugsFormPage(page);

    await homePage.navigateToHomePage();
    await homePage.navigateToRegistrationPage();
    await registerForm.waitForRegistrationFormLoaded();
    await registerForm.fillRegistrationForm(userData);
    
    // Terms and Conditions is disabled, raised a defect; once it's resolved, this step will be enabled
    // await registerForm.isTermsDisabled();
    await registerForm.submit();

    return registerForm; // To verify the Registration Response
}
