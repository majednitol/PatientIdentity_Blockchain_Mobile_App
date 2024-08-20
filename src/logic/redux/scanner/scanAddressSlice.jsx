import { createSlice } from '@reduxjs/toolkit';

const scanAddressSlice = createSlice({
  name: 'scanAddress',
  initialState: {
    address: '',
  },
  reducers: {
    setScanAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { setScanAddress } = scanAddressSlice.actions;
export const getScanedAddress = (state) => state.scanAddress.address;

export default scanAddressSlice.reducer;