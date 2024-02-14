import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: 'standard_user',
  password: 'secret_sauce',
  userType: 'standard_user',
  userFullName : ''
};

const credentialsMasterSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {},
});

export default credentialsMasterSlice.reducer;
