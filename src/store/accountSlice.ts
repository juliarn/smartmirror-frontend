import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AccountInfo, getInfo} from '../api/account';

export const getAccountInfo = createAsyncThunk<AccountInfo | null>(
  'account/getInfo',
  async () => {
    return await getInfo();
  }
);

export type AccountInfoState = AccountInfo | undefined | null;

interface AccountState {
  accountInfo: AccountInfoState;
}

const initialState = {
  accountInfo: undefined,
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
    builder.addCase(getAccountInfo.pending, (state: AccountState) => {
      state.accountInfo = undefined;
    });
    builder.addCase(getAccountInfo.rejected, (state: AccountState) => {
      state.accountInfo = null;
    });
  },
});

export default accountSlice.reducer;
