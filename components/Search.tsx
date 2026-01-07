
import React, { useState } from 'react';
import { SpotifyService } from '../services/spotify';
import { geminiService } from '../services/gemini';
import { Track, AISuggestion } from '../types';

interface SearchProps {
  spotify: SpotifyService;
  onPlay: (track: Track) => void;
}

const Search: React.FC<SearchProps> = ({ spotify, onPlay }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Track[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResponseText, setAiResponseText] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    
    // Normal Spotify search
    const tracks = await spotify.searchTracks(query);
    setResults(tracks);

    // AI logic if it looks like a request, or always for discovery
    if (query.length > 3) {
      setIsAiLoading(true);
      try {
        const suggestions = await geminiService.getMusicRecommendations(query);
        setAiSuggestions(suggestions);
        const trivia = await geminiService.searchMusicTrivia(query);
        setAiResponseText(trivia);
      } catch (err) {
        console.error("Gemini failed", err);
      } finally {
        setIsAiLoading(false);
      }
    }
  };

  const handleAiPlay = async (title: string, artist: string) => {
    const tracks = await spotify.searchTracks(`${title} ${artist}`);
    if (tracks.length > 0) {
      onPlay(tracks[0]);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-10">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What do you want to listen to?"
          className="block w-full pl-14 pr-12 py-4 bg-white text-black text-lg font-medium rounded-full focus:outline-none placeholder-gray-500 shadow-2xl focus:ring-4 ring-[#1DB954]/20 transition-all"
        />
        {query && (
          <button 
            type="button" 
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-500 hover:text-black"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" /></svg>
          </button>
        )}
      </form>

      {/* AI AI Insights Section */}
      {isAiLoading && (
        <div className="bg-gradient-to-br from-[#1DB954]/10 to-[#1DB954]/5 rounded-2xl p-8 border border-[#1DB954]/20 animate-pulse">
           <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-[#1DB954] rounded-full"></div>
              <div className="h-6 w-48 bg-gray-700 rounded"></div>
           </div>
           <div className="space-y-3">
              <div className="h-4 w-full bg-gray-700 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-700 rounded"></div>
           </div>
        </div>
      )}

      {!isAiLoading && aiSuggestions.length > 0 && (
        <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-2xl p-8 border border-white/10 shadow-2xl transition-all hover:border-white/20">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-indigo-500 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-xl font-black tracking-tight">AI Discovery Highlights</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {aiSuggestions.map((s, idx) => (
              <div 
                key={idx} 
                onClick={() => handleAiPlay(s.title, s.artist)}
                className="bg-black/40 p-4 rounded-xl border border-white/5 hover:bg-white/5 cursor-pointer transition group"
              >
                <div className="flex items-start justify-between">
                  <div className="truncate pr-4">
                    <p className="font-bold text-white group-hover:text-[#1DB954] transition truncate">{s.title}</p>
                    <p className="text-xs text-gray-400 mb-2 truncate">{s.artist}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#1DB954] flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-lg">
                    <svg className="w-4 h-4 text-black fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
                <p className="text-xs text-gray-400 italic leading-relaxed">"{s.reason}"</p>
              </div>
            ))}
          </div>

          {aiResponseText && (
             <div className="mt-6 pt-6 border-t border-white/5">
                <p className="text-sm text-gray-300 leading-relaxed font-light italic">
                  {aiResponseText}
                </p>
             </div>
          )}
        </div>
      )}

      {results.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold mb-6 tracking-tight">Songs</h3>
          <div className="space-y-1">
            {results.map((track) => (
              <div 
                key={track.id}
                onClick={() => onPlay(track)}
                className="group flex items-center p-3 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="relative mr-4 shrink-0">
                  <img src={track.album.images[0]?.url} className="w-12 h-12 rounded shadow" alt={track.name} />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white truncate">{track.name}</p>
                  <p className="text-sm text-gray-400 truncate hover:underline">{track.artists.map(a => a.name).join(', ')}</p>
                </div>
                <div className="hidden md:block flex-1 text-sm text-gray-400 truncate px-4">
                   {track.album.name}
                </div>
                <div className="text-gray-400 text-sm w-12 text-right">
                  {Math.floor(track.duration_ms / 60000)}:{(Math.floor((track.duration_ms % 60000) / 1000)).toString().padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {query && results.length === 0 && !isAiLoading && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
           <svg className="w-20 h-20 text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           <h3 className="text-2xl font-bold mb-2">No results found for "{query}"</h3>
           <p className="text-gray-400">Try searching for something else or let Gemini suggest music above.</p>
        </div>
      )}
    </div>
  );
};

export default Search;
