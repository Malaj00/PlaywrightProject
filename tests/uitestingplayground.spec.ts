import { test, expect } from '@playwright/test';
import { PlaygroundMenu } from '../components/playground-menu.components';

test.describe('Playground', () => {
  let pgMenu: PlaygroundMenu;
  test.beforeEach(async ({ page }) => {
    pgMenu = new PlaygroundMenu(page);
    await page.goto('http://www.uitestingplayground.com/');
    await expect(page.locator('#title')).toBeVisible();
  });

  test('Dynamic ID', async ({ page }) => {
    // Arrange
    // Act
    await pgMenu.dynamicID.click();
    for (let i = 0; i < 4; i++) {
      await page
        .getByRole('button', { name: 'Button with Dynamic ID' })
        .click();
    }
    // Assert
  });

  test('Class Attribute', async ({ page }) => {
    // Arrange
    // Act
    await pgMenu.classAtt.click();
    page.once('dialog', async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      expect(dialog.message()).toContain('Primary button pressed');
      await dialog.accept();
    });
    await page.locator('.btn-primary').click();
    // Assert
  });

  test('Hidden Layers', async ({ page }) => {
    // Arrange
    // Act
    await pgMenu.hiddLayer.click();
    await page.locator('#greenButton').click();
    await expect(page.locator('#blueButton')).toBeVisible();
    for (let i = 0; i < 4; i++) {
      await page.locator('#blueButton').click();
    }
    // Assert
  });

  test('Load Delay', async ({ page }) => {
    // Arrange
    // Act
    await pgMenu.loadDelay.click();
    await page
      .getByRole('button', { name: 'Button Appearing After Delay' })
      .waitFor();
    await page
      .getByRole('button', { name: 'Button Appearing After Delay' })
      .click();
    // Assert
  });

  test('AJAX Data', async ({ page }) => {
    // Arrange
    // Act
    await pgMenu.ajaxData.click();
    await page.locator('#ajaxButton').click();
    await page.locator('.bg-success').waitFor();
    await expect(page.locator('#content .bg-success')).toBeVisible();
    // Assert
  });

  test('Client Side Delay', async ({ page }) => {
    // Arrange
    // Act
    await pgMenu.clientSide.click();
    await page.locator('#ajaxButton').click();
    await page.locator('.bg-success').waitFor();
    await expect(page.locator('#content .bg-success')).toBeVisible();
    // Assert
  });

  test('Click', async ({ page }) => {
    // Arrange
    // Act
    await pgMenu.click.click();
    await expect(page.locator('#badButton')).toHaveClass('btn btn-primary');
    await page.locator('#badButton').click();
    await expect(page.locator('#badButton')).toHaveClass('btn btn-success');
    await page.locator('#badButton').click({ button: 'left', force: true });
    await expect(page.locator('#badButton')).toHaveClass('btn btn-success');
    // Assert
  });

  test('Text Input', async ({ page }) => {
    // Arrange
    const defaultName = `Button That Should Change it's Name Based on Input Value`;
    const newName = 'This is new name';
    // Act
    await pgMenu.textInput.click();
    await expect(page.locator('#updatingButton')).toHaveText(defaultName);
    await page.locator('#newButtonName').fill(newName);
    await page.locator('#updatingButton').click();
    await expect(page.locator('#updatingButton')).toHaveText(newName);
    // Assert
  });

  test('Scrollbars', async ({ page }) => {
    // Arrange
    // Act
    await pgMenu.scollbars.click();
    await page.locator('#hidingButton').scrollIntoViewIfNeeded();
    await page.locator('#hidingButton').click();
    // Assert
  });

  test('Dynamic Table', async ({ page }) => {
    // Arrange
    // Act
    // Assert
  });
});
