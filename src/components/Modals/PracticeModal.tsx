import React, { useState } from 'react';
import { X, Zap, CheckCircle, XCircle, Award, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { ReelItem } from '../../types/eduvia';

interface PracticeModalProps {
  reel: ReelItem;
  onClose: () => void;
  onCompletePractice: (skillName: string, xp: number) => void;
}

export const PracticeModal: React.FC<PracticeModalProps> = ({ reel, onClose, onCompletePractice }) => {
  const questions = reel.quiz || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIdx];

  const handleSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOpt(idx);
  };

  const handleSubmit = () => {
    if (selectedOpt === null) return;
    setIsSubmitted(true);
    if (selectedOpt === currentQ.correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((c) => c + 1);
      setSelectedOpt(null);
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      onCompletePractice(reel.topic, (score + (selectedOpt === currentQ?.correctAnswer ? 1 : 0)) * 15);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl glass-panel rounded-3xl border border-amber-500/30 p-6 shadow-2xl shadow-amber-900/40">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Zap className="w-6 h-6 fill-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                ⚡ Quick Practice
                <span className="text-xs font-normal text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                  {reel.topic}
                </span>
              </h3>
              <p className="text-xs text-slate-400">3 AI-Generated Questions to lock in knowledge</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isFinished && currentQ ? (
          <div>
            {/* Question Progress Bar */}
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Question {currentIdx + 1} of {questions.length}</span>
              <span className="text-amber-400 font-semibold">{score} Points Earned</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-5">
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="glass-card p-5 border border-white/10 mb-4">
              <h4 className="text-sm font-semibold text-white mb-4 leading-snug">
                {currentQ.question}
              </h4>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  let optStyle = 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10';
                  if (selectedOpt === idx) {
                    optStyle = 'border-amber-500/60 bg-amber-500/20 text-amber-200 font-semibold';
                  }
                  if (isSubmitted) {
                    if (idx === currentQ.correctAnswer) {
                      optStyle = 'border-emerald-500 bg-emerald-500/20 text-emerald-200 font-semibold';
                    } else if (selectedOpt === idx && idx !== currentQ.correctAnswer) {
                      optStyle = 'border-rose-500 bg-rose-500/20 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isSubmitted}
                      onClick={() => handleSelect(idx)}
                      className={`w-full text-left p-3.5 rounded-2xl border text-xs flex items-center justify-between transition-all ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {isSubmitted && idx === currentQ.correctAnswer && (
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {isSubmitted && selectedOpt === idx && idx !== currentQ.correctAnswer && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation box after submit */}
            {isSubmitted && (
              <div className="glass-card p-4 border border-amber-500/20 bg-amber-950/20 text-xs text-slate-300 mb-4 animate-fadeIn">
                <span className="font-bold text-amber-400 block mb-1">AI Explanation:</span>
                {currentQ.explanation}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center justify-end space-x-3 mt-4">
              {!isSubmitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedOpt === null}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all shadow-lg shadow-amber-500/20"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-xs flex items-center space-x-2 hover:scale-105 transition-all shadow-lg shadow-emerald-500/20"
                >
                  <span>{currentIdx + 1 < questions.length ? 'Next Question' : 'View Results'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Finished Screen */
          <div className="text-center py-6 animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-4 text-white shadow-xl shadow-amber-500/40">
              <Award className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-extrabold text-white mb-1">Practice Complete! 🎉</h3>
            <p className="text-xs text-slate-400 mb-4">
              You scored <span className="text-amber-400 font-bold">{score} / {questions.length}</span> on {reel.topic}
            </p>

            <div className="glass-card p-4 max-w-xs mx-auto mb-6 border border-emerald-500/30 bg-emerald-950/20">
              <div className="flex items-center justify-center space-x-2 text-emerald-300 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>+{score * 15} XP added to Skill Graph</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Your {reel.topic} bar grew closer to your goal target!</p>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-xs hover:scale-105 transition-transform shadow-lg shadow-amber-500/30"
            >
              Continue Scrolling & Growing
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
