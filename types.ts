
export interface SpotifyUser {
  display_name: string;
  images: { url: string }[];
  id: string;
}

export interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { name: string; images: { url: string }[] };
  duration_ms: number;
  uri: string;
}

export interface AISuggestion {
  title: string;
  artist: string;
  reason: string;
}

export interface AppState {
  accessToken: string | null;
  user: SpotifyUser | null;
  currentTrack: Track | null;
  isPlaying: boolean;
  recentTracks: Track[];
}
