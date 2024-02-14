import ReportHelper from './merge-report';

export { default as generateRandomNumbers } from './generateRandomNumbers';
export { default as generateRandomString } from './generateRandomString';

const runMergeReport = async (): Promise<void> => {
  await new ReportHelper().mergeReports();
};

runMergeReport().catch((error) => error);
