import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {hasServiceAuth, revokeServiceAuth} from '../api/serviceAuth';

export const requestHasServiceAuth = createAsyncThunk<boolean, string>(
  'serviceAuth/requestHasServiceAuth',
  async (serviceName: string) => {
    return await hasServiceAuth(serviceName);
  }
);

export const requestRevokeServiceAuth = createAsyncThunk<void, string>(
  'serviceAuth/requestRevokeServiceAuth',
  async (serviceName: string) => {
    return await revokeServiceAuth(serviceName);
  }
);

interface ServiceAuthState {
  serviceAuth: {[serviceName: string]: boolean | undefined};
}

const initialState = {serviceAuth: {}} as ServiceAuthState;

const serviceAuthSlice = createSlice({
  name: 'serviceAuth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      requestHasServiceAuth.fulfilled,
      (state: ServiceAuthState, {payload, meta}) => {
        state.serviceAuth[meta.arg] = payload;
      }
    );
    builder.addCase(
      requestHasServiceAuth.pending,
      (state: ServiceAuthState, {meta}) => {
        state.serviceAuth[meta.arg] = undefined;
      }
    );
    builder.addCase(
      requestHasServiceAuth.rejected,
      (state: ServiceAuthState, {meta}) => {
        state.serviceAuth[meta.arg] = false;
      }
    );
    builder.addCase(
      requestRevokeServiceAuth.fulfilled,
      (state: ServiceAuthState, {meta}) => {
        state.serviceAuth[meta.arg] = false;
      }
    );
  },
});

export default serviceAuthSlice.reducer;
