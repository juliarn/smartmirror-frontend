import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AccountInfo, getInfo} from '../api/account';

export const getAccountInfo = createAsyncThunk<AccountInfo | null>(
  'account/getInfo',
  async () => {
    return await getInfo();
  }
);

interface AccountState {
  accountInfo: AccountInfo | null;
}

const initialState = {
  accountInfo: null,
} as AccountState;

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      getAccountInfo.fulfilled,
      (state: AccountState, {payload}) => {
        state.accountInfo = payload;
      }
    );
  },
});

export default accountSlice.reducer;
