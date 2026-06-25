import { RegisterFormDTO } from '../../test/data/model/register-form.dto';
import { BugsFormPage } from '../pages/bugs-form.page';
import { HomePage } from '../pages/home-page';

export class RegistrationAction {
  constructor(
    private readonly homePage: HomePage,
    private readonly bugsFormPage: BugsFormPage,
  ) {}

  async openRegistrationForm() {
    await this.homePage.navigateToHomePage();
    await this.homePage.navigateToRegistrationPage();
    // await this.bugsFormPage.waitForRegistrationFormLoaded();
  }

  async submitRegistrationForm(registerUser: RegisterFormDTO) {
    await this.bugsFormPage.fillRegistrationForm(registerUser);
    await this.bugsFormPage.submit();
  }
}
