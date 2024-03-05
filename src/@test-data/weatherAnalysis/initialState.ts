import { PersistenceAnalysisReport } from '@models/report/PersistenceAnalysisReport';

const initialState: PersistenceAnalysisReport = {
  details: {
    forPersistenceAnalysisReport: {
      source: '',
      windHeight: [],
      persistenceAnalysis: {
        weatherWindow: [''],
        significantWaveHeight: [''],
        wavePeriod: [''],
        meanWindSpeed: [''],
      },
    },
  },
};

export default initialState;
