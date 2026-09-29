import React from 'react';
import { Trophy, ExternalLink, ShieldCheck, Users, Cpu, GitBranch } from 'lucide-react';
import type { ProjectItem } from '../../types/eduvia';

interface ProjectShowcaseViewProps {
  projects: ProjectItem[];
  onVerifyProject: (projId: string) => void;
}

export const ProjectShowcaseView: React.FC<ProjectShowcaseViewProps> = ({ projects, onVerifyProject }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-24 animate-fadeIn">
      {/* Header */}
      <div className="glass-card p-6 border border-purple-500/30 bg-gradient-to-r from-purple-950/60 via-slate-950 to-indigo-950/60">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/30">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              EDUVIA Projects Showcase
              <span className="text-xs font-normal text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/30">
                Build & Prove
              </span>
            </h2>
            <p className="text-xs text-slate-300">
              Students don't just consume content — they publish and verify what they build.
            </p>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="glass-card p-6 border border-white/10 hover:border-purple-500/30 transition-all space-y-4"
          >
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-extrabold text-white">{proj.title}</h3>
                  {proj.verified && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Verified Project
                    </span>
                  )}
                </div>
                <p className="text-xs text-indigo-300 font-medium mt-1">{proj.tagline}</p>
              </div>

              <div className="flex items-center space-x-2">
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 text-xs flex items-center space-x-1"
                  >
                    <GitBranch className="w-4 h-4 text-purple-400" />
                    <span>GitHub Repo</span>
                  </a>
                )}
                {proj.demoUrl && (
                  <a
                    href={proj.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center space-x-1 hover:bg-indigo-500 shadow-md shadow-indigo-600/30"
                  >
                    <span>View Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Problem & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                  Problem Addressed
                </span>
                <p className="text-slate-300 leading-relaxed">{proj.problem}</p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                  Built Solution
                </span>
                <p className="text-slate-300 leading-relaxed">{proj.solution}</p>
              </div>
            </div>

            {/* Architecture Notes */}
            <div className="p-3.5 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 text-xs text-slate-300 flex items-start space-x-2">
              <Cpu className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-indigo-300">Architecture & Data Flow: </span>
                <span className="font-mono text-slate-300">{proj.architectureNotes}</span>
              </div>
            </div>

            {/* Tech Stack & Demonstrated Skills */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-bold text-slate-400 mr-2">Skills Demonstrated:</span>
              {proj.skillsDemonstrated.map((sk, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300 font-mono text-[10px]"
                >
                  {sk}
                </span>
              ))}
            </div>

            {/* Team Members & Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/10">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-400">Team:</span>
                <div className="flex items-center space-x-1.5">
                  {proj.team.map((m, idx) => (
                    <div key={idx} className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-200">
                      <img src={m.avatar} alt={m.name} className="w-3.5 h-3.5 rounded-full object-cover" />
                      <span>{m.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onVerifyProject(proj.id)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs hover:bg-emerald-500/30 transition-all flex items-center space-x-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verify Project</span>
                </button>
                <button
                  onClick={() => alert(`Sent collaboration request to ${proj.team[0]?.name}!`)}
                  className="px-3 py-1.5 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-200 font-bold text-xs hover:bg-purple-600/50 transition-all"
                >
                  🤝 Collaborate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
