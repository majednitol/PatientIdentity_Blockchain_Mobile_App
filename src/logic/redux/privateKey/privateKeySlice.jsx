import { createSlice } from '@reduxjs/toolkit';

const privateKeySlice = createSlice({
  name: 'privateKey',
  initialState: {
    address: '',
  },
  reducers: {
    setPrivateKey: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { setPrivateKey } = privateKeySlice.actions;
export const getPrivateKey = (state) => state.privateKey.address;

export default privateKeySlice.reducer;