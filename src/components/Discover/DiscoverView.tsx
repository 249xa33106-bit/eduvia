import React, { useState } from 'react';
import { Search, Flame, Sparkles, Users } from 'lucide-react';
import type { ReelItem } from '../../types/eduvia';

interface DiscoverViewProps {
  reels: ReelItem[];
  onOpenUnderstand: (reel: ReelItem) => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({ reels, onOpenUnderstand }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const trendingTopics = ['Python', 'DSA', 'Machine Learning', 'System Design', 'Edge AI', 'Docker'];

  const creators = [
    {
      name: 'Dr. Sarah Chen',
      handle: '@sarah_ai',
      role: 'Principal AI Scientist & Eduvia Mentor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop',
      followers: '48.2K'
    },
    {
      name: 'Shaik Sowban',
      handle: '@sowban_dev',
      role: 'CSM • Fullstack & AI Lead',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop',
      followers: '32.1K'
    },
    {
      name: 'Prof. Alex Rivera',
      handle: '@alex_deeplearning',
      role: 'Stanford AI Researcher',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop',
      followers: '89.4K'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-24 animate-fadeIn">
      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search topics, creators, skills, challenges..."
          className="w-full bg-black/60 border border-white/15 rounded-2xl pl-12 pr-4 py-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 shadow-xl"
        />
      </div>

      {/* Trending Topics Pills */}
      <div className="glass-card p-5 border border-white/10 space-y-3">
        <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-orange-500" />
          <span>Trending Skill Topics</span>
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          {trendingTopics.map((topic) => (
            <button
              key={topic}
              onClick={() => setSearchQuery(topic)}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/40 text-slate-200 hover:text-cyan-300 font-semibold text-xs transition-all"
            >
              #{topic}
            </button>
          ))}
        </div>
      </div>

      {/* Creators Spotlight */}
      <div className="glass-card p-5 border border-purple-500/30 bg-purple-950/10 space-y-3">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
          <Users className="w-4 h-4 text-purple-400" />
          <span>Verified Student Creators & Mentors</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {creators.map((c, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-black/40 border border-white/10 text-center space-y-2">
              <img src={c.avatar} alt={c.name} className="w-14 h-14 rounded-full mx-auto object-cover border-2 border-purple-500" />
              <div>
                <h4 className="font-bold text-white text-xs flex items-center justify-center gap-1">
                  {c.name}
                  <span className="w-3 h-3 rounded-full bg-cyan-400 text-black flex items-center justify-center text-[7px] font-black">✓</span>
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5">{c.role}</p>
              </div>
              <button
                onClick={() => alert(`Following ${c.name}!`)}
                className="w-full py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 font-bold text-[11px] transition-all"
              >
                + Connect & Learn
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Learning Paths */}
      <div className="glass-card p-5 border border-white/10 space-y-3">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Curated Eduvia Learning Paths</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reels.map((reel) => (
            <div
              key={reel.id}
              onClick={() => onOpenUnderstand(reel)}
              className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-cyan-500/40 cursor-pointer transition-all flex items-center space-x-3 group"
            >
              <img src={reel.thumbnailUrl} alt={reel.title} className="w-16 h-20 rounded-xl object-cover" />
              <div className="space-y-1">
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[9px] font-bold">
                  {reel.skillTag}
                </span>
                <h4 className="font-bold text-white text-xs group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {reel.title}
                </h4>
                <p className="text-[10px] text-slate-400 line-clamp-1">{reel.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
