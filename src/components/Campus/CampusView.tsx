import React, { useState } from 'react';
import { Building2, ArrowRight } from 'lucide-react';
import type { CampusItem } from '../../types/eduvia';

interface CampusViewProps {
  campusItems: CampusItem[];
}

export const CampusView: React.FC<CampusViewProps> = ({ campusItems }) => {
  const [filterType, setFilterType] = useState<string>('all');

  const filtered = campusItems.filter((item) => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-24 animate-fadeIn">
      {/* Campus Banner */}
      <div className="glass-card p-6 border border-amber-500/30 bg-gradient-to-r from-amber-950/60 via-slate-950 to-orange-950/60 relative overflow-hidden">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold shadow-lg shadow-amber-500/30">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-extrabold text-white">GPREC Campus Mode</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                🏫 Verified College Hub
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Discover announcements, hackathons, clubs, campus projects, and student creators without global feed noise.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-white/10">
          {['all', 'announcement', 'hackathon', 'club', 'internship'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 rounded-full text-xs font-bold capitalize transition-all ${
                filterType === type
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {type === 'all' ? 'All Campus' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Campus Feed List */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="glass-card p-5 border border-white/10 hover:border-amber-500/30 transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold uppercase tracking-wider">
                {item.type}
              </span>
              <span className="text-xs font-mono text-slate-400">{item.dateOrTime}</span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.description}</p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10 text-xs">
              <div className="flex items-center space-x-2 text-slate-400">
                <span className="font-semibold text-slate-300">{item.organizer}</span>
                {item.participantsCount && (
                  <span className="text-amber-300 font-mono text-[11px]">
                    ({item.participantsCount} Students Joined)
                  </span>
                )}
              </div>

              <button
                onClick={() => alert(`Registered / Expressed interest in ${item.title}!`)}
                className="px-4 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 font-bold text-xs flex items-center space-x-1"
              >
                <span>Join & Connect</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
