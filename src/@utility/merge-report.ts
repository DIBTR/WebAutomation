/* eslint-disable no-console */

import { mergeHTMLReports } from 'playwright-merge-html-reports';
import * as fs from 'fs';

export default class ReportHelper {
  async mergeReports(): Promise<void> {
    // // Define the paths to the individual HTML reports
    const finalReports: string[] = [];

    const reportPaths = [
      './playwright-report/group1/',
      './playwright-report/group2/',
    
      // Add more report paths as needed
    ];

    reportPaths.forEach((path) => {
      if (fs.existsSync(path)) {
        finalReports.push(path);
        console.log(`The report directory "${path}" exists.`);
      } else {
        console.log(`The report directory "${path}" does not exist.`);
      }
    });

    if (finalReports.length > 0) {
      try {
        // Merge the reports
        console.log(`Reports to be merge ${finalReports}`);
        await mergeHTMLReports(finalReports);
      } catch (error) {}
    } else {
      console.log(`Not a single group report present so not triggering merge report`);
    }
  }
}
