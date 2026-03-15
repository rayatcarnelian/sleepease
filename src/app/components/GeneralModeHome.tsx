import {
  Settings,
  Play,
  Sparkles,
  Wind,
  Moon,
  Music,
  Heart,
  TrendingUp,
  Flame,
  Zap,
  BookOpen,
  Headphones,
  CheckCircle2
} from "lucide-react";
import { Language, translations } from "../translations";

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

interface GeneralModeHomeProps {
  navigate: (screen: Screen, mode?: Mode) => void;
  userInfo: { name: string; email: string };
  currentLanguage: Language;
}

export default function GeneralModeHome({ navigate, userInfo, currentLanguage }: GeneralModeHomeProps) {
  const t = translations[currentLanguage].generalHome;

  return (
    <div className="w-full">
      {/* Greeting */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-white/60 text-sm">{t.greeting}</p>
          <h1 className="text-white text-3xl sm:text-4xl font-light mt-1">
            {userInfo.name || t.guest}
          </h1>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 mb-8">
        <div className="rounded-2xl bg-gradient-to-br from-orange-500/25 to-red-500/25 backdrop-blur-xl border border-orange-400/20 p-5">
          <Flame className="w-6 h-6 text-orange-400 mb-3" />
          <p className="text-white text-2xl font-bold">7</p>
          <p className="text-white/70 text-sm">{t.streak}</p>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-blue-500/25 to-purple-500/25 backdrop-blur-xl border border-blue-400/20 p-5">
          <TrendingUp className="w-6 h-6 text-blue-400 mb-3" />
          <p className="text-white text-2xl font-bold">85%</p>
          <p className="text-white/70 text-sm">{t.progress}</p>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-emerald-500/25 to-teal-500/25 backdrop-blur-xl border border-emerald-400/20 p-5 col-span-2 sm:col-span-1">
          <Zap className="w-6 h-6 text-emerald-400 mb-3" />
          <p className="text-white text-2xl font-bold">42</p>
          <p className="text-white/70 text-sm">{t.minutes}</p>
        </div>
      </div>

      {/* Two-column layout: Mood Card + Daily Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Main mood card */}
        <button
          className="w-full rounded-3xl bg-gradient-to-br from-slate-200/90 to-slate-300/70 backdrop-blur-xl shadow-xl border border-white/40 p-8 text-left transition-all hover:scale-[1.01] active:scale-[0.99]"
          onClick={() => navigate('mood-check-general')}
        >
          <div className="w-16 h-16 rounded-2xl bg-white/70 shadow-lg flex items-center justify-center mb-6 relative">
            {/* Breathing ring */}
            <div className="absolute inset-0 rounded-2xl border-2 border-blue-400/40" style={{ animation: 'breathe 4s ease-in-out infinite' }} />
            <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="20" stroke="#475569" strokeWidth="2.5" opacity="0.9" />
              <circle cx="18" cy="20" r="2.5" fill="#475569" opacity="0.9" />
              <circle cx="30" cy="20" r="2.5" fill="#475569" opacity="0.9" />
              <path d="M16 28 Q24 35 32 28" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.9" />
            </svg>
          </div>
          <h2 className="text-slate-800 text-2xl sm:text-3xl font-medium leading-tight mb-3" style={{ whiteSpace: 'pre-line' }}>
            {t.moodQuestion}
          </h2>
          <p className="text-slate-500 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            {t.tapToCheckIn}
          </p>
        </button>

        {/* Daily Goals */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-base font-medium">{t.todaysGoals}</h3>
            <button className="text-white/60 text-sm hover:text-white transition-colors" onClick={() => navigate('mood-history-general')}>{t.viewAll}</button>
          </div>

          <div className="space-y-3">
            <GoalItem icon={<Heart className="w-4 h-4" />} label={t.logMood} completed={true} onClick={() => navigate('mood-check-general')} />
            <GoalItem icon={<Wind className="w-4 h-4" />} label={t.breathing} completed={false} onClick={() => navigate('content-general')} />
            <GoalItem icon={<BookOpen className="w-4 h-4" />} label={t.readAffirmations} completed={false} onClick={() => navigate('content-general')} />
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="mb-8">
        <h3 className="text-white text-base font-medium mb-4">{t.quickActions}</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            className="rounded-3xl bg-slate-700/60 backdrop-blur-xl border border-white/10 p-6 flex flex-col justify-between min-h-[160px] transition-all hover:bg-slate-700/70 hover:scale-[1.02] active:scale-95 text-left"
            onClick={() => navigate('content-general')}
          >
            <div>
              <h3 className="text-white text-base font-medium whitespace-pre-line">{t.quickRelax}</h3>
              <p className="text-white/60 text-xs mt-1">{t.quickRelax5min}</p>
            </div>
            <div className="flex items-end justify-between mt-3 w-full">
              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              </div>
              <Wind className="w-5 h-5 text-white/50 mb-1" />
            </div>
          </button>

          <button 
            className="rounded-3xl bg-slate-600/50 backdrop-blur-xl border-2 border-white/30 p-6 flex flex-col justify-between min-h-[160px] transition-all hover:bg-slate-600/60 hover:scale-[1.02] active:scale-95 text-left"
            onClick={() => navigate('content-general')}
          >
            <div>
              <h3 className="text-white text-base font-medium whitespace-pre-line">{t.sleepSounds}</h3>
              <p className="text-white/60 text-xs mt-1">{t.sleepSoundsTracks}</p>
            </div>
            <div className="flex items-end justify-between mt-3 w-full">
              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <Moon className="w-5 h-5 text-white/60 mb-1" />
            </div>
          </button>

          <button 
            className="rounded-3xl bg-blue-600/40 backdrop-blur-xl border border-blue-400/20 p-6 flex flex-col justify-between min-h-[160px] transition-all hover:bg-blue-600/50 hover:scale-[1.02] active:scale-95 text-left"
            onClick={() => navigate('content-general')}
          >
            <div>
              <h3 className="text-white text-base font-medium whitespace-pre-line">{t.deepBreathing}</h3>
              <p className="text-white/60 text-xs mt-1">{t.deepBreathing3min}</p>
            </div>
            <div className="flex items-end justify-between mt-3 w-full">
              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <Wind className="w-5 h-5 text-white" />
              </div>
              <Heart className="w-5 h-5 text-white/60 mb-1" />
            </div>
          </button>

          <button
            className="rounded-3xl bg-purple-600/40 backdrop-blur-xl border border-purple-400/20 p-6 flex flex-col justify-between min-h-[160px] transition-all hover:bg-purple-600/50 hover:scale-[1.02] active:scale-95"
            onClick={() => navigate('content-general')}
          >
            <div>
              <h3 className="text-white text-base font-medium whitespace-pre-line">{t.meditationLibrary}</h3>
              <p className="text-white/60 text-xs mt-1">{t.meditationSessions}</p>
            </div>
            <div className="flex items-end justify-between mt-3">
              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <Headphones className="w-5 h-5 text-white" />
              </div>
              <Sparkles className="w-5 h-5 text-white/60 mb-1" />
            </div>
          </button>
        </div>
      </div>

      {/* Weekly Trend + Wellness Tip side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Trend */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-base font-medium">{t.thisWeek}</h3>
            <button className="text-white/60 text-sm hover:text-white transition-colors" onClick={() => navigate('mood-history-general')}>{t.seeDetails}</button>
          </div>

          <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/30 to-emerald-500/30 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{t.sleepQuality}</p>
                <p className="text-white/60 text-xs">{t.sleepQualityImprovement}</p>
              </div>
            </div>

            <div className="flex items-end justify-between gap-3 h-20">
              {[60, 45, 70, 55, 80, 75, 85].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-gradient-to-t from-blue-500/40 to-purple-500/40 rounded-t-lg transition-all" style={{ height: `${height}%` }} />
                  <span className="text-white/40 text-xs">{'SMTWTFS'[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wellness Tip */}
        <div className="flex flex-col">
          <h3 className="text-white text-base font-medium mb-4">Daily Tip</h3>
          <div className="rounded-2xl bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-xl border border-white/10 p-5 flex-1">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-yellow-300/80" />
              </div>
              <div className="flex-1">
                <h4 className="text-white/90 text-sm font-medium mb-2">{t.tipTitle}</h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  {t.tipContent}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function GoalItem({ icon, label, completed, onClick }: { icon: React.ReactNode; label: string; completed: boolean; onClick?: () => void }) {
  return (
    <button 
      className={`w-full rounded-xl backdrop-blur-xl border p-4 flex items-center gap-3 transition-all hover:scale-[1.01] ${completed
        ? 'bg-emerald-500/20 border-emerald-400/30'
        : 'bg-white/10 border-white/20 hover:bg-white/15'
      }`}
      onClick={onClick}
    >
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${completed ? 'bg-emerald-500/30' : 'bg-white/15'
        }`}>
        {completed ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        ) : (
          <div className="text-white/70">{icon}</div>
        )}
      </div>
      <p className={`text-sm flex-1 text-left ${completed ? 'text-white/90 line-through' : 'text-white/80'
        }`}>{label}</p>
    </button>
  );
}

{/* Breathing animation */}
const breatheStyle = document.createElement('style');
breatheStyle.textContent = `
  @keyframes breathe {
    0%, 100% { transform: scale(1); opacity: 0.4; }
    50% { transform: scale(1.15); opacity: 0.8; }
  }
`;
if (!document.getElementById('breathe-style')) {
  breatheStyle.id = 'breathe-style';
  document.head.appendChild(breatheStyle);
}