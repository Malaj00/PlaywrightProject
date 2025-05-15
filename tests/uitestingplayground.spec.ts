import { test, expect } from '@playwright/test';
import { PlaygroundMenu } from '../components/playground-menu.components';
import clipboard from 'clipboardy';
import path from 'path';

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
    await pgMenu.dynamicTable.click();
    const chromeRow = page.locator('div[role="row"]', { hasText: 'Chrome' });
    const rowText = await chromeRow.innerText();

    const match = rowText.match(/Chrome.*?(\d+(\.\d+)?%)/);
    if (!match) throw new Error('Nie znaleziono wartości CPU dla Chrome');
    const chromeCPU = match[1];

    const labelText = await page.locator('.bg-warning').innerText();
    const labelValue = labelText.split(':')[1].trim();

    expect(chromeCPU).toBe(labelValue);
    // Assert
  });

  test('Verify Text', async ({ page }) => {
    // Arrange

    // Act
    await pgMenu.verifyText.click();
    await expect(
      page.locator('.badge-secondary').getByText('Welcome UserName!'),
    ).toBeVisible();
    // Assert
  });

  test('Progress Bar', async ({ page }) => {
    // Arrange
    // Act
    await pgMenu.progressBar.click();
    await page.locator('#startButton').click();
    while (true) {
      const valueStr = await page
        .locator('#progressBar')
        .getAttribute('aria-valuenow');
      const value = Number(valueStr);
      if (value >= 75) {
        await page.locator('#stopButton').click();
        break;
      }
      await page.waitForTimeout(100);
    }
    // Assert
    await expect(page.locator('#progressBar')).toHaveText('75%');
  });

  test('Visibility', async ({ page }) => {
    // Arrange
    const zerowidth = page.locator('#zeroWidthButton');
    const opacity = page.locator('#transparentButton');
    const removed = page.locator('#removedButton');
    const invisible = page.locator('#invisibleButton');
    const displaynone = page.locator('#notdisplayButton');
    const overlapped = page.locator('#overlappedButton');
    const offscreen = page.locator('#offcreenButton');
    // Act
    await pgMenu.visibility.click();
    await page.locator('#hideButton').click();
    await expect(zerowidth).toBeHidden();
    await expect(opacity).toBeVisible();
    await expect(removed).toBeHidden();
    await expect(invisible).toBeHidden();
    await expect(displaynone).toBeHidden();
    await expect(overlapped).toBeVisible();
    await expect(offscreen).toBeHidden();
    // Assert
  });

  test('Sample App', async ({ page }) => {
    // Arrange
    const username = 'Username123';
    // Act
    await pgMenu.sampleApp.click();
    await expect(page.locator('#loginstatus')).toHaveText('User logged out.');
    await page.locator('input[name="UserName"]').fill(username);
    await page.locator('input[name="Password"]').fill('pwd');
    await page.locator('#login').click();
    // Assert
    await expect(page.locator('#loginstatus')).toHaveText(
      `Welcome, ${username}!`,
    );
  });

  test('Mouse Over', async ({ page }) => {
    // Arrange
    const clickMe = page.getByText('Click me');
    const clickCount = page.locator('#clickCount');
    const linkButton = page.getByText('Link Button');
    const linkCount = page.locator('#clickButtonCount');
    // Act
    await pgMenu.mouseOver.click();
    await expect(clickCount).toHaveText('0');
    await clickMe.click();
    await expect(clickCount).toHaveText('1');
    await clickMe.click();
    await expect(clickCount).toHaveText('2');
    await expect(linkCount).toHaveText('0');
    await linkButton.click();
    await expect(linkCount).toHaveText('1');
    await linkButton.click();
    await expect(linkCount).toHaveText('2');
    // Assert
  });

  test('Non-Breaking Space', async ({ page }) => {
    // Arrange
    // Act
    await pgMenu.nonBreaking.click();
    //await page.locator('.btn-primary').click();
    await page.getByRole('button', { name: 'MyButton' });
    // Assert
  });

  test('Overlapped Element', async ({ page }) => {
    // Arrange
    const id = 'TestID';
    const name = 'TestName';
    // Act
    await pgMenu.overlapped.click();
    await page.locator('#id').fill(id);
    await page.evaluate(() => {
      const input = document.querySelector('#name');
      input?.scrollIntoView({ behavior: 'auto', block: 'center' });
    });
    await page.locator('#name').fill(name);
    // Assert
    await expect(page.locator('#name')).toHaveValue(name);
  });

  test('Shadow DOM', async ({ page }) => {
    // Arrange

    // Act
    await pgMenu.shadowDOM.click();
    const buttonGenerate = page.locator('guid-generator >>> #buttonGenerate');
    const buttonCopy = page.locator('guid-generator >>> #buttonCopy');
    const editField = page.locator('guid-generator >>> #editField');

    await buttonGenerate.click();
    await buttonCopy.click();

    await expect(editField).toHaveValue(/.+/);

    const GUID = await editField.inputValue();
    const clipboardText = clipboard.readSync();

    // Assert
    expect(GUID.trim()).toBe(clipboardText.trim());
    //test wont work without https
  });

  test('Alerts', async ({ page }) => {
    // Arrange
    // Act
    await pgMenu.alerts.click();
    page.once('dialog', async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      expect(dialog.message()).toContain('Today is a working day.');
      await dialog.accept();
    });
    await page.locator('#alertButton').click();
    page.once('dialog', async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      expect(dialog.message()).toContain('Today is Friday.');
      await dialog.accept();
    });
    await page.locator('#confirmButton').click();
    page.once('dialog', async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      expect(dialog.message()).toContain('Yes');
      await dialog.accept();
    });
    await page.waitForTimeout(3000);
    page.once('dialog', async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      expect(dialog.message()).toContain(`Choose "cats" or 'dogs'.`);
      await dialog.accept('dogs');
    });
    await page.locator('#promptButton').click();
    // Assert
    await page.waitForTimeout(2000);
    page.once('dialog', async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      expect(dialog.message()).toContain('User value: dogs');
      await dialog.accept();
    });
  });

  test('File Upload', async ({ page }) => {
    // Arrange
    const uplFile = 'uploadfile.txt';
    // Act
    await pgMenu.fileUpload.click();
    const filePath = path.resolve(`test-data/${uplFile}`);
    const frame = await page.frameLocator('iframe');
    await frame.locator('input[type="file"]').setInputFiles(filePath);
    // Assert
    await expect(
      page.locator('iframe').contentFrame().getByText('uploadfile.txt'),
    ).toHaveText(uplFile);
  });

  test('Animated Button', async ({ page }) => {
    // Arrange
    const expectedMess =
      "Moving Target clicked. It's class name is 'btn btn-primary'";
    // Act
    await pgMenu.animatedButton.click();
    await page.locator('#animationButton').click();
    await page.waitForTimeout(5000);
    await expect(page.locator('#movingTarget')).not.toHaveClass(/spin/);
    await page.locator('#movingTarget').click();
    // Assert
    await expect(page.locator('#opstatus')).toHaveText(expectedMess);
  });

  test("Disabled Input", async ({ page }) => {
    // Arrange:
    // Act
    // Assert
    
  });

  test("Auto Wait", async ({ page }) => {
    // Arrange
    // Act
    // Assert
    
  });
});
