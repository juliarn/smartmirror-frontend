import createRequest from './index';

export interface SpotifyDevice {
  id: string;
  name: string;
  isActive: boolean;
  type: string;
  volumePercent: number;
}

export interface ItemArtist {
  name: string;
}

export interface AlbumImage {
  url: string;
  width: number;
  height: number;
}

export interface ItemAlbum {
  name: string;
  images: AlbumImage[];
}

export interface SpotifySongItem {
  name: string;
  artists: ItemArtist[];
  album: ItemAlbum;
  durationMs: number;
}

export interface Spotify {
  device: SpotifyDevice;
  progressMs: number;
  isPlaying: boolean;
  item: SpotifySongItem;
}

export async function getSpotify(): Promise<Spotify> {
  const response = await createRequest('services/spotify/state');
  return await response.json();
}
