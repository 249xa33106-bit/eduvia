export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface CodeChallenge {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  solutionCode: string;
  testCases: { input: string; expected: string }[];
  hint: string;
}

export interface UnderstandBreakdown {
  beginner: string;
  intermediate: string;
  advanced: string;
  keyTakeaways: string[];
}

export interface ReelItem {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  creator: {
    name: string;
    handle: string;
    avatar: string;
    title: string;
    verified: boolean;
  };
  topic: string;
  skillTag: string;
  level: SkillLevel;
  likes: number;
  commentsCount: number;
  saves: number;
  shares: number;
  understandBreakdown: UnderstandBreakdown;
  quiz: QuizQuestion[];
  codeChallenge?: CodeChallenge;
  isPracticed?: boolean;
  isSaved?: boolean;
  isLiked?: boolean;
  provedScore?: number;
}

export interface SkillNode {
  id: string;
  name: string;
  score: number; // 0 - 100
  targetScore: number;
  category: 'core' | 'subskill' | 'tool';
  children?: SkillNode[];
}

export interface LearningGoal {
  id: string;
  title: string;
  overallProgress: number;
  skills: {
    name: string;
    score: number;
    gapWarning?: boolean;
  }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  demoUrl?: string;
  architectureUrl?: string;
  architectureNotes: string;
  techStack: string[];
  githubUrl: string;
  team: { name: string; role: string; avatar: string }[];
  skillsDemonstrated: string[];
  verified: boolean;
  verificationBadgeId?: string;
  likes: number;
}

export interface VerifiedSkillCard {
  id: string;
  skillName: string;
  level: string;
  codingScore: number;
  problemSolvingScore: number;
  debuggingScore: number;
  projectsScore: number;
  practicalTaskScore: number;
  overallScore: number;
  verifiedDate: string;
  issuer: string;
  lumixoraHash: string;
}

export interface UserProfile {
  name: string;
  handle: string;
  role: string;
  campus: string;
  streakDays: number;
  totalLearnersHelped: string;
  followers: string;
  projectsCount: number;
  challengesSolved: number;
  verifiedSkillsCount: number;
  currentGoalTitle: string;
  skills: { name: string; score: number }[];
  verifiedSkillCards: VerifiedSkillCard[];
}

export interface CampusItem {
  id: string;
  type: 'announcement' | 'event' | 'hackathon' | 'club' | 'project' | 'internship' | 'creator';
  title: string;
  campusName: string;
  organizer: string;
  dateOrTime: string;
  description: string;
  tags: string[];
  participantsCount?: number;
}

export interface CareerOpportunity {
  id: string;
  title: string;
  companyOrOrg: string;
  type: 'internship' | 'hackathon' | 'project' | 'mock_interview' | 'learning_path';
  matchScore: number; // e.g. 78%
  requiredSkills: string[];
  stipendOrPrize: string;
  deadline: string;
  applyUrl: string;
}

export type TabType = 'home' | 'discover' | 'create' | 'progress' | 'profile' | 'leaderboard';
