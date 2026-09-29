import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { CareerOpportunity } from '../../types/eduvia';

interface CareerModeViewProps {
  opportunities: CareerOpportunity[];
  currentGoalTitle: string;
}

export const CareerModeView: React.FC<CareerModeViewProps> = ({ opportunities, currentGoalTitle }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-24 animate-fadeIn">
      {/* Goal Skill Match Header */}
      <div className="glass-card p-6 border border-cyan-500/30 bg-gradient-to-r from-cyan-950/60 via-slate-950 to-indigo-950/60 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-cyan-400 font-extrabold text-xs uppercase tracking-widest block mb-1">
              💼 CAREER ENGINE & OPPORTUNITY MATCHER
            </span>
            <h2 className="text-2xl font-extrabold text-white">Target: {currentGoalTitle}</h2>
            <p className="text-xs text-slate-300 mt-1">
              Your skill graph telemetry directly powers real internship and hackathon matches.
            </p>
          </div>

          {/* Match Score Badge */}
          <div className="glass-card p-4 border border-cyan-400/40 bg-cyan-950/40 text-center rounded-2xl shrink-0">
            <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider block">
              Skill Match
            </span>
            <div className="text-2xl font-black text-cyan-400">78%</div>
            <div className="w-24 bg-white/10 h-1.5 rounded-full overflow-hidden mt-1 mx-auto">
              <div className="bg-cyan-400 h-full w-[78%]" />
            </div>
          </div>
        </div>

        {/* 12. SUMMARY STATS STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-5 pt-4 border-t border-white/10 text-center font-mono text-xs">
          <div className="p-2 rounded-xl bg-white/5 border border-white/5">
            <span className="text-cyan-300 font-extrabold block">💼 12</span>
            <span className="text-[10px] text-slate-400">Internships</span>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/5">
            <span className="text-amber-300 font-extrabold block">🏆 8</span>
            <span className="text-[10px] text-slate-400">Hackathons</span>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/5">
            <span className="text-purple-300 font-extrabold block">🏗️ 5</span>
            <span className="text-[10px] text-slate-400">Projects</span>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/5">
            <span className="text-rose-300 font-extrabold block">🎤 4</span>
            <span className="text-[10px] text-slate-400">Mock Interviews</span>
          </div>
          <div className="col-span-2 sm:col-span-1 p-2 rounded-xl bg-white/5 border border-white/5">
            <span className="text-emerald-300 font-extrabold block">📚 7</span>
            <span className="text-[10px] text-slate-400">Learning Paths</span>
          </div>
        </div>
      </div>

      {/* Recommended Opportunity Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
          Top Matched Opportunities for You
        </h3>

        {opportunities.map((opp) => (
          <div
            key={opp.id}
            className="glass-card p-5 border border-white/10 hover:border-cyan-500/30 transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-base font-bold text-white">{opp.title}</h4>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[9px] font-bold">
                    {opp.matchScore}% Match
                  </span>
                </div>
                <span className="text-xs text-slate-400">{opp.companyOrOrg}</span>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-emerald-400 block">{opp.stipendOrPrize}</span>
                <span className="text-[10px] font-mono text-slate-400">{opp.deadline}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-slate-400 text-[11px]">Required Skills:</span>
                {opp.requiredSkills.map((sk, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 font-mono text-[10px] text-indigo-300"
                  >
                    {sk}
                  </span>
                ))}
              </div>

              <button
                onClick={() => alert(`Submitted Eduvia Skill Profile to ${opp.companyOrOrg}!`)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs shadow-md shadow-indigo-500/30 hover:scale-105 transition-all flex items-center space-x-1"
              >
                <span>Apply with Eduvia Proof</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
