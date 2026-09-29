import React, { useState } from 'react';
import { X, Send, Bot, Sparkles, Code, Lightbulb, Copy, Check, RefreshCw } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  codeSnippet?: string;
  timestamp: string;
}

interface AICompanionModalProps {
  onClose: () => void;
  initialTopic?: string;
}

export const AICompanionModal: React.FC<AICompanionModalProps> = ({ onClose, initialTopic }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: initialTopic
        ? `Hello! I'm your Eduvia AI Study Companion. How can I help you master **${initialTopic}** today? Ask me any conceptual question or ask for code examples!`
        : `👋 Hi! I'm your Eduvia AI Tutor. I can help explain concepts, write code snippets, generate practice problems, or debug your code. What are we studying today?`,
      timestamp: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const presets = [
    { label: '⚡ Explain React Hooks', prompt: 'Explain the difference between useEffect and useMemo with a simple code example.' },
    { label: '🔍 Binary Search Logic', prompt: 'How does Binary Search achieve O(log n) time complexity? Show a Python implementation.' },
    { label: '🧠 Neural Net Basics', prompt: 'What is Backpropagation in Deep Learning in simple terms?' },
    { label: '🚀 System Design Tip', prompt: 'What are the main principles of designing a high-throughput microservices architecture?' }
  ];

  const generateAIResponse = (prompt: string): { text: string; codeSnippet?: string } => {
    const p = prompt.toLowerCase();

    if (p.includes('react') || p.includes('hook') || p.includes('useeffect')) {
      return {
        text: `### React Hooks Core Concept\n- **useEffect**: Performs side effects (data fetching, subscriptions) after rendering.\n- **useMemo**: Memoizes computed values to prevent expensive calculations on re-render.\n- **useCallback**: Memoizes function definitions.`,
        codeSnippet: `import { useState, useMemo } from 'react';\n\nfunction HeavyComponent({ items }) {\n  const [filter, setFilter] = useState('');\n  \n  // Heavy calculation memoized\n  const filteredItems = useMemo(() => {\n    return items.filter(item => item.name.includes(filter));\n  }, [items, filter]);\n\n  return <div>{filteredItems.length} items matched</div>;\n}`
      };
    } else if (p.includes('binary search') || p.includes('log n') || p.includes('search')) {
      return {
        text: `### Binary Search (O(log N))\nBinary Search works on **sorted arrays** by dividing the search interval in half repeatedly until target is found or range is empty.`,
        codeSnippet: `def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1`
      };
    } else if (p.includes('neural') || p.includes('backprop') || p.includes('deep learning')) {
      return {
        text: `### Backpropagation Simplified\nBackpropagation is the gradient calculation process in neural networks using the **Chain Rule** calculus:\n1. **Forward Pass**: Compute outputs and loss.\n2. **Backward Pass**: Compute gradient of loss with respect to each weight.\n3. **Optimizer Step**: Update weights via $W_{new} = W_{old} - \\alpha \\cdot \\nabla L$.`
      };
    } else if (p.includes('system design') || p.includes('microservice') || p.includes('architecture')) {
      return {
        text: `### Core System Design Principles\n1. **Decoupling**: Use Message Queues (Kafka/RabbitMQ) for asynchronous processing.\n2. **Caching Layer**: Redis/Memcached to reduce DB read latency.\n3. **Load Balancing**: NGINX / Cloud ELB with round-robin or least-connections routing.\n4. **Database Sharding**: Partition databases horizontally across regions.`
      };
    }

    return {
      text: `Great question! **${prompt}** is a core concept in modern tech. Here is a breakdown:\n\n1. **Key Insight**: Break the problem down into smaller atomic steps.\n2. **Best Practice**: Write clean, testable modular functions.\n3. **Optimization**: Avoid premature optimization; profile execution runtime first.`,
      codeSnippet: `// Example helper pattern for ${prompt.slice(0, 20)}\nasync function processConceptData(payload) {\n  console.log("Processing learning payload:", payload);\n  return { status: "success", timestamp: new Date().toISOString() };\n}`
    };
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAIResponse(text);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: response.text,
        codeSnippet: response.codeSnippet,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl h-[88vh] glass-panel rounded-3xl border border-cyan-500/30 shadow-2xl shadow-cyan-950/60 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-950/80 via-slate-900 to-indigo-950/80 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 animate-pulse">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-black text-sm text-white tracking-wide">Eduvia AI Tutor</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  Gemini Powered
                </span>
              </div>
              <p className="text-[11px] text-slate-400">24/7 AI Concept Assistant & Code Mentor</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Preset Prompt Chips */}
        <div className="px-4 py-2.5 bg-black/40 border-b border-white/5 flex items-center space-x-2 overflow-x-auto no-scrollbar">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(preset.prompt)}
              className="shrink-0 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-semibold text-slate-300 hover:text-white hover:bg-cyan-500/15 hover:border-cyan-500/40 transition-all flex items-center gap-1.5"
            >
              <Lightbulb className="w-3.5 h-3.5 text-cyan-400" />
              <span>{preset.label}</span>
            </button>
          ))}
        </div>

        {/* Chat Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center space-x-2 mb-1">
                {m.sender === 'ai' ? (
                  <span className="text-[10px] font-bold text-cyan-400 flex items-center gap-1">
                    <Bot className="w-3 h-3" /> Eduvia AI
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-slate-400">You</span>
                )}
                <span className="text-[9px] text-slate-500 font-mono">{m.timestamp}</span>
              </div>

              <div
                className={`p-4 rounded-2xl text-xs leading-relaxed max-w-[90%] sm:max-w-[85%] ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-medium rounded-tr-none shadow-lg shadow-indigo-500/20'
                    : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>

                {m.codeSnippet && (
                  <div className="mt-3 rounded-xl bg-black/80 border border-white/15 p-3 overflow-x-auto relative group">
                    <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold flex items-center gap-1">
                        <Code className="w-3 h-3" /> Code Example
                      </span>
                      <button
                        onClick={() => handleCopyCode(m.id, m.codeSnippet!)}
                        className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-lg border border-white/10"
                      >
                        {copiedId === m.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copy Code
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="font-mono text-[11px] text-emerald-300 leading-relaxed">
                      {m.codeSnippet}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Eduvia AI is thinking...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-black/60 border-t border-white/10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about coding, algorithms, system design..."
              className="flex-1 bg-black/80 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all flex items-center space-x-1"
            >
              <span>Ask</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
