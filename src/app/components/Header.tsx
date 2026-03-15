import { useState } from 'react';
import {
  Home,
  Heart,
  Headphones,
  Compass,
  MessageCircle,
  Settings,
  Globe,
  Moon,
  Sun,
  Menu,
  X,
  LogOut,
  User,
} from 'lucide-react';
import { Language, translations } from '../translations';

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

interface HeaderProps {
  currentScreen: Screen;
  currentMode: Mode;
  currentLanguage: Language;
  userInfo: { name: string; email: string };
  navigate: (screen: Screen, mode?: Mode) => void;
  onLogout: () => void;
}

export default function Header({
  currentScreen,
  currentMode,
  currentLanguage,
  userInfo,
  navigate,
  onLogout,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const isIslamic = currentMode === 'islamic';

  // Accent colors based on mode
  const accentColor = isIslamic ? 'emerald' : 'blue';
  const activeClass = isIslamic
    ? 'text-emerald-400 border-b-2 border-emerald-400'
    : 'text-blue-400 border-b-2 border-blue-400';

  // Navigation items
  const navItems = [
    {
      label: translations[currentLanguage]?.generalHome?.home || 'Home',
      icon: <Home className="w-4 h-4" />,
      screen: (isIslamic ? 'islamic-home' : 'general-home') as Screen,
      match: ['general-home', 'islamic-home'],
    },
    {
      label: translations[currentLanguage]?.moodCheckIn?.title || 'Mood',
      icon: <Heart className="w-4 h-4" />,
      screen: (isIslamic ? 'mood-check-islamic' : 'mood-check-general') as Screen,
      match: ['mood-check-general', 'mood-check-islamic'],
    },
    {
      label: translations[currentLanguage]?.contentReflection?.title || 'Content',
      icon: <Headphones className="w-4 h-4" />,
      screen: (isIslamic ? 'content-islamic' : 'content-general') as Screen,
      match: ['content-general', 'content-islamic'],
    },
    {
      label: translations[currentLanguage]?.explore?.title || 'Explore',
      icon: <Compass className="w-4 h-4" />,
      screen: (isIslamic ? 'mood-history-islamic' : 'mood-history-general') as Screen,
      match: ['mood-history-general', 'mood-history-islamic'],
    },
    {
      label: translations[currentLanguage]?.generalHome?.ai || 'AI Chat',
      icon: <MessageCircle className="w-4 h-4" />,
      screen: (isIslamic ? 'ai-chat-islamic' : 'ai-chat') as Screen,
      match: ['ai-chat', 'ai-chat-islamic'],
    },
  ];

  const isActive = (match: string[]) => match.includes(currentScreen);

  const handleNavClick = (screen: Screen) => {
    navigate(screen);
    setMobileMenuOpen(false);
  };

  const handleModeToggle = () => {
    if (isIslamic) {
      navigate('general-home', 'general');
    } else {
      navigate('islamic-home', 'islamic');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Glassmorphism bar */}
      <div
        className={`w-full backdrop-blur-xl border-b transition-colors duration-300 ${
          isIslamic
            ? 'bg-emerald-950/70 border-emerald-400/15'
            : 'bg-slate-900/70 border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo */}
            <button
              onClick={() => navigate(isIslamic ? 'islamic-home' : 'general-home')}
              className="flex items-center gap-3 group"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 ${
                  isIslamic
                    ? 'bg-gradient-to-br from-emerald-500/30 to-teal-500/30 border border-emerald-400/30'
                    : 'bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-blue-400/30'
                }`}
              >
                {isIslamic ? (
                  <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                    <path
                      d="M22 16c0-5.5-4.5-10-10-10 0 0 3 2 3 10s-3 10-3 10c5.5 0 10-4.5 10-10Z"
                      fill="#F5D36C"
                      opacity="0.95"
                    />
                    <circle cx="26" cy="10" r="1" fill="#F5D36C" opacity="0.7" />
                    <circle cx="24" cy="6" r="0.8" fill="#F5D36C" opacity="0.6" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="18" stroke="white" strokeWidth="2" opacity="0.9" />
                    <circle cx="18" cy="20" r="2" fill="white" opacity="0.9" />
                    <circle cx="30" cy="20" r="2" fill="white" opacity="0.9" />
                    <path d="M17 28 Q24 34 31 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" fill="none" />
                  </svg>
                )}
              </div>
              <span className="text-white font-semibold text-lg hidden sm:block">SleepEase</span>
            </button>

            {/* Center: Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.screen}
                  onClick={() => handleNavClick(item.screen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.match)
                      ? `${isIslamic ? 'text-emerald-300 bg-emerald-500/15' : 'text-blue-300 bg-blue-500/15'}`
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              {/* Mode toggle */}
              <button
                onClick={handleModeToggle}
                className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  isIslamic
                    ? 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300 hover:bg-emerald-500/25'
                    : 'bg-blue-500/15 border-blue-400/30 text-blue-300 hover:bg-blue-500/25'
                }`}
                title="Switch Mode"
              >
                {isIslamic ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                <span>{isIslamic ? 'Islamic' : 'General'}</span>
              </button>

              {/* Language */}
              <button
                onClick={() => navigate('language-selection')}
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                title="Language"
              >
                <Globe className="w-4 h-4" />
              </button>

              {/* Settings */}
              <button
                onClick={() => navigate(isIslamic ? 'settings-islamic' : 'settings')}
                className={`hidden sm:flex w-9 h-9 rounded-xl bg-white/5 border border-white/10 items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all ${
                  ['settings', 'settings-islamic'].includes(currentScreen) ? 'text-white bg-white/10' : ''
                }`}
                title="Settings"
              >
                <Settings className="w-4 h-4" />
              </button>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all border ${
                    isIslamic
                      ? 'bg-gradient-to-br from-emerald-500/30 to-teal-500/30 border-emerald-400/30 text-emerald-200'
                      : 'bg-gradient-to-br from-blue-500/30 to-purple-500/30 border-blue-400/30 text-blue-200'
                  }`}
                >
                  {userInfo.name ? userInfo.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                </button>

                {/* Profile dropdown */}
                {profileMenuOpen && (
                  <div className="absolute right-0 top-12 w-56 rounded-2xl bg-slate-800/95 backdrop-blur-xl border border-white/10 shadow-2xl p-2 z-50">
                    <div className="px-3 py-2 border-b border-white/10 mb-1">
                      <p className="text-white text-sm font-medium">{userInfo.name || 'Guest'}</p>
                      <p className="text-white/50 text-xs">{userInfo.email || 'Not signed in'}</p>
                    </div>
                    <button
                      onClick={() => {
                        navigate(isIslamic ? 'settings-islamic' : 'settings');
                        setProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 text-sm hover:bg-white/5 transition-all"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 text-sm hover:bg-red-500/10 transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden backdrop-blur-xl border-b transition-colors ${
            isIslamic
              ? 'bg-emerald-950/90 border-emerald-400/15'
              : 'bg-slate-900/90 border-white/10'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.screen}
                onClick={() => handleNavClick(item.screen)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive(item.match)
                    ? `${isIslamic ? 'text-emerald-300 bg-emerald-500/15' : 'text-blue-300 bg-blue-500/15'}`
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}

            <div className="border-t border-white/10 pt-2 mt-2">
              {/* Mode toggle for mobile */}
              <button
                onClick={handleModeToggle}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isIslamic
                    ? 'text-emerald-300 hover:bg-emerald-500/10'
                    : 'text-blue-300 hover:bg-blue-500/10'
                }`}
              >
                {isIslamic ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                <span>Switch to {isIslamic ? 'General' : 'Islamic'} Mode</span>
              </button>

              {/* Settings for mobile */}
              <button
                onClick={() => {
                  navigate(isIslamic ? 'settings-islamic' : 'settings');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
