import { test, expect } from '@playwright/test';

test.describe('Advanced Interactions Demo', () => {
  
  test('should handle hover interactions', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/hovers');
    
    const firstFigure = page.locator('.figure').first();
    await firstFigure.hover();
    
    const caption = firstFigure.locator('.figcaption');
    await expect(caption).toBeVisible();
    await expect(caption.locator('h5')).toContainText('user1');
  });

  test('should handle drag and drop', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
    
    const columnA = page.locator('#column-a');
    const columnB = page.locator('#column-b');
    
    await expect(columnA.locator('header')).toHaveText('A');
    await expect(columnB.locator('header')).toHaveText('B');
    
    await columnA.dragTo(columnB);
    
    await expect(columnA.locator('header')).toHaveText('B');
    await expect(columnB.locator('header')).toHaveText('A');
  });

  test('should handle alerts', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('I am a JS Alert');
      await dialog.accept();
    });
    
    await page.locator('button[onclick="jsAlert()"]').click();
    await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
  });

  test('should handle confirm dialogs', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      await dialog.accept();
    });
    
    await page.locator('button[onclick="jsConfirm()"]').click();
    await expect(page.locator('#result')).toHaveText('You clicked: Ok');
  });

  test('should handle prompt dialogs', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('prompt');
      await dialog.accept('Playwright Test');
    });
    
    await page.locator('button[onclick="jsPrompt()"]').click();
    await expect(page.locator('#result')).toHaveText('You entered: Playwright Test');
  });

  test('should handle new windows/tabs', async ({ context, page }) => {
    await page.goto('https://the-internet.herokuapp.com/windows');
    
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.locator('a[href="/windows/new"]').click()
    ]);
    
    await newPage.waitForLoadState();
    await expect(newPage.locator('h3')).toHaveText('New Window');
    
    await newPage.close();
  });

  test('should handle iframes', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe');
    
    const frame = page.frameLocator('#mce_0_ifr');
    const editor = frame.locator('#tinymce');
    
    await editor.clear();
    await editor.fill('Hello from Playwright!');
    
    await expect(editor).toHaveText('Hello from Playwright!');
  });

  test('should handle file download', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/download');
    
    const downloadPromise = page.waitForEvent('download');
    await page.locator('a[href="download/some-file.txt"]').first().click();
    const download = await downloadPromise;
    
    expect(download.suggestedFilename()).toBeTruthy();
  });

  test('should handle keyboard interactions', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/key_presses');
    
    const input = page.locator('#target');
    await input.press('Enter');
    
    await expect(page.locator('#result')).toHaveText('You entered: ENTER');
    
    await input.press('Escape');
    await expect(page.locator('#result')).toHaveText('You entered: ESCAPE');
  });

  test('should handle context menu (right click)', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/context_menu');
    
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('You selected a context menu');
      await dialog.accept();
    });
    
    await page.locator('#hot-spot').click({ button: 'right' });
  });

  test('should wait for elements to appear', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
    
    await page.locator('#start button').click();
    
    const finishText = page.locator('#finish h4');
    await expect(finishText).toBeVisible({ timeout: 10000 });
    await expect(finishText).toHaveText('Hello World!');
  });

  test('should handle infinite scroll', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/infinite_scroll');
    
    const initialParagraphs = await page.locator('.jscroll-added').count();
    
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    
    const afterScrollParagraphs = await page.locator('.jscroll-added').count();
    expect(afterScrollParagraphs).toBeGreaterThan(initialParagraphs);
  });
});
