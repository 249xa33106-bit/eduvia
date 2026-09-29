import React, { useState } from 'react';
import {
  Home, Search, PlusCircle, Target, User, Flame, Building2,
  Bot, Trophy, Layers, Bookmark, Swords, Cpu, ShieldAlert,
  Grid, LogOut, X, ChevronDown
} from 'lucide-react';
import type { TabType } from '../types/eduvia';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  streakDays: number;
  isCampusActive: boolean;
  setIsCampusActive: (active: boolean) => void;
  currentGoalTitle: string;
  onLogout?: () => void;
  onOpenAICompanion?: () => void;
  onOpenFlashcards?: () => void;
  onOpenNotes?: () => void;
  onOpenCodeBattle?: () => void;
  onOpenArchitecture?: () => void;
  onOpenCodeAuditor?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  streakDays,
  isCampusActive,
  setIsCampusActive,
  onLogout,
  onOpenAICompanion,
  onOpenFlashcards,
  onOpenNotes,
  onOpenCodeBattle,
  onOpenArchitecture,
  onOpenCodeAuditor
}) => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  return (
    <>
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/5 px-4 py-3 shadow-sm backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo & Campus Switcher */}
          <div className="flex items-center space-x-3">
            <div
              onClick={() => setActiveTab('home')}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center font-bold text-white text-sm shadow-sm group-hover:scale-105 transition-transform">
                E
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                EDUVIA
              </span>
            </div>

            {/* Campus Mode Toggle Pill */}
            <button
              onClick={() => setIsCampusActive(!isCampusActive)}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                isCampusActive
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{isCampusActive ? 'GPREC Campus' : 'Global Feed'}</span>
            </button>
          </div>

          {/* Right Header: Clean, Uncluttered Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* AI Tutor Button */}
            {onOpenAICompanion && (
              <button
                onClick={onOpenAICompanion}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold hover:bg-indigo-500/25 transition-all"
                title="AI Concept Companion"
              >
                <Bot className="w-4 h-4 text-indigo-400" />
                <span className="hidden sm:inline-block">AI Tutor</span>
              </button>
            )}

            {/* Tools & Apps Popover Trigger */}
            <div className="relative">
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  isToolsOpen
                    ? 'bg-white/15 text-white border-white/20'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:text-white hover:bg-white/10'
                }`}
              >
                <Grid className="w-4 h-4 text-sky-400" />
                <span className="hidden sm:inline-block">Tools</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Tools Popover Menu */}
              {isToolsOpen && (
                <div className="absolute right-0 mt-2 w-72 glass-panel rounded-2xl border border-white/15 p-3 shadow-2xl z-50 animate-fadeIn space-y-2">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 px-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Learning Studio & Tools
                    </span>
                    <button
                      onClick={() => setIsToolsOpen(false)}
                      className="text-slate-400 hover:text-white p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    {onOpenFlashcards && (
                      <button
                        onClick={() => {
                          onOpenFlashcards();
                          setIsToolsOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-left text-xs font-semibold text-slate-200 flex items-center space-x-2 transition-all"
                      >
                        <Layers className="w-4 h-4 text-fuchsia-400" />
                        <span>Flashcards</span>
                      </button>
                    )}

                    {onOpenNotes && (
                      <button
                        onClick={() => {
                          onOpenNotes();
                          setIsToolsOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-left text-xs font-semibold text-slate-200 flex items-center space-x-2 transition-all"
                      >
                        <Bookmark className="w-4 h-4 text-indigo-400" />
                        <span>Study Vault</span>
                      </button>
                    )}

                    {onOpenCodeBattle && (
                      <button
                        onClick={() => {
                          onOpenCodeBattle();
                          setIsToolsOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-left text-xs font-semibold text-slate-200 flex items-center space-x-2 transition-all"
                      >
                        <Swords className="w-4 h-4 text-rose-400" />
                        <span>1v1 Battle</span>
                      </button>
                    )}

                    {onOpenArchitecture && (
                      <button
                        onClick={() => {
                          onOpenArchitecture();
                          setIsToolsOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-left text-xs font-semibold text-slate-200 flex items-center space-x-2 transition-all"
                      >
                        <Cpu className="w-4 h-4 text-sky-400" />
                        <span>System Arch</span>
                      </button>
                    )}

                    {onOpenCodeAuditor && (
                      <button
                        onClick={() => {
                          onOpenCodeAuditor();
                          setIsToolsOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-left text-xs font-semibold text-slate-200 flex items-center space-x-2 transition-all"
                      >
                        <ShieldAlert className="w-4 h-4 text-emerald-400" />
                        <span>Code Auditor</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setActiveTab('leaderboard');
                        setIsToolsOpen(false);
                      }}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-left text-xs font-semibold text-slate-200 flex items-center space-x-2 transition-all"
                    >
                      <Trophy className="w-4 h-4 text-amber-400" />
                      <span>Leaderboard</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Streak Counter */}
            <div className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-amber-300 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{streakDays}d</span>
            </div>

            {/* Logout button */}
            {onLogout && (
              <button
                onClick={onLogout}
                className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Bottom Clean Floating Navigation Bar */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm glass-panel rounded-2xl border border-white/15 px-3 py-2 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all ${
              activeTab === 'home'
                ? 'text-indigo-400 font-bold bg-indigo-500/15'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Home</span>
          </button>

          <button
            onClick={() => setActiveTab('discover')}
            className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all ${
              activeTab === 'discover'
                ? 'text-indigo-400 font-bold bg-indigo-500/15'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Search className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Discover</span>
          </button>

          {/* Plus Create Action Center Button */}
          <button
            onClick={() => setActiveTab('create')}
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform"
            title="Create Content"
          >
            <PlusCircle className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveTab('progress')}
            className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all ${
              activeTab === 'progress'
                ? 'text-indigo-400 font-bold bg-indigo-500/15'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Target className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Progress</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all ${
              activeTab === 'profile'
                ? 'text-indigo-400 font-bold bg-indigo-500/15'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Profile</span>
          </button>
        </div>
      </nav>
    </>
  );
};
