import { useState, useEffect } from 'react';
import { Check, Sparkles } from 'lucide-react';
import WebAppLayout from './components/WebAppLayout';
import GeneralModeHome from './components/GeneralModeHome';
import IslamicModeHome from './components/IslamicModeHome';
import GeneralLoginScreen from './components/GeneralLoginScreen';
import IslamicLoginScreen from './components/IslamicLoginScreen';
import GeneralSignupScreen from './components/GeneralSignupScreen';
import IslamicSignupScreen from './components/IslamicSignupScreen';
import MoodCheckIn from './components/MoodCheckIn';
import MoodCheckInIslamic from './components/MoodCheckInIslamic';
import ContentReflectionScreen from './components/ContentReflectionScreen';
import ContentReflectionScreenIslamic from './components/ContentReflectionScreenIslamic';
import AIChatSupportScreen from './components/AIChatSupportScreen';
import AIChatSupportScreenIslamic from './components/AIChatSupportScreenIslamic';
import MoodHistoryScreen from './components/MoodHistoryScreen';
import QiblaHistoryScreen from './components/QiblaHistoryScreen';
import SettingsModeSwitching from './components/SettingsModeSwitching';
import SettingsModeSwitchingIslamic from './components/SettingsModeSwitchingIslamic';
import LanguageSelection from './components/LanguageSelection';
import ReadingScreen from './components/ReadingScreen';
import ReadingScreenIslamic from './components/ReadingScreenIslamic';
import IslamicTutorScreen from './components/IslamicTutorScreen';
import { Language, translations } from './translations';
import { auth } from '../lib/firebaseClient';
import { onAuthStateChanged, signOut } from 'firebase/auth';

type Mode = 'general' | 'islamic' | null;
type Screen =
  | 'mode-selection'
  | 'general-home'
  | 'islamic-home'
  | 'general-login'
  | 'islamic-login'
  | 'general-signup'
  | 'islamic-signup'
  | 'mood-check-general'
  | 'mood-check-islamic'
  | 'content-general'
  | 'content-islamic'
  | 'ai-chat'
  | 'ai-chat-islamic'
  | 'mood-history-general'
  | 'mood-history-islamic'
  | 'settings'
  | 'settings-islamic'
  | 'language-selection'
  | 'reading-general'
  | 'reading-islamic'
  | 'islamic-tutor';

export interface UserInfo {
  name: string;
  email: string;
}

// Screens that don't get the WebAppLayout (no header)
const STANDALONE_SCREENS: Screen[] = [
  'mode-selection',
  'general-login',
  'islamic-login',
  'general-signup',
  'islamic-signup',
];

// Screens that need full height (chat screens)
const FULL_HEIGHT_SCREENS: Screen[] = ['ai-chat', 'ai-chat-islamic', 'islamic-tutor'];

export default function App() {
  const [selectedMode, setSelectedMode] = useState<Mode>('general');
  const [currentScreen, setCurrentScreen] = useState<Screen>('mode-selection');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: 'Demo User', email: 'demo@sleepease.app' });
  const [isLoading, setIsLoading] = useState(true);

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo({
          name: user.displayName || user.email?.split('@')[0] || '',
          email: user.email || '',
        });
      } else {
        setUserInfo({ name: '', email: '' });
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const navigate = (screen: Screen, mode?: Mode) => {
    if (mode) setSelectedMode(mode);
    setCurrentScreen(screen);
  };

  const updateUserInfo = (info: UserInfo) => {
    setUserInfo(info);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUserInfo({ name: '', email: '' });
    setSelectedMode(null);
    setCurrentScreen('mode-selection');
  };

  // Render the screen content
  const renderScreen = () => {
    switch (currentScreen) {
      case 'general-home':
        return <GeneralModeHome navigate={navigate} userInfo={userInfo} currentLanguage={currentLanguage} />;
      case 'islamic-home':
        return <IslamicModeHome navigate={navigate} userInfo={userInfo} currentLanguage={currentLanguage} />;
      case 'general-login':
        return <GeneralLoginScreen navigate={navigate} currentLanguage={currentLanguage} />;
      case 'islamic-login':
        return <IslamicLoginScreen navigate={navigate} currentLanguage={currentLanguage} />;
      case 'general-signup':
        return <GeneralSignupScreen navigate={navigate} updateUserInfo={updateUserInfo} currentLanguage={currentLanguage} />;
      case 'islamic-signup':
        return <IslamicSignupScreen navigate={navigate} updateUserInfo={updateUserInfo} currentLanguage={currentLanguage} />;
      case 'mood-check-general':
        return <MoodCheckIn navigate={navigate} currentLanguage={currentLanguage} userName={userInfo.name} />;
      case 'mood-check-islamic':
        return <MoodCheckInIslamic navigate={navigate} currentLanguage={currentLanguage} userInfo={userInfo} />;
      case 'content-general':
        return <ContentReflectionScreen navigate={navigate} currentLanguage={currentLanguage} userInfo={userInfo} />;
      case 'content-islamic':
        return <ContentReflectionScreenIslamic navigate={navigate} currentLanguage={currentLanguage} userInfo={userInfo} />;
      case 'ai-chat':
        return <AIChatSupportScreen navigate={navigate} currentLanguage={currentLanguage} userName={userInfo.name} />;
      case 'ai-chat-islamic':
        return <AIChatSupportScreenIslamic navigate={navigate} currentLanguage={currentLanguage} userName={userInfo.name} />;
      case 'mood-history-general':
        return <MoodHistoryScreen navigate={navigate} currentLanguage={currentLanguage} />;
      case 'mood-history-islamic':
        return <QiblaHistoryScreen navigate={navigate} currentLanguage={currentLanguage} />;
      case 'settings':
        return <SettingsModeSwitching navigate={navigate} currentMode={selectedMode as 'general' | 'islamic'} userInfo={userInfo} onLogout={handleLogout} currentLanguage={currentLanguage} />;
      case 'settings-islamic':
        return <SettingsModeSwitchingIslamic navigate={navigate} currentMode={selectedMode as 'general' | 'islamic'} userInfo={userInfo} onLogout={handleLogout} currentLanguage={currentLanguage} />;
      case 'language-selection':
        return <LanguageSelection navigate={navigate} currentMode={selectedMode as 'general' | 'islamic'} currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />;
      case 'reading-general':
        return <ReadingScreen navigate={navigate} currentLanguage={currentLanguage} />;
      case 'reading-islamic':
        return <ReadingScreenIslamic navigate={navigate} currentLanguage={currentLanguage} />;
      case 'islamic-tutor':
        return <IslamicTutorScreen navigate={navigate} currentLanguage={currentLanguage} userName={userInfo.name} />;
      default:
        return null;
    }
  };

  // Mode selection / Landing page (standalone)
  if (currentScreen === 'mode-selection') {
    return <ModeSelectionPage selectedMode={selectedMode} setSelectedMode={setSelectedMode} navigate={navigate} currentLanguage={currentLanguage} />;
  }

  // Login/Signup screens are standalone (no header)
  if (STANDALONE_SCREENS.includes(currentScreen)) {
    return renderScreen();
  }

  // All other screens get the WebAppLayout with header
  return (
    <WebAppLayout
      currentScreen={currentScreen}
      currentMode={selectedMode}
      currentLanguage={currentLanguage}
      userInfo={userInfo}
      navigate={navigate}
      onLogout={handleLogout}
      fullHeight={FULL_HEIGHT_SCREENS.includes(currentScreen)}
    >
      {renderScreen()}
    </WebAppLayout>
  );
}

// ===== Mode Selection Landing Page =====
function ModeSelectionPage({
  selectedMode,
  setSelectedMode,
  navigate,
  currentLanguage,
}: {
  selectedMode: Mode;
  setSelectedMode: (mode: Mode) => void;
  navigate: (screen: Screen, mode?: Mode) => void;
  currentLanguage: Language;
}) {
  const t = translations[currentLanguage].modeSelection;

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Full-screen background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/5" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute top-20 left-1/4 w-60 h-60 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-1/4 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-10 w-40 h-40 bg-emerald-400/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center p-6 sm:p-8">
        {/* Quranic decorative verse at top */}
        <div className="mb-6 text-center opacity-30">
          <p className="text-white/60 text-lg sm:text-xl" style={{ fontFamily: "'Amiri', serif" }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
        </div>

        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 border border-white/10 flex items-center justify-center backdrop-blur-sm">
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
              <path d="M16 4 L22 10 L16 16 L10 10 Z" fill="white" opacity="0.9" />
              <circle cx="16" cy="22" r="6" stroke="white" strokeWidth="2" opacity="0.9" fill="none" />
            </svg>
          </div>

          <h1 className="text-white text-4xl sm:text-5xl font-light mb-3">{t.title}</h1>
          <p className="text-white/50 text-base sm:text-lg max-w-md">{t.subtitle}</p>
        </div>

        {/* Mode Selection Cards */}
        <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          {/* General Mode Card */}
          <button
            onClick={() => setSelectedMode('general')}
            className={`relative rounded-3xl p-7 flex flex-col items-center justify-center transition-all duration-300 border-2 min-h-[200px] ${
              selectedMode === 'general'
                ? 'bg-white/15 border-white/40 shadow-lg shadow-blue-500/20 scale-[1.02]'
                : 'bg-white/5 border-white/15 hover:bg-white/8 hover:border-white/25'
            }`}
            style={{ backdropFilter: 'blur(20px)' }}
          >
            <div
              className={`mb-4 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                selectedMode === 'general'
                  ? 'bg-gradient-to-br from-blue-400/30 to-purple-400/30 shadow-lg shadow-blue-400/30'
                  : 'bg-white/10'
              }`}
            >
              <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="2" opacity="0.95" />
                <circle cx="18" cy="20" r="2" fill="white" opacity="0.95" />
                <circle cx="30" cy="20" r="2" fill="white" opacity="0.95" />
                <path d="M17 28 Q24 34 31 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.95" fill="none" />
              </svg>
            </div>
            <span className="text-white/90 text-base font-medium mb-1">{t.generalMode}</span>
            <span className="text-white/40 text-sm">{t.generalDesc}</span>
            {selectedMode === 'general' && (
              <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-lg">
                <Check className="w-4 h-4 text-blue-600" strokeWidth={3} />
              </div>
            )}
          </button>

          {/* Islamic Mode Card */}
          <button
            onClick={() => setSelectedMode('islamic')}
            className={`relative rounded-3xl p-7 flex flex-col items-center justify-center transition-all duration-300 border-2 min-h-[200px] ${
              selectedMode === 'islamic'
                ? 'bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-yellow-300/60 shadow-lg shadow-emerald-500/20 scale-[1.02]'
                : 'bg-gradient-to-br from-emerald-950/30 to-teal-950/30 border-yellow-400/20 hover:border-yellow-400/30'
            }`}
            style={{ backdropFilter: 'blur(20px)' }}
          >
            <div
              className={`mb-4 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                selectedMode === 'islamic'
                  ? 'bg-yellow-300/25 shadow-lg shadow-yellow-400/30'
                  : 'bg-yellow-400/10'
              }`}
            >
              <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
                <path
                  d="M22 16c0-5.5-4.5-10-10-10 0 0 3 2 3 10s-3 10-3 10c5.5 0 10-4.5 10-10Z"
                  fill="#F5D36C"
                  opacity="0.95"
                />
                <path
                  d="M16 12.5s-1.5-.8-2.2-1.8c-.7-.9-.4-2 .4-2.5.6-.4 1.4-.3 1.8.2.4-.5 1.2-.6 1.8-.2.7.5.9 1.6.2 2.5-.7 1-2.2 1.8-2.2 1.8Z"
                  fill="#F5D36C"
                  opacity="0.95"
                />
                <circle cx="26" cy="10" r="1" fill="#F5D36C" opacity="0.7" />
                <circle cx="24" cy="6" r="0.8" fill="#F5D36C" opacity="0.6" />
              </svg>
            </div>
            <span className="text-white/90 text-base font-medium mb-1">{t.islamicMode}</span>
            <span className="text-emerald-100/40 text-sm">{t.islamicDesc}</span>
            {selectedMode === 'islamic' && (
              <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-yellow-200 flex items-center justify-center shadow-lg">
                <Check className="w-4 h-4 text-emerald-800" strokeWidth={3} />
              </div>
            )}
          </button>
        </div>

        {/* Continue Button */}
        <button
          className="w-full max-w-xl py-4 px-8 rounded-2xl text-white text-base font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          style={{
            backgroundColor: '#3A5F7D',
            boxShadow: '0 4px 20px rgba(58, 95, 125, 0.3)',
          }}
          onClick={() => navigate(selectedMode === 'general' ? 'general-home' : 'islamic-home')}
        >
          {t.continue}
        </button>

        {/* Footer */}
        <p className="mt-6 text-white/30 text-sm text-center">
          You can switch modes anytime in settings
        </p>
      </div>
    </div>
  );
}