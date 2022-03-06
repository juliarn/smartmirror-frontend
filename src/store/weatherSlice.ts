import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {FullWeather, getWeather} from '../api/weather';

export const requestWeather = createAsyncThunk<FullWeather | null, string>(
  'weather/requestWeather',
  async (unit: string) => {
    return await getWeather(unit);
  }
);

export type OptionalFullWeather = FullWeather | undefined | null;

interface WeatherState {
  fullWeather: OptionalFullWeather;
}

const initialState = {fullWeather: undefined} as WeatherState;

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      requestWeather.fulfilled,
      (state: WeatherState, {payload}) => {
        state.fullWeather = payload;
      }
    );
    builder.addCase(requestWeather.pending, (state: WeatherState) => {
      state.fullWeather = undefined;
    });
    builder.addCase(requestWeather.rejected, (state: WeatherState) => {
      state.fullWeather = null;
    });
  },
});

export default weatherSlice.reducer;
