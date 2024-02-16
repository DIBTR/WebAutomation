import { createSlice } from '@reduxjs/toolkit';
import CredentialItem from '@models/login/credentialItem';

const initialState: CredentialItem = {
  username: '',
  password: '',
  userType: '',
  userFullName: '',
};

const credentialSlice = createSlice({
  name: 'credential',
  initialState,
  reducers: {},
});

export const {} = credentialSlice.actions;

export default credentialSlice.reducer;
