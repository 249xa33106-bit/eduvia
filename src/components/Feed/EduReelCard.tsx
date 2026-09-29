import React, { useState } from 'react';
import { Heart, MessageSquare, Bookmark, Share2, Brain, Zap, Code2, ShieldCheck, Play, Volume2, VolumeX, CheckCircle } from 'lucide-react';
import type { ReelItem } from '../../types/eduvia';

interface EduReelCardProps {
  reel: ReelItem;
  onOpenUnderstand: () => void;
  onOpenPractice: () => void;
  onOpenCode: () => void;
  onOpenProve: () => void;
  onToggleSave: () => void;
  onToggleLike: () => void;
  onOpenComments?: () => void;
}

export const EduReelCard: React.FC<EduReelCardProps> = ({
  reel,
  onOpenUnderstand,
  onOpenPractice,
  onOpenCode,
  onOpenProve,
  onToggleSave,
  onToggleLike,
  onOpenComments
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[9/16] rounded-3xl overflow-hidden glass-panel border border-white/15 shadow-2xl shadow-black/90 group flex flex-col justify-between select-none">
      {/* Background Video Player Simulation */}
      <div 
        className="absolute inset-0 bg-black cursor-pointer"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <video
          src={reel.videoUrl}
          poster={reel.thumbnailUrl}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />

        {/* Play/Pause Overlay Indicator */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs">
            <div className="w-16 h-16 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white backdrop-blur-md">
              <Play className="w-8 h-8 fill-white ml-1" />
            </div>
          </div>
        )}
      </div>

      {/* Top Bar inside Reel */}
      <div className="relative z-10 p-4 flex items-center justify-between">
        {/* Creator Info */}
        <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          <img
            src={reel.creator.avatar}
            alt={reel.creator.name}
            className="w-7 h-7 rounded-full object-cover border border-purple-400"
          />
          <div>
            <div className="flex items-center space-x-1">
              <span className="text-xs font-bold text-white leading-tight">{reel.creator.name}</span>
              {reel.creator.verified && (
                <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 text-black flex items-center justify-center text-[8px] font-black">
                  ✓
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-300 block">{reel.creator.handle}</span>
          </div>
        </div>

        {/* Mute & Topic Badge */}
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-1 rounded-full bg-indigo-600/40 border border-indigo-400/40 text-indigo-200 text-[10px] font-bold tracking-wide backdrop-blur-md">
            {reel.skillTag}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
            className="w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white backdrop-blur-md"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Right Social Sidebar */}
      <div className="relative z-10 self-end mr-3 flex flex-col items-center space-y-4 mb-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike();
          }}
          className="flex flex-col items-center group"
        >
          <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
            reel.isLiked ? 'bg-rose-500 text-white scale-110 shadow-lg shadow-rose-500/40' : 'bg-black/40 text-white hover:bg-white/20 border border-white/15'
          }`}>
            <Heart className={`w-5 h-5 ${reel.isLiked ? 'fill-white' : ''}`} />
          </div>
          <span className="text-[10px] font-semibold text-white mt-1 drop-shadow-md">
            {(reel.likes + (reel.isLiked ? 1 : 0)).toLocaleString()}
          </span>
        </button>

        <button 
          onClick={onOpenComments || onOpenUnderstand}
          className="flex flex-col items-center group"
        >
          <div className="w-11 h-11 rounded-full bg-black/40 border border-white/15 flex items-center justify-center text-white backdrop-blur-md hover:bg-white/20 transition-all">
            <MessageSquare className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold text-white mt-1 drop-shadow-md">
            {reel.commentsCount}
          </span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave();
          }}
          className="flex flex-col items-center group"
        >
          <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
            reel.isSaved ? 'bg-amber-500 text-white scale-110 shadow-lg shadow-amber-500/40' : 'bg-black/40 text-white hover:bg-white/20 border border-white/15'
          }`}>
            <Bookmark className={`w-5 h-5 ${reel.isSaved ? 'fill-white' : ''}`} />
          </div>
          <span className="text-[10px] font-semibold text-white mt-1 drop-shadow-md">
            {reel.saves + (reel.isSaved ? 1 : 0)}
          </span>
        </button>

        <button 
          onClick={() => alert(`Shared reel "${reel.title}" to EDUVIA Chat & WhatsApp!`)}
          className="flex flex-col items-center group"
        >
          <div className="w-11 h-11 rounded-full bg-black/40 border border-white/15 flex items-center justify-center text-white backdrop-blur-md hover:bg-white/20 transition-all">
            <Share2 className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold text-white mt-1 drop-shadow-md">Share</span>
        </button>
      </div>

      {/* Bottom Content & ACTION LOOP Bar */}
      <div className="relative z-10 p-4 space-y-3 bg-gradient-to-t from-black via-black/90 to-transparent pt-6">
        {/* Caption */}
        <div>
          <h2 className="text-sm font-bold text-white line-clamp-1">{reel.title}</h2>
          <p className="text-xs text-slate-300 line-clamp-2 mt-0.5 font-normal leading-tight">
            {reel.description}
          </p>
        </div>

        {/* Practiced indicator tag */}
        {reel.isPracticed && (
          <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold">
            <CheckCircle className="w-3 h-3 text-emerald-400" />
            <span>Practiced (+15 XP)</span>
          </div>
        )}

        {/* 🧠 3. THE BIG DIFFERENCE: Action Buttons */}
        <div className="grid grid-cols-5 gap-1.5 pt-1">
          {/* 🧠 Understand */}
          <button
            onClick={onOpenUnderstand}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-2xl bg-purple-600/30 border border-purple-500/40 text-purple-200 hover:bg-purple-600/50 transition-all group"
            title="AI explains concept according to your skill level"
          >
            <Brain className="w-4 h-4 mb-0.5 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-extrabold tracking-tight">🧠 Learn</span>
          </button>

          {/* ⚡ Practice */}
          <button
            onClick={onOpenPractice}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-2xl bg-amber-500/30 border border-amber-500/40 text-amber-200 hover:bg-amber-500/50 transition-all group"
            title="Take 3 auto-generated quick questions"
          >
            <Zap className="w-4 h-4 mb-0.5 fill-amber-300 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-extrabold tracking-tight">⚡ Practice</span>
          </button>

          {/* 💻 Code */}
          <button
            onClick={onOpenCode}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-2xl bg-cyan-500/30 border border-cyan-500/40 text-cyan-200 hover:bg-cyan-500/50 transition-all group"
            title="Interactive coding challenge"
          >
            <Code2 className="w-4 h-4 mb-0.5 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-extrabold tracking-tight">💻 Code</span>
          </button>

          {/* 🔖 Save */}
          <button
            onClick={onToggleSave}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-2xl border transition-all group ${
              reel.isSaved
                ? 'bg-amber-500 border-amber-400 text-white font-bold'
                : 'bg-white/10 border-white/15 text-slate-200 hover:bg-white/20'
            }`}
            title="Save to your personal learning collection"
          >
            <Bookmark className={`w-4 h-4 mb-0.5 ${reel.isSaved ? 'fill-white' : ''}`} />
            <span className="text-[9px] font-extrabold tracking-tight">{reel.isSaved ? 'Saved' : '🔖 Save'}</span>
          </button>

          {/* 🏆 Prove */}
          <button
            onClick={onOpenProve}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-2xl bg-gradient-to-r from-emerald-500/40 to-teal-500/40 border border-emerald-400/50 text-emerald-200 hover:from-emerald-500/60 hover:to-teal-500/60 transition-all group"
            title="Take mini assessment to earn EDUVIA VERIFIED SKILL badge"
          >
            <ShieldCheck className="w-4 h-4 mb-0.5 text-emerald-300 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-extrabold tracking-tight">🏆 Prove</span>
          </button>
        </div>
      </div>
    </div>
  );
};
