import {expect, Page, test} from '@playwright/test';

const baseUrl = 'https://use-postal-ph.vercel.app/';

async function setup(page: Page) {
    await page.goto(baseUrl);
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveTitle(/use-postal-ph/);
    const buttons = ['Main', 'Municipality', 'Region', 'Location', 'Post Code'];
    for (const buttonName of buttons) {
        const button = await page.getByRole('button', {name: buttonName});
        await expect(button).toBeVisible();
    }
}

async function clickButton(page: Page, buttonName: string) {
    await page.getByRole('button', {name: buttonName}).click();
}

async function selectOptionAndSubmit(page: Page, comboboxName: string, optionName: string) {
    const combobox = await page.getByRole('combobox', {name: comboboxName});
    await combobox.type(optionName);
    await page.getByRole('option', {name: optionName, exact: true}).click();
    await page.locator('.MuiBox-root > button').first().click();
}

async function clearInput(page: Page, comboboxName: string) {
    await page.getByRole('combobox', {name: comboboxName}).click();
    await page.getByLabel('Clear').click();
    await page.locator('.MuiBox-root > button').first().click();
}

test.describe('index.ts', () => {
    test('main-municipality', async ({page}) => {
        await setup(page);
        await clickButton(page, 'Main');
        await selectOptionAndSubmit(page, 'municipality', 'Talisay');
        await clearInput(page, 'municipality');
    });

    test('main-region', async ({page}) => {
        await setup(page);
        await clickButton(page, 'Main');
        await selectOptionAndSubmit(page, 'region', 'VII');
        await clearInput(page, 'region');
    });

    test('main-location', async ({page}) => {
        await setup(page);
        await clickButton(page, 'Main');
        await selectOptionAndSubmit(page, 'location', 'Cebu');
        await clearInput(page, 'location');
    });

    test('main-postcode', async ({page}) => {
        await setup(page);
        await clickButton(page, 'Main');
        await selectOptionAndSubmit(page, 'post_code', '6045');
        await clearInput(page, 'post_code');
    });
});
