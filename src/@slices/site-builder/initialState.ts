import { BookIn } from '@models/BookIn';

const initialState: BookIn = {
  details: {
    forSiteBuildOptionsPopup: {
      site_name: '',
      grid_format: '',
      placement_alignment: '',
      rows: 0,
      columns: 0,
      site_place: '',
      turbine_selection: '',
      turbine_spacing: '',
      site_inset_buffer: '',
      turbine_angle: '',
    },
  },
};

export default initialState;
