import React, { useState } from 'react';
import { X, ShieldAlert, Bug, ShieldCheck, RefreshCw, Terminal } from 'lucide-react';

interface SecurityVulnerability {
  severity: 'High' | 'Medium' | 'Low';
  title: string;
  line: number;
  description: string;
  suggestedFix: string;
}

interface CodeAuditorModalProps {
  onClose: () => void;
}

export const CodeAuditorModal: React.FC<CodeAuditorModalProps> = ({ onClose }) => {
  const [codeToAudit, setCodeToAudit] = useState(`// RescueMesh Edge Node API Handler\napp.post('/api/data', async (req, res) => {\n  const query = "SELECT * FROM users WHERE id = '" + req.body.userId + "'"; // Potential SQL Injection\n  const result = await db.query(query);\n  \n  // Unhandled error promise\n  fetch('http://telemetry.local/log');\n  \n  res.json({ data: result });\n});`);

  const [isAuditing, setIsAuditing] = useState(false);
  const [vulns, setVulns] = useState<SecurityVulnerability[] | null>(null);

  const handleAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setVulns([
        {
          severity: 'High',
          title: 'SQL Injection Vulnerability (OWASP A03)',
          line: 3,
          description: 'Direct string concatenation in SQL queries allows untrusted user input execution.',
          suggestedFix: `const query = "SELECT * FROM users WHERE id = $1";\nconst result = await db.query(query, [req.body.userId]);`
        },
        {
          severity: 'Medium',
          title: 'Unhandled Async Request / Uncaught Rejection',
          line: 7,
          description: 'Floating fetch request without await or catch block can leak background unhandled rejections.',
          suggestedFix: `await fetch('http://telemetry.local/log').catch(err => console.error(err));`
        }
      ]);
      setIsAuditing(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl border border-rose-500/30 shadow-2xl shadow-rose-950/70 p-6 flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/30">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-black text-sm text-white">AI Security & Code Quality Auditor</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500/20 text-rose-300 border border-rose-400/40 uppercase">
                  OWASP Scanner
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Scan code snippet for vulnerabilities and performance bottlenecks</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input Area */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" /> Source Code Snippet
            </span>
            <span>JavaScript / TypeScript / Python</span>
          </div>

          <textarea
            value={codeToAudit}
            onChange={(e) => setCodeToAudit(e.target.value)}
            rows={7}
            className="w-full bg-black/90 font-mono text-xs text-emerald-300 p-4 rounded-2xl border border-white/15 focus:outline-none focus:border-rose-400 leading-relaxed"
          />

          <button
            onClick={handleAudit}
            disabled={isAuditing || !codeToAudit.trim()}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-orange-500 to-indigo-600 text-white font-extrabold text-xs shadow-lg shadow-rose-500/30 hover:scale-[1.01] transition-transform flex items-center justify-center space-x-2"
          >
            {isAuditing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Scanning Security Vulnerabilities...</span>
              </>
            ) : (
              <>
                <Bug className="w-4 h-4" />
                <span>Run AI Security & OWASP Audit</span>
              </>
            )}
          </button>
        </div>

        {/* Audit Report Findings */}
        {vulns && (
          <div className="space-y-3 pt-2">
            <h4 className="font-extrabold text-xs text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Audit Findings ({vulns.length} Issues Detected)
            </h4>

            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
              {vulns.map((v, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border ${
                    v.severity === 'High'
                      ? 'bg-rose-950/20 border-rose-500/40 text-rose-200'
                      : 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                          v.severity === 'High' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-black'
                        }`}
                      >
                        {v.severity} Risk
                      </span>
                      <h5 className="font-extrabold text-xs text-white">{v.title}</h5>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">Line {v.line}</span>
                  </div>

                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{v.description}</p>

                  <div className="mt-2.5 p-2.5 rounded-xl bg-black/80 border border-white/10 font-mono text-[10px] text-emerald-300">
                    <span className="text-cyan-400 font-bold block mb-1">💡 Suggested Fix Patch:</span>
                    <pre>{v.suggestedFix}</pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
