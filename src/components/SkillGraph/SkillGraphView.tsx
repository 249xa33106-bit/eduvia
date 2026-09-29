import React, { useState } from 'react';
import { Target, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { LearningGoal, SkillNode, UserProfile } from '../../types/eduvia';

interface SkillGraphViewProps {
  goals: LearningGoal[];
  skillTree: SkillNode;
  userProfile: UserProfile;
  onSelectGoal: (goalId: string) => void;
  onOpenProve: (skillName: string) => void;
}

export const SkillGraphView: React.FC<SkillGraphViewProps> = ({
  goals,
  skillTree,
  userProfile,
  onSelectGoal,
  onOpenProve
}) => {
  const [activeGoalId, setActiveGoalId] = useState(goals[0]?.id || 'goal-ai-ml');
  const currentGoal = goals.find((g) => g.id === activeGoalId) || goals[0];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-24 animate-fadeIn">
      {/* Goal Header Card */}
      <div className="glass-card p-6 border border-cyan-500/30 bg-gradient-to-r from-cyan-950/60 via-slate-950 to-indigo-950/60 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-extrabold text-xs uppercase tracking-widest mb-1">
              <Target className="w-4 h-4" />
              <span>PERSONAL LEARNING GOAL</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">{currentGoal.title}</h2>
            <p className="text-xs text-slate-300 mt-1">
              EDUVIA dynamically shifts your feed based on remaining skill gaps.
            </p>
          </div>

          {/* Goal Selector Switcher */}
          <div className="flex items-center space-x-2 bg-black/40 p-1.5 rounded-2xl border border-white/10">
            {goals.map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  setActiveGoalId(g.id);
                  onSelectGoal(g.title);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeGoalId === g.id
                    ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {g.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Overall Goal Progress Bar */}
        <div className="mt-5 pt-4 border-t border-white/10">
          <div className="flex justify-between text-xs font-bold mb-1.5">
            <span className="text-slate-300">Goal Completion Score</span>
            <span className="text-cyan-400">{currentGoal.overallProgress}% Complete</span>
          </div>
          <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div
              className="bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500 shadow-md shadow-cyan-400/50"
              style={{ width: `${currentGoal.overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 🎯 5. GOAL BREAKDOWN BARS */}
      <div className="glass-card p-6 border border-white/10">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 flex items-center justify-between">
          <span>Target Skill Gaps & Readiness</span>
          <span className="text-xs font-normal text-slate-400">Click skill to take assessment</span>
        </h3>

        <div className="space-y-4">
          {currentGoal.skills.map((skill, idx) => (
            <div key={idx} className="space-y-1.5 group">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center space-x-2">
                  <span className="text-white font-bold">{skill.name}</span>
                  {skill.gapWarning && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] font-sans flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-400" />
                      Priority Gap
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <span className={skill.score >= 70 ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {skill.score}%
                  </span>
                  <button
                    onClick={() => onOpenProve(skill.name)}
                    className="opacity-80 group-hover:opacity-100 px-2 py-0.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-sans hover:bg-emerald-500/30"
                  >
                    Prove Skill
                  </button>
                </div>
              </div>
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-white/5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    skill.score >= 70
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                      : 'bg-gradient-to-r from-amber-500 to-orange-500'
                  }`}
                  style={{ width: `${skill.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🧬 6. SKILL GRAPH VISUALIZATION */}
      <div className="glass-card p-6 border border-purple-500/30 bg-gradient-to-b from-[#0b0c14] to-[#111320]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              🧬 Living Skill Graph
              <span className="text-xs font-normal text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/30">
                Interactive Map
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Every reel watched, code challenge solved, and project built updates this living tree.
            </p>
          </div>
        </div>

        {/* Visual Node Tree */}
        <div className="relative p-6 rounded-2xl bg-black/60 border border-white/10 font-mono">
          {/* Root Node */}
          <div className="flex justify-center mb-8">
            <div className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white font-extrabold text-sm border border-purple-400 shadow-xl shadow-purple-500/30 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>{skillTree.name} ({skillTree.score}%)</span>
            </div>
          </div>

          {/* Connectors */}
          <div className="w-0.5 h-6 bg-purple-500/40 mx-auto -mt-8 mb-4" />

          {/* Level 1 Children */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {skillTree.children?.map((branch) => (
              <div
                key={branch.id}
                className="glass-card p-4 border border-indigo-500/30 bg-indigo-950/20 rounded-2xl space-y-3"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-bold text-white text-xs">{branch.name}</span>
                  <span className="text-xs font-bold text-cyan-400">{branch.score}%</span>
                </div>

                {/* Subskills */}
                <div className="space-y-1.5 text-[11px]">
                  {branch.children?.map((sub) => (
                    <div
                      key={sub.id}
                      className="flex items-center justify-between p-1.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
                    >
                      <span className="text-slate-300">{sub.name}</span>
                      <span className="font-bold text-emerald-400">{sub.score}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🏆 VERIFIED SKILLS GALLERY PREVIEW */}
      <div className="glass-card p-6 border border-emerald-500/30 bg-emerald-950/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-extrabold text-white">EDUVIA Verified Skill Credentials</h3>
          </div>
          <span className="text-xs text-emerald-400 font-bold">
            {userProfile.verifiedSkillCards.length} Cards Issued
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {userProfile.verifiedSkillCards.map((card) => (
            <div
              key={card.id}
              className="p-4 rounded-2xl border border-emerald-500/40 bg-gradient-to-tr from-[#091510] to-[#0d2119] space-y-2 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-white">{card.skillName}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-bold">
                  Score: {card.overallScore}/100
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">Issued {card.verifiedDate} via Lumixora</p>
              <div className="pt-2 border-t border-emerald-500/20 flex justify-between text-[10px] text-emerald-300 font-mono">
                <span>Code: {card.codingScore}</span>
                <span>Solve: {card.problemSolvingScore}</span>
                <span>Tasks: {card.practicalTaskScore}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
