import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  getSettings,
  updateSetting,
  UpdateWidgetSettingForm,
  WidgetSetting,
  WidgetSettings,
} from '../api/widgets';

export const requestWidgetSettings = createAsyncThunk<WidgetSettings>(
  'widgetSettings/requestWidgetSettings',
  async () => {
    return await getSettings();
  }
);

export const requestWidgetSettingUpdate = createAsyncThunk<
  WidgetSetting,
  UpdateWidgetSettingForm
>(
  'widgetSettings/requestWidgetSettingUpdate',
  async (updateWidgetSettingForm: UpdateWidgetSettingForm) => {
    return await updateSetting(updateWidgetSettingForm);
  }
);

export type OptionalWidgetSettings = WidgetSettings | undefined | null;

interface WidgetSettingsState {
  widgetSettings: OptionalWidgetSettings;
}

const initialState = {
  widgetSettings: undefined,
} as WidgetSettingsState;

const widgetSettingSlice = createSlice({
  name: 'widgetSettings',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      requestWidgetSettings.fulfilled,
      (state: WidgetSettingsState, {payload}) => {
        state.widgetSettings = payload;
      }
    );
    builder.addCase(
      requestWidgetSettings.pending,
      (state: WidgetSettingsState) => {
        state.widgetSettings = undefined;
      }
    );
    builder.addCase(
      requestWidgetSettings.rejected,
      (state: WidgetSettingsState) => {
        state.widgetSettings = null;
      }
    );
    builder.addCase(
      requestWidgetSettingUpdate.fulfilled,
      (state: WidgetSettingsState, {payload, meta}) => {
        if (state.widgetSettings) {
          const settings = state.widgetSettings.get(meta.arg.widgetName);
          if (settings) {
            const index = settings.findIndex(
              setting => setting.settingName === payload.settingName
            );
            settings[index] = payload;
          }
        }
      }
    );
  },
});

export default widgetSettingSlice.reducer;
