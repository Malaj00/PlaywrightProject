### 🎯 PlaywrightProject – E2E Test Automation with Playwright & TypeScript

This project contains a set of **end-to-end automated tests** using **Playwright** and **TypeScript**, covering user journeys such as:

- Registration and login
- Cart interactions
- Form validations
- Product search and checkout

Main testing targets include:

- [Automation Test Store](https://automationteststore.com/)
- [Automation Exercise](https://automationexercise.com/)

---

## 📁 Project Structure

```
PlaywrightProject/
├── tests/                   # Test cases grouped by site or feature
├── pages/                   # Page Object Models (POM)
├── test-data/               # JSON files for test data
├── utils/                   # Utility functions and helpers
├── playwright.config.ts     # Main configuration file
└── README.md                # Project documentation
```

---

## 🚀 How to Run

### 1. Install dependencies

```bash
npm install
```

### 2. Run all tests

```bash
npx playwright test
```

### 3. Run specific test file

```bash
npx playwright test tests/register.spec.ts
```

### 4. Open UI Test Runner (debug)

```bash
npx playwright test --ui
```

---

## 📊 Test Report

After execution, an HTML report is available:

```bash
npx playwright show-report
```

Or open manually:

```
.playwright/html-report/index.html
```

---

## 🧰 Features & Highlights

- ✔️ Page Object Model (POM)
- 📦 Test data via JSON files (e.g., `automationstore.json`)
- 🎯 Assertions like `toHaveText`, `toBeChecked`, `toBeVisible`, etc.
- 🧠 Logical assertions (e.g., `expect(array.length).toBeGreaterThan(0)`)
- 🎯 File download events: `page.waitForEvent('download')`
- 🔽 Dropdowns, checkboxes, modals, hover interactions
- 🧪 API test examples with response validation

---

## 🔧 Recommended Improvements

To further develop your testing skills and improve this project:

- **Fixtures**: Use `test.use()` to dynamically load test contexts or credentials.
- **Typed JSON**: Define interfaces (e.g. `UserCredentials`) for autocompletion.
- **Unit/Integration tests**: Create tests for logic (e.g. form validation).
- **CI/CD**: Add GitHub Actions for automated testing workflows.
- **Error boundaries**: Add retry logic or conditional waits for flaky UIs.

---

## 📌 Tips

```bash
# Install Playwright and browsers
npx playwright install

# Run tests in debug mode with inspector
npx playwright test --debug
```

---

## 👤 Author

GitHub: [Malaj00](https://github.com/Malaj00)  
Repository: [PlaywrightProject](https://github.com/Malaj00/PlaywrightProject)
