import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

interface Story {
  id: string;
  creatorName: string;
  avatar: string;
  title: string;
  badge: string;
  hasUnseen: boolean;
  videoUrl?: string;
  imageUrl: string;
  content: string;
}

export const StoriesBar: React.FC = () => {
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [storyIdx, setStoryIdx] = useState(0);

  const stories: Story[] = [
    {
      id: 'st-1',
      creatorName: 'Your Streak',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop',
      title: '🔥 32 Day Streak',
      badge: 'STREAK',
      hasUnseen: true,
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop',
      content: '32 Days of Continuous Skill Progress! You are in the top 3% of learners at GPREC Campus.'
    },
    {
      id: 'st-2',
      creatorName: 'Dr. Sarah',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop',
      title: 'Python 3.13 Speedup',
      badge: 'AI MENTOR',
      hasUnseen: true,
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
      content: 'Python 3.13 removes GIL restrictions for true multi-core parallel thread execution! Try our live code sandbox.'
    },
    {
      id: 'st-3',
      creatorName: 'RescueMesh',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop',
      title: '🚨 RescueMesh Live',
      badge: 'PROJECT',
      hasUnseen: true,
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop',
      content: 'Deployed 12 ESP32 Mesh nodes at GPREC IoT Lab! Thermal sensors active.'
    },
    {
      id: 'st-4',
      creatorName: 'Verified Py',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop',
      title: '🏆 92 Score Earned',
      badge: 'PROOF',
      hasUnseen: false,
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop',
      content: 'Verified Python Credential Hash: 0x8f7a93b41c... Minted on Lumixora PROVE Protocol.'
    }
  ];

  const handleOpenStory = (s: Story, index: number) => {
    setActiveStory(s);
    setStoryIdx(index);
  };

  const handleNextStory = () => {
    if (storyIdx + 1 < stories.length) {
      setStoryIdx(storyIdx + 1);
      setActiveStory(stories[storyIdx + 1]);
    } else {
      setActiveStory(null);
    }
  };

  const handlePrevStory = () => {
    if (storyIdx > 0) {
      setStoryIdx(storyIdx - 1);
      setActiveStory(stories[storyIdx - 1]);
    }
  };

  return (
    <>
      {/* Horizontal Instagram Story Reel Strip */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-none">
        {/* Add Story Button */}
        <div className="flex flex-col items-center space-y-1 shrink-0 cursor-pointer group">
          <div className="w-16 h-16 rounded-full p-0.5 border-2 border-dashed border-cyan-400/60 bg-black/40 flex items-center justify-center group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center text-cyan-300 font-bold text-xl">
              +
            </div>
          </div>
          <span className="text-[10px] text-slate-300 font-medium">Add Skill</span>
        </div>

        {/* Stories List */}
        {stories.map((story, idx) => (
          <div
            key={story.id}
            onClick={() => handleOpenStory(story, idx)}
            className="flex flex-col items-center space-y-1 shrink-0 cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-full p-[2.5px] bg-gradient-to-tr from-amber-400 via-fuchsia-500 to-cyan-400 shadow-md shadow-fuchsia-500/20 group-hover:scale-105 transition-transform">
              <img
                src={story.avatar}
                alt={story.creatorName}
                className="w-full h-full rounded-full object-cover border-2 border-black"
              />
            </div>
            <span className="text-[10px] text-slate-200 font-bold max-w-[64px] truncate">
              {story.creatorName}
            </span>
          </div>
        ))}
      </div>

      {/* Fullscreen Story Viewer Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl animate-fadeIn p-4">
          <div className="relative w-full max-w-sm aspect-[9/16] rounded-3xl overflow-hidden glass-panel border border-white/20 shadow-2xl flex flex-col justify-between p-4">
            {/* Background Image */}
            <img
              src={activeStory.imageUrl}
              alt={activeStory.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />

            {/* Progress Bar Header */}
            <div className="relative z-10 space-y-3">
              <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full w-full animate-shimmerSweep" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={activeStory.avatar}
                    alt={activeStory.creatorName}
                    className="w-8 h-8 rounded-full border border-cyan-400 object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">{activeStory.creatorName}</h4>
                    <span className="text-[9px] text-cyan-300 font-mono">{activeStory.badge}</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveStory(null)}
                  className="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center border border-white/20"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Story Card Overlay Content */}
            <div className="relative z-10 space-y-3 bg-black/60 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
              <h3 className="text-base font-extrabold text-white">{activeStory.title}</h3>
              <p className="text-xs text-slate-200 leading-relaxed font-normal">{activeStory.content}</p>

              <button
                onClick={() => alert(`Saved story topic "${activeStory.title}" to your skill graph!`)}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center space-x-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Add to My Skill Roadmap</span>
              </button>
            </div>

            {/* Touch Tap Navigation Areas */}
            <button
              onClick={handlePrevStory}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNextStory}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
