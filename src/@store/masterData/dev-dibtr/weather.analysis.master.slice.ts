import locations from '@constants/LocationsDetails';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  locationDetails: locations.NAO,
  source: 'ECMWF Reanalysis v5 (ERA5)',
  windHeight: [50],
  persistenceAnalysis: {
    weatherWindow: [8, 12],
    significantWaveHeight: [1.75],
    wavePeriod: [10],
    meanWindSpeed: [8],
  },
  expectedResultsFor8Window: [
    8, 8, 1.75, 10, 3.23, 2.38, 5.38, 11.11, 36.56, 63.33, 73.12, 62.37, 36.67, 21.51, 18.89, 13.98],
};

const weatherAnalysisMasterSlice = createSlice({
  name: 'weather.analysis',
  initialState,
  reducers: {},
});

export default weatherAnalysisMasterSlice.reducer;
