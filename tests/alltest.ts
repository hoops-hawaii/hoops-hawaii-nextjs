import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  
  test('user can login and see profile details', async ({ page }) => {
    // 1. Navigate to your login page
    await page.goto('http://localhost:3000/auth/signin');

    // 2. Fill out the form using accessible locators
    // Playwright prefers 'getByLabel' or 'getByRole' over CSS selectors
    await page.getByLabel('Username').fill('john');
    await page.getByLabel('Password').fill('changeme');
    
    // 3. Click the submit button
    await page.getByRole('button', { name: /log in/i }).click();

    // 4. Verify redirect to dashboard or home
    await expect(page).toHaveURL(/.*dashboard/);

    // 5. Verify the Resolver data (bio, username) appears on the page
    const bio = page.getByText('This is my bio');
    await expect(bio).toBeVisible();
    
    // Check if the Profile Picture (pfp) is rendered
    const pfp = page.getByRole('img', { name: /profile picture/i });
    await expect(pfp).toBeVisible();
  });

});