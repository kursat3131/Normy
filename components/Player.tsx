
import React, { useState } from 'react';
import { Track } from '../types';

interface PlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const Player: React.FC<PlayerProps> = ({ currentTrack, isPlaying, onTogglePlay }) => {
  const [progress, setProgress] = useState(30);

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-black border-t border-white/5 px-4 flex items-center justify-between z-50">
      {/* Current Track Info */}
      <div className="flex items-center w-1/3 min-w-0">
        <div className="relative group">
          <img 
            src={currentTrack.album.images[0]?.url || 'https://picsum.photos/60/60'} 
            className="w-14 h-14 rounded shadow-lg" 
            alt="Album art"
          />
          <button className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
             <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
          </button>
        </div>
        <div className="ml-4 truncate">
          <div className="text-sm font-bold text-white hover:underline cursor-pointer truncate">
            {currentTrack.name}
          </div>
          <div className="text-xs text-gray-400 hover:text-white hover:underline cursor-pointer truncate">
            {currentTrack.artists.map(a => a.name).join(', ')}
          </div>
        </div>
        <button className="ml-4 text-gray-400 hover:text-white transition">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        </button>
      </div>

      {/* Playback Controls */}
      <div className="flex flex-col items-center w-1/3 max-w-[500px]">
        <div className="flex items-center space-x-6 mb-2">
          <button className="text-gray-400 hover:text-white transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.148 12L7.702 19V5l10.446 7z" transform="scale(-1, 1) translate(-25, 0)" /></svg>
          </button>
          <button className="text-gray-400 hover:text-white transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4 5h2v14H4V5zm14.5 7L10 5v14l8.5-7z" transform="scale(-1, 1) translate(-22, 0)" /></svg>
          </button>
          <button 
            onClick={onTogglePlay}
            className="bg-white text-black p-2 rounded-full hover:scale-105 transition active:scale-95 flex items-center justify-center w-8 h-8"
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>
          <button className="text-gray-400 hover:text-white transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4 5h2v14H4V5zm14.5 7L10 5v14l8.5-7z"/></svg>
          </button>
          <button className="text-gray-400 hover:text-white transition">
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </button>
        </div>
        
        <div className="w-full flex items-center space-x-2">
          <span className="text-[10px] text-gray-400 min-w-[30px] text-right">0:45</span>
          <div className="flex-1 h-1 bg-[#4d4d4d] rounded-full relative group cursor-pointer">
            <div 
              className="absolute top-0 left-0 h-full bg-white group-hover:bg-[#1DB954] rounded-full transition-colors"
              style={{ width: `${progress}%` }}
            ></div>
            <div 
              className="absolute top-1/2 w-3 h-3 bg-white rounded-full -translate-y-1/2 -translate-x-1/2 hidden group-hover:block shadow-lg"
              style={{ left: `${progress}%` }}
            ></div>
          </div>
          <span className="text-[10px] text-gray-400 min-w-[30px]">3:20</span>
        </div>
      </div>

      {/* Volume & Extra Controls */}
      <div className="flex items-center justify-end space-x-3 w-1/3">
        <button className="text-gray-400 hover:text-white transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
        </button>
        <button className="text-gray-400 hover:text-white transition">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-20a3 3 0 013 3v10a3 3 0 01-6 0V5a3 3 0 013-3z" /></svg>
        </button>
        <div className="flex items-center space-x-2 w-32 group">
          <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
          <div className="flex-1 h-1 bg-[#4d4d4d] rounded-full relative overflow-hidden">
             <div className="absolute top-0 left-0 h-full w-[70%] bg-white group-hover:bg-[#1DB954] transition-colors"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
