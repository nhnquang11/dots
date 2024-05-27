const { test, expect, describe, beforeEach } = require("@playwright/test");
const path = require("path");

describe("Dots App", () => {
  test("has title", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await expect(page).toHaveTitle(/Dots/);
  });

  test("can login", async ({ page }) => {
    await page.goto("http://localhost:5173");

    const loginBtn = page.locator('[datatest-id="login-button"]');
    await loginBtn.click();

    const emailInput = page.locator('[datatest-id="email-input"]');
    await emailInput.fill("benji@mail.com");

    const passwordInput = page.locator('[datatest-id="password-input"]');
    await passwordInput.fill("Qwerty1!");

    const submitBtn = page.locator('[datatest-id="submit-button"]');
    await submitBtn.click();

    const dropdownBtn = page.locator('[datatest-id="dropdown-btn"]');
    await dropdownBtn.click();

    const name = await page.innerText('[datatest-id="name-div"]');
    expect(name).toBe("Benji Dunn");
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await page.goto("http://localhost:5173");

      const loginBtn = page.locator('[datatest-id="login-button"]');
      await loginBtn.click();

      const emailInput = page.locator('[datatest-id="email-input"]');
      await emailInput.fill("benji@mail.com");

      const passwordInput = page.locator('[datatest-id="password-input"]');
      await passwordInput.fill("Qwerty1!");

      const submitBtn = page.locator('[datatest-id="submit-button"]');
      await submitBtn.click();
    });

    test("profile page", async ({ page }) => {
      const dropdownBtn = page.locator('[datatest-id="dropdown-btn"]');
      await dropdownBtn.click();

      const profileBtn = page.locator('[datatest-id="profile-link"]');
      await profileBtn.click();

      const username = await page.inputValue('[datatest-id="username-input"]');
      expect(username).toBe("benji");

      const name = await page.inputValue('[datatest-id="name-input"]');
      expect(name).toBe("Benji Dunn");

      const email = await page.inputValue('[datatest-id="email-input"]');
      expect(email).toBe("benji@mail.com");
    });

    test("write page", async ({ page }) => {
      const dropdownBtn = page.locator('[datatest-id="dropdown-btn"]');
      await dropdownBtn.click();

      const writeBtn = page.locator('[datatest-id="write-link"]');
      await writeBtn.click();

      await page.locator('[datatest-id="title-input"]').fill("My first story");
      await page
        .locator('[datatest-id="description-input"]')
        .fill("My first description");

      const fileChooserPromise = page.waitForEvent("filechooser");
      await page.locator('[datatest-id="preview-input"]').click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(path.join(__dirname, "image.jpeg"));

      await page.waitForSelector(".ql-editor");
      await page.fill(".ql-editor", "My first story content");

      await page.waitForSelector('[datatest-id^="topic-"]');
      const checkboxSelector = '[datatest-id^="topic-"]';
      await page.check(checkboxSelector);
      const isChecked = await page.$eval(
        checkboxSelector,
        (checkbox) => checkbox.checked
      );
      expect(isChecked).toBeTruthy();

      const publishBtn = page.locator('[datatest-id="publish-btn"]');
      await publishBtn.click();

      const isDisabled = await page.$eval(
        "#loading-btn",
        (button) => button.disabled
      );
      expect(isDisabled).toBeTruthy();
    });
  });
});
