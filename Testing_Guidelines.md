# Wone UI Testing

## Overview

This package contains the **end-to-end testing specifications for
Westpac One Web**.

-   These specifications represent the **top of the testing pyramid**.
-   Other testing layers (**Unit Testing, Service Testing**) should be
    prioritised before adding scenarios to this package.

## Requirements

-   Automated pipeline execution.
-   Compatible with Chromium, Safari, Firefox, and Mobile viewports.
-   Use `playwright.regression.config.ts` for browser coverage.
-   Refer to https://playwright.dev/docs/intro
-   Tests should run in all environments.

## Getting Started

### Install dependencies

``` bash
npm ci
```

### Install Playwright browsers

``` bash
npx playwright install
```

### Execute tests

``` bash
npx playwright test
```

Run specific feature:

``` bash
npx playwright test alerts
```

### UI Mode

``` bash
npx playwright test --ui
```

### Show Reports

``` bash
npx playwright show-report
```

Report URL: `http://localhost:9323/`

## Project Structure

### config/

-   `syst.env` -- System test environment variables
-   `uat.env` -- UAT environment variables

### specs/

-   Organised by feature/functionality
-   Keep specs lightweight
-   One feature per spec file
-   Examples:
    -   `login.spec.ts`
    -   `profile.spec.ts`
-   Calls actions
-   Can directly call pages for assertions

### business/fixtures/

-   Creates page objects
-   Performs login once per spec
-   Reuses sessions
-   Deletes session files after execution

### business/actions/

-   Contains business logic
-   Can call 1..N pages
-   Can call 0..N actions
-   Used by spec files

### business/pages/

-   Implements POM pattern
-   Contains locators and operations
-   Examples:
    -   `click()`
    -   `fill()`
-   Keep lightweight
-   Each page has its own class
-   Used by actions
-   `components/` contains reusable elements

### data/

-   Separate test data from test logic
-   Maintain consistency

## Naming Conventions

  Type         Convention
  ------------ ------------------
  Pages        `*.page.ts`
  Components   `*.component.ts`
  Tests        `*.spec.ts`

## Page Object Guidelines

-   One page object per feature
-   Methods represent user actions
-   Avoid assertions in page objects

## Do / Do Not

### Do

-   Follow Arrange → Act → Assert
-   Use meaningful scenario names
-   Prefer `getByRole()` locators
-   Reuse common code
-   Keep implementation simple

### Do Not

-   Assert static UI elements
-   Use explicit waits or magic numbers
-   Reuse credentials in parallel execution

## Adding New Specs

1.  Create feature folder under `specs/`
2.  Add journey-specific specs

## Adding Test Data

1.  Add user credentials under the relevant environment folder, for example `test/data/uat/`
2.  JSON filename must match spec filename
3.  Use unique credentials

## Adding Pages

1.  Add page files under `business/pages/`
2.  Use naming convention: `featureName.page.ts`
3.  Add reusable components under `business/pages/components/` when needed
4.  Register pages in `pageObjectFixture.ts`

## Adding Actions

1.  Add under `business/actions/`
2.  Register in `business/fixtures/pageObjectFixture.ts`
3.  Actions can call multiple pages and actions

## Tagging Convention

Each test must have 1--3 tags.

  Tag          Purpose
  ------------ ----------------------------------------------
  Sanity       Quick verification after small changes
  Smoke        Core functionality validation
  Regression   Comprehensive validation against regressions

## Key Takeaways

-   Follow POM principles
-   Use fixtures for dependency injection
-   Keep specs thin
-   Place business logic in actions
-   Separate test data from logic
-   Avoid explicit waits
-   Use `getByRole()` locators
-   Use unique credentials
-   Apply test tags consistently
