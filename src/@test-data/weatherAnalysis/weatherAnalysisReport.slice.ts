import ForPersistenceAnalysisReport from '@models/report/ForPersistenceAnalysisReport';
import { createSlice } from '@reduxjs/toolkit';
import initialState from './initialState';

const weatherAnalysis = createSlice({
  name: 'weatherAnalysis',
  initialState,
  reducers: {
    setPersistentAnalysisReport: (state, action) => {
      const { weatherAnalysisData } = action.payload;
      
      const forPersistenceAnalysisReport: ForPersistenceAnalysisReport = {
        locationDetails: weatherAnalysisData.locationDetails,
        source: weatherAnalysisData.source,    
        windHeight: weatherAnalysisData.windHeight,
        persistenceAnalysis: {
          weatherWindow: weatherAnalysisData.persistenceAnalysis.weatherWindow,
          significantWaveHeight: weatherAnalysisData.persistenceAnalysis.significantWaveHeight,
          wavePeriod: weatherAnalysisData.persistenceAnalysis.wavePeriod,
          meanWindSpeed: weatherAnalysisData.persistenceAnalysis.meanWindSpeed,
        },
       
      };
      state.details.forPersistenceAnalysisReport = forPersistenceAnalysisReport;
    },
  },
});

export const { setPersistentAnalysisReport } = weatherAnalysis.actions;

export default weatherAnalysis.reducer;
