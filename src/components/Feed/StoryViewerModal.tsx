import React, { useState, useEffect } from 'react';
import { X, Heart, MessageCircle, Share2, Volume2, VolumeX } from 'lucide-react';

export interface LearningStory {
  id: string;
  creatorName: string;
  creatorAvatar: string;
  creatorHandle: string;
  title: string;
  topic: string;
  bgGradient: string;
  content: string;
  codeSnippet?: string;
  likes: number;
}

interface StoryViewerModalProps {
  story: LearningStory;
  onClose: () => void;
  onNext?: () => void;
}

export const StoryViewerModal: React.FC<StoryViewerModalProps> = ({ story, onClose, onNext }) => {
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(story.likes);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          if (onNext) onNext();
          else onClose();
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [story, onNext, onClose]);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-lg animate-fadeIn">
      <div
        className={`relative w-full max-w-sm h-[82vh] rounded-3xl border border-white/20 shadow-2xl overflow-hidden flex flex-col justify-between p-5 bg-gradient-to-b ${story.bgGradient}`}
      >
        {/* Top Progress Bar */}
        <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mb-3">
          <div
            className="bg-white h-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Story Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <img
              src={story.creatorAvatar}
              alt={story.creatorName}
              className="w-10 h-10 rounded-full object-cover border-2 border-cyan-400 shadow-md"
            />
            <div>
              <h4 className="font-extrabold text-xs text-white leading-tight">{story.creatorName}</h4>
              <span className="text-[10px] text-cyan-200 font-medium">{story.creatorHandle}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Story Middle Body */}
        <div className="my-auto space-y-4 py-6">
          <span className="px-3 py-1 rounded-full text-[10px] font-black bg-black/50 text-cyan-300 border border-white/20 backdrop-blur uppercase tracking-wider">
            ⚡ {story.topic} Story
          </span>

          <h3 className="text-xl font-black text-white leading-snug drop-shadow">
            {story.title}
          </h3>

          <p className="text-xs text-slate-100 font-medium leading-relaxed drop-shadow-sm">
            {story.content}
          </p>

          {story.codeSnippet && (
            <div className="bg-black/80 backdrop-blur p-3 rounded-2xl border border-white/20 font-mono text-[10px] text-emerald-300 overflow-x-auto">
              <pre>{story.codeSnippet}</pre>
            </div>
          )}
        </div>

        {/* Story Footer Actions */}
        <div className="flex items-center justify-between border-t border-white/20 pt-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className="flex items-center space-x-1 text-white font-bold text-xs"
            >
              <Heart className={`w-5 h-5 ${liked ? 'text-rose-500 fill-rose-500 animate-bounce' : 'text-white'}`} />
              <span>{likesCount}</span>
            </button>

            <button className="flex items-center space-x-1 text-white font-bold text-xs">
              <MessageCircle className="w-5 h-5" />
              <span>12</span>
            </button>
          </div>

          <button className="p-2 rounded-full bg-white/20 text-white backdrop-blur hover:scale-110 transition-transform">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
