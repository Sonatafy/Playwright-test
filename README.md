# Playwright Test Automation Project

This project contains comprehensive Playwright test examples demonstrating various testing capabilities.

## Project Structure

```
├── tests/
│   ├── example.spec.ts              # Basic Playwright examples
│   ├── ecommerce-demo.spec.ts       # E-commerce testing (SauceDemo)
│   ├── form-interactions.spec.ts    # Form element interactions
│   ├── api-testing.spec.ts          # API testing examples
│   ├── advanced-interactions.spec.ts # Advanced UI interactions
│   ├── amazon-pom.spec.ts           # Amazon tests using POM
│   └── pages/
│       ├── BasePage.ts              # Base page class
│       └── AmazonHomePage.ts        # Amazon page object
├── tests-examples/
│   └── demo-todo-app.spec.ts        # TodoMVC comprehensive tests
├── playwright.config.ts              # Playwright configuration
└── package.json                      # Dependencies
```

## Test Suites Overview

### 1. **E-commerce Demo Tests** (`ecommerce-demo.spec.ts`)
Tests the SauceDemo e-commerce application:
- User login
- Product search and filtering
- Shopping cart operations
- Checkout flow
- Product sorting

### 2. **Form Interactions** (`form-interactions.spec.ts`)
Demonstrates form element handling:
- Text inputs and textareas
- Dropdowns and select elements
- Checkboxes and radio buttons
- Date pickers and color pickers
- Range sliders
- File uploads

### 3. **API Testing** (`api-testing.spec.ts`)
API testing examples using JSONPlaceholder:
- GET, POST, PUT, DELETE requests
- Response validation
- Header verification
- Query parameters
- Nested resources

### 4. **Advanced Interactions** (`advanced-interactions.spec.ts`)
Complex UI interactions:
- Hover effects
- Drag and drop
- Alert/Confirm/Prompt dialogs
- New window/tab handling
- iFrame interactions
- File downloads
- Keyboard events
- Context menus
- Dynamic content loading
- Infinite scroll

### 5. **Amazon POM Tests** (`amazon-pom.spec.ts`)
Page Object Model implementation:
- Structured page classes
- Reusable components
- Clean test organization
- Account & Lists hover interaction
- Product search functionality

### 6. **TodoMVC Tests** (`demo-todo-app.spec.ts`)
Comprehensive todo application testing:
- CRUD operations
- Filtering and routing
- Local storage validation
- State management

## Installation

```bash
npm install
```

## Running Tests

Run all tests:
```bash
npm test
```

Run specific test file:
```bash
npx playwright test ecommerce-demo.spec.ts
```

Run tests in headed mode:
```bash
npx playwright test --headed
```

Run tests in specific browser:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Run tests in debug mode:
```bash
npx playwright test --debug
```

## View Test Report

```bash
npx playwright show-report
```

## Key Features Demonstrated

- ✅ Page Object Model (POM) pattern
- ✅ API testing with request context
- ✅ Multiple browser support (Chromium, Firefox, WebKit)
- ✅ Parallel test execution
- ✅ Advanced selectors and locators
- ✅ Wait strategies and timeouts
- ✅ Dialog handling
- ✅ File operations
- ✅ Network interception capabilities
- ✅ Screenshot and video recording
- ✅ Test hooks (beforeEach, afterEach)
- ✅ Test organization with describe blocks

## Best Practices Implemented

1. **Page Object Model**: Separation of page logic from test logic
2. **Reusable Components**: Base page class for common operations
3. **Clear Test Structure**: Descriptive test names and organized suites
4. **Proper Assertions**: Using Playwright's built-in expect assertions
5. **Wait Strategies**: Proper use of auto-waiting and explicit waits
6. **Clean Code**: TypeScript for type safety

## Configuration

The project is configured to:
- Run tests in parallel
- Generate HTML reports
- Retry failed tests in CI
- Capture traces on first retry
- Support multiple browsers

## Author

Sonatafy

## License

MIT
