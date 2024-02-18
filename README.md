# Playwright Starter

Saucelabs demo site automation using Playwright

## Overview

This project is a robust and scalable automation framework built with Playwright and TypeScript, leveraging the Page Object Model (POM) design pattern. It aims to provide a structured and maintainable approach for automating web applications, ensuring ease of test creation, readability, and maintainability.It supports functional testing, visual testing, accessibility testing.

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
  - [Functional E2E Testing](#functional-testing)
  - [Visual Automation](#visual-automation)
  - [Accessibility Testing](#accessibility-testing)
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

### Installation

Install project dependencies using the following command:

`npm install`

## Project Structure
Details coming soon...

## Configuration
Details coming soon...

## Cloud Execution Platform Support

### Browserstack Integration 
- To run this project on browserstack platform, user need to pass  parameter `RUN_ON_BROWSERSTACK` through command line. 
Example : RUN_ON_BROWSERSTACK=true npx playwright test << spec file name >>

**Browserstack execution Dashboard :** 
![alt text](browserstackExecution.png)


### Selenium Grid Integration
Details coming soon...

## Automation Testing Support: 
Our project offers comprehensive testing capabilities, providing automation support for various types of testing:

### Functional Testing 
Details coming soon...


### Visual Testing
Details coming soon...


### Accessibility Testing
Details coming soon...

## Supported Report Format:

### Playwright HTML Report
Upon completion of execution run the below command to generate HTML report.
`npx playwright show-report` 

**Report View :** 
![alt text](image-5.png)

**Pass Test View :** 
![alt text](image-4.png)

**Failed Test View :**
![alt text](image-6.png)


### Reportportal
ReportPortal brings a transparent process to every testing stage and related software test reporting.
- Manage all automation reports and results in one place
- Make results analysis actionable & collaborative
- Accelerate routine results analysis with AI

- Please refer below section for Reportportal integration. 

Documention for Reportportal installation using docker - https://reportportal.io/installation

After successful installation,retrive api token key from `Profile -> API Keys` section and use it in  `playwright.config.ts -> rpConfig.apiKey` object.

**Reportportal Dashboard :**
![alt text](image.png)

**Launch View :**
![alt text](image-1.png)

**Test Run View :**
![alt text](image-2.png)

**Test View :**
![alt text](image-3.png)

## Contributing
Details coming soon...


## License
Details coming soon...