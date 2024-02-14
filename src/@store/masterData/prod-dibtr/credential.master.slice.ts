import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: 'Admin',
  password: 'admin123',
  userType: 'guestUser',
  userName : 'Bob Tester'
};

const credentialsMasterSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {},
});

export default credentialsMasterSlice.reducer;
