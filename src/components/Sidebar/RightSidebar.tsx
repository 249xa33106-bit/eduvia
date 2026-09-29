import React from 'react';
import { Bot, Swords, Cpu, Trophy, Building2, ShieldCheck, Sparkles } from 'lucide-react';
import type { UserProfile } from '../../types/eduvia';

interface RightSidebarProps {
  userProfile: UserProfile;
  onOpenAICompanion: () => void;
  onOpenCodeBattle: () => void;
  onOpenArchitecture: () => void;
  onOpenCodeAuditor: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  userProfile,
  onOpenAICompanion,
  onOpenCodeBattle,
  onOpenArchitecture,
  onOpenCodeAuditor
}) => {
  const topPerformers = [
    { rank: 1, name: 'Dr. Sarah Chen', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop', xp: '14,250 XP', badge: '🥇 AI Lead' },
    { rank: 2, name: userProfile.name, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop', xp: '12,480 XP', badge: '🥈 RescueMesh' },
    { rank: 3, name: 'Ayesha Khan', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop', xp: '11,200 XP', badge: '🥉 Edge Dev' }
  ];

  return (
    <aside className="hidden xl:block space-y-5 sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar pl-1">
      {/* AI Tutor Assistant Quick Card */}
      <div className="glass-card p-4 border border-indigo-500/20 bg-gradient-to-b from-indigo-950/40 via-slate-900/60 to-slate-950/80 shadow-lg space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-xs text-white">Eduvia AI Concept Tutor</h4>
            <p className="text-[11px] text-slate-400">Ask questions, explain code & get hints</p>
          </div>
        </div>

        <button
          onClick={onOpenAICompanion}
          className="w-full py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-400 text-white font-bold text-xs shadow-md hover:scale-[1.02] transition-transform flex items-center justify-center space-x-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>Ask AI Assistant</span>
        </button>
      </div>

      {/* 1v1 Code Battle PvP Widget */}
      <div className="glass-card p-4 border border-rose-500/20 bg-gradient-to-r from-rose-950/30 via-slate-900 to-slate-950 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Swords className="w-4 h-4 text-rose-400" />
            <h4 className="font-extrabold text-xs text-white">1v1 PvP Code Battle</h4>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase">
            Live Duel
          </span>
        </div>

        <p className="text-[11px] text-slate-300 leading-relaxed">
          Challenge campus peers to a 2-minute algorithm speed battle and win XP!
        </p>

        <button
          onClick={onOpenCodeBattle}
          className="w-full py-2 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold text-xs shadow-md hover:scale-[1.02] transition-transform flex items-center justify-center space-x-1"
        >
          <span>Match Opponent ⚔️</span>
        </button>
      </div>

      {/* System Arch & Security Auditor Quick Launchers */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onOpenArchitecture}
          className="p-3 rounded-2xl glass-card border border-sky-500/20 hover:border-sky-500/40 text-left space-y-1.5 transition-all group"
        >
          <Cpu className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
          <h5 className="font-extrabold text-[11px] text-white">System Arch</h5>
          <span className="text-[9px] text-slate-400 block">Microservices Topology</span>
        </button>

        <button
          onClick={onOpenCodeAuditor}
          className="p-3 rounded-2xl glass-card border border-emerald-500/20 hover:border-emerald-500/40 text-left space-y-1.5 transition-all group"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          <h5 className="font-extrabold text-[11px] text-white">Code Auditor</h5>
          <span className="text-[9px] text-slate-400 block">OWASP Security Scanner</span>
        </button>
      </div>

      {/* Campus Leaderboard Top 3 Card */}
      <div className="glass-card p-4 border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-extrabold text-xs text-white uppercase tracking-wider flex items-center space-x-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Campus Leaderboard</span>
          </h4>
          <span className="text-[10px] text-amber-300 font-bold">GPREC</span>
        </div>

        <div className="space-y-2">
          {topPerformers.map((p) => (
            <div key={p.rank} className="flex items-center justify-between p-2 rounded-xl bg-white/5">
              <div className="flex items-center space-x-2.5">
                <img src={p.avatar} alt={p.name} className="w-7 h-7 rounded-xl object-cover border border-white/10" />
                <div>
                  <h5 className="font-extrabold text-xs text-white leading-none">{p.name}</h5>
                  <span className="text-[9px] text-slate-400">{p.badge}</span>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-300 font-mono">{p.xp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* GPREC Campus Hackathon Card */}
      <div className="glass-card p-4 border border-amber-500/20 bg-gradient-to-b from-amber-950/20 to-slate-900/60 space-y-2">
        <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold">
          <Building2 className="w-4 h-4 text-amber-400" />
          <span>GPREC Hackathon 2026</span>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          AI & Edge Computing Hackathon. Submissions open for student teams until Oct 15!
        </p>
      </div>
    </aside>
  );
};
