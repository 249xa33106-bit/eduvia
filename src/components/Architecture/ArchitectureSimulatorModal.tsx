import React, { useState } from 'react';
import { X, Cpu, Plus, Sparkles, RefreshCw, ShieldCheck, Zap, Server, Database, Cloud, Layers } from 'lucide-react';

interface ArchNode {
  id: string;
  type: 'frontend' | 'gateway' | 'service' | 'cache' | 'queue' | 'database';
  label: string;
  status: 'healthy' | 'warning' | 'error';
  latency: string;
}

interface ArchitectureSimulatorModalProps {
  onClose: () => void;
}

export const ArchitectureSimulatorModal: React.FC<ArchitectureSimulatorModalProps> = ({ onClose }) => {
  const [nodes, setNodes] = useState<ArchNode[]>([
    { id: '1', type: 'frontend', label: 'React Client SPA', status: 'healthy', latency: '12ms' },
    { id: '2', type: 'gateway', label: 'NGINX API Gateway', status: 'healthy', latency: '4ms' },
    { id: '3', type: 'service', label: 'Auth & User Microservice', status: 'healthy', latency: '28ms' },
    { id: '4', type: 'cache', label: 'Redis Cache Layer', status: 'healthy', latency: '2ms' },
    { id: '5', type: 'database', label: 'PostgreSQL DB Cluster', status: 'healthy', latency: '15ms' }
  ]);

  const [auditReport, setAuditReport] = useState<{
    score: number;
    throughput: string;
    bottlenecks: string[];
    recommendations: string[];
  } | null>(null);

  const [isAuditing, setIsAuditing] = useState(false);

  const availableComponents = [
    { type: 'queue' as const, label: 'Apache Kafka Queue', latency: '5ms' },
    { type: 'service' as const, label: 'TensorFlow Edge AI Worker', latency: '45ms' },
    { type: 'cache' as const, label: 'CDN Edge Cache', latency: '3ms' }
  ];

  const handleAddComponent = (comp: { type: ArchNode['type']; label: string; latency: string }) => {
    const newNode: ArchNode = {
      id: Date.now().toString(),
      type: comp.type,
      label: comp.label,
      status: 'healthy',
      latency: comp.latency
    };
    setNodes((prev) => [...prev, newNode]);
  };

  const handleRemoveNode = (id: string) => {
    setNodes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleRunAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setAuditReport({
        score: 94,
        throughput: '18,500 req/sec',
        bottlenecks: [
          'PostgreSQL DB write ops could spike under 50k concurrent users.',
          'Consider adding Kafka async queue before heavy AI inference tasks.'
        ],
        recommendations: [
          '✅ Redis caching layer successfully mitigates 80% read latency.',
          '✅ NGINX API Gateway handles rate limiting & SSL termination.',
          '💡 Deploy read-replicas for PostgreSQL to scale analytics queries.'
        ]
      });
      setIsAuditing(false);
    }, 1200);
  };

  const getNodeIcon = (type: ArchNode['type']) => {
    switch (type) {
      case 'frontend':
        return <Cloud className="w-4 h-4 text-cyan-400" />;
      case 'gateway':
        return <Layers className="w-4 h-4 text-indigo-400" />;
      case 'service':
        return <Cpu className="w-4 h-4 text-fuchsia-400" />;
      case 'cache':
        return <Zap className="w-4 h-4 text-amber-400" />;
      case 'queue':
        return <Server className="w-4 h-4 text-emerald-400" />;
      case 'database':
        return <Database className="w-4 h-4 text-rose-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl border border-cyan-500/30 shadow-2xl shadow-cyan-950/70 p-6 flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-fuchsia-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-black text-sm text-white">System Architecture Simulator</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 uppercase">
                  Interactive Canvas
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Design microservices & run real-time AI latency audits</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Component Palette & Actions */}
        <div className="flex items-center justify-between bg-black/40 p-3 rounded-2xl border border-white/5 flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-bold">Add Service:</span>
            {availableComponents.map((comp, idx) => (
              <button
                key={idx}
                onClick={() => handleAddComponent(comp)}
                className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-[11px] font-semibold text-slate-300 hover:text-white hover:border-cyan-400 transition-all flex items-center space-x-1"
              >
                <Plus className="w-3 h-3 text-cyan-400" />
                <span>{comp.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleRunAudit}
            disabled={isAuditing}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/30 hover:scale-105 transition-transform flex items-center space-x-1.5"
          >
            {isAuditing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Auditing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                <span>AI Architecture Audit</span>
              </>
            )}
          </button>
        </div>

        {/* Visual Architecture Topology Canvas */}
        <div className="bg-black/80 rounded-2xl border border-white/15 p-6 min-h-[220px] relative overflow-hidden flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
            {nodes.map((node, idx) => (
              <React.Fragment key={node.id}>
                <div className="group relative p-3.5 rounded-2xl glass-panel border border-cyan-500/40 bg-gradient-to-b from-cyan-500/10 to-indigo-950/40 text-center min-w-[130px] shadow-lg hover:scale-105 transition-transform">
                  <div className="flex items-center justify-center space-x-1.5 mb-1">
                    {getNodeIcon(node.type)}
                    <span className="text-[10px] font-bold text-slate-400 font-mono">{node.latency}</span>
                  </div>
                  <h5 className="font-extrabold text-xs text-white leading-tight">{node.label}</h5>
                  
                  <button
                    onClick={() => handleRemoveNode(node.id)}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500/80 text-white text-[10px] hidden group-hover:flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>

                {idx < nodes.length - 1 && (
                  <div className="hidden sm:flex items-center text-cyan-400/60 font-mono text-xs animate-pulse">
                    ──►
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Audit Results Panel */}
        {auditReport && (
          <div className="bg-black/60 p-4 rounded-2xl border border-emerald-500/30 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h4 className="font-extrabold text-xs text-white">AI Architecture Inspection Report</h4>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                Score: {auditReport.score}/100 • Max Throughput: {auditReport.throughput}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <h5 className="font-bold text-amber-300 text-[11px]">Potential Bottlenecks</h5>
                {auditReport.bottlenecks.map((b, i) => (
                  <p key={i} className="text-slate-300 text-[11px] leading-relaxed">⚠️ {b}</p>
                ))}
              </div>

              <div className="space-y-1">
                <h5 className="font-bold text-emerald-300 text-[11px]">AI Recommendations</h5>
                {auditReport.recommendations.map((r, i) => (
                  <p key={i} className="text-slate-300 text-[11px] leading-relaxed">{r}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
