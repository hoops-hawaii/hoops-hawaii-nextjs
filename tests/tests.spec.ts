import { test, expect } from './auth-utils';

test.slow();
test('can authenticate a specific user', async ({ getUserPage }) => {

  // Call the getUserPage fixture with users signin info to get authenticated session for user
  const customUserPage = await getUserPage('john', 'changeme');

  // Navigate to the home page and wait for post-login indicator
  await customUserPage.goto('http://localhost:3000/');

  await (customUserPage.getByRole('link', { name: 'My Courts' })).click();
  await (customUserPage.getByRole('link', { name: 'Find Courts' })).click();
  await (customUserPage.getByRole('link', { name: 'Look For Team' })).click();
  await (customUserPage.getByRole('link', { name: 'All Hoopers' })).click();
  await (customUserPage.getByRole('link', { name: 'Profile picturejohn' })).click();
  await expect(customUserPage.getByRole('heading', { name: 'john' })).toBeVisible();
  await customUserPage.getByRole('button', { name: 'Edit Profile' }).click();
  await customUserPage.getByRole('button', { name: 'Update Profile' }).click();

});
