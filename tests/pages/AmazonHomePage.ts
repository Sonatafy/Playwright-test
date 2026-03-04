import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AmazonHomePage extends BasePage {
  readonly accountListsButton: Locator;
  readonly createListLink: Locator;
  readonly searchBox: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.accountListsButton = page.locator('#nav-link-accountList');
    this.createListLink = page.locator('a[href*="create-a-list"]').first();
    this.searchBox = page.locator('#twotabsearchtextbox');
    this.searchButton = page.locator('#nav-search-submit-button');
  }

  async goto() {
    await this.navigate('https://www.amazon.com');
  }

  async hoverAccountLists() {
    await this.accountListsButton.hover();
  }

  async clickCreateList() {
    await this.hoverAccountLists();
    await this.page.waitForTimeout(500);
    await this.createListLink.click();
  }

  async searchProduct(productName: string) {
    await this.searchBox.fill(productName);
    await this.searchButton.click();
  }

  async isAccountListsVisible(): Promise<boolean> {
    return await this.accountListsButton.isVisible();
  }
}
