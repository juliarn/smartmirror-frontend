import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AccountInfo, getInfo} from '../api/account';

export const getAccountInfo = createAsyncThunk<AccountInfo | null>(
  'account/getInfo',
  async () => {
    return await getInfo();
  }
);

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    accountInfo: null,
  },
  reducers: {},
});

export default accountSlice.reducer;
