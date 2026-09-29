import React, { useState } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';

interface Message {
  sender: 'user' | 'peer';
  text: string;
  time: string;
}

interface Contact {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  role: string;
  unread: number;
}

interface DirectMessagesModalProps {
  onClose: () => void;
}

export const DirectMessagesModal: React.FC<DirectMessagesModalProps> = ({ onClose }) => {
  const contacts: Contact[] = [
    {
      id: 'cnt-1',
      name: 'Dr. Sarah Chen',
      handle: '@sarah_ai',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop',
      role: 'Principal AI Scientist & Mentor',
      unread: 1
    },
    {
      id: 'cnt-2',
      name: 'Ayesha Khan',
      handle: '@ayesha_gis',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop',
      role: 'RescueMesh Collaborator',
      unread: 0
    },
    {
      id: 'cnt-3',
      name: 'Prof. Alex Rivera',
      handle: '@alex_deeplearning',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop',
      role: 'Stanford AI Researcher',
      unread: 0
    }
  ];

  const [activeContact, setActiveContact] = useState<Contact>(contacts[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'peer',
      text: 'Hey Sowban! I reviewed your RescueMesh edge AI setup. Great job optimizing the TensorFlow Lite micro model!',
      time: '10:42 AM'
    },
    {
      sender: 'user',
      text: 'Thank you Dr. Sarah! I am currently completing the Binary Search and Python list comprehension challenges on Eduvia.',
      time: '10:44 AM'
    },
    {
      sender: 'peer',
      text: 'Awesome! Have you tested the verified proof credential export yet?',
      time: '10:45 AM'
    }
  ]);

  const [inputMsg, setInputMsg] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg: Message = {
      sender: 'user',
      text: inputMsg,
      time: 'Just Now'
    };

    setMessages((prev) => [...prev, newMsg]);
    const userPrompt = inputMsg;
    setInputMsg('');

    // Auto mentor reply
    setTimeout(() => {
      const reply: Message = {
        sender: 'peer',
        text: `Got it! Learning telemetry for ${userPrompt} has been logged to your Eduvia Skill Graph. Keep building!`,
        time: 'Just Now'
      };
      setMessages((prev) => [...prev, reply]);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl h-[85vh] glass-panel rounded-3xl border border-indigo-500/30 shadow-2xl shadow-indigo-950/60 flex flex-col sm:flex-row overflow-hidden">
        {/* Left Contacts Sidebar */}
        <div className="w-full sm:w-1/3 bg-black/50 border-b sm:border-b-0 sm:border-r border-white/10 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-cyan-400" />
              <span>Eduvia DMs</span>
            </h3>
            <button onClick={onClose} className="sm:hidden text-slate-400">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1 overflow-y-auto max-h-[25vh] sm:max-h-[70vh]">
            {contacts.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveContact(c)}
                className={`w-full p-2.5 rounded-2xl flex items-center space-x-2.5 transition-all text-left ${
                  activeContact.id === c.id
                    ? 'bg-indigo-600/30 border border-indigo-500/40 text-white font-bold'
                    : 'bg-white/5 border border-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-full object-cover border border-cyan-400 shrink-0" />
                <div className="overflow-hidden flex-1">
                  <h4 className="text-xs font-bold text-white truncate">{c.name}</h4>
                  <p className="text-[10px] text-slate-400 truncate">{c.handle}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Active Chat Window */}
        <div className="flex-1 flex flex-col justify-between p-4 bg-black/20">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
            <div className="flex items-center space-x-3">
              <img
                src={activeContact.avatar}
                alt={activeContact.name}
                className="w-9 h-9 rounded-full object-cover border border-purple-400"
              />
              <div>
                <h4 className="font-bold text-xs text-white">{activeContact.name}</h4>
                <span className="text-[10px] text-slate-400">{activeContact.role}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto space-y-3 p-1">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-medium rounded-br-none shadow-md shadow-indigo-500/20'
                      : 'bg-white/10 border border-white/10 text-slate-200 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-slate-500 font-mono mt-0.5">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendMessage} className="relative pt-3 border-t border-white/10">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder={`Message ${activeContact.name}...`}
              className="w-full bg-black/60 border border-white/15 rounded-2xl pl-4 pr-12 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-4 p-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
