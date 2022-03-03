import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  getPositions,
  updatePosition,
  UpdateWidgetPositionForm,
  WidgetPosition,
  WidgetPositions,
} from '../api/widgets';

export const requestWidgetPositions = createAsyncThunk<WidgetPositions>(
  'widgetPositions/requestWidgetPositions',
  async () => {
    return await getPositions();
  }
);

export const requestWidgetPositionUpdate = createAsyncThunk<
  WidgetPosition,
  UpdateWidgetPositionForm
>(
  'widgetPositions/requestWidgetPositionUpdate',
  async (updateWidgetPositionForm: UpdateWidgetPositionForm) => {
    return await updatePosition(updateWidgetPositionForm);
  }
);

export type OptionalWidgetPositions = WidgetPositions | undefined | null;

interface WidgetPositionsState {
  widgetPositions: OptionalWidgetPositions;
}

const initialState = {
  widgetPositions: undefined,
} as WidgetPositionsState;

const widgetPositionSlice = createSlice({
  name: 'widgetPositions',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      requestWidgetPositions.fulfilled,
      (state: WidgetPositionsState, {payload}) => {
        state.widgetPositions = payload;
      }
    );
    builder.addCase(
      requestWidgetPositions.pending,
      (state: WidgetPositionsState) => {
        state.widgetPositions = undefined;
      }
    );
    builder.addCase(
      requestWidgetPositions.rejected,
      (state: WidgetPositionsState) => {
        state.widgetPositions = null;
      }
    );
    builder.addCase(
      requestWidgetPositionUpdate.fulfilled,
      (state: WidgetPositionsState, {payload, meta}) => {
        if (state.widgetPositions) {
          state.widgetPositions.set(meta.arg.widgetName, payload);
        }
      }
    );
  },
});

export default widgetPositionSlice.reducer;
