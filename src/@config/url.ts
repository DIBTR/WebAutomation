import environment from '@constants/environment';

const applicationURL = process.env.applicationURL ?? environment.DEV.applicationURL;
const logResultToZephyr = process.env.logResultToZephyr ?? 'false';
const zephyrCycleId = process.env.zephyrCycleId ?? 'R227'
const environmentToUseForExecution = process.env.envToUse ?? environment.DEV.env;
const customerCompanyToUse = process.env.target ?? environment.DEV.customerCompanyToUse;

export default {
  applicationURL,
  environmentToUseForExecution,
  customerCompanyToUse,
  logResultToZephyr,
  zephyrCycleId
};
