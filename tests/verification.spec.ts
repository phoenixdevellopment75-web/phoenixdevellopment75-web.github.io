import { test, expect } from '@playwright/test';
import path from 'path';

const fileUrl = `file://${path.resolve(__dirname, '../index.html')}`;

test.describe('Phoenix Portfolio Redesign Verification', () => {

  test('Page loads and has correct title and design variables', async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(2000); // let loader clear
    await expect(page).toHaveTitle(/Phoenix/);

    // Verify dark theme colors from root design system variables
    const colors = await page.evaluate(() => {
      const computed = getComputedStyle(document.documentElement);
      const bgVal = computed.getPropertyValue('--bg').trim();
      const accentVal = computed.getPropertyValue('--accent').trim();
      const textVal = computed.getPropertyValue('--text').trim();
      return { bgVal, accentVal, textVal };
    });

    expect(colors.bgVal.toLowerCase()).toBe('#160f0a');
    expect(colors.accentVal.toLowerCase()).toBe('#8cb877');
    expect(colors.textVal.toLowerCase()).toBe('#fcf8f2');
  });

  test('Navigation links and smooth scroll target exists', async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(2000); // let loader clear

    let pageError: Error | null = null;
    page.on('pageerror', err => {
      pageError = err;
    });

    // Check clicking navigation links
    const aboutLink = page.locator('.nav-links a[href="#about"]');
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();
    expect(pageError).toBeNull();
  });

  test('Responsive navigation menu toggle behavior', async ({ page }) => {
    // 1. Test Desktop Viewport
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(fileUrl);
    await page.waitForTimeout(2000);

    const menuBtn = page.locator('#menuBtn');
    const navLinks = page.locator('#navLinks');

    // On desktop, navLinks should be displayed and menuBtn hidden
    await expect(navLinks).toBeVisible();
    await expect(menuBtn).not.toBeVisible();

    // 2. Test Mobile Viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000); // let resize settle

    // On mobile, menuBtn should be visible
    await expect(menuBtn).toBeVisible();
  });

  test('Featured project NeuroSpark V1 is full width without side box', async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(2000);
    const featured = page.locator('.featured-project');
    await expect(featured).toBeVisible();
    await expect(featured).toContainText(/NeuroSpark V1/i);
    
    const hasSideBox = await page.evaluate(() => {
      return !!document.querySelector('.featured-vis-col') || !!document.querySelector('.material-nodes');
    });
    expect(hasSideBox).toBe(false);
  });

  test('Passions section accordion rows exist', async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(2000);

    const passionsList = page.locator('.passions-list');
    await expect(passionsList).toBeVisible();

    const activeItem = page.locator('.passion-item.active');
    await expect(activeItem).toBeVisible();

    const itemTitle = await activeItem.locator('.passion-title').textContent();
    expect(itemTitle?.trim().toLowerCase()).toBe('deep learning');
  });

  test('Spinner component and 3D orb are present', async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(2000);

    const spinner = page.locator('.spinner-wrap');
    await expect(spinner).toBeVisible();

    const spinnerSvg = page.locator('.spinner-svg');
    await expect(spinnerSvg).toBeVisible();

    const orb = page.locator('.orb-3d');
    await expect(orb).toBeVisible();

    const orbGlow = page.locator('.orb-glow');
    await expect(orbGlow).toBeVisible();
  });

  test('Fallback when JavaScript is disabled', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(fileUrl);

    // Verify critical content elements are displayed
    const nameLogo = page.locator('.nav-logo');
    await expect(nameLogo).toBeVisible();
    await expect(nameLogo).toHaveText('PHOENIX');

    const heroBgText = page.locator('.hero-bg-text');
    await expect(heroBgText).toBeVisible();

    const loader = page.locator('#loader');
    await expect(loader).toBeVisible();

    await context.close();
  });
});
