import React, { useState } from 'react';
import { StoryViewerModal, type LearningStory } from './StoryViewerModal';

export const ReelStoriesBar: React.FC = () => {
  const [activeStory, setActiveStory] = useState<LearningStory | null>(null);

  const stories: LearningStory[] = [
    {
      id: 'st-1',
      creatorName: 'Dr. Sarah Chen',
      creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop',
      creatorHandle: '@sarah_ai',
      title: 'React 19 Server Components Tip! ⚡',
      topic: 'React 19',
      bgGradient: 'from-cyan-900 via-indigo-900 to-purple-950',
      content: 'Server Components execute exclusively on the server, eliminating bundle size overhead for static dependencies!',
      codeSnippet: `// Server Component\nasync function Profile({ id }) {\n  const user = await db.users.find(id);\n  return <h1>{user.name}</h1>;\n}`,
      likes: 342
    },
    {
      id: 'st-2',
      creatorName: 'Ayesha Khan',
      creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop',
      creatorHandle: '@ayesha_gis',
      title: 'RescueMesh Edge AI Deployed! 📡',
      topic: 'Edge AI',
      bgGradient: 'from-emerald-950 via-slate-900 to-indigo-950',
      content: 'Successfully quantized our TensorFlow Lite model down to 1.4MB for mesh emergency radio nodes.',
      likes: 512
    },
    {
      id: 'st-3',
      creatorName: 'Prof. Alex Rivera',
      creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop',
      creatorHandle: '@alex_deeplearning',
      title: 'Transformer Self-Attention Matrix 🧠',
      topic: 'Deep Learning',
      bgGradient: 'from-amber-950 via-rose-950 to-purple-950',
      content: 'Attention(Q, K, V) = softmax((Q Kᵀ) / √dₖ) V -- compute scaled dot-product attention in 3 lines of PyTorch!',
      codeSnippet: `scores = torch.matmul(q, k.transpose(-2, -1)) / math.sqrt(d_k)\nattn = F.softmax(scores, dim=-1)\noutput = torch.matmul(attn, v)`,
      likes: 890
    },
    {
      id: 'st-4',
      creatorName: 'GPREC Hackathon',
      creatorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop',
      creatorHandle: '@gprec_official',
      title: 'Campus Hackathon Live Leaderboard! 🏛️',
      topic: 'Campus Event',
      bgGradient: 'from-fuchsia-950 via-indigo-950 to-slate-950',
      content: 'Top 5 campus teams are presenting their AI & Cloud projects at Main Auditorium right now!',
      likes: 620
    }
  ];

  return (
    <>
      <div className="flex items-center space-x-3 overflow-x-auto no-scrollbar py-2 border-b border-white/10 mb-4">
        {/* Your Story ring */}
        <div className="flex flex-col items-center space-y-1 cursor-pointer group shrink-0">
          <div className="relative w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-cyan-400 via-indigo-500 to-fuchsia-500">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop"
              alt="Your Story"
              className="w-full h-full rounded-full object-cover border-2 border-black"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-cyan-400 border border-black flex items-center justify-center text-black font-black text-xs">
              +
            </div>
          </div>
          <span className="text-[10px] text-slate-300 font-bold">Your Story</span>
        </div>

        {/* Learning Stories list */}
        {stories.map((story) => (
          <div
            key={story.id}
            onClick={() => setActiveStory(story)}
            className="flex flex-col items-center space-y-1 cursor-pointer group shrink-0"
          >
            <div className="w-14 h-14 rounded-full p-[2.5px] bg-gradient-to-tr from-amber-400 via-rose-500 to-fuchsia-500 group-hover:scale-105 transition-transform shadow-lg shadow-rose-500/20">
              <img
                src={story.creatorAvatar}
                alt={story.creatorName}
                className="w-full h-full rounded-full object-cover border-2 border-black"
              />
            </div>
            <span className="text-[10px] text-slate-300 font-bold truncate max-w-[65px]">
              {story.creatorName.split(' ')[0]}
            </span>
          </div>
        ))}
      </div>

      {/* Story Viewer Overlay */}
      {activeStory && (
        <StoryViewerModal
          story={activeStory}
          onClose={() => setActiveStory(null)}
        />
      )}
    </>
  );
};
