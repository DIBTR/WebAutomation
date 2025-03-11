/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */

import { configureStore, combineReducers, Reducer } from '@reduxjs/toolkit';
import url from '@config/url';
import Credential from '@models/login/credential';
import credentialReducer from '@pages/common/credential.slice';
import bookInEnquiryReducer from '@slices/site-builder/site-builder.slice';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getModulesReducers = () => {
  const target: string = process.env.target ?? url.customerCompanyToUse;
  console.log(
    `Selected customerCompanyToUse ${target} and slice file going to pick : ./masterData/${target}/credential.master.slice`
  );

  if (target.length === 0) {
    throw new Error('value for target cannot be blank, add a value for target in package.json');
  }

  return {
    credential: credentialReducer,
    bookInEnquiry: bookInEnquiryReducer,
    credentialData: require(`./masterData/${target}/credential.master.slice`).default as Reducer<Credential>,
  };
};

const rootReducer = combineReducers({
  ...getModulesReducers(),
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
