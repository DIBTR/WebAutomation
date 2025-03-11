/* eslint-disable max-lines */
import { createSlice } from '@reduxjs/toolkit';
import ForSiteBuildOptionsPopup from '@models/ForSiteBuildOptionsPopup';
import initialState from './initialState';

const siteSlice = createSlice({
  name: 'siteWorkflow',
  initialState,
  reducers: {
    setSiteBuilderOptionsDefault: (state) => {

      const forSiteBuilderOptionsPopup : ForSiteBuildOptionsPopup = {
        site_name: '',
        grid_format: '',
        placement_alignment: '',
        rows: 3,
        columns: 3,
        site_place: '',
        turbine_selection: '',
        turbine_spacing: '',
        site_inset_buffer: '',
        turbine_angle: ''
      }

      state.details.forSiteBuildOptionsPopup = forSiteBuilderOptionsPopup;
    },
  },
});

export const {
  setSiteBuilderOptionsDefault,
} = siteSlice.actions;

export default siteSlice.reducer;
