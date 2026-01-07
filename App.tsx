
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { spotifyAuth, SpotifyService } from './services/spotify';
import { SpotifyUser, Track, AppState } from './types';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Home from './components/Home';
import Search from './components/Search';
import Library from './components/Library';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    accessToken: localStorage.getItem('spotify_token'),
    user: null,
    currentTrack: null,
    isPlaying: false,
    recentTracks: [],
  });

  const [spotify, setSpotify] = useState<SpotifyService | null>(null);

  useEffect(() => {
    const token = spotifyAuth.getTokenFromUrl();
    if (token) {
      localStorage.setItem('spotify_token', token);
      setState(prev => ({ ...prev, accessToken: token }));
      window.location.hash = '';
    }
  }, []);

  useEffect(() => {
    if (state.accessToken) {
      const service = new SpotifyService(state.accessToken);
      setSpotify(service);
      service.getUserProfile()
        .then(user => setState(prev => ({ ...prev, user })))
        .catch(err => console.error("Spotify Auth Error", err));
        
      service.getTopTracks()
        .then(tracks => setState(prev => ({ ...prev, recentTracks: tracks })));
    }
  }, [state.accessToken]);

  const handlePlayTrack = useCallback((track: Track) => {
    setState(prev => ({ ...prev, currentTrack: track, isPlaying: true }));
  }, []);

  const handleTogglePlay = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  if (!state.accessToken) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
        <div className="w-16 h-16 bg-[#1DB954] rounded-full flex items-center justify-center mb-8 animate-pulse">
           <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.5 17.3c-.2.3-.5.4-.8.2-2.5-1.5-5.7-1.9-9.5-.9-.3.1-.6-.1-.7-.4-.1-.3.1-.6.4-.7 4.1-1.1 7.6-.6 10.4 1.1.3.1.4.4.2.7zm1.5-3.3c-.3.4-.8.6-1.2.3-2.9-1.8-7.3-2.3-10.7-1.3-.5.1-1-.2-1.2-.7-.1-.5.2-1 .7-1.2 4-1.2 8.9-.6 12.2 1.4.4.3.5.9.2 1.5zm.1-3.4c-3.5-2.1-9.3-2.3-12.7-1.2-.5.2-1.1-.1-1.2-.7-.2-.5.1-1.1.7-1.2 4-1.2 10.5-1 14.5 1.4.5.3.6.9.3 1.4-.3.5-.9.7-1.6.3z"/></svg>
        </div>
        <h1 className="text-5xl font-bold mb-4 tracking-tight">Music for everyone.</h1>
        <p className="text-gray-400 mb-10 text-lg">Connect your Spotify account to experience AI-powered music discovery.</p>
        <button 
          onClick={spotifyAuth.login}
          className="bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-4 px-10 rounded-full transition duration-300 transform hover:scale-105 active:scale-95 text-lg shadow-xl"
        >
          LOG IN WITH SPOTIFY
        </button>
        <p className="mt-8 text-xs text-gray-600 max-w-sm text-center leading-relaxed">
          Note: You'll need a Spotify developer account and client ID. For demo purposes, replace the ID in <code>services/spotify.ts</code>.
        </p>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-black select-none">
        <Sidebar user={state.user} />
        
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#121212] to-black relative pb-32">
          <header className="sticky top-0 z-20 flex items-center justify-between p-4 bg-transparent bg-opacity-95 backdrop-blur-md">
            <div className="flex space-x-4">
              <button className="p-2 bg-black/40 rounded-full text-gray-400 hover:text-white transition cursor-not-allowed">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button className="p-2 bg-black/40 rounded-full text-gray-400 hover:text-white transition cursor-not-allowed">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="hidden md:block bg-white text-black font-bold text-sm py-2 px-6 rounded-full hover:scale-105 transition active:scale-95">
                Explore Premium
              </button>
              <div className="flex items-center bg-black/50 p-1 pr-3 rounded-full border border-white/10 hover:bg-[#282828] cursor-pointer transition">
                <img 
                  src={state.user?.images?.[0]?.url || 'https://picsum.photos/40/40'} 
                  className="w-7 h-7 rounded-full mr-2" 
                  alt="Avatar"
                />
                <span className="text-sm font-bold text-white max-w-[100px] truncate">{state.user?.display_name}</span>
              </div>
            </div>
          </header>

          <div className="px-6 py-4">
            <Routes>
              <Route path="/" element={<Home recentTracks={state.recentTracks} onPlay={handlePlayTrack} />} />
              <Route path="/search" element={<Search spotify={spotify!} onPlay={handlePlayTrack} />} />
              <Route path="/library" element={<Library spotify={spotify!} onPlay={handlePlayTrack} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </main>

        <Player 
          currentTrack={state.currentTrack} 
          isPlaying={state.isPlaying} 
          onTogglePlay={handleTogglePlay}
        />
      </div>
    </Router>
  );
};

export default App;
