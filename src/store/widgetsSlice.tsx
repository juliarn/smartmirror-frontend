import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getWidgets, Widget} from '../api/widgets';

export const requestWidgets = createAsyncThunk<Widget[]>(
  'widgets/requestWidgets',
  async () => {
    return await getWidgets();
  }
);

export type OptionalWidgets = Widget[] | undefined | null;

interface WidgetsState {
  widgets: OptionalWidgets;
}

const initialState = {
  widgets: undefined,
} as WidgetsState;

const widgetsSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      requestWidgets.fulfilled,
      (state: WidgetsState, {payload}) => {
        state.widgets = payload;
      }
    );
    builder.addCase(requestWidgets.pending, (state: WidgetsState) => {
      state.widgets = undefined;
    });
    builder.addCase(requestWidgets.rejected, (state: WidgetsState) => {
      state.widgets = null;
    });
  },
});

export default widgetsSlice.reducer;
