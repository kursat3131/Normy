
import { SpotifyUser, Track } from '../types';

// NOTE: For a real production app, you would use an environment variable.
// Since this is a standalone demo, we use a placeholder CLIENT_ID.
// To make it functional, the user should replace this with their own Spotify Client ID.
const CLIENT_ID = 'YOUR_SPOTIFY_CLIENT_ID'; 
const REDIRECT_URI = window.location.origin + '/#callback';
const SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-library-read',
  'user-top-read',
  'user-read-recently-played',
  'user-modify-playback-state',
  'streaming'
].join(' ');

export const spotifyAuth = {
  login: () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;
    window.location.href = authUrl;
  },
  
  getTokenFromUrl: () => {
    const hash = window.location.hash;
    if (hash && hash.includes('access_token')) {
      const token = hash.split('&')[0].split('=')[1];
      window.location.hash = '';
      return token;
    }
    return null;
  }
};

export class SpotifyService {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  private async fetchSpotify(endpoint: string) {
    const res = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
    if (res.status === 401) {
       localStorage.removeItem('spotify_token');
       window.location.reload();
    }
    return res.json();
  }

  async getUserProfile(): Promise<SpotifyUser> {
    return this.fetchSpotify('/me');
  }

  async getTopTracks(): Promise<Track[]> {
    const data = await this.fetchSpotify('/me/top/tracks?limit=20');
    return data.items || [];
  }

  async searchTracks(query: string): Promise<Track[]> {
    const data = await this.fetchSpotify(`/search?q=${encodeURIComponent(query)}&type=track&limit=10`);
    return data.tracks.items || [];
  }
}
