/* eslint-disable max-params */
/* eslint-disable complexity */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import axios from 'axios';
import { url } from '@config';

export default class ZephyrReporter {
  async updateTestResultInZephyr(testTitle: string, testStatus: string | undefined): Promise<void> {
    if (url.logResultToZephyr === 'true') {
      const testCycleKey = url.zephyrCycleId;

      // Use a regular expression to extract the value inside square brackets
      const match: RegExpMatchArray | null = testTitle.match(/\[([^\]]+)\]/);
      let testCase: string = '';
      if (match) {
        testCase = match[1];
      }
      const requestBody = {
        projectKey: 'VN',
        testCaseKey: `VN-${testCase}`,
        testCycleKey: `VN-${testCycleKey}`,
        statusName: testStatus === 'passed' ? 'Pass' : 'Fail',
        executedById: '5fc1fd48aca10c00699a1b68',
      };
      console.log(
        `Logging test result to Zephyr started, for testCase :: ${testCase} against test cycle :: ${testCycleKey}`
      );
      try {
        await axios.post(`https://api.zephyrscale.smartbear.com/v2/testexecutions`, requestBody, {
          headers: {
            Authorization: `Bearer `,
            'Content-Type': 'application/json',
          },
        });
        console.log(
          '%c✔️ Success:',
          'background: green; color: white; padding: 2px 5px; border-radius: 3px;',
          `Test result :: ${testStatus}, for testCase :: ${testCase}, logged under test cycle :: ${testCycleKey}`
        );
      } catch (error) {
        console.log(
          '%c❌ Error:',
          'background: red; color: white; padding: 2px 5px; border-radius: 3px;',
          error.response.data
        );
      }
    } else {
      console.log(
        '%cℹ️ Information:',
        'background: yellow; color: black; padding: 2px 5px; border-radius: 3px;',
        'During local execution not logging results to zephyr'
      );
    }
  }
}
