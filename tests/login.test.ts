import {expect, test} from '@playwright/test';

test('Login flow', async ({page}) => {
  await page.goto('http://localhost:3000/');

  await page.locator('button').getByText('Sign In').click();

  await expect(page).toHaveURL(/.\/login/);

  await page.fill('input[name="email"]', 'test1@mail.com');
  await page.fill('input[name="password"]', 'test1');

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/.\//);

  await page.locator('button').getByText('Profile').click();
  await page.locator('div').getByText('Logout').click();

  await expect(page.locator('button').getByText('Sign In')).toBeVisible();
});
