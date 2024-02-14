import { createSlice } from '@reduxjs/toolkit';
import initialState from './initialState';
import ForCredential from './credentialItem';

const credentialSlice = createSlice({
  name: 'credential',
  initialState,
  reducers: {
    setCustomerValidLogin: (state, action) => {
      const { credentialData } = action.payload;

      const forCredential: ForCredential = {
        username: credentialData.username,
        password: credentialData.password,
        userType: credentialData.userType,
        userFullName : credentialData.userFullName
      };

      state.username = forCredential.username;
      state.password = forCredential.password;
      state.userType = forCredential.userType;
      state.userFullName = forCredential.userFullName;
    },

    setCustomerInValidLogin: (state, action) => {
      const { credentialData } = action.payload;

      const forCredential: ForCredential = {
        username: 'wrongusername',
        password: credentialData.password,
        userType: credentialData.userType,
        userFullName : credentialData.userFullName
      };

      state.username = forCredential.username;
      state.password = forCredential.password;
      state.userType = forCredential.userType;
      state.userFullName = forCredential.userFullName;
    },
  },
});

export const { setCustomerValidLogin, setCustomerInValidLogin } = credentialSlice.actions;

export default credentialSlice.reducer;
