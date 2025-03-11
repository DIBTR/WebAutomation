/* eslint-disable max-lines */
import { faker } from '@faker-js/faker/locale/en_GB';
import { createSlice } from '@reduxjs/toolkit';
import ForSiteBuildOptionsPopup from '@models/ForSiteBuildOptionsPopup';
import initialState from './initialState';

const siteSlice = createSlice({
  name: 'siteWorkflow',
  initialState,
  reducers: {
    setSiteBuilderOptionsDefault: (state) => {
      const forSiteBuilderOptionsPopup: ForSiteBuildOptionsPopup = {
        siteName: '',
        gridFormat: '',
        placementAlignment: '',
        rows: 3,
        columns: 3,
        sitePlace: '',
        turbineSelection: '',
        turbineSpacing: '',
        siteInsetBuffer: '',
        turbineAngle: '',
      };

      state.details.forSiteBuildOptionsPopup = forSiteBuilderOptionsPopup;
    },

    setSiteBuilderOptionsCustom: (state) => {
      const forSiteBuilderOptionsPopup: ForSiteBuildOptionsPopup = {
        siteName: faker.company.name(),
        gridFormat: 'Hex',
        placementAlignment: 'Point of Click',
        rows: 3,
        columns: 3,
        sitePlace: 'Offshore',
        turbineSelection: '0.66MW 47m VG Generic *',
        turbineSpacing: '1500',
        siteInsetBuffer: '3000',
        turbineAngle: '10',
      };

      state.details.forSiteBuildOptionsPopup = forSiteBuilderOptionsPopup;
    },
  },
});

export const { setSiteBuilderOptionsDefault, setSiteBuilderOptionsCustom } = siteSlice.actions;

export default siteSlice.reducer;
