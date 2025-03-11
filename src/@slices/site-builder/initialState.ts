import { BookIn } from '@models/BookIn';

const initialState: BookIn = {
  details: {
    forSiteBuildOptionsPopup: {
      siteName: '',
      gridFormat: '',
      placementAlignment: '',
      rows: 0,
      columns: 0,
      sitePlace: '',
      turbineSelection: '',
      turbineSpacing: '',
      siteInsetBuffer: '',
      turbineAngle: '',
    },
  },
};

export default initialState;
