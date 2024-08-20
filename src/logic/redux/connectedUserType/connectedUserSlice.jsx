import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Contract from '../../../data/repository/contract/contractRepo';
import SmartAccount from '../../../service/wallet connect/SmartAccount';


export const fetchConnectedUser = createAsyncThunk('fetchConnectedUser', async () => {
    try {
        
        const contract = await Contract.fetchContract()
        const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
        console.log('saAddress89766898988999009',saAddress)
        const connectedAccountUserType = await contract?.ConnectedAccountType(saAddress);
        return connectedAccountUserType.toString();
    } catch (error) {
        console.log('connected',error.message)
    }
});




const connectedUserSlice = createSlice({
    name: 'connectedUser',
    initialState: {
        connectedUserType:null,
        loading: false,
        error: null,
        success: null
    },
    extraReducers: (builder) => {
       

        // personal doctor
        builder.addCase(fetchConnectedUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchConnectedUser.fulfilled, (state, action) => {
            state.loading = false;
            state.connectedUserType = action.payload;
        });
        builder.addCase(fetchConnectedUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
       

    }

});

export default connectedUserSlice.reducer;