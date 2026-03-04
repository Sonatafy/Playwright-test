import { test, expect } from '@playwright/test';

test.describe('Form Interactions Demo', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.selenium.dev/selenium/web/web-form.html');
  });

  test('should fill text input and submit form', async ({ page }) => {
    const textInput = page.locator('#my-text-id');
    await textInput.fill('Playwright Test');
    
    await expect(textInput).toHaveValue('Playwright Test');
    
    await page.locator('button[type="submit"]').click();
    
    await expect(page).toHaveURL(/.*form.html/);
  });

  test('should interact with password field', async ({ page }) => {
    const passwordInput = page.locator('input[name="my-password"]');
    await passwordInput.fill('SecurePassword123');
    
    await expect(passwordInput).toHaveValue('SecurePassword123');
  });

  test('should interact with textarea', async ({ page }) => {
    const textarea = page.locator('textarea[name="my-textarea"]');
    const longText = 'This is a long text that spans multiple lines.\nLine 2\nLine 3';
    
    await textarea.fill(longText);
    await expect(textarea).toHaveValue(longText);
  });

  test('should select dropdown option', async ({ page }) => {
    const dropdown = page.locator('select[name="my-select"]');
    
    await dropdown.selectOption('2');
    await expect(dropdown).toHaveValue('2');
    
    await dropdown.selectOption({ label: 'Three' });
    await expect(dropdown).toHaveValue('3');
  });

  test('should interact with checkboxes', async ({ page }) => {
    const checkbox1 = page.locator('#my-check-1');
    const checkbox2 = page.locator('#my-check-2');
    
    await checkbox1.check();
    await expect(checkbox1).toBeChecked();
    
    await checkbox2.check();
    await expect(checkbox2).toBeChecked();
    
    await checkbox1.uncheck();
    await expect(checkbox1).not.toBeChecked();
  });

  test('should interact with radio buttons', async ({ page }) => {
    const radio1 = page.locator('#my-radio-1');
    const radio2 = page.locator('#my-radio-2');
    
    await radio1.check();
    await expect(radio1).toBeChecked();
    await expect(radio2).not.toBeChecked();
    
    await radio2.check();
    await expect(radio2).toBeChecked();
    await expect(radio1).not.toBeChecked();
  });

  test('should interact with color picker', async ({ page }) => {
    const colorPicker = page.locator('input[name="my-colors"]');
    
    await colorPicker.fill('#ff5733');
    await expect(colorPicker).toHaveValue('#ff5733');
  });

  test('should interact with date picker', async ({ page }) => {
    const datePicker = page.locator('input[name="my-date"]');
    
    await datePicker.fill('2024-12-25');
    await expect(datePicker).toHaveValue('2024-12-25');
  });

  test('should interact with range slider', async ({ page }) => {
    const rangeSlider = page.locator('input[name="my-range"]');
    
    await rangeSlider.fill('7');
    await expect(rangeSlider).toHaveValue('7');
  });

  test('should upload a file', async ({ page }) => {
    const fileInput = page.locator('input[name="my-file"]');
    
    await fileInput.setInputFiles({
      name: 'test.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('This is a test file content')
    });
    
    const fileName = await fileInput.evaluate((el: HTMLInputElement) => {
      return el.files?.[0]?.name || '';
    });
    
    expect(fileName).toBe('test.txt');
  });
});
