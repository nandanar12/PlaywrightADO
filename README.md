# Introduction
This project is a Playwright-based end-to-end test automation framework for validating registration functionality on the QA Practice "Spot the Bugs" page:

https://qa-practice.netlify.app/bugs-form

# Getting Started
1. Clone the repo.
2. Install Node.js 18 or later.
3. Install project dependencies:

```powershell
npm install
```

If PowerShell blocks npm/npx scripts, use the Windows command shims:

```powershell
npm.cmd install
```

4. Create a local `.env` file under `core/environments/` with:

```text
BASE_URL=https://qa-practice.netlify.app/bugs-form
```

The `core/environments/.env` file is ignored by git and is loaded locally through `dotenv`.

5. Browser setup:

This project is configured to run tests against installed Google Chrome and Microsoft Edge:

- Google Chrome: `channel: 'chrome'`
- Microsoft Edge: `channel: 'msedge'`

This avoids relying on the Playwright-managed Chromium download under `%USERPROFILE%\AppData\Local\ms-playwright`, which can be unreliable on some Windows on ARM / Snapdragon machines.

Make sure Google Chrome and/or Microsoft Edge are installed before running tests.

# Build and Test
Run all tests:

```powershell
npx.cmd playwright test
```

Run only Google Chrome:

```powershell
npx.cmd playwright test --project="Google Chrome"
```

Run only Microsoft Edge:

```powershell
npx.cmd playwright test --project="Microsoft Edge"
```

Run a single test by title:

```powershell
npx.cmd playwright test -g "Register with valid data" --project="Google Chrome"
```

Run a single test in headed mode:

```powershell
npx.cmd playwright test -g "Register with valid data" --project="Google Chrome" --headed
```

List discovered tests without running them:

```powershell
npx.cmd playwright test --list
```

Reports and results:

- HTML report: `playwright-report/`
- Test results: `test-results/`
- JUnit report for Azure DevOps: `test-results/results.xml`

The Azure Pipeline expects `BASE_URL` to be supplied as a pipeline variable.

# Azure DevOps
The Azure DevOps remote is configured as `ado`:

```powershell
git remote add ado "https://mgramachandran1@dev.azure.com/mgramachandran1/QA%20Practice/_git/PlaywrightADO"
```

After committing local changes, push to Azure DevOps with:

```powershell
git push ado main
```

The pipeline trigger is configured for `main` in `azure-pipelines.yml`, so pushing to `ado/main` starts the Azure DevOps pipeline when the pipeline is connected to this repository.

To keep GitHub in sync as well, push the same branch to `origin`:

```powershell
git push origin main
```

# Contribute
Contributions should keep the page object model, fixtures, and test data structure consistent with the existing framework. Add or update tests under `test/specs/`, page interactions under `business/pages/`, actions under `business/actions/`, fixtures under `business/fixtures/`, reusable utilities under `core/utils/`, and reusable data under environment folders such as `test/data/uat/`.

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:
- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)
