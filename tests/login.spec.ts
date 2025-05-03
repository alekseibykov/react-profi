import { test, expect } from '@playwright/test';

test.describe('Login functionality', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the login page before each test
        await page.goto('http://localhost:3000/login');
    });

    test('should show login form', async ({ page }) => {
        // Check if the login form elements are present
        await expect(page.getByLabel('Имя пользователя')).toBeVisible();
        await expect(page.getByLabel('Пароль')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Войти' })).toBeVisible();
    });

    test('should show error message with incorrect credentials', async ({ page }) => {
        // Fill in incorrect credentials
        await page.getByLabel('Имя пользователя').fill('wronguser');
        await page.getByLabel('Пароль').fill('wrongpass');
        await page.getByRole('button', { name: 'Войти' }).click();

        // Wait for and check error message
        await expect(page.getByText('Некорректный логин или пароль')).toBeVisible({ timeout: 10000 });
    });

    test('should login successfully with correct credentials', async ({ page }) => {
        // Fill in correct credentials
        await page.getByLabel('Имя пользователя').fill('user');
        await page.getByLabel('Пароль').fill('123');
        await page.getByRole('button', { name: 'Войти' }).click();

        // Check if we're redirected to the home page
        await expect(page).toHaveURL('http://localhost:3000/');
    });

    test('should persist login state after refresh', async ({ page }) => {
        // Login first
        await page.getByLabel('Имя пользователя').fill('user');
        await page.getByLabel('Пароль').fill('123');
        await page.getByRole('button', { name: 'Войти' }).click();

        // Wait for navigation
        await page.waitForURL('http://localhost:3000/');

        // Refresh the page
        await page.reload();

        // Check if we're still on the home page
        await expect(page).toHaveURL('http://localhost:3000/');
    });

    test('should show calendar after successful login', async ({ page }) => {
        // Login first
        await page.getByLabel('Имя пользователя').fill('user');
        await page.getByLabel('Пароль').fill('123');
        await page.getByRole('button', { name: 'Войти' }).click();

        // Wait for navigation
        await page.waitForURL('http://localhost:3000/');

        // Check if calendar is visible
        await expect(page.locator('.ant-picker-calendar')).toBeVisible();
        
        // Check if "Add event" button is visible
        await expect(page.getByRole('button', { name: 'Добавить событие' })).toBeVisible();
    });
}); 