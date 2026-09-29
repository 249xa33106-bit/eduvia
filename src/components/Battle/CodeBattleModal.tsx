import React, { useState, useEffect } from 'react';
import { X, Swords, CheckCircle2, Play, Trophy, Clock, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CodeBattleModalProps {
  onClose: () => void;
}

export const CodeBattleModal: React.FC<CodeBattleModalProps> = ({ onClose }) => {
  const [matchState, setMatchState] = useState<'matchmaking' | 'battle' | 'result'>('matchmaking');
  const [opponent, setOpponent] = useState<{ name: string; handle: string; avatar: string; rating: number } | null>(null);
  const [timeLeft, setTimeLeft] = useState(120); // 2 mins
  const [userCode, setUserCode] = useState(`def two_sum(nums, target):\n    # Return indices of two numbers that add up to target\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []`);
  const [opponentProgress, setOpponentProgress] = useState(0); // 0 - 100%
  const [testResults, setTestResults] = useState<{ input: string; expected: string; passed: boolean }[] | null>(null);
  const [isWinner, setIsWinner] = useState(false);

  // Matchmaking simulation
  useEffect(() => {
    if (matchState === 'matchmaking') {
      const timer = setTimeout(() => {
        setOpponent({
          name: 'Rohan Sharma',
          handle: '@rohan_code',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop',
          rating: 1420
        });
        setMatchState('battle');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [matchState]);

  // Battle countdown & simulated opponent typing
  useEffect(() => {
    if (matchState === 'battle') {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleBattleFinish(false);
            return 0;
          }
          return prev - 1;
        });

        // Opponent progress simulation
        setOpponentProgress((prev) => Math.min(95, prev + Math.floor(Math.random() * 8)));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [matchState]);

  const handleRunTests = () => {
    const tests = [
      { input: 'nums = [2, 7, 11, 15], target = 9', expected: '[0, 1]', passed: true },
      { input: 'nums = [3, 2, 4], target = 6', expected: '[1, 2]', passed: true },
      { input: 'nums = [3, 3], target = 6', expected: '[0, 1]', passed: true }
    ];
    setTestResults(tests);

    if (tests.every((t) => t.passed)) {
      handleBattleFinish(true);
    }
  };

  const handleBattleFinish = (won: boolean) => {
    setIsWinner(won);
    setMatchState('result');
    if (won) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl border border-rose-500/40 shadow-2xl shadow-rose-950/70 p-6 flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-orange-500 to-amber-400 flex items-center justify-center text-white shadow-lg shadow-rose-500/30 animate-pulse">
              <Swords className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-black text-sm text-white">1v1 Code Battle Arena</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500/20 text-rose-300 border border-rose-400/40 uppercase">
                  Live PvP
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Real-time speed algorithm duel</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* State 1: Matchmaking */}
        {matchState === 'matchmaking' && (
          <div className="py-16 text-center space-y-4">
            <div className="w-20 h-20 rounded-full border-4 border-rose-500/40 border-t-rose-400 animate-spin mx-auto flex items-center justify-center">
              <Swords className="w-8 h-8 text-rose-400 animate-bounce" />
            </div>
            <div>
              <h4 className="text-lg font-black text-white">Searching for Opponent...</h4>
              <p className="text-xs text-slate-400 mt-1">Matching with campus peers near your MMR (1450)...</p>
            </div>
          </div>
        )}

        {/* State 2: Battle In Progress */}
        {matchState === 'battle' && opponent && (
          <div className="space-y-4">
            {/* Players Status Bar */}
            <div className="grid grid-cols-2 gap-4 bg-black/50 p-3.5 rounded-2xl border border-white/10">
              {/* You */}
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                  YOU
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-white">You (Sowban)</h4>
                  <span className="text-[10px] text-cyan-300 font-semibold">Ready to Submit</span>
                </div>
              </div>

              {/* Opponent */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={opponent.avatar} alt={opponent.name} className="w-9 h-9 rounded-xl object-cover border border-rose-400" />
                  <div>
                    <h4 className="font-extrabold text-xs text-white">{opponent.name}</h4>
                    <span className="text-[10px] text-rose-400 font-semibold">Coding... ({opponentProgress}%)</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 font-mono font-black text-amber-300 text-sm bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-400/30">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>

            {/* Opponent Live Progress Bar */}
            <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-rose-500 to-amber-500 h-full transition-all duration-500"
                style={{ width: `${opponentProgress}%` }}
              />
            </div>

            {/* Problem Description & Editor */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Problem Statement */}
              <div className="bg-black/60 p-4 rounded-2xl border border-white/10 space-y-2 text-xs">
                <h4 className="font-extrabold text-white text-sm text-cyan-300">Challenge: Two Sum Speed</h4>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Given an array of integers <code className="text-amber-300">nums</code> and an integer <code className="text-amber-300">target</code>, return indices of the two numbers such that they add up to target.
                </p>
                <div className="pt-2 border-t border-white/10 text-[10px] text-slate-400 space-y-1">
                  <div><strong>Time Limit:</strong> 2 mins</div>
                  <div><strong>Language:</strong> Python 3</div>
                </div>
              </div>

              {/* Code Editor */}
              <div className="md:col-span-2 space-y-3">
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  rows={8}
                  className="w-full bg-black/90 font-mono text-xs text-emerald-300 p-4 rounded-2xl border border-white/15 focus:outline-none focus:border-rose-400 leading-relaxed"
                />

                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">Press Run to execute test cases</span>
                  <button
                    onClick={handleRunTests}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-400 text-white font-extrabold text-xs shadow-lg shadow-rose-500/30 hover:scale-105 transition-transform flex items-center space-x-1.5"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Run & Submit Solution</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* State 3: Battle Result */}
        {matchState === 'result' && (
          <div className="py-10 text-center space-y-4">
            <div
              className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white shadow-xl ${
                isWinner ? 'bg-gradient-to-tr from-amber-400 to-emerald-500 shadow-emerald-500/40' : 'bg-rose-500 shadow-rose-500/40'
              }`}
            >
              {isWinner ? <Trophy className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8" />}
            </div>

            <div>
              <h4 className="text-2xl font-black text-white">
                {isWinner ? 'VICTORY! 🎉' : 'DEFEAT 💔'}
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                {isWinner
                  ? 'You solved the challenge in record time! Earned +50 XP and +15 MMR!'
                  : 'Time expired or tests failed. Better luck next battle!'}
              </p>
            </div>

            {testResults && (
              <div className="max-w-md mx-auto bg-black/60 p-3 rounded-2xl border border-white/10 text-left space-y-2 text-xs">
                {testResults.map((t, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-slate-300">{t.input}</span>
                    <span className="flex items-center gap-1 font-bold text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Passed
                    </span>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setMatchState('matchmaking')}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-extrabold text-xs shadow-lg hover:scale-105 transition-transform"
            >
              Battle Again ⚔️
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
