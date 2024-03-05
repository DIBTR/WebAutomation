import locations from '@constants/LocationsDetails';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  locationDetails: locations.NAO,
  source : 'ECMWF Reanalysis v5 (ERA5)',
  windHeight :[10],
  persistenceAnalysis : {
    weatherWindow : [8],
    significantWaveHeight : [1.75, 2],
    wavePeriod:[10],
    meanWindSpeed:[8,10]
  }
};

const weatherAnalysisMasterSlice = createSlice({
  name: 'weather.analysis',
  initialState,
  reducers: {},
});

export default weatherAnalysisMasterSlice.reducer;
