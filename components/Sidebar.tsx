
import React from 'react';
import { NavLink } from 'react-router-dom';
import { SpotifyUser } from '../types';

interface SidebarProps {
  user: SpotifyUser | null;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  return (
    <div className="w-64 bg-black p-6 flex flex-col space-y-8 border-r border-white/5">
      <div className="flex items-center space-x-2 text-white px-2">
        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.5 17.3c-.2.3-.5.4-.8.2-2.5-1.5-5.7-1.9-9.5-.9-.3.1-.6-.1-.7-.4-.1-.3.1-.6.4-.7 4.1-1.1 7.6-.6 10.4 1.1.3.1.4.4.2.7zm1.5-3.3c-.3.4-.8.6-1.2.3-2.9-1.8-7.3-2.3-10.7-1.3-.5.1-1-.2-1.2-.7-.1-.5.2-1 .7-1.2 4-1.2 8.9-.6 12.2 1.4.4.3.5.9.2 1.5zm.1-3.4c-3.5-2.1-9.3-2.3-12.7-1.2-.5.2-1.1-.1-1.2-.7-.2-.5.1-1.1.7-1.2 4-1.2 10.5-1 14.5 1.4.5.3.6.9.3 1.4-.3.5-.9.7-1.6.3z"/></svg>
        <span className="text-2xl font-black tracking-tight">Spotify</span>
      </div>

      <nav className="flex flex-col space-y-4">
        <NavLink 
          to="/" 
          className={({ isActive }) => `flex items-center space-x-4 px-2 py-1 transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.5 3.553L19.5 8v10.5a.5.5 0 01-.5.5H15v-6H9v6H5a.5.5 0 01-.5-.5V8l7-4.447a1 1 0 011 0z"/></svg>
          <span className="font-bold">Home</span>
        </NavLink>
        <NavLink 
          to="/search" 
          className={({ isActive }) => `flex items-center space-x-4 px-2 py-1 transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.046l3.043 3.113a.75.75 0 101.074-1.05l-3.04-3.11c1.428-1.667 2.296-3.82 2.296-6.186 0-5.139-4.227-9.279-9.407-9.279zm-7.907 9.279c0-4.305 3.541-7.779 7.907-7.779s7.907 3.474 7.907 7.779-3.541 7.779-7.907 7.779-7.907-3.474-7.907-7.779z"/></svg>
          <span className="font-bold">Search</span>
        </NavLink>
        <NavLink 
          to="/library" 
          className={({ isActive }) => `flex items-center space-x-4 px-2 py-1 transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 2.25a.75.75 0 01.75.75V12a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM19.5 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM4.75 2.25a.75.75 0 01.75.75v18a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM8.75 2.25a.75.75 0 01.75.75v18a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM12.75 2.25a.75.75 0 01.75.75v18a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75z"/></svg>
          <span className="font-bold">Your Library</span>
        </NavLink>
      </nav>

      <div className="flex flex-col space-y-4 pt-4 border-t border-white/5">
        <button className="flex items-center space-x-4 group">
          <div className="w-6 h-6 bg-gray-400 group-hover:bg-white rounded-sm flex items-center justify-center transition-colors">
            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="3"/></svg>
          </div>
          <span className="font-bold text-gray-400 group-hover:text-white transition-colors">Create Playlist</span>
        </button>
        <button className="flex items-center space-x-4 group">
          <div className="w-6 h-6 bg-gradient-to-br from-indigo-700 to-blue-300 rounded-sm flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </div>
          <span className="font-bold text-gray-400 group-hover:text-white transition-colors">Liked Songs</span>
        </button>
      </div>

      <div className="mt-auto">
        <div className="bg-[#242424] rounded-lg p-5">
            <p className="text-sm font-bold mb-2">AI DJ Mode</p>
            <p className="text-xs text-gray-400 leading-tight mb-4">Gemini suggests music based on your taste and real-time trends.</p>
            <div className="h-1 w-full bg-[#1DB954]/20 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-[#1DB954] animate-pulse"></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
