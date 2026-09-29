import React, { useState } from 'react';
import { Trophy, Award, Flame, ShieldCheck, Search, CheckCircle2, Lock } from 'lucide-react';
import type { UserProfile } from '../../types/eduvia';

interface LeaderboardUser {
  rank: number;
  name: string;
  handle: string;
  avatar: string;
  campus: string;
  xp: number;
  streakDays: number;
  verifiedSkills: number;
  badge: string;
  isCurrentUser?: boolean;
}

interface BadgeItem {
  id: string;
  title: string;
  category: 'Streak' | 'Code' | 'Verify' | 'Community';
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  progress: number; // 0 to 100
}

interface LeaderboardViewProps {
  userProfile: UserProfile;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ userProfile }) => {
  const [filter, setFilter] = useState<'global' | 'campus' | 'weekly'>('global');
  const [activeTab, setActiveTab] = useState<'rankings' | 'badges'>('rankings');
  const [searchQuery, setSearchQuery] = useState('');

  const leaderboardUsers: LeaderboardUser[] = [
    {
      rank: 1,
      name: 'Dr. Sarah Chen',
      handle: '@sarah_ai',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop',
      campus: 'Stanford AI Lab',
      xp: 14250,
      streakDays: 48,
      verifiedSkills: 18,
      badge: '🥇 AI Mastermind'
    },
    {
      rank: 2,
      name: userProfile.name,
      handle: userProfile.handle,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop',
      campus: userProfile.campus,
      xp: 12480,
      streakDays: userProfile.streakDays,
      verifiedSkills: userProfile.verifiedSkillsCount,
      badge: '🥈 RescueMesh Lead',
      isCurrentUser: true
    },
    {
      rank: 3,
      name: 'Ayesha Khan',
      handle: '@ayesha_gis',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop',
      campus: 'GPREC Campus',
      xp: 11200,
      streakDays: 22,
      verifiedSkills: 12,
      badge: '🥉 Edge Dev'
    },
    {
      rank: 4,
      name: 'Rohan Sharma',
      handle: '@rohan_code',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop',
      campus: 'GPREC Campus',
      xp: 9850,
      streakDays: 14,
      verifiedSkills: 8,
      badge: '⚡ React Ninja'
    },
    {
      rank: 5,
      name: 'Elena Rostova',
      handle: '@elena_dev',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop',
      campus: 'MIT Tech',
      xp: 8900,
      streakDays: 19,
      verifiedSkills: 9,
      badge: '🔥 Python Pro'
    }
  ];

  const badges: BadgeItem[] = [
    {
      id: 'b1',
      title: '7-Day Streak Master',
      category: 'Streak',
      description: 'Maintain a learning streak for 7 consecutive days.',
      icon: '🔥',
      unlocked: true,
      unlockedDate: '2026-09-20',
      progress: 100
    },
    {
      id: 'b2',
      title: 'PROVE Network Verified',
      category: 'Verify',
      description: 'Earn 3 verified skill cards on the Lumixora PROVE Network.',
      icon: '🛡️',
      unlocked: true,
      unlockedDate: '2026-09-24',
      progress: 100
    },
    {
      id: 'b3',
      title: 'Code Challenge Titan',
      category: 'Code',
      description: 'Complete 25 interactive coding challenges.',
      icon: '💻',
      unlocked: false,
      progress: 60
    },
    {
      id: 'b4',
      title: 'Campus Leader',
      category: 'Community',
      description: 'Reach Top 3 in your university campus leaderboard.',
      icon: '🏛️',
      unlocked: true,
      unlockedDate: '2026-09-28',
      progress: 100
    },
    {
      id: 'b5',
      title: 'Project Architect',
      category: 'Code',
      description: 'Publish and verify 2 full-stack showcase projects.',
      icon: '🏗️',
      unlocked: false,
      progress: 50
    },
    {
      id: 'b6',
      title: 'Knowledge Sharing Hero',
      category: 'Community',
      description: 'Help 500+ peer learners on Eduvia Feed.',
      icon: '🌟',
      unlocked: false,
      progress: 75
    }
  ];

  const filteredUsers = leaderboardUsers.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.campus.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Top Banner Header */}
      <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-black to-indigo-950/40 relative overflow-hidden shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-500 flex items-center justify-center text-white shadow-xl shadow-amber-500/30">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-black text-white tracking-wide">Eduvia Arena</h2>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-400/40">
                  Global Rank #2
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Compete, earn XP by solving challenges, and unlock verified proof credentials!
              </p>
            </div>
          </div>

          {/* Sub Tab Buttons */}
          <div className="flex items-center space-x-2 bg-black/60 p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => setActiveTab('rankings')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-1.5 ${
                activeTab === 'rankings'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Leaderboard</span>
            </button>
            <button
              onClick={() => setActiveTab('badges')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-1.5 ${
                activeTab === 'badges'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Badges ({badges.filter((b) => b.unlocked).length}/{badges.length})</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'rankings' ? (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 glass-panel p-3.5 rounded-2xl border border-white/10">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search learner or campus..."
                className="w-full bg-black/50 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Scope Filter */}
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              {(['global', 'campus', 'weekly'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                    filter === f
                      ? 'bg-white/15 text-amber-300 border border-amber-400/40 shadow-md'
                      : 'text-slate-400 hover:text-white bg-white/5 border border-white/5'
                  }`}
                >
                  {f === 'global' ? '🌐 Global' : f === 'campus' ? '🏛️ Campus' : '⚡ Weekly'}
                </button>
              ))}
            </div>
          </div>

          {/* Rankings Table Card List */}
          <div className="space-y-3">
            {filteredUsers.map((u) => (
              <div
                key={u.rank}
                className={`glass-panel p-4 rounded-2xl border transition-all flex items-center justify-between ${
                  u.isCurrentUser
                    ? 'border-amber-400/60 bg-gradient-to-r from-amber-500/15 via-black to-indigo-950/40 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/30'
                    : u.rank === 1
                    ? 'border-yellow-400/40 bg-gradient-to-r from-yellow-500/10 to-black'
                    : 'border-white/10 hover:border-white/20 bg-black/40'
                }`}
              >
                {/* Rank & User Details */}
                <div className="flex items-center space-x-4">
                  {/* Rank Badge */}
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 ${
                      u.rank === 1
                        ? 'bg-gradient-to-tr from-yellow-400 to-amber-600 text-black shadow-lg shadow-yellow-500/40'
                        : u.rank === 2
                        ? 'bg-gradient-to-tr from-slate-300 to-slate-500 text-black shadow-lg shadow-slate-400/40'
                        : u.rank === 3
                        ? 'bg-gradient-to-tr from-amber-700 to-amber-900 text-white shadow-lg'
                        : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    #{u.rank}
                  </div>

                  {/* Avatar */}
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-11 h-11 rounded-2xl object-cover border-2 border-white/10 shrink-0"
                  />

                  {/* Name & Handle */}
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-extrabold text-sm text-white">{u.name}</h4>
                      {u.isCurrentUser && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-400 text-black uppercase">
                          You
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400 hidden sm:inline-block">({u.badge})</span>
                    </div>
                    <div className="flex items-center space-x-3 text-slate-400 text-[11px] mt-0.5">
                      <span>{u.handle}</span>
                      <span>•</span>
                      <span className="text-cyan-300 font-semibold">{u.campus}</span>
                    </div>
                  </div>
                </div>

                {/* Score Stats */}
                <div className="flex items-center space-x-4 text-right">
                  <div className="hidden sm:block">
                    <div className="flex items-center justify-end space-x-1 text-orange-400 font-black text-xs">
                      <Flame className="w-3.5 h-3.5 fill-orange-400" />
                      <span>{u.streakDays}d Streak</span>
                    </div>
                    <div className="flex items-center justify-end space-x-1 text-emerald-400 font-semibold text-[10px]">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{u.verifiedSkills} Skills</span>
                    </div>
                  </div>

                  <div className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300 font-black text-xs">
                    {u.xp.toLocaleString()} XP
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Achievement Badges Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`glass-panel p-5 rounded-2xl border relative overflow-hidden transition-all ${
                b.unlocked
                  ? 'border-amber-400/40 bg-gradient-to-b from-amber-500/10 via-black to-indigo-950/30 shadow-lg'
                  : 'border-white/10 opacity-70 bg-black/40'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-2xl shadow-md">
                  {b.icon}
                </div>
                {b.unlocked ? (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-black flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Unlocked
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-white/5 text-slate-400 border border-white/10 text-[10px] font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Locked
                  </span>
                )}
              </div>

              <h4 className="font-extrabold text-sm text-white mt-4">{b.title}</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{b.description}</p>

              {/* Progress bar */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <div className="flex justify-between text-[10px] font-semibold text-slate-400 mb-1">
                  <span>Progress</span>
                  <span>{b.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      b.unlocked
                        ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                        : 'bg-indigo-500/60'
                    }`}
                    style={{ width: `${b.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
