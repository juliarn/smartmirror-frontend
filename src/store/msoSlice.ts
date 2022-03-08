import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CoverLesson, CoverLessons, getCoverLessons} from '../api/mso';

export const requestCoverLessons = createAsyncThunk<CoverLessons>(
  'mso/requestCoverLessons',
  async () => {
    return await getCoverLessons();
  }
);

export type OptionalCoverLessons = CoverLesson[] | undefined | null;

interface MsoState {
  coverLessons: OptionalCoverLessons;
}

const initialState = {coverLessons: undefined} as MsoState;

const msoSlice = createSlice({
  name: 'mso',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      requestCoverLessons.fulfilled,
      (state: MsoState, {payload}) => {
        console.log(payload);
        state.coverLessons = payload.coverLessons;
      }
    );
    builder.addCase(requestCoverLessons.rejected, (state: MsoState) => {
      state.coverLessons = null;
    });
  },
});

export default msoSlice.reducer;
