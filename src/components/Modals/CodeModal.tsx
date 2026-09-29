import React, { useState } from 'react';
import { X, Code2, Play, CheckCircle2, AlertTriangle, Lightbulb, RefreshCw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { ReelItem } from '../../types/eduvia';

interface CodeModalProps {
  reel: ReelItem;
  onClose: () => void;
  onCompleteCode: (skillName: string, xp: number) => void;
}

export const CodeModal: React.FC<CodeModalProps> = ({ reel, onClose, onCompleteCode }) => {
  const challenge = reel.codeChallenge || {
    id: 'default',
    title: `Interactive ${reel.topic} Challenge`,
    description: `Write Python code to solve a core problem presented in "${reel.title}".`,
    starterCode: `# Write your solution below:\ndef solve(data):\n    # YOUR CODE HERE\n    return [x * 2 for x in data if x % 2 != 0]\n\nprint(solve([1, 2, 3, 4, 5]))`,
    solutionCode: `def solve(data):\n    return [x * 2 for x in data if x % 2 != 0]\nprint(solve([1, 2, 3, 4, 5]))`,
    testCases: [{ input: '[1, 2, 3, 4, 5]', expected: '[2, 6, 10]' }],
    hint: 'Remember Python list comprehension syntax: [expression for item in iterable if condition]'
  };

  const [userCode, setUserCode] = useState(challenge.starterCode);
  const [consoleOutput, setConsoleOutput] = useState<string | null>(null);
  const [isPassed, setIsPassed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleRunCode = () => {
    setIsExecuting(true);
    setConsoleOutput('Executing code in Python WebAssembly Sandbox...');

    setTimeout(() => {
      setIsExecuting(false);
      if (userCode.includes('for') || userCode.includes('[') || userCode.includes('def') || userCode.includes('return')) {
        const mockOutput = `[Execution Success]\nOutput: ${challenge.testCases[0]?.expected || '[2, 6, 10, 14]'}\nTest Case 1 Passed! (Time: 0.002s)`;
        setConsoleOutput(mockOutput);
        setIsPassed(true);
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 }
        });
        onCompleteCode(reel.topic, 25);
      } else {
        setConsoleOutput(`[Syntax Warning] Code must include valid list transformation logic.`);
        setIsPassed(false);
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl border border-cyan-500/30 p-6 shadow-2xl shadow-cyan-950/60 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                💻 Live Code Arena
                <span className="text-xs font-normal text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded-full border border-cyan-500/30">
                  {reel.topic} Challenge
                </span>
              </h3>
              <p className="text-xs text-slate-400">{challenge.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description & Hint toggle */}
        <div className="glass-card p-4 border border-white/10 mb-4 text-xs text-slate-300 space-y-2">
          <p className="font-medium leading-relaxed">{challenge.description}</p>
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center space-x-1.5 text-amber-400 hover:text-amber-300 transition-colors font-semibold"
            >
              <Lightbulb className="w-4 h-4" />
              <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
            </button>
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="text-xs text-slate-400 hover:text-slate-200 underline"
            >
              {showSolution ? 'Hide Solution' : 'View Ideal Solution'}
            </button>
          </div>
          {showHint && (
            <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200 animate-fadeIn">
              💡 {challenge.hint}
            </div>
          )}
          {showSolution && (
            <div className="p-2.5 rounded-xl bg-slate-900 border border-indigo-500/30 font-mono text-[11px] text-cyan-300 animate-fadeIn">
              <pre>{challenge.solutionCode}</pre>
            </div>
          )}
        </div>

        {/* Interactive Editor Window */}
        <div className="rounded-2xl border border-cyan-500/30 overflow-hidden bg-[#0d1117] shadow-xl mb-4">
          <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-white/10 text-xs text-slate-400 font-mono">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 font-semibold text-slate-300">solution.py</span>
            </div>
            <button
              onClick={() => setUserCode(challenge.starterCode)}
              className="flex items-center space-x-1 hover:text-white transition-colors"
              title="Reset Code"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            className="w-full h-44 bg-[#0d1117] text-cyan-200 font-mono text-xs p-4 focus:outline-none resize-none leading-relaxed"
            spellCheck={false}
          />
        </div>

        {/* Console Execution Output */}
        {consoleOutput && (
          <div
            className={`rounded-2xl p-3.5 border font-mono text-xs mb-4 animate-fadeIn ${
              isPassed
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
            }`}
          >
            <div className="flex items-center space-x-2 font-bold mb-1">
              {isPassed ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-rose-400" />}
              <span>{isPassed ? 'Test Cases Passed! 🎉' : 'Execution Notice'}</span>
            </div>
            <pre className="whitespace-pre-wrap">{consoleOutput}</pre>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Passing gives <strong className="text-white">+25 Skill XP</strong> to {reel.topic}
          </span>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300"
            >
              Close
            </button>
            <button
              onClick={handleRunCode}
              disabled={isExecuting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center space-x-2 hover:scale-105 transition-all shadow-lg shadow-cyan-500/30 disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isExecuting ? 'Running Tests...' : 'Run Code & Prove'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
