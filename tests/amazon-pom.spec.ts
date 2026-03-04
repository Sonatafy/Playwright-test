import { test, expect } from '@playwright/test';
import { AmazonHomePage } from './pages/AmazonHomePage';

test.describe('Amazon Tests - Page Object Model', () => {
  
  test('should navigate to Amazon and verify Account & Lists is visible', async ({ page }) => {
    const amazonPage = new AmazonHomePage(page);
    
    await amazonPage.goto();
    
    const isVisible = await amazonPage.isAccountListsVisible();
    expect(isVisible).toBeTruthy();
  });

  test('should hover over Account & Lists and find Create a List link', async ({ page }) => {
    const amazonPage = new AmazonHomePage(page);
    
    await amazonPage.goto();
    
    await amazonPage.hoverAccountLists();
    
    await page.waitForTimeout(1000);
    
    await expect(amazonPage.createListLink).toBeVisible();
  });

  test('should search for a product on Amazon', async ({ page }) => {
    const amazonPage = new AmazonHomePage(page);
    
    await amazonPage.goto();
    
    await amazonPage.searchProduct('laptop');
    
    await expect(page).toHaveURL(/s\?k=laptop/);
  });

  test('should verify page title contains Amazon', async ({ page }) => {
    const amazonPage = new AmazonHomePage(page);
    
    await amazonPage.goto();
    
    const title = await amazonPage.getTitle();
    expect(title).toContain('Amazon');
  });
});
