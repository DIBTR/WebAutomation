export const caps = {
  browser: 'chrome',
  os: 'osx',
  os_version: 'catalina',
  name: 'Playwright Starter Project',
  build: new Date(),
  'browserstack.username': process.env.BROWSERSTACK_USERNAME || 'jitendra_n8somz',
  'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY || 'jucy5ysgv135hCXhzsEN',
  'browserstack.local': process.env.BROWSERSTACK_LOCAL || false,
  'client.playwrightVersion': '1.39.0',
};

export const browserStackConfig = {
  name: process.env.ENV_EXECUTION === 'develop' ? 'Develop' : 'Dev',
  use: {
    connectOptions: {
      wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`,
    },
  },
};

export const localConfig = {
  name: process.env.ENV_EXECUTION === 'develop' ? 'Develop' : 'Dev',
  use: {
    channel: 'chrome',
    headless: process.env.CI === 'true' ? true : false,
    trace: 'off',
    video: 'off',
  },
};