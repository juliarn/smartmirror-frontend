import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AccountInfo, getInfo} from '../api/account';

export const requestAccountInfo = createAsyncThunk<AccountInfo | null>(
  'account/requestAccountInfo',
  async () => {
    return await getInfo();
  }
);

export type OptionalAccountInfo = AccountInfo | undefined | null;

interface AccountState {
  accountInfo: OptionalAccountInfo;
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
      requestAccountInfo.fulfilled,
      (state: AccountState, {payload}) => {
        state.accountInfo = payload;
      }
    );
    builder.addCase(requestAccountInfo.pending, (state: AccountState) => {
      state.accountInfo = undefined;
    });
    builder.addCase(requestAccountInfo.rejected, (state: AccountState) => {
      state.accountInfo = null;
    });
  },
});

export default accountSlice.reducer;
