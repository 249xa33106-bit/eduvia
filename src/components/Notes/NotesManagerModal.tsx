import React, { useState } from 'react';
import { X, Bookmark, Plus, Search, Copy, Check, Trash2, Code, FileText } from 'lucide-react';

export interface NoteItem {
  id: string;
  title: string;
  topic: string;
  tag: string;
  content: string;
  codeSnippet?: string;
  createdAt: string;
}

interface NotesManagerModalProps {
  onClose: () => void;
}

export const NotesManagerModal: React.FC<NotesManagerModalProps> = ({ onClose }) => {
  const [notes, setNotes] = useState<NoteItem[]>([
    {
      id: 'n-1',
      title: 'PyTorch Model Export to ONNX',
      topic: 'Machine Learning',
      tag: 'AI',
      content: 'Exporting PyTorch models to ONNX enables cross-platform deployment on RescueMesh edge devices with zero Python runtime dependency.',
      codeSnippet: `torch.onnx.export(model, dummy_input, "model.onnx", input_names=['input'], output_names=['output'])`,
      createdAt: '2026-09-28'
    },
    {
      id: 'n-2',
      title: 'React Custom Hook for Async Data',
      topic: 'Frontend Development',
      tag: 'React',
      content: 'Encapsulate loading states, error handling, and manual re-fetching logic inside a reusable useFetch custom hook.',
      codeSnippet: `function useFetch(url) {\n  const [data, setData] = useState(null);\n  // useEffect fetch logic...\n  return { data, loading, error };\n}`,
      createdAt: '2026-09-25'
    },
    {
      id: 'n-3',
      title: 'Kafka Consumer Group Rebalance',
      topic: 'System Design',
      tag: 'Backend',
      content: 'When a new consumer joins a group or an existing instance dies, Kafka triggers partition rebalancing via the Group Coordinator.',
      createdAt: '2026-09-22'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [isAdding, setIsAdding] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Note Form State
  const [newTitle, setNewTitle] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [newTag, setNewTag] = useState('General');
  const [newContent, setNewContent] = useState('');
  const [newCode, setNewCode] = useState('');

  const tags = ['All', 'React', 'AI', 'Backend', 'General'];

  const filteredNotes = notes.filter((n) => {
    const matchesTag = selectedTag === 'All' || n.tag.toLowerCase() === selectedTag.toLowerCase();
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const note: NoteItem = {
      id: Date.now().toString(),
      title: newTitle,
      topic: newTopic || 'General',
      tag: newTag,
      content: newContent,
      codeSnippet: newCode.trim() ? newCode : undefined,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setNotes((prev) => [note, ...prev]);
    setIsAdding(false);
    setNewTitle('');
    setNewTopic('');
    setNewTag('General');
    setNewContent('');
    setNewCode('');
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl h-[88vh] glass-panel rounded-3xl border border-indigo-500/30 shadow-2xl shadow-indigo-950/60 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-400 to-fuchsia-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm text-white">Eduvia Study Vault</h3>
              <p className="text-[11px] text-slate-400">Save key takeaways, concepts, and code snippets</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-white font-bold text-xs shadow-md hover:scale-105 transition-transform flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>New Note</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        {!isAdding && (
          <div className="p-3 bg-black/40 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes or code..."
                className="w-full bg-black/50 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
              />
            </div>

            {/* Tags */}
            <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
              {tags.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTag(t)}
                  className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all ${
                    selectedTag === t
                      ? 'bg-indigo-500/30 border border-indigo-400 text-indigo-300'
                      : 'bg-white/5 text-slate-400 border border-white/5 hover:text-white'
                  }`}
                >
                  #{t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isAdding ? (
            /* Add Note Form */
            <form onSubmit={handleAddNote} className="space-y-4 bg-black/40 p-4 rounded-2xl border border-white/10">
              <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-cyan-400" /> Create Study Note
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Note Title *"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  required
                />
                <input
                  type="text"
                  placeholder="Topic (e.g. System Design)"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400">Tag:</span>
                {['React', 'AI', 'Backend', 'General'].map((tg) => (
                  <button
                    type="button"
                    key={tg}
                    onClick={() => setNewTag(tg)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      newTag === tg
                        ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-400'
                        : 'bg-white/5 text-slate-400 border border-white/10'
                    }`}
                  >
                    #{tg}
                  </button>
                ))}
              </div>

              <textarea
                placeholder="Key concept breakdown or notes content... *"
                rows={3}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                required
              />

              <textarea
                placeholder="Optional Code Snippet..."
                rows={3}
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                className="w-full bg-black/90 font-mono text-[11px] text-emerald-300 border border-white/15 rounded-xl p-3 placeholder-slate-500 focus:outline-none focus:border-emerald-400"
              />

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-600 text-white font-bold text-xs shadow-md"
                >
                  Save Note
                </button>
              </div>
            </form>
          ) : (
            /* Notes List */
            filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-white/20 bg-black/30 space-y-3 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                          #{note.tag}
                        </span>
                        <h4 className="font-extrabold text-sm text-white">{note.title}</h4>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{note.topic} • {note.createdAt}</span>
                    </div>

                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      title="Delete note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{note.content}</p>

                  {note.codeSnippet && (
                    <div className="bg-black/90 p-3 rounded-xl border border-white/10 font-mono text-[11px] text-emerald-300 overflow-x-auto relative group">
                      <div className="flex items-center justify-between border-b border-white/10 pb-1 mb-1.5">
                        <span className="text-[9px] text-cyan-400 font-bold flex items-center gap-1">
                          <Code className="w-3 h-3" /> Code Snippet
                        </span>
                        <button
                          onClick={() => handleCopyCode(note.id, note.codeSnippet!)}
                          className="text-[9px] text-slate-400 hover:text-white flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded"
                        >
                          {copiedId === note.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" /> Copy
                            </>
                          )}
                        </button>
                      </div>
                      <pre>{note.codeSnippet}</pre>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-slate-500 text-xs">
                No study notes found matching selected filters.
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
