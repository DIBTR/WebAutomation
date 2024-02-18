# 🎭 Playwright
Test Automation using Playwright
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Overview

This project is a robust and scalable automation framework built with Playwright and TypeScript, leveraging the Page Object Model (POM) design pattern. It aims to provide a structured and maintainable approach for automating web applications, ensuring ease of test creation, readability, and maintainability.

## Features
+ Playwright Integration: Harness the power of Playwright, a modern and powerful browser automation library that supports multiple browsers like Chromium, Firefox, and WebKit.

+ TypeScript Support: Benefit from the strong typing and modern syntax provided by TypeScript, enhancing code reliability and maintainability.

+ Page Object Model (POM): Adopt the Page Object Model design pattern to encapsulate web pages into reusable and easily maintainable components, promoting a modular and organized test structure.

+ Readable and Expressive Tests: Write clear and expressive tests with BDD format, making it easy for both developers and testers to understand and collaborate on test scripts.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Cloud Execution Platforms](#cloud-execution-platform-support)
  - [Browserstack Integration](#browserstack-integration)
  - [Selenium Grid Integration](#selenium-grid-integration)
- [Automation Testing Support](#automation-testing-support)
  - [Functional Testing](#functional-testing)
  - [Visual Testing](#visual-testing)
  - [Accessibility Testing](#accessibility-testing)
  - [API Testing](#api-testing)
  - [Network Traffic Analysis Testing](#network-traffic-analysis-testing)
  - [Console Error Testing](#console-error-testing)
- [Reporting Support](#reporting-support)
  - [Playwright HTML Report](#playwright-html-report)
  - [Reportportal](#reportportal)
- [Test Management Support](#test-management-support)
  - [Zephyr Integration](#zephyr-integrationt)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Ensure you have the following prerequisites installed:
````bash
- Node.js
- npm (Node Package Manager)
- Docker (Optional - If wish to use Selenium Grid or Reportportal)
````

### Installation

Install project dependencies using the following command:
````bash
npm install
````

## Project Structure
This section provides an overview of the organization and structure of the project. 

`src/`: Main source code directory.

+ `pages/`: Contains page classes representing different pages of the application. Each page class encapsulates the actions and elements related to a specific page.

+ `helpers/`: Includes helper classes providing reusable functions for automation. Examples include interacting with the browser or handling common tasks.

+ `utils/`: Contains utility classes with general-purpose functions that can be used across the project.

+ `data/`: Holds data-related files, including test data and the Redux store for holding test-related data.

+ `specs/`: Houses spec files containing actual test scenarios. Each spec file typically corresponds to a specific feature or functionality.

+ `index.ts`: Acts as the entry point for the TypeScript project, where you might configure and initialize your test environment.

+ `config/`
  * playwright.config.js: Playwright configuration file specifying settings for testing.

  * tsconfig.json: TypeScript configuration file defining compiler options for the TypeScript project.

## Configuration
This framework provides flexibility in test execution platform selection, offering three main options: Localhost, BrowserStack, SeleniumGrid

#### Localhost Execution 
Project is configured to run it on Localhost by default.

#### Browserstack Execution
For remote execution on the BrowserStack platform, need to pass `RUN_ON_BROWSERSTACK` parameter through command line. 
````bash
 RUN_ON_BROWSERSTACK=true npx playwright test << spec file name >>
 Replace <<spec-file>> with the actual path to your test spec file.
 ````

#### SeleniumGrid Execution 
For remote execution on the Selenium grid platform, need to pass `SELENIUM_REMOTE_URL` parameter through command line.
````bash
SELENIUM_REMOTE_URL=http://localhost:4444 npx playwright test <<spec-file>>
Replace <<spec-file>> with the actual path to your test spec file.
````

#### Playwright HTML Report
+ This report template is bydefault `ON` in the project. If user wish to turn off then need to disable in reporter object in playwright config file. 
    `['html', { outputFolder: `playwright-report/${REPORT_TYPE}`, open: 'never' }]` reporter in `playwright.config -> Reporter`.
  

#### Reportportal 
+ For Reportportal result logging need to pass `LOG_RESULT_TO_REPORT_PORTAL` parameter through command line.
````bash
LOG_RESULT_TO_REPORT_PORTAL=true npx playwright test <<spec-file>>
Replace <<spec-file>> with the actual path to your test spec file.
````


## Execution Platform Support

### Browserstack Integration 
To run this project on browserstack platform, user need to pass `RUN_ON_BROWSERSTACK` parameter through command line. 

**Pre-requisite :**
+ BrowserStack Account: Before you start, you need to sign up for an BrowserStack account. You can create an account on the BrowserStack website[https://www.browserstack.com/].

+ Retrive Browserstack access token from account.

````bash
 Replace the BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY in browserstack.config.ts file which is located at root directory.

  'browserstack.username': process.env.BROWSERSTACK_USERNAME || '<< Enter your username >>',
  'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY || '<< enter your access key >>',
````

**Browserstack execution dashboard :** 
![alt text](/resources/browserstackExecution.png)

### SeleniumGrid Integration
**Pre-requisite :**
- [Docker Desktop](https://www.docker.com/products/docker-desktop) must be installed.

Setup selenium grid with the help of docker. Below is command to run selenium grid in docker. Use any one command from below as per machine architecture.

    `docker run -d -p 4444:4444 --shm-size="2g" -e SE_NODE_GRID_URL="http://localhost:4444" selenium/standalone-chrome:4.3.0-20220726`

Alternatively for arm architecture

    `docker run -d -p 4444:4444 --shm-size="2g" -e SE_NODE_GRID_URL="http://localhost:4444" seleniarm/standalone-chromium:103.0`

**Verifying Selenium Grid Environment :**

After successfully executing the following command, check [http://localhost:4444/ui](http://localhost:4444/ui). If the Selenium Grid environment is up, you are ready to run the tests.

**Command to run test on Selenium Grid :**
````bash
  SELENIUM_REMOTE_URL=http://localhost:4444 npx playwright test <<spec-file>>
  Replace <<spec-file>> with the actual path to your test spec file.
````

## Automation Testing Support
Our project offers comprehensive testing capabilities, providing automation support for various types of testing:

### Functional Testing 
To write end2end functional automated test we are using playwright, below is the command to run functional test using npm.

````bash
npx playwright test <<spec file >>
Replace <<spec-file>> with the actual path to your test spec file.
````

### Visual Testing
This project provides robust support for visual automation testing, allowing you to efficiently validate the visual appearance of your web application across different states and screen resolutions.

**Pre-requisite :**
+ Applitools Account: Before you start, you need to sign up for an Applitools account. You can create an account on the Applitools website.
Applitools API Key:

+ Once you have an Applitools account, you need to obtain an API key. The API key is used for authentication when running visual tests. You can find your API key in the Applitools dashboard.

### Applitools Integration
Before running the visual test, set up your API key as an environment variable named APPLITOOLS_API_KEY. You may set it through your IDE (if applicable), or you may set it from the command line like this:
    `export APPLITOOLS_API_KEY=<your-api-key>`

**Analysis Test Result on Applitools**
+ Login to Applitools Dashboard [https://auth.applitools.com/users/login](https://auth.applitools.com/users/login) using applitools credentials 

**Applitools Dashboard View:** 
![alt text](/resources/visual.test.view.png)

**Image Comparision View :**
![alt text](/resources/compare.png)


### Accessibility Testing
This sectiion incorporates accessibility testing to ensure that the web application is usable and accessible to a wide range of users, including those with disabilities. The Axe library is used to automate accessibility testing and identify potential issues.

[Axe](https://www.deque.com/axe/) is an open-source JavaScript library for automated accessibility testing.By default, axe checks against a wide variety of accessibility rules. Some of these rules correspond to specific success criteria from the Web Content Accessibility Guidelines (WCAG), and others are "best practice" rules that are not specifically required by any WCAG criterion.

A few examples of problems this can catch include:

+ Text that would be hard to read for users with vision impairments due to poor color contrast with the background behind it
+ UI controls and form elements without labels that a screen reader could identify
+ Interactive elements with duplicate IDs which can confuse assistive technologies

**How to run Accissiblity Test :**
* Command to execute accissiblity test `npx playwright test << spec file >>`.
* Example : `npx playwright test accessibility.run.home.page.spec.ts`

**Exporting accessibility scan results as a test attachment:**

+ Upon completion of the accessibility test run, an HTML report will be generated with embedded attachments for any accessibility violations identified.

![alt text](/resources/axe1.png)


### API Testing
API Testing with Playwright involves verifying the functionality and performance of our web application's APIs. Playwright provides a testing API that allows us to make HTTP requests, validate responses, and ensure the proper integration of our frontend with backend services.

Please refer `/src/tests/api-test` folder for sample api spec file.

Execute the API tests using the following command:

````bash
npx playwright test << spec file >>
````

### Network Traffic Analysis Testing
Network Traffic Analysis Testing involves inspecting and validating the network interactions between our web application and external systems. Playwright provides powerful capabilities for capturing and analyzing network traffic during test execution, allowing us to ensure that our application performs optimally, communicates securely, and handles various network conditions.

Please refer `/src/tests/network-log-test` folder for sample network spec file. 

**Network error capture report**
![alt text](/resources/network.png)

### Console Error Testing
Console Error Testing focuses on verifying how our web application handles errors and exceptions, ensuring that meaningful error messages are logged to the browser's console. Playwright allows us to capture and analyze console errors during test execution, helping us maintain a stable and secure application.

Please refer `/src/tests/console-error-test` folder for sample console error spec file.

**Console error capture report**
![alt text](/resources/console.png)


## Reporting Support

### Playwright HTML Report
Upon completion of execution run the below command to generate HTML report.
`npx playwright show-report` 

**Report View :** 
![alt text](/resources/image-5.png)

**Pass Test View :** 
![alt text](/resources/image-4.png)

**Failed Test View :**
![alt text](/resources/image-6.png)


### Reportportal
ReportPortal brings a transparent process to every testing stage and related software test reporting.
- Manage all automation reports and results in one place
- Make results analysis actionable & collaborative
- Accelerate routine results analysis with AI

**Reportportal Installation :** 

For Reportportal installation using docker please refer [Reportportal installation document](https://reportportal.io/installation)

+ After successful installation run - `docker-compose -p reportportal up -d --force-recreate` to bring up Reportportal application.
+ Retrive `apikey` and `Project Name` from  Reportportal application, then use in `playwright.config.ts -> rpConfig` section.

````bash
  apiKey: '<< api key from Report portal profile section>>',
  endpoint: 'http://localhost:8080/api/v1',
  project: '<< project name from Report portal application >>',
  ````

**Reportportal Dashboard :**
![alt text](/resources/image.png)

**Launch View :**
![alt text](/resources/image-1.png)

**Test Run View :**
![alt text](/resources/image-2.png)

**Test View :**
![alt text](/resources/image-3.png)

## Test Management Support
### Zephyr Integration
This section provides information on how to integrate Playwright with Zephyr for Jira to log test results after each test execution.
Integrating Playwright with Zephyr for Jira allows us to log test results directly into our test management system. This helps in maintaining a centralized repository of test execution status, enabling better traceability and reporting.

+ Generate an API token in Zephyr for authentication.[Refer to Zephyr's documentation](https://support.smartbear.com/zephyr-scale-cloud/docs/en/rest-api/generating-api-access-tokens.html) to know how to create API token.
+ In ZReporter.ts file update the `Authorization: Bearer << authentication token goes here >>` with token value which retrived in above step.

## Contributing


## License
