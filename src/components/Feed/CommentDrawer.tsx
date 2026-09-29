import React, { useState } from 'react';
import { X, Send, Heart, MessageSquare } from 'lucide-react';
import type { ReelItem } from '../../types/eduvia';

interface CommentItem {
  id: string;
  userName: string;
  userHandle: string;
  userAvatar: string;
  text: string;
  timeAgo: string;
  likes: number;
  isLiked?: boolean;
}

interface CommentDrawerProps {
  reel: ReelItem;
  onClose: () => void;
}

export const CommentDrawer: React.FC<CommentDrawerProps> = ({ reel, onClose }) => {
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: 'c-1',
      userName: 'Ayesha Khan',
      userHandle: '@ayesha_gis',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop',
      text: 'List comprehension reduced my ESP32 telemetry parsing pipeline from 12ms down to 3ms! Incredible tip 🚀',
      timeAgo: '2h',
      likes: 42
    },
    {
      id: 'c-2',
      userName: 'Rohit Sharma',
      userHandle: '@rohit_iot',
      userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop',
      text: 'Is there any downside to using nested list comprehensions for 2D matrices?',
      timeAgo: '1h',
      likes: 18
    },
    {
      id: 'c-3',
      userName: 'EDUVIA AI Tutor',
      userHandle: '@eduvia_ai',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop',
      text: '@rohit_iot Avoid nesting more than 2 levels as readability suffers. Use NumPy matrix operations for high-dimensional arrays!',
      timeAgo: '45m',
      likes: 65
    }
  ]);

  const [newCommentText, setNewCommentText] = useState('');

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const posted: CommentItem = {
      id: `comment-${Date.now()}`,
      userName: 'Shaik Sowban',
      userHandle: '@sowban_dev',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop',
      text: newCommentText,
      timeAgo: 'Just Now',
      likes: 1
    };

    setComments([posted, ...comments]);
    setNewCommentText('');
  };

  const handleToggleCommentLike = (id: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, isLiked: !c.isLiked, likes: c.likes + (c.isLiked ? -1 : 1) }
          : c
      )
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg mx-auto glass-panel rounded-t-3xl border-t border-white/20 p-5 shadow-2xl shadow-black max-h-[80vh] flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            <h3 className="font-extrabold text-base text-white">
              Discussion on "{reel.topic}" ({comments.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comments List Scroll Container */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-3">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start justify-between space-x-3 text-xs">
              <div className="flex items-start space-x-2.5">
                <img
                  src={comment.userAvatar}
                  alt={comment.userName}
                  className="w-8 h-8 rounded-full object-cover border border-purple-400 shrink-0 mt-0.5"
                />
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white">{comment.userName}</span>
                    <span className="text-slate-400 text-[10px]">{comment.userHandle}</span>
                    <span className="text-slate-500 text-[10px]">{comment.timeAgo}</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed">{comment.text}</p>
                </div>
              </div>

              {/* Heart Like per comment */}
              <button
                onClick={() => handleToggleCommentLike(comment.id)}
                className="flex flex-col items-center shrink-0"
              >
                <Heart
                  className={`w-4 h-4 ${
                    comment.isLiked ? 'text-rose-500 fill-rose-500' : 'text-slate-400'
                  }`}
                />
                <span className="text-[9px] font-mono text-slate-400 mt-0.5">{comment.likes}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handlePostComment} className="relative pt-2 border-t border-white/10">
          <input
            type="text"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder="Add a learning comment or ask a question..."
            className="w-full bg-black/60 border border-white/15 rounded-2xl pl-4 pr-12 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-3.5 p-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/30"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
