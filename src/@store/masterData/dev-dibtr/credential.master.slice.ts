import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  standard_user: {
    username: 'jitendra@digitalinnk.com',
    password: 'q_sj6Dnc9!',
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
