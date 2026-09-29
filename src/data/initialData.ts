import type { ReelItem, LearningGoal, SkillNode, ProjectItem, VerifiedSkillCard, UserProfile, CampusItem, CareerOpportunity } from '../types/eduvia';

export const initialReels: ReelItem[] = [
  {
    id: 'reel-1',
    title: 'Python List Comprehension in 45 Seconds ⚡',
    description: 'Stop writing 5-line for-loops for simple list transformations. Master Pythonic syntax and CPython bytecode velocity.',
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
        question: 'Which of the following correctly squares all even numbers from 0 to 9 in Python?',
        options: [
          '[x*2 for x in range(10) if x % 2 == 0]',
          '[x**2 for x in range(10) if x % 2 == 0]',
          '[x**2 for x in range(10) where x % 2 == 0]',
          '(x**2 for x in range(10) if x % 2 == 0)'
        ],
        correctAnswer: 1,
        explanation: '`[x**2 for x in range(10) if x % 2 == 0]` uses `**` for exponentiation and an `if` filter condition.'
      },
      {
        id: 'q2',
        question: 'What is returned by `[c.upper() for c in "edu"]`?',
        options: ['"EDU"', "['E', 'D', 'U']", "['e', 'd', 'u']", 'SyntaxError'],
        correctAnswer: 1,
        explanation: 'Iterating over a string yields character elements, producing a list of capitalized characters `["E", "D", "U"]`.'
      },
      {
        id: 'q3',
        question: 'Why does a generator expression `(x for x in data)` consume less memory than a list comprehension `[x for x in data]`?',
        options: [
          'Generators compress data using gzip in memory',
          'Generators evaluate items lazily on demand, consuming O(1) memory instead of holding all items in RAM',
          'Generators store items on disk instead of RAM',
          'Generators automatically delete items after 1 second'
        ],
        correctAnswer: 1,
        explanation: 'Generators compute values on the fly (`next()`), maintaining constant O(1) memory footprint regardless of dataset size.'
      }
    ],
    codeChallenge: {
      id: 'c1',
      title: 'Filter & Double Odd Numbers',
      description: 'Write a Python list comprehension that takes `numbers = [1, 2, 3, 4, 5, 6, 7]` and returns a list containing double the value of ONLY odd numbers.',
      starterCode: `numbers = [1, 2, 3, 4, 5, 6, 7]

# Write your list comprehension below:
result = [x * 2 for x in numbers if x % 2 != 0]

print("Result:", result)`,
      solutionCode: `numbers = [1, 2, 3, 4, 5, 6, 7]
result = [x * 2 for x in numbers if x % 2 != 0]
print("Result:", result)`,
      testCases: [
        { input: '[1, 2, 3, 4, 5, 6, 7]', expected: '[2, 6, 10, 14]' }
      ],
      hint: 'Use `x * 2` as the transform expression and `x % 2 != 0` for the odd condition.'
    }
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
      intermediate: 'At each step, compare the target value with the middle element. If smaller, move high pointer to `mid - 1`. If larger, move low pointer to `mid + 1`.',
      advanced: 'Watch out for integer overflow when computing `mid`. Use `mid = low + (high - low) // 2` instead of `(low + high) // 2` in typed languages like C++/Java.',
      keyTakeaways: [
        'Prerequisite: Array MUST be sorted first',
        'Time Complexity: O(log N) vs O(N) linear search',
        '1 Million sorted items searched in ~20 operations maximum'
      ]
    },
    quiz: [
      {
        id: 'q1_bs',
        question: 'What is the maximum number of comparisons needed to search 1,024 sorted elements with Binary Search?',
        options: ['10', '512', '1024', '1'],
        correctAnswer: 0,
        explanation: '2^10 = 1,024. Therefore log2(1024) = 10 comparisons.'
      },
      {
        id: 'q2_bs',
        question: 'What happens if you run Binary Search on an UNSORTED array?',
        options: [
          'It automatically sorts it first in O(1)',
          'It produces unpredictable wrong results or fails to find existing elements',
          'It works normally but takes O(N) time',
          'Python throws an exception'
        ],
        correctAnswer: 1,
        explanation: 'Binary search logic relies on ordering invariant. Discarding half the search window on an unsorted array eliminates target elements randomly.'
      }
    ],
    codeChallenge: {
      id: 'c2',
      title: 'Implement Binary Search Index Finder',
      description: 'Complete the `binary_search(arr, target)` function to return the 0-based index of target, or -1 if not found.',
      starterCode: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        mid = low + (high - low) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
            
    return -1

# Test
nums = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print("Index of 23:", binary_search(nums, 23))`,
      solutionCode: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    while low <= high:
        mid = low + (high - low) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1
nums = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print("Index of 23:", binary_search(nums, 23))`,
      testCases: [
        { input: '[2, 5, 8, 12, 16, 23, 38, 56, 72, 91], target 23', expected: '5' }
      ],
      hint: 'Maintain `low` and `high` bounds and shift `low = mid + 1` or `high = mid - 1`.'
    }
  },
  {
    id: 'reel-3',
    title: 'Neural Networks: Activation Functions Demystified 🧠',
    description: 'Why do deep learning models need ReLU, Sigmoid, or Softmax? Non-linearity explained visually.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-programmer-working-in-a-dark-room-41565-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop',
    creator: {
      name: 'Prof. Alex Rivera',
      handle: '@alex_deeplearning',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop',
      title: 'Stanford AI Researcher & Eduvia Author',
      verified: true
    },
    topic: 'Machine Learning',
    skillTag: 'Deep Learning • Intermediate',
    level: 'Intermediate',
    likes: 24100,
    commentsCount: 930,
    saves: 8400,
    shares: 4100,
    understandBreakdown: {
      beginner: 'Activation functions introduce non-linearity so neural networks can learn complex patterns beyond simple straight lines.',
      intermediate: 'ReLU `f(x) = max(0, x)` solves the vanishing gradient problem in deep networks compared to Sigmoid.',
      advanced: 'GELU and Swish activation functions are used in modern Transformer architectures (GPT, LLaMA) because they provide smooth non-zero gradients for negative inputs.',
      keyTakeaways: [
        'Without non-linearity, a 100-layer neural network collapses into 1 linear equation',
        'ReLU output: 0 for negative inputs, x for positive inputs',
        'Softmax converts multi-class raw logits into a valid probability distribution summing to 1.0'
      ]
    },
    quiz: [
      {
        id: 'q1_nn',
        question: 'What would happen if a deep neural network used NO activation functions (linear activations only)?',
        options: [
          'It would learn non-linear patterns faster',
          'It collapses mathematically into a single linear regression model regardless of depth',
          'It causes exploding gradients immediately',
          'PyTorch throws a compile error'
        ],
        correctAnswer: 1,
        explanation: 'Matrix multiplication of multiple linear layers is mathematically equivalent to a single linear transformation `W_total * X + b_total`.'
      }
    ]
  }
];

export const initialGoals: LearningGoal[] = [
  {
    id: 'goal-ai-ml',
    title: 'Become an AI/ML Engineer',
    overallProgress: 56,
    skills: [
      { name: 'Python', score: 84 },
      { name: 'DSA', score: 72 },
      { name: 'Mathematics', score: 61 },
      { name: 'Machine Learning', score: 43, gapWarning: true },
      { name: 'Deep Learning', score: 28, gapWarning: true },
      { name: 'Projects', score: 37, gapWarning: true },
      { name: 'Interview', score: 21, gapWarning: true }
    ]
  },
  {
    id: 'goal-fullstack',
    title: 'Fullstack Systems Architect',
    overallProgress: 74,
    skills: [
      { name: 'JavaScript / TS', score: 92 },
      { name: 'React / Next.js', score: 88 },
      { name: 'Node.js & APIs', score: 81 },
      { name: 'System Design', score: 65 },
      { name: 'DevOps & Docker', score: 54, gapWarning: true },
      { name: 'Database Architecture', score: 78 }
    ]
  }
];

export const initialSkillTree: SkillNode = {
  id: 'aiml-root',
  name: 'AI/ML Core',
  score: 64,
  targetScore: 100,
  category: 'core',
  children: [
    {
      id: 'python-branch',
      name: 'Python Mastery',
      score: 84,
      targetScore: 100,
      category: 'core',
      children: [
        { id: 'python-oop', name: 'OOP Concepts', score: 78, targetScore: 90, category: 'subskill' },
        { id: 'python-dsa', name: 'DSA & Algorithms', score: 72, targetScore: 85, category: 'subskill' },
        { id: 'python-apis', name: 'FastAPI & Async', score: 66, targetScore: 80, category: 'tool' }
      ]
    },
    {
      id: 'math-branch',
      name: 'Math & Stats',
      score: 61,
      targetScore: 100,
      category: 'core',
      children: [
        { id: 'linear-algebra', name: 'Linear Algebra', score: 68, targetScore: 85, category: 'subskill' },
        { id: 'calculus', name: 'Multivariable Calculus', score: 55, targetScore: 80, category: 'subskill' },
        { id: 'probability', name: 'Probability & Bayes', score: 60, targetScore: 80, category: 'subskill' }
      ]
    },
    {
      id: 'data-branch',
      name: 'Data Engineering',
      score: 72,
      targetScore: 100,
      category: 'core',
      children: [
        { id: 'pandas-numpy', name: 'NumPy & Pandas', score: 88, targetScore: 95, category: 'tool' },
        { id: 'sql-queries', name: 'Advanced SQL', score: 76, targetScore: 90, category: 'tool' },
        { id: 'vector-db', name: 'Vector DBs (Chroma/Pinecone)', score: 52, targetScore: 80, category: 'tool' }
      ]
    }
  ]
};

export const initialProjects: ProjectItem[] = [
  {
    id: 'proj-rescuemesh',
    title: '🚨 RescueMesh',
    tagline: 'Decentralized IoT Mesh Network with Edge AI for Natural Disaster Victim Detection',
    problem: 'During floods, earthquakes, and tower blackouts, traditional cellular connectivity fails completely, leaving emergency response teams blind to trapped victims.',
    solution: 'RescueMesh deploys autonomous ESP32 mesh nodes paired with low-power thermal sensors. On-device edge AI runs lightweight inference to identify thermal heartbeats and relays location vectors hop-by-hop to rescue commanders without internet.',
    demoUrl: 'https://rescuemesh.eduvia.app',
    architectureNotes: 'ESP32 LoRa Nodes -> ESP-NOW Mesh Protocol -> Edge AI TensorFlow Lite micro -> WebRTC Ground Station Dashboard',
    techStack: ['Python', 'IoT', 'Edge AI', 'GIS', 'C++', 'ESP32 Mesh'],
    githubUrl: 'https://github.com/eduvia-projects/rescuemesh',
    team: [
      { name: 'Shaik Sowban', role: 'AI & Mesh Firmware Lead', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop' },
      { name: 'Ayesha Khan', role: 'Frontend & GIS Map Lead', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop' },
      { name: 'Rohit Sharma', role: 'Hardware & Enclosure Design', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop' }
    ],
    skillsDemonstrated: ['Python', 'IoT', 'Edge AI', 'GIS', 'Distributed Systems'],
    verified: true,
    verificationBadgeId: 'VERIFIED-PROJ-98421',
    likes: 1420
  },
  {
    id: 'proj-codepulse',
    title: '⚡ CodePulse AI',
    tagline: 'Real-time Autonomous Code Review & Refactoring Bot for GitHub PRs',
    problem: 'Junior developers waste days waiting for human code review feedback on syntax errors and unoptimized queries.',
    solution: 'CodePulse connects directly to GitHub webhooks, parses incoming AST diffs, checks against security rules, and runs static performance benchmarks before human review.',
    demoUrl: 'https://codepulse.eduvia.app',
    architectureNotes: 'GitHub App -> Node.js Webhook Handler -> LangChain Python Agent -> LLM Code Sandbox',
    techStack: ['TypeScript', 'Python', 'FastAPI', 'LLM Agents', 'Docker'],
    githubUrl: 'https://github.com/eduvia-projects/codepulse',
    team: [
      { name: 'Shaik Sowban', role: 'Creator & Developer', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop' }
    ],
    skillsDemonstrated: ['Python', 'TypeScript', 'FastAPI', 'Docker', 'AI Systems'],
    verified: true,
    verificationBadgeId: 'VERIFIED-PROJ-88112',
    likes: 890
  }
];

export const initialVerifiedSkills: VerifiedSkillCard[] = [
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
  },
  {
    id: 'vskill-dsa',
    skillName: 'DATA STRUCTURES & ALGORITHMS',
    level: 'Intermediate Level',
    codingScore: 88,
    problemSolvingScore: 85,
    debuggingScore: 82,
    projectsScore: 86,
    practicalTaskScore: 89,
    overallScore: 86,
    verifiedDate: 'Sep 18, 2026',
    issuer: 'EDUVIA PROOF & LUMIXORA PROVE ECOSYSTEM',
    lumixoraHash: '0x4d12c8e90f...b78f1'
  }
];

export const initialUserProfile: UserProfile = {
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
  ],
  verifiedSkillCards: initialVerifiedSkills
};

export const initialCampusItems: CampusItem[] = [
  {
    id: 'camp-1',
    type: 'hackathon',
    title: '🏆 GPREC AI & IoT Hackathon 2026',
    campusName: 'GPREC Campus',
    organizer: 'Department of Computer Science & CSM Club',
    dateOrTime: 'October 12 - 14, 2026',
    description: '36-Hour Hackathon focused on solving real-world campus & rural challenges using Edge AI, IoT, and Cloud Microservices. Over ₹1,00,000 in prizes!',
    tags: ['Hackathon', 'AI', 'IoT', 'GPREC'],
    participantsCount: 340
  },
  {
    id: 'camp-2',
    type: 'announcement',
    title: '📢 Campus Research Lab Openings: Computer Science & AI',
    campusName: 'GPREC Campus',
    organizer: 'GPREC Innovation Cell',
    dateOrTime: 'Posted 2 hours ago',
    description: 'Undergraduate research assistant positions available for 3rd and 4th year CSM/CSE students interested in LLM Fine-Tuning and Autonomous Robotics.',
    tags: ['Research', 'AI/ML', 'Internship']
  },
  {
    id: 'camp-3',
    type: 'club',
    title: '🚀 GPREC Open Source & Dev Club Weekly Meetup',
    campusName: 'GPREC Campus',
    organizer: 'GPREC OS Club',
    dateOrTime: 'This Friday at 4:30 PM • CS Auditorium',
    description: 'Hands-on session on Git workflows, building Eduvia extensions, and contributing to open-source student repositories.',
    tags: ['Open Source', 'Workshop', 'Community'],
    participantsCount: 85
  }
];

export const initialOpportunities: CareerOpportunity[] = [
  {
    id: 'opp-1',
    title: 'Junior AI Engineer Intern',
    companyOrOrg: 'NeuralEdge AI Systems',
    type: 'internship',
    matchScore: 84,
    requiredSkills: ['Python', 'PyTorch', 'FastAPI', 'DSA'],
    stipendOrPrize: '₹35,000 / month',
    deadline: 'Apply in 4 days',
    applyUrl: '#'
  },
  {
    id: 'opp-2',
    title: 'National AI & Edge Computing Innovation Challenge',
    companyOrOrg: 'Ministry of IT & Eduvia',
    type: 'hackathon',
    matchScore: 78,
    requiredSkills: ['Python', 'IoT', 'Edge AI'],
    stipendOrPrize: '₹5,00,000 Grand Pool',
    deadline: 'Registration closes in 9 days',
    applyUrl: '#'
  },
  {
    id: 'opp-3',
    title: 'Open Source Contributor - Vector DB Optimizer',
    companyOrOrg: 'ChromaDB Ecosystem',
    type: 'project',
    matchScore: 72,
    requiredSkills: ['Python', 'DSA', 'C++'],
    stipendOrPrize: 'Bounty Pool $2,500',
    deadline: 'Rolling admission',
    applyUrl: '#'
  },
  {
    id: 'opp-4',
    title: '1-on-1 AI/ML Technical Mock Interview',
    companyOrOrg: 'Senior FAANG AI Mentor Network',
    type: 'mock_interview',
    matchScore: 90,
    requiredSkills: ['Python', 'DSA', 'Machine Learning'],
    stipendOrPrize: 'Free Eduvia Credit',
    deadline: 'Available Today',
    applyUrl: '#'
  }
];
