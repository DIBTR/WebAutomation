import { test, expect, APIRequestContext } from '@playwright/test';
import { faker } from '@faker-js/faker';
let apiContext: APIRequestContext;

test.describe('@apiSuite', () => {
  test.beforeEach(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      // All requests we send go to this API endpoint.
      baseURL: 'https://task-mgmt-charlyautomatiza.onrender.com',
      extraHTTPHeaders: {
        Accept: 'application/json',
      },
    });
  });

  test.afterEach(async () => {
    // Dispose all responses.
    await apiContext.dispose();
  });

  test('API SignUp', async ({}) => {
    const username = faker.internet.userName();
    const password = faker.internet.password();

    // New User
    const newUser = await apiContext.post('/auth/signup', {
      data: {
        username: username,
        password: password,
      },
    });
    expect(newUser.status()).toEqual(201);
  });
});
