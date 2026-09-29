import type { ReelItem, LearningGoal, SkillNode, ProjectItem, UserProfile, CampusItem, CareerOpportunity } from '../types/eduvia';

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
      }
    ],
    codeChallenge: {
      id: 'c1',
      title: 'Filter & Double Odd Numbers',
      description: 'Write a Python list comprehension that takes `numbers = [1, 2, 3, 4, 5, 6, 7]` and returns a list containing double the value of ONLY odd numbers.',
      starterCode: `numbers = [1, 2, 3, 4, 5, 6, 7]\nresult = [x * 2 for x in numbers if x % 2 != 0]\nprint("Result:", result)`,
      solutionCode: `numbers = [1, 2, 3, 4, 5, 6, 7]\nresult = [x * 2 for x in numbers if x % 2 != 0]\nprint("Result:", result)`,
      testCases: [{ input: '[1, 2, 3, 4, 5, 6, 7]', expected: '[2, 6, 10, 14]' }],
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
      }
    ],
    codeChallenge: {
      id: 'c2',
      title: 'Implement Binary Search Index Finder',
      description: 'Complete the `binary_search(arr, target)` function to return the 0-based index of target, or -1 if not found.',
      starterCode: `def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = low + (high - low) // 2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: low = mid + 1\n        else: high = mid - 1\n    return -1`,
      solutionCode: `def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = low + (high - low) // 2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: low = mid + 1\n        else: high = mid - 1\n    return -1`,
      testCases: [{ input: '[2, 5, 8, 12, 16, 23], target 23', expected: '5' }],
      hint: 'Maintain `low` and `high` bounds and shift `low = mid + 1` or `high = mid - 1`.'
    }
  },
  {
    id: 'reel-3',
    title: 'React 19 Server Components Deep Dive ⚛️',
    description: 'Learn how React 19 Server Components eliminate bundle size overhead and stream HTML directly from backend.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-programmer-working-in-a-dark-room-41565-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop',
    creator: {
      name: 'Ayesha Khan',
      handle: '@ayesha_gis',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop',
      title: 'RescueMesh Collaborator & Frontend Lead',
      verified: true
    },
    topic: 'React',
    skillTag: 'React • Advanced',
    level: 'Advanced',
    likes: 15400,
    commentsCount: 610,
    saves: 4200,
    shares: 2100,
    understandBreakdown: {
      beginner: 'Server Components execute exclusively on the server, producing zero client-side JavaScript bundle for static libraries.',
      intermediate: 'Data fetching happens directly inside async server components, eliminating client `useEffect` boilerplate and waterfall fetches.',
      advanced: 'Use `"use client"` directives sparingly at leaf node components requiring DOM event handlers or state.',
      keyTakeaways: [
        'Zero client bundle size for server dependencies',
        'Direct async/await database access in components',
        'Automatic streaming SSR via Suspense boundaries'
      ]
    },
    quiz: [
      {
        id: 'q1_r19',
        question: 'What directive is required at the top of a file to declare a React 19 Client Component?',
        options: ['"use client"', '"use server"', '"use state"', '"use react"'],
        correctAnswer: 0,
        explanation: '`"use client"` explicitly marks the module boundary for client-side interactivity.'
      }
    ]
  },
  {
    id: 'reel-4',
    title: 'System Design: Designing WhatsApp with Kafka & Redis 🚀',
    description: 'How to handle 100,000 concurrent message writes per second using asynchronous pub/sub architecture.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-code-running-on-a-computer-screen-41566-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop',
    creator: {
      name: 'Elena Rostova',
      handle: '@elena_dev',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop',
      title: 'Senior Systems Architect',
      verified: true
    },
    topic: 'System Design',
    skillTag: 'System Design • Advanced',
    level: 'Advanced',
    likes: 21300,
    commentsCount: 890,
    saves: 7800,
    shares: 3400,
    understandBreakdown: {
      beginner: 'Decouple message senders and receivers using message brokers like Apache Kafka for high-throughput messaging.',
      intermediate: 'Store transient unread messages in Redis cache for sub-millisecond retrieval before persisting to database.',
      advanced: 'Use horizontal partitioning (sharding) by `user_id` hash to distribute DB write load across database nodes.',
      keyTakeaways: [
        'Kafka for async pub/sub message queuing',
        'Redis in-memory caching for low latency reads',
        'Database sharding by hash keys'
      ]
    },
    quiz: [
      {
        id: 'q1_sd',
        question: 'Which component is best suited for buffering high-throughput asynchronous write requests?',
        options: ['Message Queue (Kafka/RabbitMQ)', 'Browser LocalStorage', 'HTML Canvas', 'SQLite'],
        correctAnswer: 0,
        explanation: 'Message queues decouple producers from consumers, buffering burst write traffic.'
      }
    ]
  },
  {
    id: 'reel-5',
    title: 'PyTorch Backpropagation & Gradient Descent Calculus 🧬',
    description: 'Understand autograd, loss computation, and weight update mechanics in deep neural networks.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-programmer-working-in-a-dark-room-41565-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop',
    creator: {
      name: 'Dr. Sarah Chen',
      handle: '@sarah_ai',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop',
      title: 'Principal AI Scientist & Eduvia Mentor',
      verified: true
    },
    topic: 'AI/ML',
    skillTag: 'AI/ML • Intermediate',
    level: 'Intermediate',
    likes: 19800,
    commentsCount: 710,
    saves: 6500,
    shares: 2800,
    understandBreakdown: {
      beginner: 'Backpropagation computes the gradient of loss with respect to model parameters using the chain rule.',
      intermediate: 'In PyTorch, `loss.backward()` computes gradients automatically, and `optimizer.step()` updates weights via $W_{new} = W - \\alpha \\cdot \\nabla L$.',
      advanced: 'Always remember `optimizer.zero_grad()` before computing loss to prevent gradient accumulation across iterations.',
      keyTakeaways: [
        'Chain rule calculates parameter partial derivatives',
        'PyTorch autograd tracks computation graph dynamically',
        'Always zero gradients before backward pass'
      ]
    },
    quiz: [
      {
        id: 'q1_torch',
        question: 'Why must you call `optimizer.zero_grad()` before `loss.backward()` in PyTorch?',
        options: [
          'To prevent gradients from accumulating across training iterations',
          'To delete the model weights',
          'To clear GPU RAM',
          'To speed up Python execution'
        ],
        correctAnswer: 0,
        explanation: 'PyTorch accumulates gradients by default (`+=`), so zeroing them is necessary every batch.'
      }
    ]
  },
  {
    id: 'reel-6',
    title: 'TypeScript 5.5 Inferred Type Predicates 📘',
    description: 'Write cleaner code with automatic array filter narrowing in TypeScript 5.5.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-code-running-on-a-computer-screen-41566-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516116211223-48a12725dd24?w=600&auto=format&fit=crop',
    creator: {
      name: 'Rohan Sharma',
      handle: '@rohan_code',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop',
      title: 'Fullstack TS Engineer',
      verified: true
    },
    topic: 'TypeScript',
    skillTag: 'TypeScript • Intermediate',
    level: 'Intermediate',
    likes: 11200,
    commentsCount: 380,
    saves: 2900,
    shares: 1400,
    understandBreakdown: {
      beginner: 'TypeScript 5.5 automatically infers return type predicates for functions like `.filter(x => x !== null)`.',
      intermediate: 'Previously, `.filter(x => x !== null)` left `(string | null)[]` type intact without custom `x is string` assertion.',
      advanced: 'This works for boolean filter functions, reducing type casting boilerplate across codebase.',
      keyTakeaways: [
        'Automatic array filter type narrowing',
        'No manual type guards required for simple null filters',
        'Cleaner, safer TypeScript code'
      ]
    },
    quiz: [
      {
        id: 'q1_ts',
        question: 'In TypeScript 5.5, what is the inferred type of `[1, null, 2].filter(x => x !== null)`?',
        options: ['number[]', '(number | null)[]', 'any[]', 'unknown[]'],
        correctAnswer: 0,
        explanation: 'TS 5.5 automatically infers the type predicate `x is number`, filtering out `null` from the type.'
      }
    ]
  },
  {
    id: 'reel-7',
    title: 'Docker Multi-Stage Build Optimization 🐳',
    description: 'Reduce container image size from 1.2GB down to 45MB with Docker multi-stage builds.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-green-screen-41539-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=600&auto=format&fit=crop',
    creator: {
      name: 'Carlos Mendez',
      handle: '@carlos_devops',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop',
      title: 'DevOps & Cloud Architect',
      verified: true
    },
    topic: 'DevOps',
    skillTag: 'DevOps • Intermediate',
    level: 'Intermediate',
    likes: 14500,
    commentsCount: 520,
    saves: 4800,
    shares: 1900,
    understandBreakdown: {
      beginner: 'Multi-stage builds allow you to use multiple `FROM` statements in a single Dockerfile.',
      intermediate: 'Build artifacts in a heavy build stage, then copy ONLY compiled assets into a minimal runtime image like `alpine` or `scratch`.',
      advanced: 'Excludes `node_modules` build tooling, compilers, and source files from production deployment.',
      keyTakeaways: [
        'Significantly smaller production image footprint',
        'Improved container deployment security',
        'Faster deployment pull times on Cloud hosts'
      ]
    },
    quiz: [
      {
        id: 'q1_doc',
        question: 'What command copies build artifacts from stage 0 into stage 1 in Dockerfile?',
        options: [
          'COPY --from=0 /app/dist ./dist',
          'IMPORT /app/dist',
          'FETCH stage0',
          'PULL --stage=0'
        ],
        correctAnswer: 0,
        explanation: '`COPY --from=0` copies specified files from a previous build stage.'
      }
    ]
  },
  {
    id: 'reel-8',
    title: 'Rust Memory Safety & Borrow Checker 🦀',
    description: 'How Rust guarantees memory safety at compile time without any garbage collector overhead.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-programmer-working-in-a-dark-room-41565-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop',
    creator: {
      name: 'Kira Tanaka',
      handle: '@kira_rust',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop',
      title: 'Systems & WebAssembly Specialist',
      verified: true
    },
    topic: 'Rust',
    skillTag: 'Rust • Advanced',
    level: 'Advanced',
    likes: 17800,
    commentsCount: 640,
    saves: 5900,
    shares: 2700,
    understandBreakdown: {
      beginner: 'Rust enforces memory safety rules at compile time using ownership, borrowing, and lifetimes.',
      intermediate: 'Ownership rules: 1) Each value has an owner. 2) Only 1 owner at a time. 3) When owner goes out of scope, value is dropped.',
      advanced: 'Eliminates data races, dangling pointers, and double-free bugs without garbage collection latency pauses.',
      keyTakeaways: [
        'Zero-cost abstractions with compile-time safety checks',
        'Strict ownership and borrowing rules',
        'No GC pause latency in real-time systems'
      ]
    },
    quiz: [
      {
        id: 'q1_rust',
        question: 'How many mutable references (`&mut`) to a value can exist at the same time in Rust?',
        options: ['Exactly 1', 'Unlimited', 'Up to 2', 'Zero'],
        correctAnswer: 0,
        explanation: 'Rust allows either one mutable reference OR any number of immutable references, preventing data races.'
      }
    ]
  },
  {
    id: 'reel-9',
    title: 'RescueMesh Edge AI Radio Node Demo 📡',
    description: 'Shaik Sowban & team demonstrate real-time offline AI disaster triage on GPREC mesh radio nodes.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-code-running-on-a-computer-screen-41566-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop',
    creator: {
      name: 'Shaik Sowban',
      handle: '@sowban_dev',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop',
      title: 'CSM • Fullstack & AI Lead',
      verified: true
    },
    topic: 'Edge AI',
    skillTag: 'Edge AI • Advanced',
    level: 'Advanced',
    likes: 28400,
    commentsCount: 1120,
    saves: 9400,
    shares: 4800,
    understandBreakdown: {
      beginner: 'RescueMesh operates decentralized wireless radio mesh networks for emergency signal routing.',
      intermediate: 'Integrated TensorFlow Lite Micro quantizes PyTorch models to run on 256KB RAM microcontrollers.',
      advanced: 'Uses cryptographically signed verified skill credentials on Lumixora PROVE Network for sensor node trust verification.',
      keyTakeaways: [
        'Zero-internet disaster response mesh networking',
        'TensorFlow Lite quantization for microcontrollers',
        'Lumixora PROVE cryptographic node verification'
      ]
    },
    quiz: [
      {
        id: 'q1_rm',
        question: 'What is the key advantage of running Quantized AI models on edge radio nodes?',
        options: [
          'Enables real-time inference without internet connection or cloud latency',
          'Increases model file size',
          'Requires 100GB RAM',
          'Deletes sensor data automatically'
        ],
        correctAnswer: 0,
        explanation: 'Edge AI processes signals locally on device with zero internet dependency and zero cloud latency.'
      }
    ]
  }
];

export const initialGoals: LearningGoal[] = [
  {
    id: 'g1',
    title: 'Become an AI/ML Engineer',
    overallProgress: 78,
    skills: [
      { name: 'Python', score: 84 },
      { name: 'DSA', score: 72 },
      { name: 'AI/ML', score: 61, gapWarning: true },
      { name: 'React / TS', score: 92 },
      { name: 'System Design', score: 75 }
    ]
  },
  {
    id: 'g2',
    title: 'Fullstack Cloud Architect',
    overallProgress: 65,
    skills: [
      { name: 'React / TS', score: 92 },
      { name: 'System Design', score: 75 },
      { name: 'DevOps & Cloud', score: 58, gapWarning: true },
      { name: 'Python', score: 84 }
    ]
  }
];

export const initialSkillTree: SkillNode = {
  id: 'st-root',
  name: 'AI/ML Engineering',
  score: 78,
  targetScore: 100,
  category: 'core',
  children: [
    {
      id: 'st-python',
      name: 'Python Mastery',
      score: 84,
      targetScore: 90,
      category: 'core',
      children: [
        { id: 'st-comp', name: 'Comprehensions', score: 95, targetScore: 100, category: 'subskill' },
        { id: 'st-gen', name: 'Generators', score: 80, targetScore: 90, category: 'subskill' }
      ]
    },
    {
      id: 'st-ml',
      name: 'Deep Learning & PyTorch',
      score: 61,
      targetScore: 85,
      category: 'core',
      children: [
        { id: 'st-nn', name: 'Neural Networks', score: 65, targetScore: 85, category: 'subskill' },
        { id: 'st-autograd', name: 'Backpropagation', score: 58, targetScore: 80, category: 'subskill' }
      ]
    }
  ]
};

export const initialProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'RescueMesh: Decentralized Edge AI Emergency Network',
    tagline: 'Offline mesh radio emergency network with embedded TFLite micro model triage.',
    problem: 'Disaster zones lose cellular connectivity, leaving first responders without situational triage data.',
    solution: 'Built long-range mesh radio nodes with TFLite micro models performing real-time audio/sensor triage offline.',
    demoUrl: 'https://rescuemesh.demo',
    architectureNotes: 'React 19 Frontend -> Express API -> TFLite C++ Micro Inference -> Mesh Radio Packet Protocol',
    techStack: ['React 19', 'TypeScript', 'Express', 'TensorFlow Lite', 'C++', 'Python'],
    githubUrl: 'https://github.com/249xa33106-bit/eduvia',
    team: [
      { name: 'Shaik Sowban', role: 'Lead Architect', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop' },
      { name: 'Ayesha Khan', role: 'Frontend & GIS Lead', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop' }
    ],
    skillsDemonstrated: ['Python', 'DSA', 'AI/ML', 'React / TS', 'System Design'],
    verified: true,
    verificationBadgeId: 'PROVE-RM-9942',
    likes: 1240
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
  verifiedSkillCards: [
    {
      id: 'vcard-1',
      skillName: 'Python & Data Algorithms',
      level: 'Advanced Master',
      codingScore: 94,
      problemSolvingScore: 91,
      debuggingScore: 88,
      projectsScore: 95,
      practicalTaskScore: 92,
      overallScore: 92,
      verifiedDate: '2026-09-24',
      issuer: 'Lumixora PROVE Network',
      lumixoraHash: '0x8f3c...99a2'
    }
  ]
};

export const initialCampusItems: CampusItem[] = [
  {
    id: 'camp-1',
    type: 'hackathon',
    title: 'GPREC Campus AI & Cloud Hackathon 2026',
    campusName: 'GPREC Campus',
    organizer: 'Computer Science Department',
    dateOrTime: 'Oct 15 - 17, 2026',
    description: 'Build decentralized AI, Cloud, and Web3 applications. Total prize pool ₹1,50,000 + Internship referrals!',
    tags: ['Hackathon', 'AI/ML', 'React', 'Cloud'],
    participantsCount: 340
  },
  {
    id: 'camp-2',
    type: 'announcement',
    title: 'Eduvia Study Circle: Weekly DSA & Python Sprint',
    campusName: 'GPREC Campus',
    organizer: 'Eduvia Student Chapter',
    dateOrTime: 'Every Wednesday @ 5:00 PM',
    description: 'Interactive peer speed coding challenges and 1v1 battle arena sessions at CS Lab 4.',
    tags: ['DSA', 'Python', 'Peer Learning'],
    participantsCount: 180
  }
];

export const initialOpportunities: CareerOpportunity[] = [
  {
    id: 'opp-1',
    title: 'AI/ML Engineering Intern',
    companyOrOrg: 'Lumixora AI Labs',
    type: 'internship',
    matchScore: 92,
    requiredSkills: ['Python', 'AI/ML', 'PyTorch'],
    stipendOrPrize: '₹45,000 / month',
    deadline: 'Oct 20, 2026',
    applyUrl: 'https://lumixora.ai/careers'
  }
];
