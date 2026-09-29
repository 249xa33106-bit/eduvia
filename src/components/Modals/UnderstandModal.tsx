import React, { useState } from 'react';
import { X, Brain, Volume2, Send, CheckCircle2, BookOpen } from 'lucide-react';
import type { ReelItem, SkillLevel } from '../../types/eduvia';

interface UnderstandModalProps {
  reel: ReelItem;
  onClose: () => void;
}

export const UnderstandModal: React.FC<UnderstandModalProps> = ({ reel, onClose }) => {
  const [selectedLevel, setSelectedLevel] = useState<SkillLevel>('Beginner');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [chatLog, setChatLog] = useState<{ sender: 'user' | 'ai'; text: string }[]>([]);

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = reel.understandBreakdown[selectedLevel.toLowerCase() as keyof typeof reel.understandBreakdown] as string;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleAskAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;

    const userText = aiQuestion;
    setChatLog((prev) => [...prev, { sender: 'user', text: userText }]);
    setAiQuestion('');

    setTimeout(() => {
      let aiResponse = `Based on your level (${selectedLevel}), `;
      if (userText.toLowerCase().includes('example') || userText.toLowerCase().includes('code')) {
        aiResponse += `here is a quick snippet: \`result = [x for x in data if condition]\`. Notice how it eliminates loop boilerplate cleanly.`;
      } else if (userText.toLowerCase().includes('why') || userText.toLowerCase().includes('use')) {
        aiResponse += `we use this pattern to maximize execution velocity and maintain readable functional code signatures.`;
      } else {
        aiResponse += `great question! In ${reel.topic}, mastering this core principle connects directly to your skill graph target for ${reel.skillTag}.`;
      }
      setChatLog((prev) => [...prev, { sender: 'ai', text: aiResponse }]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl border border-purple-500/30 p-6 shadow-2xl shadow-purple-900/40 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Brain className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                🧠 Understand Concept
                <span className="text-xs font-normal text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/30">
                  Eduvia AI Engine
                </span>
              </h3>
              <p className="text-xs text-slate-400">{reel.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Level Switcher Pills */}
        <div className="flex items-center justify-between bg-black/40 p-1.5 rounded-2xl border border-white/5 mb-5">
          {(['Beginner', 'Intermediate', 'Advanced'] as SkillLevel[]).map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedLevel === level
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {level} Mode
            </button>
          ))}
        </div>

        {/* Explanation Card */}
        <div className="glass-card p-5 border border-purple-500/20 mb-5 relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-purple-400" />
              {selectedLevel} Level Breakdown
            </span>
            <button
              onClick={handleSpeak}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                isSpeaking
                  ? 'bg-purple-500/30 text-purple-200 border-purple-400 animate-pulse'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isSpeaking ? 'Stop Audio' : 'Listen AI Voice'}</span>
            </button>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed font-normal">
            {reel.understandBreakdown[selectedLevel.toLowerCase() as keyof typeof reel.understandBreakdown] as string}
          </p>

          {/* Key Takeaways */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <h4 className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Key Takeaways</h4>
            <div className="space-y-1.5">
              {reel.understandBreakdown.keyTakeaways.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-purple-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat / Ask AI Input */}
        <div className="space-y-3">
          {chatLog.length > 0 && (
            <div className="max-h-40 overflow-y-auto space-y-2 p-3 bg-black/40 rounded-xl border border-white/5 text-xs">
              {chatLog.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-xl ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600/30 border border-indigo-500/30 text-indigo-100 ml-auto max-w-[85%]'
                      : 'bg-purple-900/30 border border-purple-500/30 text-purple-200 mr-auto max-w-[85%]'
                  }`}
                >
                  <span className="font-bold text-[10px] block opacity-70 mb-1">
                    {msg.sender === 'user' ? 'You' : 'EDUVIA AI Tutor'}
                  </span>
                  {msg.text}
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleAskAI} className="relative">
            <input
              type="text"
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              placeholder="Ask EDUVIA AI to clarify anything..."
              className="w-full bg-black/50 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 pr-10"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 p-1.5 rounded-xl bg-purple-600 text-white hover:bg-purple-500 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
          >
            Done Understanding
          </button>
        </div>
      </div>
    </div>
  );
};
