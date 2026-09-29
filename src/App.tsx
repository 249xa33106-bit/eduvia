import { useState } from 'react';
import type { TabType, ReelItem, VerifiedSkillCard, UserProfile } from './types/eduvia';
import {
  initialReels,
  initialGoals,
  initialSkillTree,
  initialProjects,
  initialUserProfile,
  initialCampusItems,
  initialOpportunities
} from './data/initialData';
import { Navbar } from './components/Navbar';
import { AuthView } from './components/Auth/AuthView';
import { HomeFeedView } from './components/Feed/HomeFeedView';
import { DiscoverView } from './components/Discover/DiscoverView';
import { CreatorStudio } from './components/Creator/CreatorStudio';
import { SkillGraphView } from './components/SkillGraph/SkillGraphView';
import { ProjectShowcaseView } from './components/Projects/ProjectShowcaseView';
import { CampusView } from './components/Campus/CampusView';
import { CareerModeView } from './components/Career/CareerModeView';
import { ProfileView } from './components/Profile/ProfileView';
import { LeaderboardView } from './components/Leaderboard/LeaderboardView';
import { AICompanionModal } from './components/AICompanion/AICompanionModal';
import { FlashcardModal } from './components/Flashcards/FlashcardModal';
import { NotesManagerModal } from './components/Notes/NotesManagerModal';
import { CodeBattleModal } from './components/Battle/CodeBattleModal';
import { ArchitectureSimulatorModal } from './components/Architecture/ArchitectureSimulatorModal';
import { CodeAuditorModal } from './components/Auditor/CodeAuditorModal';
import { UnderstandModal } from './components/Modals/UnderstandModal';
import { PracticeModal } from './components/Modals/PracticeModal';
import { CodeModal } from './components/Modals/CodeModal';
import { ProveModal } from './components/Modals/ProveModal';

export function App() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // App Navigation State
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isCampusActive, setIsCampusActive] = useState<boolean>(false);

  // App Data State
  const [reels, setReels] = useState<ReelItem[]>(initialReels);
  const [goals, setGoals] = useState(initialGoals);
  const [skillTree] = useState(initialSkillTree);
  const [projects, setProjects] = useState(initialProjects);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);

  // Modal State
  const [activeUnderstandReel, setActiveUnderstandReel] = useState<ReelItem | null>(null);
  const [activePracticeReel, setActivePracticeReel] = useState<ReelItem | null>(null);
  const [activeCodeReel, setActiveCodeReel] = useState<ReelItem | null>(null);
  const [activeProveTopic, setActiveProveTopic] = useState<string | null>(null);

  // New Feature Modals State
  const [isAICompanionOpen, setIsAICompanionOpen] = useState<boolean>(false);
  const [isFlashcardsOpen, setIsFlashcardsOpen] = useState<boolean>(false);
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);
  const [isCodeBattleOpen, setIsCodeBattleOpen] = useState<boolean>(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState<boolean>(false);
  const [isCodeAuditorOpen, setIsCodeAuditorOpen] = useState<boolean>(false);

  // Handlers
  const handleLoginSuccess = (user: UserProfile) => {
    setUserProfile(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleToggleLike = (reelId: string) => {
    setReels((prev) =>
      prev.map((r) => (r.id === reelId ? { ...r, isLiked: !r.isLiked } : r))
    );
  };

  const handleToggleSave = (reelId: string) => {
    setReels((prev) =>
      prev.map((r) => (r.id === reelId ? { ...r, isSaved: !r.isSaved } : r))
    );
  };

  const handlePublishReel = (newReel: ReelItem) => {
    setReels((prev) => [newReel, ...prev]);
    setActiveTab('home');
  };

  const handleCompletePractice = (skillName: string, _xp: number) => {
    if (activePracticeReel) {
      setReels((prev) =>
        prev.map((r) => (r.id === activePracticeReel.id ? { ...r, isPracticed: true } : r))
      );
    }

    setGoals((prev) =>
      prev.map((g) => ({
        ...g,
        skills: g.skills.map((s) => {
          if (s.name.toLowerCase().includes(skillName.toLowerCase()) || skillName.toLowerCase().includes(s.name.toLowerCase())) {
            const newScore = Math.min(100, s.score + 5);
            return { ...s, score: newScore, gapWarning: newScore < 50 };
          }
          return s;
        })
      }))
    );

    setUserProfile((prev) => ({
      ...prev,
      challengesSolved: prev.challengesSolved + 1
    }));
  };

  const handleCompleteCode = (skillName: string, _xp: number) => {
    setGoals((prev) =>
      prev.map((g) => ({
        ...g,
        skills: g.skills.map((s) => {
          if (s.name.toLowerCase().includes(skillName.toLowerCase())) {
            const newScore = Math.min(100, s.score + 8);
            return { ...s, score: newScore, gapWarning: newScore < 50 };
          }
          return s;
        })
      }))
    );
  };

  const handleSkillVerified = (card: VerifiedSkillCard) => {
    setUserProfile((prev) => ({
      ...prev,
      verifiedSkillsCount: prev.verifiedSkillsCount + 1,
      verifiedSkillCards: [card, ...prev.verifiedSkillCards]
    }));
  };

  const handleVerifyProject = (projId: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projId ? { ...p, verified: true } : p))
    );
    alert('🎉 Project verified on Lumixora PROVE Network!');
  };

  // If user is not authenticated, render Login / Sign Up Page
  if (!isAuthenticated) {
    return <AuthView onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#06070a] text-gray-100 flex flex-col font-sans selection:bg-cyan-400 selection:text-black relative">
      {/* Aurora Ambient Mesh Background */}
      <div className="mesh-bg" />

      {/* Top & Bottom Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        streakDays={userProfile.streakDays}
        isCampusActive={isCampusActive}
        setIsCampusActive={setIsCampusActive}
        currentGoalTitle={userProfile.currentGoalTitle}
        onLogout={handleLogout}
        onOpenAICompanion={() => setIsAICompanionOpen(true)}
        onOpenFlashcards={() => setIsFlashcardsOpen(true)}
        onOpenNotes={() => setIsNotesOpen(true)}
        onOpenCodeBattle={() => setIsCodeBattleOpen(true)}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        onOpenCodeAuditor={() => setIsCodeAuditorOpen(true)}
      />

      {/* Main App Content Viewport */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 pt-6 relative z-10 pb-20">
        {/* If Campus Mode toggled on header, prioritize Campus View */}
        {isCampusActive ? (
          <CampusView campusItems={initialCampusItems} />
        ) : (
          <>
            {activeTab === 'home' && (
              <HomeFeedView
                reels={reels}
                currentGoalTitle={userProfile.currentGoalTitle}
                onOpenUnderstand={(r) => setActiveUnderstandReel(r)}
                onOpenPractice={(r) => setActivePracticeReel(r)}
                onOpenCode={(r) => setActiveCodeReel(r)}
                onOpenProve={(r) => setActiveProveTopic(r.topic)}
                onToggleSave={handleToggleSave}
                onToggleLike={handleToggleLike}
              />
            )}

            {activeTab === 'discover' && (
              <DiscoverView
                reels={reels}
                onOpenUnderstand={(r) => setActiveUnderstandReel(r)}
              />
            )}

            {activeTab === 'create' && (
              <CreatorStudio onPublishReel={handlePublishReel} />
            )}

            {activeTab === 'progress' && (
              <div className="space-y-8">
                <SkillGraphView
                  goals={goals}
                  skillTree={skillTree}
                  userProfile={userProfile}
                  onSelectGoal={(title) => setUserProfile((p) => ({ ...p, currentGoalTitle: title }))}
                  onOpenProve={(skillName) => setActiveProveTopic(skillName)}
                />
                <div className="border-t border-white/10 pt-6">
                  <ProjectShowcaseView projects={projects} onVerifyProject={handleVerifyProject} />
                </div>
                <div className="border-t border-white/10 pt-6">
                  <CareerModeView opportunities={initialOpportunities} currentGoalTitle={userProfile.currentGoalTitle} />
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <ProfileView
                userProfile={userProfile}
                onOpenProve={(skillName) => setActiveProveTopic(skillName)}
              />
            )}

            {activeTab === 'leaderboard' && (
              <LeaderboardView userProfile={userProfile} />
            )}
          </>
        )}
      </main>

      {/* Feature Modals */}
      {isAICompanionOpen && (
        <AICompanionModal onClose={() => setIsAICompanionOpen(false)} />
      )}

      {isFlashcardsOpen && (
        <FlashcardModal onClose={() => setIsFlashcardsOpen(false)} />
      )}

      {isNotesOpen && (
        <NotesManagerModal onClose={() => setIsNotesOpen(false)} />
      )}

      {isCodeBattleOpen && (
        <CodeBattleModal onClose={() => setIsCodeBattleOpen(false)} />
      )}

      {isArchitectureOpen && (
        <ArchitectureSimulatorModal onClose={() => setIsArchitectureOpen(false)} />
      )}

      {isCodeAuditorOpen && (
        <CodeAuditorModal onClose={() => setIsCodeAuditorOpen(false)} />
      )}

      {/* Action Modals */}
      {activeUnderstandReel && (
        <UnderstandModal
          reel={activeUnderstandReel}
          onClose={() => setActiveUnderstandReel(null)}
        />
      )}

      {activePracticeReel && (
        <PracticeModal
          reel={activePracticeReel}
          onClose={() => setActivePracticeReel(null)}
          onCompletePractice={handleCompletePractice}
        />
      )}

      {activeCodeReel && (
        <CodeModal
          reel={activeCodeReel}
          onClose={() => setActiveCodeReel(null)}
          onCompleteCode={handleCompleteCode}
        />
      )}

      {activeProveTopic && (
        <ProveModal
          topic={activeProveTopic}
          onClose={() => setActiveProveTopic(null)}
          onSkillVerified={handleSkillVerified}
        />
      )}
    </div>
  );
}

export default App;
