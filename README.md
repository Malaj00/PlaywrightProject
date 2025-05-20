# Playwright E2E Test Project

## Description

This project contains end-to-end (E2E) automated tests built using **Playwright** with TypeScript. 
The tests cover UI interactions, element verifications, and API requests.

---

## Links with tested websites
- https://automationexercise.com/test_cases
- https://practicetestautomation.com/practice/
- https://www.saucedemo.com/
- http://www.uitestingplayground.com/

---

## Requirements

* Node.js (recommended LTS version, e.g., 18.x)
* Playwright (installed via npm install)
* Installed project dependencies

---

## Extensions

- GitLens - view details of your repository i.e. commits history
- Prettier - default formatter for editor
- Playwright Helpers - adds predefined commands for Node.js Playwright.
- Playwright Snippets for VS Code - adds predefined useful code snippets for Playwright.
- Playwright Snippets UI for VS Code - adds UI for extension Playwright Snippets for VS Code.

---

## Installation

1. Clone the repository:

   ```
   git clone <repo-url>
   cd <project-folder>
   ```

2. Install dependencies:

   ```
   npm install
   ```

---

## Running Tests

### Run all tests:

```
npx playwright test
```

### Run tests in a specific file:

```
npx playwright test tests/example.spec.ts
```

### Run tests with visible browser (headed mode):

```
npx playwright test --headed
```

### Run only tests marked with `.only`:

```
npx playwright test --only
```

---

## Reports

After running tests, generate the HTML report:

```
npx playwright show-report
```

---

## Configuration

The main configuration is in:

```
playwright.config.ts
```

You can configure:

* test timeouts
* test file locations
* devices/browsers (e.g., Chrome, Firefox)
* retries on failure

---

## Project Structure (example)

```
/tests               → test files
/test-data           → Files with test data
/pages	             → Page Object Model classes
/playwright.config.ts → Playwright configuration
```