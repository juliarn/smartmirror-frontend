import {getSpotify, Spotify} from '../api/spotify';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const requestSpotify = createAsyncThunk<Spotify>(
  'spotify/requestSpotify',
  async () => await getSpotify()
);

export type OptionalSpotify = Spotify | undefined | null;

interface SpotifyState {
  spotify: OptionalSpotify;
}

const initialState = {spotify: undefined} as SpotifyState;

const spotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      requestSpotify.fulfilled,
      (state: SpotifyState, {payload}) => {
        state.spotify = payload;
      }
    );
    builder.addCase(requestSpotify.pending, (state: SpotifyState) => {
      state.spotify = undefined;
    });
    builder.addCase(requestSpotify.rejected, (state: SpotifyState) => {
      state.spotify = null;
    });
  },
});

export default spotifySlice.reducer;
