import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  enrolled_user: {
    username: 'jitendra+123@digitalinnk.com',
    password: 'Password_8976#',
    userType: 'standard_user',
    userFullName: '',
  },
  standard_user: {
    username: 'standard_user',
    password: 'secret_sauce',
    userType: 'standard_user',
    userFullName: '',
  },
  invalid_user: {
    username: 'invalid',
    password: 'secret_sauce',
    userType: 'error_user',
    userFullName: '',
  },
  locked_out_user: {
    username: 'locked_out_user',
    password: 'secret_sauce',
    userType: 'locked_user',
    userFullName: '',
  },

};

const credentialsMasterSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {},
});

export default credentialsMasterSlice.reducer;
