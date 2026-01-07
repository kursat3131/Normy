
import React, { useEffect, useState } from 'react';
import { SpotifyService } from '../services/spotify';
import { Track } from '../types';

interface LibraryProps {
  spotify: SpotifyService;
  onPlay: (track: Track) => void;
}

const Library: React.FC<LibraryProps> = ({ spotify, onPlay }) => {
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    spotify.getTopTracks()
      .then(tracks => {
        setTopTracks(tracks);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [spotify]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-[#1DB954] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-end space-x-6 pb-6">
         <div className="w-48 h-48 bg-gradient-to-br from-indigo-700 to-purple-500 shadow-2xl flex items-center justify-center rounded-lg">
            <svg className="w-24 h-24 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
         </div>
         <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-widest text-white/80">Playlist</span>
            <h1 className="text-7xl font-black tracking-tighter mb-4">Liked Songs</h1>
            <div className="flex items-center space-x-2 text-sm font-bold">
               <span>Your Name</span>
               <span className="w-1 h-1 bg-white/40 rounded-full"></span>
               <span className="text-gray-400">{topTracks.length} songs</span>
            </div>
         </div>
      </div>

      <div className="mt-8">
        <div className="sticky top-[80px] grid grid-cols-[16px_4fr_3fr_2fr_minmax(120px,1fr)] gap-4 px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-white/10 mb-4 bg-[#121212]/90 backdrop-blur z-10">
          <div>#</div>
          <div>Title</div>
          <div className="hidden md:block">Album</div>
          <div className="hidden lg:block">Date Added</div>
          <div className="text-right pr-4">Duration</div>
        </div>

        <div className="space-y-1">
          {topTracks.map((track, idx) => (
            <div 
              key={track.id}
              onClick={() => onPlay(track)}
              className="grid grid-cols-[16px_4fr_3fr_2fr_minmax(120px,1fr)] gap-4 px-4 py-2 text-sm text-gray-400 group hover:bg-white/10 rounded-md transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-center">
                 <span className="group-hover:hidden">{idx + 1}</span>
                 <svg className="w-3 h-3 text-white hidden group-hover:block fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <div className="flex items-center">
                <img src={track.album.images[2]?.url} className="w-10 h-10 mr-4 rounded shadow" alt={track.name} />
                <div className="min-w-0">
                  <p className="font-bold text-white truncate">{track.name}</p>
                  <p className="text-xs hover:underline cursor-pointer">{track.artists.map(a => a.name).join(', ')}</p>
                </div>
              </div>
              <div className="hidden md:flex items-center truncate">
                <span className="hover:text-white transition cursor-pointer">{track.album.name}</span>
              </div>
              <div className="hidden lg:flex items-center">
                Jan 24, 2024
              </div>
              <div className="flex items-center justify-end pr-4">
                <span className="mr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   <svg className="w-4 h-4 text-gray-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </span>
                {Math.floor(track.duration_ms / 60000)}:{(Math.floor((track.duration_ms % 60000) / 1000)).toString().padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
