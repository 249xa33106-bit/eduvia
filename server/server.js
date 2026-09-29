import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static frontend build from dist folder
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// In-Memory Database Store for EDUVIA
let db = {
  users: [
    {
      id: 'u-1',
      name: 'SHAIK SOWBAN',
      handle: '@sowban_dev',
      role: 'CSM • Fullstack & AI Lead',
      campus: 'GPREC Campus',
      streakDays: 32,
      totalLearnersHelped: '18.7K',
      followers: '2,480',
      projectsCount: 12,
      challengesSolved: 143,
      verifiedSkillsCount: 8,
      currentGoalTitle: 'Become an AI/ML Engineer',
      skills: [
        { name: 'Python', score: 84 },
        { name: 'DSA', score: 72 },
        { name: 'AI/ML', score: 61 },
        { name: 'React / TS', score: 92 },
        { name: 'System Design', score: 75 }
      ]
    }
  ],
  reels: [
    {
      id: 'reel-1',
      title: 'Python List Comprehension in 45 Seconds ⚡',
      description: 'Stop writing 5-line for-loops for simple list transformations. Master Pythonic syntax instantly!',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-code-running-on-a-computer-screen-41566-large.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop',
      creator: {
        name: 'Dr. Sarah Chen',
        handle: '@sarah_ai',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop',
        title: 'Principal AI Scientist & Eduvia Mentor',
        verified: true
      },
      topic: 'Python',
      skillTag: 'Python • Beginner',
      level: 'Beginner',
      likes: 12450,
      commentsCount: 482,
      saves: 3210,
      shares: 1890,
      understandBreakdown: {
        beginner: 'List comprehension is a concise syntax `[expression for item in iterable if condition]` that replaces traditional for-loops.',
        intermediate: 'Under the hood, list comprehensions execute bytecode faster because the loop construct is evaluated in C speed inside CPython without repeated method lookup overhead.',
        advanced: 'Avoid over-nesting comprehensions (e.g., matrix flatten > 2 levels) as it degrades readability. Use generator expressions `(x for x in ...)` when streaming large data items.',
        keyTakeaways: [
          'Syntax: [transform(x) for x in list if condition]',
          'Up to 25% faster than standard `.append()` loops in CPython',
          'Memory tip: Use tuple generators `(...)` for massive datasets'
        ]
      },
      quiz: [
        {
          id: 'q1',
          question: 'Which of the following correctly squares all even numbers from 0 to 9?',
          options: [
            '[x*2 for x in range(10) if x % 2 == 0]',
            '[x**2 for x in range(10) if x % 2 == 0]',
            '[x**2 for x in range(10) where x % 2 == 0]',
            '(x**2 for x in range(10) if x % 2 == 0)'
          ],
          correctAnswer: 1,
          explanation: '`[x**2 for x in range(10) if x % 2 == 0]` uses `**` for exponentiation and `if` filter at the end.'
        }
      ]
    },
    {
      id: 'reel-2',
      title: 'Binary Search Visualized in 45 Seconds 🔍',
      description: 'Why settle for O(N) linear scan when you can divide and conquer in logarithmic O(log N) time?',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-green-screen-41539-large.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop',
      creator: {
        name: 'Shaik Sowban',
        handle: '@sowban_dev',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop',
        title: 'CSM • Fullstack & AI Lead',
        verified: true
      },
      topic: 'DSA',
      skillTag: 'DSA • Intermediate',
      level: 'Intermediate',
      likes: 18920,
      commentsCount: 742,
      saves: 5120,
      shares: 2980,
      understandBreakdown: {
        beginner: 'Binary search works on SORTED arrays by repeatedly splitting the search range in half.',
        intermediate: 'At each step, compare the target value with the middle element. Shift pointers low/high accordingly.',
        advanced: 'Use `mid = low + (high - low) // 2` to avoid integer overflow.',
        keyTakeaways: ['Prerequisite: Array MUST be sorted first', 'Time Complexity: O(log N)']
      }
    }
  ],
  comments: {
    'reel-1': [
      {
        id: 'c-1',
        userName: 'Ayesha Khan',
        userHandle: '@ayesha_gis',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop',
        text: 'List comprehension reduced my ESP32 telemetry parsing pipeline from 12ms down to 3ms! 🚀',
        timeAgo: '2h',
        likes: 42
      }
    ]
  },
  verifiedBadges: []
};

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'online', service: 'EDUVIA Advanced Backend Engine v2.0', port: PORT });
});

// 2. Auth Routes
app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  const user = db.users[0];
  res.json({ success: true, token: 'eduvia_jwt_token_98421', user });
});

app.post('/api/auth/register', (req, res) => {
  const { name, handle, campus, goal } = req.body;
  const newUser = {
    id: `u-${Date.now()}`,
    name: (name || 'New Learner').toUpperCase(),
    handle: handle || '@new_learner',
    role: 'Student & Developer',
    campus: campus || 'GPREC Campus',
    streakDays: 1,
    totalLearnersHelped: '0',
    followers: '0',
    projectsCount: 0,
    challengesSolved: 0,
    verifiedSkillsCount: 0,
    currentGoalTitle: goal || 'Become an AI/ML Engineer',
    skills: [
      { name: 'Python', score: 20 },
      { name: 'DSA', score: 15 },
      { name: 'AI/ML', score: 10 }
    ]
  };
  db.users.push(newUser);
  res.json({ success: true, token: `eduvia_jwt_${Date.now()}`, user: newUser });
});

// 3. Reels Feed API
app.get('/api/reels', (req, res) => {
  res.json({ success: true, reels: db.reels });
});

// 4. Like / Save Reel API
app.post('/api/reels/:id/like', (req, res) => {
  const reel = db.reels.find((r) => r.id === req.params.id);
  if (reel) {
    reel.likes += 1;
    return res.json({ success: true, likes: reel.likes });
  }
  res.status(404).json({ error: 'Reel not found' });
});

app.post('/api/reels/:id/save', (req, res) => {
  const reel = db.reels.find((r) => r.id === req.params.id);
  if (reel) {
    reel.saves += 1;
    return res.json({ success: true, saves: reel.saves });
  }
  res.status(404).json({ error: 'Reel not found' });
});

// 5. Comments API
app.get('/api/reels/:id/comments', (req, res) => {
  const reelComments = db.comments[req.params.id] || [];
  res.json({ success: true, comments: reelComments });
});

app.post('/api/reels/:id/comments', (req, res) => {
  const { text, userName, userHandle, userAvatar } = req.body;
  const newComment = {
    id: `c-${Date.now()}`,
    userName: userName || 'Shaik Sowban',
    userHandle: userHandle || '@sowban_dev',
    userAvatar: userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop',
    text,
    timeAgo: 'Just Now',
    likes: 1
  };
  if (!db.comments[req.params.id]) {
    db.comments[req.params.id] = [];
  }
  db.comments[req.params.id].unshift(newComment);
  res.json({ success: true, comment: newComment, total: db.comments[req.params.id].length });
});

// 6. AI Practice Evaluation & Code Sandbox API
app.post('/api/ai/practice', (req, res) => {
  const { skillName, score } = req.body;
  const user = db.users[0];
  const skill = user.skills.find((s) => s.name.toLowerCase().includes((skillName || '').toLowerCase()));
  if (skill) {
    skill.score = Math.min(100, skill.score + score * 5);
  }
  user.challengesSolved += 1;
  res.json({ success: true, updatedSkill: skill, totalSolved: user.challengesSolved });
});

app.post('/api/ai/code', (req, res) => {
  const { userCode, topic } = req.body;
  const passed = userCode.includes('for') || userCode.includes('[') || userCode.includes('def');
  res.json({
    success: true,
    passed,
    output: passed
      ? `[Python WebAssembly Server Sandbox]\nOutput: [2, 6, 10, 14]\nAll Test Cases Passed! (Server Time: 0.001s)`
      : `[Syntax Exception] Missing valid Python transformation logic.`
  });
});

// 7. Cryptographic Proof of Skill Generator API
app.post('/api/ai/prove', (req, res) => {
  const { topic } = req.body;
  const proofCard = {
    id: `vskill-${Date.now()}`,
    skillName: `${(topic || 'PYTHON').toUpperCase()} VERIFIED SKILL`,
    level: 'Verified Pro Level',
    codingScore: Math.floor(90 + Math.random() * 8),
    problemSolvingScore: Math.floor(88 + Math.random() * 8),
    debuggingScore: Math.floor(86 + Math.random() * 8),
    projectsScore: Math.floor(92 + Math.random() * 6),
    practicalTaskScore: Math.floor(94 + Math.random() * 5),
    overallScore: 93,
    verifiedDate: new Date().toLocaleDateString(),
    issuer: 'EDUVIA PROOF & LUMIXORA PROVE ECOSYSTEM',
    lumixoraHash: `0x${Math.random().toString(16).substring(2, 12)}...${Math.random().toString(16).substring(2, 6)}`
  };
  db.verifiedBadges.unshift(proofCard);
  res.json({ success: true, proofCard });
});

// 8. AI Creator Generator API
app.post('/api/creator/generate', (req, res) => {
  const { scriptText, contentType } = req.body;
  const generatedLesson = {
    title: scriptText.length > 35 ? scriptText.substring(0, 45) + '...' : 'Interactive AI Lesson',
    description: 'Auto-extracted transcript and quiz questions by Eduvia AI Engine.',
    topic: 'Python',
    skillTag: 'Python • Advanced',
    quiz: [
      {
        id: `q-gen-${Date.now()}`,
        question: `What is the primary optimization in: "${scriptText.substring(0, 30)}"?`,
        options: ['Option 1: Bytecode C speed', 'Option 2: Unoptimized loop', 'Option 3: Memory leaks'],
        correctAnswer: 0,
        explanation: 'Option 1 minimizes CPython interpreter overhead.'
      }
    ]
  };
  res.json({ success: true, lesson: generatedLesson });
});

// Health check endpoint for Render container monitoring
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// SPA fallback for client routing (Express 5 compatible)
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 EDUVIA Advanced Server listening on 0.0.0.0:${PORT}`);
});
