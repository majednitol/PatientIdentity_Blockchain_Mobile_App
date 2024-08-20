import { createSlice } from '@reduxjs/toolkit';

const web3AuthSlice = createSlice({
  name: 'web3Auth',
  initialState: {
    web3authInstance: '',
  },
  reducers: {
    setWeb3Auth: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { setWeb3Auth } = web3AuthSlice.actions;
export const getWeb3Auth = (state) => state.web3Auth.web3authInstance;

export default web3AuthSlice.reducer;