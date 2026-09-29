import React from 'react';
import { Flame, ShieldCheck, Share2, CheckCircle2 } from 'lucide-react';
import type { UserProfile } from '../../types/eduvia';

interface ProfileViewProps {
  userProfile: UserProfile;
  onOpenProve: (skillName: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ userProfile, onOpenProve }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-24 animate-fadeIn">
      {/* 16. PROFILE HEADER CARD */}
      <div className="glass-card p-6 border border-white/15 bg-gradient-to-b from-[#131624] via-[#0d0f1a] to-[#080912] relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10 text-center sm:text-left">
          {/* Avatar with Streak Ring */}
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl p-1 bg-gradient-to-tr from-amber-500 via-indigo-500 to-cyan-400 shadow-2xl shadow-indigo-500/40">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=250&auto=format&fit=crop"
                alt={userProfile.name}
                className="w-full h-full rounded-[22px] object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-[10px] flex items-center gap-1 shadow-lg shadow-orange-500/30">
              <Flame className="w-3.5 h-3.5 fill-white" />
              <span>{userProfile.streakDays}D Streak</span>
            </div>
          </div>

          <div className="space-y-1 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl font-black text-white tracking-wide">{userProfile.name}</h1>
                <p className="text-xs font-semibold text-indigo-300">
                  {userProfile.role} • <span className="text-amber-400">{userProfile.campus}</span>
                </p>
              </div>
              <button
                onClick={() => alert('Copied Eduvia Proof Portfolio Link to Clipboard!')}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold text-slate-200 flex items-center justify-center space-x-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Proof Portfolio</span>
              </button>
            </div>

            {/* 16. THE IMPORTANT INFORMATION (Not Followers Priority) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 font-mono text-xs">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
                <span className="text-[10px] text-slate-400 block font-sans">🔥 Learning Streak</span>
                <span className="font-extrabold text-base">{userProfile.streakDays} Days</span>
              </div>
              <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-300">
                <span className="text-[10px] text-slate-400 block font-sans">🧠 Learners Helped</span>
                <span className="font-extrabold text-base">{userProfile.totalLearnersHelped}</span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                <span className="text-[10px] text-slate-400 block font-sans">🏆 Verified Skills</span>
                <span className="font-extrabold text-base">{userProfile.verifiedSkillsCount}</span>
              </div>
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                <span className="text-[10px] text-slate-400 block font-sans">⚡ Challenges Solved</span>
                <span className="font-extrabold text-base">{userProfile.challengesSolved}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SKILL PROGRESS MATRIX */}
      <div className="glass-card p-6 border border-white/10">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 flex items-center justify-between">
          <span>Active Skill Matrix</span>
          <button
            onClick={() => onOpenProve('Python')}
            className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Audit & Verify Skills</span>
          </button>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {userProfile.skills.map((sk, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
              <div className="flex justify-between text-xs font-bold font-mono">
                <span className="text-white">{sk.name}</span>
                <span className="text-cyan-400">{sk.score}%</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full rounded-full"
                  style={{ width: `${sk.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VERIFIED SKILLS BADGE SHOWCASE */}
      <div className="glass-card p-6 border border-emerald-500/30 bg-emerald-950/10">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>EDUVIA Verified Digital Badges (Lumixora Ecosystem)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {userProfile.verifiedSkillCards.map((card) => (
            <div
              key={card.id}
              className="p-5 rounded-2xl border-2 border-emerald-500/50 bg-gradient-to-b from-[#091711] to-[#040a07] space-y-3 relative"
            >
              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2">
                <span className="font-extrabold text-white text-xs">{card.skillName}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  VERIFIED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300">
                <div>Coding: <strong className="text-emerald-300">{card.codingScore}</strong></div>
                <div>Problem Solving: <strong className="text-emerald-300">{card.problemSolvingScore}</strong></div>
                <div>Debugging: <strong className="text-emerald-300">{card.debuggingScore}</strong></div>
                <div>Practical Task: <strong className="text-emerald-300">{card.practicalTaskScore}</strong></div>
              </div>

              <div className="pt-2 border-t border-emerald-500/20 text-[10px] text-slate-400 font-mono flex justify-between">
                <span>Issuer: {card.issuer}</span>
                <span className="text-emerald-400">{card.verifiedDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
