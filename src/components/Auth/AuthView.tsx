import React, { useState } from 'react';
import { Sparkles, Eye, EyeOff, GitBranch, ArrowRight, Lock, Mail, User, Building2, Target } from 'lucide-react';
import type { UserProfile } from '../../types/eduvia';

interface AuthViewProps {
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('Shaik Sowban');
  const [handle, setHandle] = useState('@sowban_dev');
  const [email, setEmail] = useState('sowban@gprec.ac.in');
  const [password, setPassword] = useState('••••••••••••');
  const [campus, setCampus] = useState('GPREC Campus');
  const [goal, setGoal] = useState('Become an AI/ML Engineer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const loggedInUser: UserProfile = {
      name: fullName.toUpperCase(),
      handle: handle.startsWith('@') ? handle : `@${handle}`,
      role: 'CSM • Student & Developer',
      campus: campus,
      streakDays: 32,
      totalLearnersHelped: '18.7K',
      followers: '2,480',
      projectsCount: 12,
      challengesSolved: 143,
      verifiedSkillsCount: 8,
      currentGoalTitle: goal,
      skills: [
        { name: 'Python', score: 84 },
        { name: 'DSA', score: 72 },
        { name: 'AI/ML', score: 61 },
        { name: 'React / TS', score: 92 },
        { name: 'System Design', score: 75 }
      ],
      verifiedSkillCards: [
        {
          id: 'vskill-py',
          skillName: 'PYTHON MASTERY',
          level: 'Advanced Level',
          codingScore: 92,
          problemSolvingScore: 89,
          debuggingScore: 87,
          projectsScore: 91,
          practicalTaskScore: 94,
          overallScore: 91,
          verifiedDate: 'Sep 24, 2026',
          issuer: 'EDUVIA PROOF & LUMIXORA PROVE ECOSYSTEM',
          lumixoraHash: '0x8f7a93b41c...e90a2'
        }
      ]
    };

    onLoginSuccess(loggedInUser);
  };

  const handleDemoGuestLogin = () => {
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-white flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden selection:bg-cyan-500 selection:text-black">
      {/* Ambient background glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10 animate-fadeIn">
        {/* EDUVIA BRAND LOGO & TAGLINE */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 text-white font-black text-2xl shadow-xl shadow-indigo-500/30 mb-2">
            E
          </div>
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
            EDUVIA
          </h1>
          <p className="text-xs text-indigo-300 font-semibold uppercase tracking-wider">
            The Social Learning Network
          </p>
          <p className="text-xs text-slate-400 font-mono">
            “Scroll Less. Learn More. Become More.”
          </p>
        </div>

        {/* MAIN AUTH CARD */}
        <div className="glass-panel rounded-3xl p-7 border border-white/15 shadow-2xl shadow-black/90 space-y-5">
          {/* Header Mode Switch Tabs */}
          <div className="flex items-center justify-between p-1 rounded-2xl bg-black/50 border border-white/10 text-xs font-semibold">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2.5 rounded-xl transition-all ${
                !isSignUp
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2.5 rounded-xl transition-all ${
                isSignUp
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Social Sign-In Options */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={handleDemoGuestLogin}
              className="py-2.5 px-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 font-medium flex items-center justify-center space-x-2 text-slate-200 transition-colors"
            >
              <div className="w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center font-bold text-[9px] text-white">G</div>
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={handleDemoGuestLogin}
              className="py-2.5 px-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 font-medium flex items-center justify-center space-x-2 text-slate-200 transition-colors"
            >
              <GitBranch className="w-4 h-4 text-purple-400" />
              <span>GitHub</span>
            </button>
          </div>

          {/* Separator */}
          <div className="flex items-center space-x-3 my-2">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">OR WITH EMAIL</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {isSignUp && (
              <>
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Shaik Sowban"
                      className="w-full bg-black/50 border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* Username / Handle */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Handle / Username</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-cyan-400">@</span>
                    <input
                      type="text"
                      required
                      value={handle.replace('@', '')}
                      onChange={(e) => setHandle(`@${e.target.value}`)}
                      placeholder="username"
                      className="w-full bg-black/50 border border-white/15 rounded-xl pl-8 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* College / Campus */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">College / Campus</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 w-4 h-4 text-amber-400" />
                    <select
                      value={campus}
                      onChange={(e) => setCampus(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="GPREC Campus">🏫 GPREC Campus</option>
                      <option value="IIT Bombay Hub">🏫 IIT Bombay Hub</option>
                      <option value="BITS Pilani">🏫 BITS Pilani</option>
                      <option value="Global Open Campus">🌐 Global Open Community</option>
                    </select>
                  </div>
                </div>

                {/* Target Learning Goal */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Target Learning Goal</label>
                  <div className="relative">
                    <Target className="absolute left-3 top-3 w-4 h-4 text-cyan-400" />
                    <select
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Become an AI/ML Engineer">🎯 Become an AI/ML Engineer</option>
                      <option value="Fullstack Systems Architect">🎯 Fullstack Systems Architect</option>
                      <option value="Cybersecurity Specialist">🎯 Cybersecurity Specialist</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Email / Username */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Email or Username</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sowban@gprec.ac.in"
                  className="w-full bg-black/50 border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-semibold text-slate-300">Password</label>
                {!isSignUp && (
                  <button
                    type="button"
                    onClick={() => alert('Password reset link sent to your registered email.')}
                    className="text-[10px] text-cyan-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-black/50 border border-white/15 rounded-xl pl-9 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/30 hover:scale-[1.02] transition-transform flex items-center justify-center space-x-2 mt-4"
            >
              <span>{isSignUp ? 'Join Eduvia Network' : 'Log In & Start Learning'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Instant Access Pill */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleDemoGuestLogin}
              className="w-full p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold hover:bg-indigo-500/20 transition-all flex items-center justify-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Instant Demo Sign-In (Shaik Sowban)</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-[11px] text-slate-500 font-mono space-y-1">
          <p>EDUVIA • Skill Verification & Social Learning Platform</p>
          <p className="text-[10px]">Integrated with Lumixora PROVE Protocol</p>
        </div>
      </div>
    </div>
  );
};
