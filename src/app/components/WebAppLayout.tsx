import { ReactNode } from 'react';
import Header from './Header';
import ParticlesBackground from './ParticlesBackground';
import { Language } from '../translations';

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

type Mode = 'general' | 'islamic' | null;

interface WebAppLayoutProps {
  children: ReactNode;
  currentScreen: Screen;
  currentMode: Mode;
  currentLanguage: Language;
  userInfo: { name: string; email: string };
  navigate: (screen: Screen, mode?: Mode) => void;
  onLogout: () => void;
  /** If true, content takes full height without scrolling (for chat screens) */
  fullHeight?: boolean;
}

export default function WebAppLayout({
  children,
  currentScreen,
  currentMode,
  currentLanguage,
  userInfo,
  navigate,
  onLogout,
  fullHeight = false,
}: WebAppLayoutProps) {
  const isIslamic = currentMode === 'islamic';

  return (
    <div className="min-h-screen w-full flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Background gradient — matches existing theme */}
      <div
        className={`fixed inset-0 transition-colors duration-500 ${
          isIslamic
            ? 'bg-gradient-to-br from-emerald-950 via-slate-950 to-emerald-900'
            : 'bg-gradient-to-br from-slate-700 via-slate-800 to-blue-900'
        }`}
      />

      {/* Animated particles background */}
      <ParticlesBackground mode={currentMode} />

      {/* Header */}
      <div className="relative z-50">
        <Header
          currentScreen={currentScreen}
          currentMode={currentMode}
          currentLanguage={currentLanguage}
          userInfo={userInfo}
          navigate={navigate}
          onLogout={onLogout}
        />
      </div>

      {/* Main Content */}
      <main
        className={`relative z-10 flex-1 ${
          fullHeight
            ? 'flex flex-col overflow-hidden'
            : 'overflow-y-auto'
        }`}
      >
        <div
          className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 ${
            fullHeight
              ? 'flex-1 flex flex-col overflow-hidden'
              : 'py-6 sm:py-8'
          }`}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
