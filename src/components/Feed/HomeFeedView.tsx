import React, { useState } from 'react';
import { Sparkles, ChevronUp, ChevronDown, MessageCircle } from 'lucide-react';
import type { ReelItem } from '../../types/eduvia';
import { EduReelCard } from './EduReelCard';
import { ReelStoriesBar } from './ReelStoriesBar';
import { CommentDrawer } from './CommentDrawer';
import { DirectMessagesModal } from '../Chat/DirectMessagesModal';

interface HomeFeedViewProps {
  reels: ReelItem[];
  currentGoalTitle: string;
  onOpenUnderstand: (reel: ReelItem) => void;
  onOpenPractice: (reel: ReelItem) => void;
  onOpenCode: (reel: ReelItem) => void;
  onOpenProve: (reel: ReelItem) => void;
  onToggleSave: (reelId: string) => void;
  onToggleLike: (reelId: string) => void;
}

export const HomeFeedView: React.FC<HomeFeedViewProps> = ({
  reels,
  currentGoalTitle,
  onOpenUnderstand,
  onOpenPractice,
  onOpenCode,
  onOpenProve,
  onToggleSave,
  onToggleLike
}) => {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [feedFilter, setFeedFilter] = useState<'smart' | 'all' | 'saved'>('smart');
  const [activeCommentReel, setActiveCommentReel] = useState<ReelItem | null>(null);
  const [showDirectMessages, setShowDirectMessages] = useState(false);

  const filteredReels = reels.filter((reel) => {
    if (feedFilter === 'saved') return reel.isSaved;
    return true;
  });

  const activeReel = filteredReels[activeReelIndex] || reels[0];

  const nextReel = () => {
    if (activeReelIndex + 1 < filteredReels.length) {
      setActiveReelIndex((i) => i + 1);
    }
  };

  const prevReel = () => {
    if (activeReelIndex > 0) {
      setActiveReelIndex((i) => i - 1);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4 pb-20">
      {/* Stories Bar */}
      <ReelStoriesBar />

      {/* AI Recommendation Banner */}
      <div className="glass-card p-3.5 border border-white/10 bg-slate-900/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-white flex items-center gap-1.5">
                Target: <span className="text-indigo-300 font-bold">{currentGoalTitle}</span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Recommended concept based on your recent skill graph progress.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowDirectMessages(true)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-all flex items-center space-x-1"
            title="Eduvia Messages"
          >
            <MessageCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[10px] font-semibold hidden sm:inline">DMs</span>
          </button>
        </div>

        {/* Feed Filter Pills */}
        <div className="flex items-center space-x-2 mt-3 pt-2.5 border-t border-white/5">
          <button
            onClick={() => setFeedFilter('smart')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              feedFilter === 'smart'
                ? 'bg-indigo-500/20 border border-indigo-500/40 text-indigo-300'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            Smart Feed
          </button>

          <button
            onClick={() => setFeedFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              feedFilter === 'all'
                ? 'bg-indigo-500/20 border border-indigo-500/40 text-indigo-300'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            All Reels ({reels.length})
          </button>

          <button
            onClick={() => setFeedFilter('saved')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              feedFilter === 'saved'
                ? 'bg-indigo-500/20 border border-indigo-500/40 text-indigo-300'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            Saved ({reels.filter((r) => r.isSaved).length})
          </button>
        </div>
      </div>

      {/* Reel Viewport Card */}
      {activeReel ? (
        <div className="relative">
          <EduReelCard
            reel={activeReel}
            onOpenUnderstand={() => onOpenUnderstand(activeReel)}
            onOpenPractice={() => onOpenPractice(activeReel)}
            onOpenCode={() => onOpenCode(activeReel)}
            onOpenProve={() => onOpenProve(activeReel)}
            onOpenComments={() => setActiveCommentReel(activeReel)}
            onToggleSave={() => onToggleSave(activeReel.id)}
            onToggleLike={() => onToggleLike(activeReel.id)}
          />

          {/* Up & Down Scroll Controls */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col space-y-2 z-20">
            <button
              onClick={prevReel}
              disabled={activeReelIndex === 0}
              className="w-8 h-8 rounded-full bg-black/60 border border-white/10 text-white flex items-center justify-center disabled:opacity-30 hover:bg-black/80 transition-all shadow-md"
            >
              <ChevronUp className="w-4 h-4" />
            </button>

            <button
              onClick={nextReel}
              disabled={activeReelIndex + 1 >= filteredReels.length}
              className="w-8 h-8 rounded-full bg-black/60 border border-white/10 text-white flex items-center justify-center disabled:opacity-30 hover:bg-black/80 transition-all shadow-md"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="glass-card p-8 text-center text-slate-400 text-xs">
          No reels found matching current filter.
        </div>
      )}

      {/* Modals & Drawers */}
      {activeCommentReel && (
        <CommentDrawer
          reel={activeCommentReel}
          onClose={() => setActiveCommentReel(null)}
        />
      )}

      {showDirectMessages && (
        <DirectMessagesModal onClose={() => setShowDirectMessages(false)} />
      )}
    </div>
  );
};
