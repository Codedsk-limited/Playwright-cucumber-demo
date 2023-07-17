# Global Web Ordering Automated Tests

This project is a UI test automation suite for the Web version of the CFA One mobile application. It was made following the setup [here](https://github.com/saucelabs-training/demo-js/tree/main/webdriverio/webdriver/examples/cucumberjs) by Saucelabs.

This is the continuation of the project created [here](https://github.com/cfacorp/global-web-ordering-selenium-tests) which aims to improve maintainability, fix outdated business logic, and upgrade the frameworks used.

## Overview
Webdriver IO is an open source test automation framework for use with mobile web applications. It drives web apps using the WebDriver protocol. This tool exists in its own repository outside of the CFA One web app itself.

## Use:

### Clone the Project
https://github.com/cfacorp/global-web-ordering-automated-tests.git

### Install Dependencies

You can install all dependencies by running the following command:

`npm install`

This will install all needed dependencies that are listed in the `package.json`-file

### Setup Environment Variables

You can see the environment variables used in these tests in `.env.sample`. Duplicate this file and name it `.env`.

You can get the keys from the GWO lastpass shared notes folder, specifically in the `Automation Profile Key`, `Saucelabs key`, and `Zephyr Scale Environment Variables` keys.

### Updating This Document

This Readme is synced to [Confluence](https://cfacorp.atlassian.net/wiki/spaces/GWO/pages/4068966429/Global+Web+Ordering+Automated+Tests) and should be updated in this file only.

#### When to Update
Please update the DWO Automation Test Coverage table whenever new features are added, and update or add sections as necessary to reflect updates in project structure, functionality, etc.

## Run Tests Locally

### Chrome

You can run the tests on your local machine; the only thing you need to have is Chrome. If you have it you can run this command:

`npm run test.local.chrome`

#### Quick Troubleshooting Tip:
If the test fails right away, make sure the `chromedriver` version listed in `package.json` matches your version of chrome (typically the latest version, i.e.: `"chromedriver": "^107.0.0"`)

### Safari

You can run the tests on your local machine using safari, setup required is outlined [here](https://developer.apple.com/documentation/webkit/testing_with_webdriver_in_safari) under "Configure Safari to Enable WebDriver Support".

Once this is set up run this command: 

`npm run test.local.safari`

This will start the safaridriver and launch a session to connect to it.

### Chrome + Safari

To run the tests in Chrome and Safari concurrently, use the command:

`npm run test.local.all`

This will simulate how the tests run on Sauce Labs, but locally instead of on Sauce Labs

## Run Tests on Sauce Labs

You will need to add the Saucelabs username and key as an environment variable in order to run the tests in saucelabs. These variables are found in the Shared Global Web Ordering folder in LastPass under `Saucelabs key`.

You can then run your tests on Sauce Labs US DC with this command:

`npm run test.saucelabs.us`

## Reporting

This setup uses:

- [`wdio-cucumberjs-json-reporter`](https://github.com/wswebcreation/wdio-cucumberjs-json-reporter) for creating a JSON output
- [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter) for generating a beautiful HTML report
  
- The HTML report will be generated and saved to the `/report` folder as `index.html`. Open this file locally to view the test results.

### GitHub Pages

The HTML report is also published as a [GitHub Page](https://reimagined-guacamole-c295068f.pages.github.io/) as part of the GitHub Actions CI/CD process. This page will always show the latest test run results.

## Implementation

### File Structure

This repository utilizes the [Page Object design pattern](https://webdriver.io/docs/pageobjects) in order to make it more easily scalable, and also to create a separation between page elements and the logic used to interact with them. For example, a page file will include the methods used to get elements on the page, and a step file will contain the functions that interact with those elements (i.e., `${element}.click()`)

The project is organised into three directories `/features`, `/steps`, and `/pageobjects` with a `/helpers` folder for anything that might be done outside actually testing (creating test accounts), as well as a `/configs` folder holding the Webdriver-specific configurations.

#### The Features Folder 
Holds all of your typical Cucumber feature files. The structure of this folder should map to the structure found in Zephyr Scale. Each feature file should represent a set of scenarios, and should be written in [Gherkin syntax](https://cucumber.io/docs/gherkin/reference/).

For example, the Pickup Fulfillment feature file contains scenarios for each Pickup service channel (Dine-in, Carryout, Curbside, Drive-thru). Each scenario should correspond with a Zephyr Scale Test Case and be tagged accordingly (i.e. `@DWO-T570`).

```gherkin
@Curbside @Critical @SmokeTest @Regression @DWO-T570
  Scenario: Complete a Curbside Order
  ...
```

#### Using Tags to Run Only Certain Scenarios

The feature-file scenarios hold tags which map to Zephyr Scale tags, including the Test Case key for that scenario (i.e. `@DWO-T570`).

Sometimes while developing a test it is desirable to only run a particular scenario. This can be done by putting the scenario's tag in `tagExpression` found in the `cucumberOpts` section of [wdio.shared.conf.js](./test/configs/wdio.shared.conf.js):

```json lines
cucumberOpts: {
      ...   
      tagExpression: '@DWO-T570',
      ...
}
```

#### The Steps Folder
Holds the mapping of Cucumber steps to executable code and the functions that interact with the elements defined in Page Objects. This folder is structured based on the different "Sections" of the web ordering app.

For example, there are Account steps, which cover everything to do with account settings, payment method management, etc.; Restaurant Selection steps, which include logic for selecting fulfillment type and service channel; Menu steps, covering all things menu-related; Order Checkout and Submission steps; and finally Order Progression and Fulfillment steps. *See Special Note on step files and Cucumber below*

To define a step you must first import all page files that contain the elements that need to be interacted with: 
```import PickupMenuPage from "../../pageobjects/menu/PickupMenuPage";```

Next, require the Cucumber keyword(s) that match the test step(s) that will be executed with this step file:
```const {Given, When, Then} = require('@cucumber/cucumber');```

Finally, create an async function that uses the Gherkin statement from your feature file to interact with the page elements that were imported:
```javascript
Given(/^I view my order$/, async () => {
    // View Cart
    await PickupMenuPage.cartBtn.click()
})
```

#### The Page Objects Folder
Holds all the pages' elements. These elements are accessed from the page by selecting them with various element selection strategies defined by WebdriverIO. See https://webdriver.io/docs/selectors and https://webdriver.io/docs/pageobjects for further details.

Each page file will contain getter functions that define the selectors used for a given page
```javascript
class PickupMenuPage {

    get beveragesBtn() {
        return $('[data-cy="MOBILE_BEVERAGES"]')
    }
}

export default new PickupMenuPage()
```

This allows us to keep the page information separate from the logic acting on it and ensures that an element is defined before the test tries to act on it.

### Creating New Tests
The ability to scale test coverage is a key component of the design of this project. As service channels, locations, and customer experiences grow and diversify, it is essential for test automation to keep up and stay not only relevant, but valuable.

Following is a set of steps that can serve as a general template for creating new tests:

1. Create a [new Test Case in Zephyr Scale](https://cfacorp.atlassian.net/projects/DWO?selectedItem=com.atlassian.plugins.atlassian-connect-plugin:com.kanoah.test-manager__main-project-page#!/v2/testCases?projectId=10613) under the DWO project. Note the Test Case Key that is generated; this will become one of the tags in the feature file that is used to link the automated test run results back to Zephyr Scale.
2. Create a new git branch off of the `develop` branch, and use an existing Feature file as a guide to create a new Feature file in the appropriate subfolder of the `./test/features/WebOrderingApp/` directory. As previously noted, the file location should map to the location Test Case in Zephyr Scale. For example, if the new Test Case was created in the Order Submission subfolder within Zephyr Scale, the new feature file should be created in the Order Submission subfolder in this project. It may also be desirable to add a scenario to an existing Feature file; see `PickupFulfillmentSmokeTests.feature` as an example.
3. Next, create new Page Objects as needed to access the page elements that will be utilized in the test. Make sure to check existing page objects for reusable elements, and add elements to existing page objects when appropriate.
4. Once the page elements are created, add new step files, reuse existing steps, or add steps to existing files as needed to create the interactions that drive the automation.
5. Add the Feature file to `./test/configs/wdio.shared.conf.js` under `exports.config.steps`: 
```json5
   exports.config = {
       ...
       specs: [
           './test/features/**/PickupFulfillmentSmokeTests.feature',
           './test/features/**/CateringPickupFulfillmentSmokeTests.feature'
       ],
       ...
   }
   ```
6. Add any new step files to `CucumberOpts`; see special note in the Cucumber section below.
7. Run your new test! It is suggested that the automation is run locally against the new feature file as steps are added to ensure things are working correctly before proceeding to the next step. Once all the new steps pass the test locally, run the full suite on Saucelabs, and if successful open a PR to merge the new tests into the develop branch.


### Tooling

#### WebdriverIO

This project is built on [Webdriver.io](https://webdriver.io/) v7. This was chosen in order to support running tests against safari, the number one browser used to access CFA Web Ordering. Current guidance is to use async functions which you can read more about why/how [here](https://webdriver.io/docs/sync-vs-async).

#### Cucumber

As mentioned above, this project uses the Cucumber framework to facilitate test case creation and execution. As such, particular attention should be paid to the `wdio.shared.conf.js` file located in `/test/configs`. This file holds all the settings that make Webdriver and Cucumber work correctly. See https://webdriver.io/docs/options for further detail.

##### Of Special Note
The `require:` element in the `cucumberOpts:` object: The `require` element is an array containing a list of the step files that are needed to run the test execution. If a step file is missing from this array that is required for a particular test to run, Webdriver will error out, and it may not be totally clear what the cause is. Check this section of the config file to ensure all the needed step files are listed. It should also be noted that this is ideally a temporary setup, and in the future it will be possible to simply use a wildcard to select for all step files.
```json5
cucumberOpts: {
    ...
    require: [
        './test/steps/**/PickupSelectionPageSteps.js', './test/steps/**/PickupMenuPageSteps.js',
        './test/steps/**/PickupCartPageSteps.js', './test/steps/**/PickupCutleryPageSteps.js',
        './test/steps/**/PickupOrderPageSteps.js', './test/steps/**/CarryOutFulfillmentPageSteps.js',
        './test/steps/**/VehiclePageSteps.js', './test/steps/**/PickupDineInOrderPageSteps.js',
        './test/steps/**/DineInFulfillmentPageSteps.js', './test/steps/**/DriveThruFulfillmentPageSteps.js'
    ],
    ...
}
```

## CI/CD

### GitHub Actions

#### AutomatedRun.yml
All tests are set up to run on a schedule (Mon-Sat 4 times per day), against PR urls, and whenever there is a new deployment to QA.

Tests are run on Saucelabs and reported both on Saucelabs and as a web page at https://reimagined-guacamole-c295068f.pages.github.io/.

#### UpdateDocs.yml
This action syncs this Readme to [Confluence](https://cfacorp.atlassian.net/wiki/spaces/GWO/pages/4068966429/Global+Web+Ordering+Automated+Tests)

## Zephyr Scale

This test suite is also linked to [Zephyr Scale](https://cfacorp.atlassian.net/projects/DWO?selectedItem=com.atlassian.plugins.atlassian-connect-plugin:com.kanoah.test-manager__main-project-page#!/v2/testCases), and more specifically to the test cases tagged in each feature scenario.

Whenever the test suite runs, a new Zephyr Scale Test Cycle is created in the `Web Driver Automation Tests` Test Cycle folder. Within each Test Cycle, Test Executions are generated, one for each Test Case tagged on the scenarios that were run. Test executions are also generated per browser, such that each test case will have 2 executions: one for Chrome, one for Safari.

### How It Works
This integration works by utilizing the [Zephyr Scale Cloud API](https://support.smartbear.com/zephyr-scale-cloud/api-docs/#section/Introduction), custom functions located in [ZephyrScaleAPI.js](./test/configs/ZephyrScaleAPI.js), and the `onPrepare` and `afterScenario` hooks in `wdio.shared.conf.js`

When a test starts, the `onPrepare` hook runs, which checks to see if the `cfaCustom_exportToZephyr` config flag is set to `true`. If so, a new Test Cycle is created.

Once the test is completed, the `afterScenario` hook runs, which generates Test Executions based on which scenarios were run and the results of those scenarios. The script identifies which Test Case to associate the execution with via the tag on the scenario and populates the new Test Cycle accordingly.

### General Maintenance

This automation suite should stay up to date with the feature criteria for the primary Web Ordering application. Automation tests should be refined anytime there is a change in the Web Ordering app, which can be monitored by:
1. Checking CI/CD test failures daily to notice if any test are failing due to a changing feature
2. Engaging in Sprint and Feature Planning meetings to anticipate and plan for upcoming features that may impact and/or require changes to automation
3. Monitoring changes to the main Web Ordering GitHub branch, or collaborating with team to understand changes that may happen in general

## DWO Automation Test Coverage
| **Feature**        | **Scenarios    Covered**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | **Scenarios Not Covered** |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------|
| Pickup Fulfillment | [@DWO-T562](https://cfacorp.atlassian.net/projects/DWO?selectedItem=com.atlassian.plugins.atlassian-connect-plugin:com.kanoah.test-manager__main-project-page#!/testCase/25827627) Complete a Guest Carryout Order | |
| Pickup Fulfillment | [@DWO-T569](https://cfacorp.atlassian.net/projects/DWO?selectedItem=com.atlassian.plugins.atlassian-connect-plugin:com.kanoah.test-manager__main-project-page#!/testCase/26511335) Complete a Guest Drive-Thru Order | |
| Pickup Fulfillment | [@DWO-T570](https://cfacorp.atlassian.net/projects/DWO?selectedItem=com.atlassian.plugins.atlassian-connect-plugin:com.kanoah.test-manager__main-project-page#!/testCase/26511336) Complete a Guest Curbside Order | |
| Pickup Fulfillment | [@DWO-T571](https://cfacorp.atlassian.net/projects/DWO?selectedItem=com.atlassian.plugins.atlassian-connect-plugin:com.kanoah.test-manager__main-project-page#!/testCase/26511337) Complete a Guest Dine-in Order  | |                     
| Catering           | [@DWO-T519](https://cfacorp.atlassian.net/projects/DWO?selectedItem=com.atlassian.plugins.atlassian-connect-plugin:com.kanoah.test-manager__main-project-page#!/testCase/DWO-T519) Complete a Guest Catering Pickup Order (In Progress)   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            TBD                       |