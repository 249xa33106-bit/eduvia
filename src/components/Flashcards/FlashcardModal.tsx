import React, { useState } from 'react';
import { X, Layers, RotateCw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Flashcard {
  id: string;
  category: string;
  question: string;
  answer: string;
  codeSnippet?: string;
  keyTakeaway: string;
}

interface FlashcardModalProps {
  onClose: () => void;
}

export const FlashcardModal: React.FC<FlashcardModalProps> = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const flashcards: Flashcard[] = [
    {
      id: 'fc-1',
      category: 'React & Frontend',
      question: 'What is the Virtual DOM and why does React use it?',
      answer: 'The Virtual DOM is a lightweight JS memory representation of the actual DOM. React compares the VDOM with actual DOM via diffing algorithms to batch minimum required updates.',
      codeSnippet: `// React batch update flow:\nState Change -> New VDOM Tree -> Reconciliation Diff -> Patch Minimal Real DOM`,
      keyTakeaway: 'Avoids expensive direct DOM manipulations by batching diffs.'
    },
    {
      id: 'fc-2',
      category: 'Data Structures',
      question: 'What is the time complexity of QuickSort average vs worst case?',
      answer: 'Average Case: O(N log N) with balanced pivot splits.\nWorst Case: O(N²) when array is already sorted and worst pivot is picked repeatedly.',
      codeSnippet: `def quicksort(arr):\n    if len(arr) <= 1: return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)`,
      keyTakeaway: 'Use randomized pivots or Median-of-Three to prevent O(N²) worst-case.'
    },
    {
      id: 'fc-3',
      category: 'System Design',
      question: 'What is the CAP Theorem in Distributed Systems?',
      answer: 'CAP Theorem states a distributed store can only guarantee at most TWO out of three: Consistency, Availability, Partition Tolerance.',
      keyTakeaway: 'In real-world network partition scenarios (P), you must choose between CP or AP.'
    },
    {
      id: 'fc-4',
      category: 'AI & Machine Learning',
      question: 'Difference between Overfitting and Underfitting?',
      answer: 'Underfitting: Model is too simple to capture training patterns (High Bias).\nOverfitting: Model memorizes training noise and fails to generalize (High Variance).',
      codeSnippet: `# Fix Overfitting:\n- Add L1/L2 Regularization\n- Dropout layers (e.g. p=0.3)\n- Data augmentation`,
      keyTakeaway: 'Balance model complexity using cross-validation and regularization.'
    }
  ];

  const categories = ['All', 'React & Frontend', 'Data Structures', 'System Design', 'AI & Machine Learning'];

  const filteredCards = selectedCategory === 'All'
    ? flashcards
    : flashcards.filter((c) => c.category === selectedCategory);

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleRate = (_ease: 'again' | 'hard' | 'good' | 'easy') => {
    setIsFlipped(false);
    setReviewedCount((prev) => prev + 1);

    if (currentIndex + 1 < filteredCards.length) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 200);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setReviewedCount(0);
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl glass-panel rounded-3xl border border-fuchsia-500/30 shadow-2xl shadow-fuchsia-950/60 p-6 flex flex-col space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-fuchsia-400 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-fuchsia-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Spaced Repetition Flashcards</h3>
              <p className="text-[11px] text-slate-400">Master core concepts with active recall</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIndex(0);
                setIsFlipped(false);
                setIsCompleted(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                selectedCategory === cat
                  ? 'bg-fuchsia-500/25 border border-fuchsia-400 text-fuchsia-300 shadow-md'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {!isCompleted && currentCard ? (
          <>
            {/* Progress Counter */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Card {currentIndex + 1} of {filteredCards.length}</span>
              <span className="text-fuchsia-300 font-semibold">{currentCard.category}</span>
            </div>

            {/* Flashcard 3D Card Display */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="cursor-pointer min-h-[260px] rounded-2xl border border-white/15 p-6 bg-gradient-to-b from-white/10 via-black to-slate-950 flex flex-col justify-between shadow-2xl relative transition-transform hover:scale-[1.01]"
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="uppercase tracking-wider font-mono font-bold text-cyan-400">
                  {isFlipped ? 'Answer & Explanation' : 'Question / Concept'}
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <RotateCw className="w-3.5 h-3.5" /> Click to flip
                </span>
              </div>

              {!isFlipped ? (
                /* Front Side: Question */
                <div className="my-auto py-6">
                  <h4 className="text-lg font-extrabold text-white leading-snug">
                    {currentCard.question}
                  </h4>
                </div>
              ) : (
                /* Back Side: Answer */
                <div className="my-auto space-y-3 py-3">
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {currentCard.answer}
                  </p>

                  {currentCard.codeSnippet && (
                    <div className="bg-black/90 p-3 rounded-xl border border-white/10 font-mono text-[10px] text-emerald-300 overflow-x-auto">
                      <pre>{currentCard.codeSnippet}</pre>
                    </div>
                  )}

                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-[11px] text-cyan-200 font-semibold">
                    💡 <span className="font-bold">Key Takeaway:</span> {currentCard.keyTakeaway}
                  </div>
                </div>
              )}

              <div className="text-center text-[10px] text-slate-500">
                {isFlipped ? 'Rate difficulty below to schedule next review' : 'Tap card to reveal answer'}
              </div>
            </div>

            {/* Rating Action Buttons */}
            {isFlipped ? (
              <div className="grid grid-cols-4 gap-2 pt-2">
                <button
                  onClick={() => handleRate('again')}
                  className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500/30 font-bold text-xs flex flex-col items-center"
                >
                  <span>Again</span>
                  <span className="text-[9px] opacity-75 font-mono">1 min</span>
                </button>

                <button
                  onClick={() => handleRate('hard')}
                  className="p-2.5 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-300 hover:bg-orange-500/30 font-bold text-xs flex flex-col items-center"
                >
                  <span>Hard</span>
                  <span className="text-[9px] opacity-75 font-mono">1 day</span>
                </button>

                <button
                  onClick={() => handleRate('good')}
                  className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 font-bold text-xs flex flex-col items-center"
                >
                  <span>Good</span>
                  <span className="text-[9px] opacity-75 font-mono">3 days</span>
                </button>

                <button
                  onClick={() => handleRate('easy')}
                  className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 font-bold text-xs flex flex-col items-center"
                >
                  <span>Easy</span>
                  <span className="text-[9px] opacity-75 font-mono">7 days</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsFlipped(true)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-indigo-600 text-white font-extrabold text-xs shadow-lg shadow-fuchsia-500/30 hover:scale-[1.02] transition-transform"
              >
                Reveal Answer
              </button>
            )}
          </>
        ) : (
          /* Session Completion State */
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 mx-auto flex items-center justify-center text-white shadow-xl shadow-emerald-500/40">
              <Award className="w-9 h-9" />
            </div>

            <div>
              <h4 className="text-xl font-black text-white">Deck Completed! 🎉</h4>
              <p className="text-xs text-slate-300 mt-1">
                You reviewed {reviewedCount} flashcards. Spaced repetition algorithm will schedule your next review session.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-extrabold transition-all"
            >
              Study Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
