# Playwright Starter

Saucelabs demo site automation using Playwright

## Overview

This project is a robust and scalable automation framework built with Playwright and TypeScript, leveraging the Page Object Model (POM) design pattern. It aims to provide a structured and maintainable approach for automating web applications, ensuring ease of test creation, readability, and maintainability.

## Features
+ Playwright Integration: Harness the power of Playwright, a modern and powerful browser automation library that supports multiple browsers like Chromium, Firefox, and WebKit.

+ TypeScript Support: Benefit from the strong typing and modern syntax provided by TypeScript, enhancing code reliability and maintainability.

+ Page Object Model (POM): Adopt the Page Object Model design pattern to encapsulate web pages into reusable and easily maintainable components, promoting a modular and organized test structure.

+ Readable and Expressive Tests: Write clear and expressive tests with TypeScript, making it easy for both developers and testers to understand and collaborate on test scripts.

+ Cross-Browser Testing: Execute tests across different browsers seamlessly, ensuring consistent behavior and compatibility.

+ Parallel Test Execution: Leverage Playwright's built-in support for parallel test execution, significantly reducing test suite execution time.

+ Customizable Configurations: Easily configure and adapt the framework to fit your project's specific needs through customizable configuration files


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
- [Reporting Supports](#reporting)
  - [Playwright HTML Report](#playwright-html-report)
  - [Reportportal](#reportportal)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Ensure you have the following prerequisites installed:

- Node.js
- npm (Node Package Manager)
- Docker (If want to use selenium grid)

### Installation

Install project dependencies using the following command:

`npm install`

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
To execute tests on your local machine no need to make any change, by default it runs on localhost.

#### Browserstack Execution
For remote execution on the BrowserStack platform, need to pass `RUN_ON_BROWSERSTACK` parameter through command line. 
    Example : RUN_ON_BROWSERSTACK=true npx playwright test << spec file name >>

#### SeleniumGrid Execution 
Details coming soon...


## Execution Platform Support

### Browserstack Integration 
- To run this project on browserstack platform, user need to pass `RUN_ON_BROWSERSTACK` parameter through command line. 
Example : RUN_ON_BROWSERSTACK=true npx playwright test << spec file name >>

**Browserstack execution Dashboard :** 
![alt text](/resources/browserstackExecution.png)

### SeleniumGrid Integration
Details coming soon...


## Automation Testing Support: 
Our project offers comprehensive testing capabilities, providing automation support for various types of testing:

### Functional Testing 
Details coming soon...


### Visual Testing
Our project provides robust support for visual automation testing, allowing you to efficiently validate the visual appearance of your web application across different states and screen resolutions.

**Pre-requisite :**
+ Applitools Account: Before you start, you need to sign up for an Applitools account. You can create an account on the Applitools website.
Applitools API Key:

+ Once you have an Applitools account, you need to obtain an API key. The API key is used for authentication when running visual tests. You can find your API key in the Applitools dashboard.

### Applitools Integration
Before running the visual test, set up your API key as an environment variable named APPLITOOLS_API_KEY. You may set it through your IDE (if applicable), or you may set it from the command line like this:
    `export APPLITOOLS_API_KEY=<your-api-key>`

**Analysis Test Result on Applitools**
+ Login to Applitools Dashboard https://auth.applitools.com/users/login using applitools credentials 

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
Details coming soon...

## Supported Report Format:

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

- Please refer below section for Reportportal integration. 

Documention for Reportportal installation using docker - https://reportportal.io/installation

After successful installation,retrive api token key from `Profile -> API Keys` section and use it in  `playwright.config.ts -> rpConfig.apiKey` object.

**Reportportal Dashboard :**
![alt text](/resources/image.png)

**Launch View :**
![alt text](/resources/image-1.png)

**Test Run View :**
![alt text](/resources/image-2.png)

**Test View :**
![alt text](/resources/image-3.png)

## Contributing
Details coming soon...


## License
Details coming soon...