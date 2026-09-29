import React from 'react';
import { Home, Search, Target, Trophy, Sparkles, TrendingUp, Flame, BookOpen } from 'lucide-react';
import type { UserProfile, TabType } from '../../types/eduvia';

interface LeftSidebarProps {
  userProfile: UserProfile;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenNotes: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  userProfile,
  activeTab,
  setActiveTab,
  onOpenNotes
}) => {
  const trendingTopics = [
    { tag: '#Python', count: '14.2k reels', category: 'AI & Data' },
    { tag: '#React19', count: '9.8k reels', category: 'Web Frontend' },
    { tag: '#DSA', count: '18.1k reels', category: 'Algorithms' },
    { tag: '#SystemDesign', count: '7.5k reels', category: 'Architecture' },
    { tag: '#TensorFlow', count: '5.4k reels', category: 'Deep Learning' }
  ];

  return (
    <aside className="hidden lg:block space-y-5 sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar pr-1">
      {/* User Profile Summary Card */}
      <div className="glass-card p-4 border border-white/10 bg-slate-900/60 shadow-lg space-y-3">
        <div className="flex items-center space-x-3">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop"
            alt={userProfile.name}
            className="w-12 h-12 rounded-2xl object-cover border-2 border-indigo-500/50 shadow-md"
          />
          <div className="overflow-hidden">
            <h3 className="font-extrabold text-sm text-white truncate">{userProfile.name}</h3>
            <p className="text-[11px] text-slate-400 font-medium truncate">{userProfile.handle}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {userProfile.campus}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-center">
          <div className="bg-white/5 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-medium">Streak</span>
            <span className="text-xs font-black text-amber-400 flex items-center justify-center gap-0.5">
              <Flame className="w-3 h-3 text-amber-400" /> {userProfile.streakDays}d
            </span>
          </div>
          <div className="bg-white/5 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-medium">Solved</span>
            <span className="text-xs font-black text-sky-400">{userProfile.challengesSolved}</span>
          </div>
          <div className="bg-white/5 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-medium">Verified</span>
            <span className="text-xs font-black text-emerald-400">{userProfile.verifiedSkillsCount}</span>
          </div>
        </div>
      </div>

      {/* Goal Progress Bar Card */}
      <div className="glass-card p-4 border border-indigo-500/20 bg-gradient-to-b from-indigo-950/30 to-slate-900/60 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-400" /> Current Goal
          </span>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full">
            78% Level
          </span>
        </div>

        <h4 className="font-extrabold text-xs text-white leading-tight">
          {userProfile.currentGoalTitle}
        </h4>

        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full w-[78%]" />
        </div>

        <button
          onClick={() => setActiveTab('progress')}
          className="w-full py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-indigo-300 text-[11px] font-bold border border-white/10 transition-all text-center"
        >
          View Skill Tree Graph →
        </button>
      </div>

      {/* Navigation Quick Links */}
      <div className="glass-card p-3 border border-white/10 space-y-1">
        <button
          onClick={() => setActiveTab('home')}
          className={`w-full p-2.5 rounded-xl text-xs font-bold flex items-center space-x-3 transition-all ${
            activeTab === 'home'
              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
              : 'text-slate-300 hover:bg-white/5'
          }`}
        >
          <Home className="w-4 h-4 text-indigo-400" />
          <span>Home Feed</span>
        </button>

        <button
          onClick={() => setActiveTab('discover')}
          className={`w-full p-2.5 rounded-xl text-xs font-bold flex items-center space-x-3 transition-all ${
            activeTab === 'discover'
              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
              : 'text-slate-300 hover:bg-white/5'
          }`}
        >
          <Search className="w-4 h-4 text-sky-400" />
          <span>Discover Concepts</span>
        </button>

        <button
          onClick={() => setActiveTab('progress')}
          className={`w-full p-2.5 rounded-xl text-xs font-bold flex items-center space-x-3 transition-all ${
            activeTab === 'progress'
              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
              : 'text-slate-300 hover:bg-white/5'
          }`}
        >
          <Target className="w-4 h-4 text-emerald-400" />
          <span>Skill Progress</span>
        </button>

        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`w-full p-2.5 rounded-xl text-xs font-bold flex items-center space-x-3 transition-all ${
            activeTab === 'leaderboard'
              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
              : 'text-slate-300 hover:bg-white/5'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Eduvia Arena Leaderboard</span>
        </button>

        <button
          onClick={onOpenNotes}
          className="w-full p-2.5 rounded-xl text-xs font-bold text-slate-300 hover:bg-white/5 flex items-center space-x-3 transition-all"
        >
          <BookOpen className="w-4 h-4 text-purple-400" />
          <span>Study Vault Notes</span>
        </button>
      </div>

      {/* Trending Topics List */}
      <div className="glass-card p-4 border border-white/10 space-y-3">
        <h4 className="font-extrabold text-xs text-white uppercase tracking-wider flex items-center space-x-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
          <span>Trending Concepts</span>
        </h4>

        <div className="space-y-2">
          {trendingTopics.map((t, i) => (
            <div
              key={i}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-xs text-indigo-300 block">{t.tag}</span>
                <span className="text-[10px] text-slate-400">{t.category}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono font-bold">{t.count}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
