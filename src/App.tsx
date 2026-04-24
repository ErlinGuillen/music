import React, { useState, useRef } from 'react';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, Upload } from 'lucide-react';

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-slate-900 rounded-[40px] p-8 border border-white/10 shadow-2xl space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider">
            <Music size={12} />
            Pure Audio
          </div>
          <h1 className="text-4xl font-black tracking-tight">🎵 Sonic Player</h1>
          <p className="text-slate-500 text-sm font-medium italic">v0.0.2 - Experience the sound</p>
        </div>

        <div className="relative group aspect-square bg-gradient-to-br from-blue-600 to-purple-700 rounded-[32px] flex items-center justify-center overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          <Music size={120} className="text-white/20 blur-sm absolute" />
          <Music size={80} className="text-white drop-shadow-2xl" />
          
          {file && (
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                 <p className="text-xs font-bold truncate opacity-80 uppercase tracking-widest mb-1">Now Playing</p>
                 <p className="font-bold truncate text-sm">{file.name}</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <audio 
            ref={audioRef} 
            onPlay={() => setIsPlaying(true)} 
            onPause={() => setIsPlaying(false)}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-4">
             <div className="flex items-center gap-8">
                <button className="text-slate-500 hover:text-white transition-colors"><SkipBack size={24} /></button>
                <button 
                  onClick={togglePlay}
                  className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                  {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                </button>
                <button className="text-slate-500 hover:text-white transition-colors"><SkipForward size={24} /></button>
             </div>
             
             <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-1/3 rounded-full" />
             </div>
          </div>

          <label className="flex items-center justify-center gap-3 w-full py-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-all group">
            <Upload size={20} className="text-slate-400 group-hover:text-blue-400" />
            <span className="font-bold text-sm text-slate-300">Import Local Audio</span>
            <input type="file" onChange={handleFileChange} accept="audio/*" className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
}
