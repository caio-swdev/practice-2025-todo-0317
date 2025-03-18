import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load successfully and display title", async ({ page }) => {
    // Navigate to the homepage
    await page.goto("/");

    // Check if page loaded successfully (status code 200)
    await expect(page).toHaveURL("/");

    // Check if title is rendered
    const title = page.getByRole("heading", { name: "Next.js Todo App" });
    await expect(title).toBeVisible();

    // Check if the description text is present
    const description = page.getByText(/This app demonstrates the integration/);
    await expect(description).toBeVisible();

    // Check if Todo component is rendered
    const todoComponent = page.getByText("Learn Next.js");
    await expect(todoComponent).toBeVisible();
  });

  test("should have basic Todo functionality working", async ({ page }) => {
    await page.goto("/");

    // Check if there are todo items
    const todoItems = page.locator('[data-testid^="todo-item-"]');
    await expect(todoItems).toHaveCount(5);

    // Check if the first todo is completed (has strike-through)
    const firstTodoText = page.locator('[data-testid="todo-item-1"] span');
    await expect(firstTodoText).toHaveClass(/line-through/);

    // Check if the "Learn Next.js" todo exists and is completed
    await expect(firstTodoText).toHaveText("Learn Next.js");
    await expect(firstTodoText).toHaveClass(/line-through/);
  });
});

test.describe("Todo Component Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for the page to be fully loaded and initial todos to be rendered
    await page.waitForLoadState("networkidle");
    await expect(page.locator('[data-testid^="todo-item-"]')).toHaveCount(5);
  });

  test("should add new todos", async ({ page }) => {
    const initialCount = await page
      .locator('[data-testid^="todo-item-"]')
      .count();

    // Add a new todo
    await page.getByTestId("todo-input").fill("Test new todo");
    await page.getByTestId("add-todo-button").click();

    // Wait for the new todo to be added and verify
    await expect(page.locator('[data-testid^="todo-item-"]')).toHaveCount(
      initialCount + 1
    );
    const newTodoItem = page.getByText("Test new todo", { exact: true });
    await expect(newTodoItem).toBeVisible();

    // Verify toast message
    const toast = page
      .getByRole("status")
      .getByText("Todo added successfully", { exact: true });
    await expect(toast).toBeVisible({ timeout: 3000 });
  });

  test("should handle empty todo input", async ({ page }) => {
    const initialCount = await page
      .locator('[data-testid^="todo-item-"]')
      .count();

    // Try to add empty todo
    await page.getByTestId("todo-input").fill("");
    await page.getByTestId("add-todo-button").click();

    // Verify error toast
    const errorToast = page
      .getByRole("status")
      .getByText("Todo text cannot be empty", { exact: true });
    await expect(errorToast).toBeVisible({ timeout: 3000 });

    // Verify no new todo was added
    await expect(page.locator('[data-testid^="todo-item-"]')).toHaveCount(
      initialCount
    );
  });

  test("should toggle todo completion status", async ({ page }) => {
    const initialCount = await page
      .locator('[data-testid^="todo-item-"]')
      .count();

    // Add a new todo
    await page.getByTestId("todo-input").fill("Toggle test todo");
    await page.getByTestId("add-todo-button").click();

    // Wait for the new todo to be added
    await expect(page.locator('[data-testid^="todo-item-"]')).toHaveCount(
      initialCount + 1
    );
    const newTodoText = "Toggle test todo";
    const newTodoItem = page.getByText(newTodoText, { exact: true });
    await expect(newTodoItem).toBeVisible();

    // Find the todo item we just added
    const todoItems = page.locator('[data-testid^="todo-item-"]');
    const lastTodoItem = todoItems.last();
    const toggleButton = lastTodoItem.locator(
      'button[data-testid^="toggle-todo-"]'
    );
    const todoText = lastTodoItem.locator("span");

    // Toggle completion and verify style change
    await toggleButton.click();
    await expect(todoText).toHaveClass(/line-through/);

    // Toggle back and verify style removed
    await toggleButton.click();
    await expect(todoText).not.toHaveClass(/line-through/);
  });

  test("should delete todos", async ({ page }) => {
    const initialCount = await page
      .locator('[data-testid^="todo-item-"]')
      .count();

    // Add a new todo
    await page.getByTestId("todo-input").fill("Todo to delete");
    await page.getByTestId("add-todo-button").click();

    // Wait for the new todo to be added
    await expect(page.locator('[data-testid^="todo-item-"]')).toHaveCount(
      initialCount + 1
    );
    const newTodoText = "Todo to delete";
    const newTodoItem = page.getByText(newTodoText, { exact: true });
    await expect(newTodoItem).toBeVisible();

    // Find and delete the todo we just added
    const todoItems = page.locator('[data-testid^="todo-item-"]');
    const lastTodoItem = todoItems.last();
    const deleteButton = lastTodoItem.locator('[data-testid^="delete-todo-"]');

    // Delete and verify
    await deleteButton.click();
    await expect(newTodoItem).not.toBeVisible();
    await expect(page.locator('[data-testid^="todo-item-"]')).toHaveCount(
      initialCount
    );

    // Verify toast message
    const toast = page
      .getByRole("status")
      .getByText("Todo removed", { exact: true });
    await expect(toast).toBeVisible({ timeout: 3000 });
  });

  test("should update todo counter correctly", async ({ page }) => {
    const initialCount = await page
      .locator('[data-testid^="todo-item-"]')
      .count();

    // Add a new todo
    await page.getByTestId("todo-input").fill("Counter test todo");
    await page.getByTestId("add-todo-button").click();

    // Wait for the new todo to be added
    await expect(page.locator('[data-testid^="todo-item-"]')).toHaveCount(
      initialCount + 1
    );
    const newTodoText = "Counter test todo";
    const newTodoItem = page.getByText(newTodoText, { exact: true });
    await expect(newTodoItem).toBeVisible();

    // Get total count
    const todoItems = page.locator('[data-testid^="todo-item-"]');
    const totalCount = await todoItems.count();

    // Verify counter text in CardFooter
    const counterText = page.locator(".card-footer");
    await expect(counterText).toContainText(`${totalCount} todos`);

    // Toggle a todo and verify completed count
    const completedCount = await page.locator("span.line-through").count();
    await expect(counterText).toContainText(`${completedCount} completed`);
  });
});
