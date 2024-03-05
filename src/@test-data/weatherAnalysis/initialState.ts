import locations from '@constants/LocationsDetails';
import { PersistenceAnalysisReport } from '@models/report/PersistenceAnalysisReport';

const initialState: PersistenceAnalysisReport = {
  details: {
    forPersistenceAnalysisReport: {
      locationDetails: locations,
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
