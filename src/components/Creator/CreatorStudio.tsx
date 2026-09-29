import React, { useState } from 'react';
import { PlusCircle, Sparkles, Video, FileText, Code2, Zap, Trophy, Megaphone, Radio, CheckCircle2, ArrowRight, Upload, Film } from 'lucide-react';
import type { ReelItem } from '../../types/eduvia';

interface CreatorStudioProps {
  onPublishReel: (reel: ReelItem) => void;
}

export const CreatorStudio: React.FC<CreatorStudioProps> = ({ onPublishReel }) => {
  const [selectedType, setSelectedType] = useState<string>('Reel');
  const [videoScript, setVideoScript] = useState<string>('');
  const [uploadMode, setUploadMode] = useState<'file' | 'ai'>('file');

  // File Upload State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [reelTitle, setReelTitle] = useState<string>('');
  const [reelTopic, setReelTopic] = useState<string>('Python');
  const [reelLevel, setReelLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [reelDescription, setReelDescription] = useState<string>('');

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedResult, setGeneratedResult] = useState<{
    title: string;
    description: string;
    topic: string;
    skills: string;
    quizCount: number;
    codeChallengeCreated: boolean;
  } | null>(null);

  const contentTypes = [
    { name: 'Reel', icon: Video, color: 'text-rose-400' },
    { name: 'Post', icon: FileText, color: 'text-indigo-400' },
    { name: 'Lesson', icon: Sparkles, color: 'text-cyan-400' },
    { name: 'Code', icon: Code2, color: 'text-emerald-400' },
    { name: 'Challenge', icon: Zap, color: 'text-amber-400' },
    { name: 'Project', icon: Trophy, color: 'text-purple-400' },
    { name: 'Opportunity', icon: Megaphone, color: 'text-blue-400' },
    { name: 'Live', icon: Radio, color: 'text-rose-500' }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setVideoPreviewUrl(previewUrl);

      if (!reelTitle) {
        // Auto set title from file name without extension
        const cleanName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
        setReelTitle(cleanName);
      }
    }
  };

  const handlePublishFileReel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reelTitle.trim()) return;

    const mediaUrl = videoPreviewUrl || 'https://assets.mixkit.co/videos/preview/mixkit-code-running-on-a-computer-screen-41566-large.mp4';

    const newReel: ReelItem = {
      id: `reel-${Date.now()}`,
      title: reelTitle,
      description: reelDescription || 'User-uploaded educational lesson video.',
      videoUrl: mediaUrl,
      thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop',
      creator: {
        name: 'SHAIK SOWBAN',
        handle: '@sowban_dev',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop',
        title: 'CSM • Fullstack & AI Lead',
        verified: true
      },
      topic: reelTopic,
      skillTag: `${reelTopic} • ${reelLevel}`,
      level: reelLevel,
      likes: 1,
      commentsCount: 0,
      saves: 0,
      shares: 0,
      understandBreakdown: {
        beginner: `Overview of ${reelTitle}: ${reelDescription || 'Educational breakdown of key logic.'}`,
        intermediate: 'Implementation detail and performance velocity benchmarks.',
        advanced: 'System architecture implications and memory optimization.',
        keyTakeaways: [
          `Key concept: ${reelTitle}`,
          `Topic: ${reelTopic}`,
          `Level: ${reelLevel}`
        ]
      },
      quiz: [
        {
          id: `q-${Date.now()}`,
          question: `What is the core takeaway of "${reelTitle}"?`,
          options: [
            `Option A: Master ${reelTopic} concepts efficiently`,
            'Option B: Unoptimized legacy code',
            'Option C: Memory leaks'
          ],
          correctAnswer: 0,
          explanation: `Option A correctly summarizes ${reelTitle}.`
        }
      ]
    };

    onPublishReel(newReel);
    alert(`🎉 Success! Your video "${reelTitle}" has been published to the Eduvia Feed!`);
    setUploadedFile(null);
    setVideoPreviewUrl(null);
    setReelTitle('');
    setReelDescription('');
  };

  const handleAiAutoGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoScript.trim()) return;

    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedResult({
        title: videoScript.length > 30 ? videoScript.substring(0, 45) + '...' : 'Python Fast Execution Techniques',
        description: 'Auto-extracted transcript & concept breakdown by Eduvia AI Engine.',
        topic: reelTopic,
        skills: `${reelTopic} • ${reelLevel}`,
        quizCount: 3,
        codeChallengeCreated: true
      });
    }, 1200);
  };

  const handlePublishAiReel = () => {
    if (!generatedResult) return;

    const newReel: ReelItem = {
      id: `reel-${Date.now()}`,
      title: generatedResult.title,
      description: generatedResult.description,
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-code-running-on-a-computer-screen-41566-large.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop',
      creator: {
        name: 'SHAIK SOWBAN',
        handle: '@sowban_dev',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop',
        title: 'CSM • Fullstack & AI Lead',
        verified: true
      },
      topic: generatedResult.topic,
      skillTag: generatedResult.skills,
      level: reelLevel,
      likes: 1,
      commentsCount: 0,
      saves: 0,
      shares: 0,
      understandBreakdown: {
        beginner: `Auto-generated summary: ${videoScript.substring(0, 80)}`,
        intermediate: 'Under the hood execution analysis generated by AI engine.',
        advanced: 'Performance optimization metrics for memory and execution velocity.',
        keyTakeaways: [
          'Evaluates execution speed inside runtime',
          'Eliminates repetitive overhead',
          'Optimized for clean functional expression'
        ]
      },
      quiz: [
        {
          id: `q-${Date.now()}`,
          question: `What is the primary performance advantage of: "${generatedResult.title}"?`,
          options: [
            'Optimal runtime performance without overhead',
            'Standard loop with repeated append calls',
            'Slower execution'
          ],
          correctAnswer: 0,
          explanation: 'Evaluating expressions directly in speed provides optimal runtime performance.'
        }
      ]
    };

    onPublishReel(newReel);
    alert('🎉 Success! Your AI-generated lesson has been published to the feed!');
    setGeneratedResult(null);
    setVideoScript('');
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-5 pb-20 animate-fadeIn">
      {/* Header */}
      <div className="glass-card p-5 border border-indigo-500/20 bg-slate-900/80">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center text-white font-bold shadow-md">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              Eduvia Creator Studio
              <span className="text-xs font-semibold text-indigo-300 bg-indigo-500/20 px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                Live Publisher
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Upload local video lessons or use AI to generate interactive reels & quizzes instantly!
            </p>
          </div>
        </div>
      </div>

      {/* Content Types Grid Selector */}
      <div className="glass-card p-4 border border-white/10">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          Select Content Type
        </h3>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {contentTypes.map((type) => {
            const Icon = type.icon;
            const isSel = selectedType === type.name;
            return (
              <button
                key={type.name}
                onClick={() => setSelectedType(type.name)}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                  isSel
                    ? 'bg-indigo-500/25 border-indigo-500 text-white font-bold'
                    : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 mb-1 ${type.color}`} />
                <span className="text-[10px] font-semibold">{type.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mode Switcher: File Upload vs AI Generator */}
      <div className="flex items-center space-x-2 border-b border-white/10 pb-1">
        <button
          onClick={() => setUploadMode('file')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
            uploadMode === 'file'
              ? 'bg-indigo-500/20 border border-indigo-500/40 text-indigo-300'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>Upload Video / File</span>
        </button>

        <button
          onClick={() => setUploadMode('ai')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
            uploadMode === 'ai'
              ? 'bg-indigo-500/20 border border-indigo-500/40 text-indigo-300'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span>AI Script Generator</span>
        </button>
      </div>

      {/* MODE 1: FILE UPLOAD WORKFLOW */}
      {uploadMode === 'file' && (
        <form onSubmit={handlePublishFileReel} className="glass-card p-6 border border-white/10 space-y-4">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Film className="w-4 h-4 text-indigo-400" />
            Upload Local Video or Media
          </h3>

          {/* Drag & Drop Upload Input Box */}
          <div className="relative border-2 border-dashed border-white/15 hover:border-indigo-500/50 rounded-2xl p-6 text-center bg-black/40 transition-colors">
            <input
              type="file"
              accept="video/*,image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />

            {videoPreviewUrl ? (
              <div className="space-y-3">
                {uploadedFile?.type.startsWith('image/') ? (
                  <img src={videoPreviewUrl} alt="Preview" className="max-h-48 mx-auto rounded-xl object-cover border border-white/20" />
                ) : (
                  <video src={videoPreviewUrl} controls className="max-h-56 mx-auto rounded-xl border border-white/20 shadow-md" />
                )}
                <p className="text-xs font-semibold text-emerald-400 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> File Selected: {uploadedFile?.name}
                </p>
              </div>
            ) : (
              <div className="space-y-2 py-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-indigo-400">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-white">Click or drag & drop video file here</h4>
                <p className="text-[11px] text-slate-400">Supports MP4, WebM, MOV, or PNG/JPG images (Max 100MB)</p>
              </div>
            )}
          </div>

          {/* Reel Details Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">Reel Title *</label>
              <input
                type="text"
                value={reelTitle}
                onChange={(e) => setReelTitle(e.target.value)}
                placeholder="e.g. Python List Comprehension ⚡"
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Topic</label>
                <select
                  value={reelTopic}
                  onChange={(e) => setReelTopic(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-400"
                >
                  <option value="Python">Python</option>
                  <option value="React">React</option>
                  <option value="DSA">DSA</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="System Design">System Design</option>
                  <option value="TypeScript">TypeScript</option>
                  <option value="DevOps">DevOps</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Skill Level</label>
                <select
                  value={reelLevel}
                  onChange={(e) => setReelLevel(e.target.value as any)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-400"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">Concept Description & Key Takeaways</label>
            <textarea
              value={reelDescription}
              onChange={(e) => setReelDescription(e.target.value)}
              placeholder="Explain the core concept or code technique shown in this lesson..."
              rows={3}
              className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
            />
          </div>

          <button
            type="submit"
            disabled={!reelTitle.trim()}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-400 text-white font-extrabold text-xs shadow-md hover:scale-[1.01] transition-transform flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>Publish Video Reel to Eduvia Feed</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* MODE 2: AI SCRIPT GENERATOR WORKFLOW */}
      {uploadMode === 'ai' && (
        <div className="glass-card p-6 border border-white/10 space-y-4">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            Paste Video Script or Educational Text
          </h3>

          <form onSubmit={handleAiAutoGenerate} className="space-y-4">
            <textarea
              value={videoScript}
              onChange={(e) => setVideoScript(e.target.value)}
              placeholder="e.g. In this 60 second video, I explain how Python list comprehensions work using [x**2 for x in numbers if x % 2 == 0]..."
              className="w-full h-36 bg-black/60 border border-white/15 rounded-xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 font-sans leading-relaxed"
            />

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                🤖 AI automatically constructs quiz questions & code challenges.
              </span>

              <button
                type="submit"
                disabled={isGenerating || !videoScript.trim()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-400 text-white font-bold text-xs flex items-center space-x-2 shadow-md hover:scale-105 transition-all disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGenerating ? 'AI Generating...' : 'Transform to Lesson'}</span>
              </button>
            </div>
          </form>

          {/* AI RESULT PREVIEW */}
          {generatedResult && (
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 space-y-3 animate-fadeIn">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>AI Lesson Generated</span>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs">
                <span className="text-slate-400 block text-[10px]">Title</span>
                <span className="font-bold text-white">{generatedResult.title}</span>
              </div>

              <button
                onClick={handlePublishAiReel}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs shadow-md hover:scale-[1.01] transition-transform flex items-center justify-center space-x-2"
              >
                <span>Publish EduReel to Social Feed</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
