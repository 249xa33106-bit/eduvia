import React, { useState } from 'react';
import { X, Award, ShieldCheck, CheckCircle2, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { VerifiedSkillCard } from '../../types/eduvia';

interface ProveModalProps {
  topic: string;
  onClose: () => void;
  onSkillVerified: (card: VerifiedSkillCard) => void;
}

export const ProveModal: React.FC<ProveModalProps> = ({ topic, onClose, onSkillVerified }) => {
  const [assessmentStep, setAssessmentStep] = useState<'intro' | 'evaluating' | 'verified'>('intro');
  const [verifiedBadge, setVerifiedBadge] = useState<VerifiedSkillCard | null>(null);

  const startAssessment = () => {
    setAssessmentStep('evaluating');
    setTimeout(() => {
      const newBadge: VerifiedSkillCard = {
        id: `vskill-${Date.now()}`,
        skillName: `${topic.toUpperCase()} VERIFIED SKILL`,
        level: 'Verified Pro Level',
        codingScore: Math.floor(88 + Math.random() * 8),
        problemSolvingScore: Math.floor(85 + Math.random() * 8),
        debuggingScore: Math.floor(84 + Math.random() * 8),
        projectsScore: Math.floor(90 + Math.random() * 6),
        practicalTaskScore: Math.floor(91 + Math.random() * 7),
        overallScore: 92,
        verifiedDate: 'Just Now',
        issuer: 'EDUVIA PROOF & LUMIXORA PROVE ECOSYSTEM',
        lumixoraHash: `0x${Math.random().toString(16).substring(2, 12)}...${Math.random().toString(16).substring(2, 6)}`
      };
      setVerifiedBadge(newBadge);
      setAssessmentStep('verified');
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
      onSkillVerified(newBadge);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl border border-emerald-500/40 p-6 shadow-2xl shadow-emerald-950/60">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                🏆 Proof of Skill Assessment
              </h3>
              <p className="text-xs text-slate-400">Earn EDUVIA VERIFIED SKILL Credential</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {assessmentStep === 'intro' && (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <Award className="w-9 h-9" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1">Verify Your Mastery in {topic}</h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                EDUVIA proof engine aggregates your quiz scores, code submissions, project contributions, and practical tasks into an immutable proof card.
              </p>
            </div>

            <div className="glass-card p-4 text-left text-xs space-y-2 border border-white/10">
              <div className="flex items-center justify-between text-slate-300">
                <span>Evaluated Metric:</span>
                <span className="font-bold text-white">5 Core Skill Pillars</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Verification Authority:</span>
                <span className="font-bold text-emerald-400">Lumixora PROVE Network</span>
              </div>
            </div>

            <button
              onClick={startAssessment}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/30 hover:scale-[1.02] transition-transform"
            >
              Run Automated Skill Audit & Generate Proof
            </button>
          </div>
        )}

        {assessmentStep === 'evaluating' && (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full border-4 border-emerald-500/30 border-t-emerald-400 animate-spin mx-auto" />
            <h4 className="text-sm font-bold text-white">Aggregating telemetry & code verification...</h4>
            <p className="text-xs text-slate-400">Minting cryptographically verified skill card...</p>
          </div>
        )}

        {assessmentStep === 'verified' && verifiedBadge && (
          <div className="space-y-4 animate-scaleUp">
            {/* Visual Credential Card */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-500/60 bg-gradient-to-b from-[#0e1c17] via-[#09120e] to-[#040806] p-5 shadow-2xl shadow-emerald-900/50">
              {/* Background Glow & Watermark */}
              <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3 mb-4">
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-extrabold text-emerald-400">
                    EDUVIA VERIFIED SKILL
                  </span>
                  <h4 className="text-lg font-black text-white tracking-wide">{verifiedBadge.skillName}</h4>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  VERIFIED
                </div>
              </div>

              {/* Metrics Table */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex justify-between">
                  <span className="text-slate-400">Coding</span>
                  <span className="font-bold text-emerald-300">{verifiedBadge.codingScore}</span>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex justify-between">
                  <span className="text-slate-400">Problem Solving</span>
                  <span className="font-bold text-emerald-300">{verifiedBadge.problemSolvingScore}</span>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex justify-between">
                  <span className="text-slate-400">Debugging</span>
                  <span className="font-bold text-emerald-300">{verifiedBadge.debuggingScore}</span>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex justify-between">
                  <span className="text-slate-400">Projects</span>
                  <span className="font-bold text-emerald-300">{verifiedBadge.projectsScore}</span>
                </div>
                <div className="col-span-2 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex justify-between">
                  <span className="text-emerald-200 font-medium">Practical Task Score</span>
                  <span className="font-extrabold text-emerald-300">{verifiedBadge.practicalTaskScore}</span>
                </div>
              </div>

              {/* Footer info */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-white/10 font-mono">
                <span>Lumixora Hash: {verifiedBadge.lumixoraHash}</span>
                <span className="text-emerald-400 font-semibold">{verifiedBadge.verifiedDate}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white"
              >
                Close
              </button>
              <button
                onClick={() => alert(`Copied Verified Credential Link: https://eduvia.app/verify/${verifiedBadge.id}`)}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs flex items-center justify-center space-x-2"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Credential</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
