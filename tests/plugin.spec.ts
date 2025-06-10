import {expect, test} from '@playwright/test';
import {readdir, readFile, unlink} from 'node:fs/promises';

test('logs are created', async ({page}) => {
    // clean up previous logs
    const logsDir = 'tests/logs';

    const files = await readdir(logsDir);
    for (const file of files) {
        await  unlink(`${logsDir}/${file}`);
    }

    await page.goto('http://localhost:4000/');
    // Check if there is at least one button on the page
    const button = page.getByRole('button');
    await button.click()
    await expect(button).toBeVisible();
    const dir = await readdir('tests/logs');
    expect(dir.length).toBeGreaterThan(0);
    const firestLog = dir[0];
    const logContent = await readFile(`tests/logs/${firestLog}`, 'utf8');
    expect(logContent).toContain('handleClick');
    expect(logContent).toContain('the AI Agent made an error');
});
