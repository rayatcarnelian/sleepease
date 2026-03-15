import {
  Settings,
  Play,
  Sparkles,
  Moon,
  Heart,
  TrendingUp,
  Flame,
  BookOpen,
  Star,
  CheckCircle2,
  Clock,
  Headphones,
  Music,
  Wind
} from "lucide-react";
import { Language, translations } from "../translations";
import PrayerTimesTracker from "./PrayerTimesTracker";

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

interface IslamicModeHomeProps {
  navigate: (screen: Screen, mode?: Mode) => void;
  userInfo: { name: string; email: string };
  currentLanguage: Language;
}

// Rotating Quranic verses for the banner
const quranicVerses = [
  { arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ', translation: 'Verily, in the remembrance of Allah do hearts find rest.', reference: 'Surah Ar-Ra\'d 13:28' },
  { arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا', translation: 'For indeed, with hardship comes ease.', reference: 'Surah Ash-Sharh 94:5' },
  { arabic: 'وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ', translation: 'And He is with you wherever you are.', reference: 'Surah Al-Hadid 57:4' },
  { arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي', translation: 'My Lord, expand for me my breast and ease for me my task.', reference: 'Surah Ta-Ha 20:25-26' },
];

export default function IslamicModeHome({ navigate, userInfo, currentLanguage }: IslamicModeHomeProps) {
  const t = translations[currentLanguage].islamicHome;

  // Select verse based on day of year for daily rotation
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const verse = quranicVerses[dayOfYear % quranicVerses.length];

  return (
    <div className="w-full">
      {/* Quranic Verse Banner */}
      <div className="mb-8 rounded-3xl bg-gradient-to-br from-emerald-900/30 to-teal-900/20 border border-yellow-400/15 backdrop-blur-xl p-6 sm:p-8 text-center overflow-hidden relative">
        {/* Decorative geometric pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `repeating-conic-gradient(rgba(245,211,108,0.3) 0% 25%, transparent 0% 50%)`,
          backgroundSize: '20px 20px',
        }} />
        <div className="relative">
          <p className="text-yellow-200/90 text-2xl sm:text-3xl lg:text-4xl leading-relaxed mb-3" style={{ fontFamily: "'Amiri', serif" }}>
            {verse.arabic}
          </p>
          <p className="text-emerald-100/70 text-sm sm:text-base italic mb-2">"{verse.translation}"</p>
          <p className="text-emerald-200/40 text-xs">{verse.reference}</p>
        </div>
      </div>

      {/* Greeting */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-emerald-100/70 text-sm">{t.greeting}</p>
          <p className="text-white text-3xl sm:text-4xl font-light mt-1">{userInfo.name || t.guest}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-500/25 to-teal-500/25 backdrop-blur-xl border border-emerald-400/20 p-5">
          <Flame className="w-6 h-6 text-emerald-400 mb-3" />
          <p className="text-white text-2xl font-bold">12</p>
          <p className="text-emerald-100/70 text-sm">{t.dayStreak}</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-amber-500/25 to-yellow-500/25 backdrop-blur-xl border border-amber-400/20 p-5">
          <TrendingUp className="w-6 h-6 text-yellow-400 mb-3" />
          <p className="text-white text-2xl font-bold">92%</p>
          <p className="text-emerald-100/70 text-sm">{t.prayers}</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-purple-500/25 to-pink-500/25 backdrop-blur-xl border border-purple-400/20 p-5 col-span-2 sm:col-span-1">
          <Star className="w-6 h-6 text-purple-400 mb-3" />
          <p className="text-white text-2xl font-bold">156</p>
          <p className="text-emerald-100/70 text-sm">{t.duasMastered}</p>
        </div>
      </div>

      {/* Two-column: Reflection Card + Daily Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Main Reflection Card */}
        <button
          onClick={() => navigate('mood-check-islamic')}
          className="w-full rounded-3xl bg-gradient-to-br from-white/15 to-white/5 border border-yellow-200/20 backdrop-blur-xl p-8 text-center transition-all hover:scale-[1.01] active:scale-95"
        >
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-amber-400/20 border border-yellow-200/30 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M21 12.5c-1.2.7-2.6 1.1-4.1 1.1-4.4 0-8-3.6-8-8 0-1.5.4-2.9 1.1-4.1A9 9 0 1 0 21 12.5Z" stroke="#F5D36C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 18.2s-2.5-1.5-3.6-2.9c-1.1-1.4-.7-3.2.6-4.1 1-.7 2.3-.5 3 .4.7-.9 2-.9 3-.2 1.2.8 1.5 2.6.4 4-1.1 1.5-3.4 2.8-3.4 2.8Z" fill="#F5D36C" opacity="0.9" />
            </svg>
          </div>
          <p className="text-white text-xl sm:text-2xl font-medium mb-2">{t.moodQuestion}</p>
          <p className="text-emerald-100/60 text-sm mb-1">{t.moodQuestion2}</p>
          <p className="text-emerald-200/70 text-xs flex items-center justify-center gap-2 mt-3">
            <Sparkles className="w-4 h-4" />
            {t.spiritualCheckIn}
          </p>
        </button>

        {/* Daily Islamic Goals + Prayer */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-base font-medium">{t.todaysGoals}</h3>
              <button className="text-emerald-100/60 text-sm hover:text-white transition-colors" onClick={() => navigate('mood-history-islamic')}>{t.viewAll}</button>
            </div>
            <div className="space-y-3">
              <IslamicGoalItem icon={<span className="text-base">🕌</span>} label={t.complete5Prayers} completed={true} onClick={() => navigate('mood-check-islamic')} />
              <IslamicGoalItem icon={<span className="text-base">📖</span>} label={t.readQuranDaily} completed={true} onClick={() => navigate('content-islamic')} />
              <IslamicGoalItem icon={<span className="text-base">🤲</span>} label={t.morningEveningAdhkar} completed={false} onClick={() => navigate('content-islamic')} />
            </div>
          </div>

          {/* Next Prayer */}
          <PrayerTimesTracker translations={t} />
        </div>
      </div>

      {/* AI Tutor Banner */}
      <button 
        onClick={() => navigate('islamic-tutor')}
        className="w-full mb-8 rounded-3xl bg-gradient-to-r from-amber-600/40 to-yellow-600/20 border border-amber-400/30 backdrop-blur-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between text-left transition-all hover:scale-[1.01] active:scale-95 shadow-lg shadow-amber-900/10"
      >
        <div className="flex-1 pr-0 sm:pr-8 mb-4 sm:mb-0">
          <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-amber-200" />
             </div>
             <h3 className="text-white text-xl font-medium">Islamic Knowledge Tutor</h3>
          </div>
          <p className="text-amber-100/70 text-sm">Ask questions and learn from the authentic sources of the Quran and Sahih Hadiths. Your personal AI companion.</p>
        </div>
        <div className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-medium text-sm text-center transition-colors">
          Ask a Question
        </div>
      </button>

      {/* Quick Action Cards */}
      <div className="mb-8">
        <h3 className="text-white text-base font-medium mb-4">{t.quickActions}</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            className="rounded-3xl bg-emerald-600/40 backdrop-blur-xl border border-emerald-400/20 p-6 flex flex-col justify-between min-h-[160px] transition-all hover:bg-emerald-600/50 hover:scale-[1.02] active:scale-95 text-left"
            onClick={() => navigate('content-islamic')}
          >
            <div>
              <h3 className="text-white text-base font-medium whitespace-pre-line">{t.eveningAdhkar}</h3>
              <p className="text-emerald-100/70 text-xs mt-1">{t.remembrance}</p>
            </div>
            <div className="flex items-end justify-between mt-3 w-full">
              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl mb-1">📿</span>
            </div>
          </button>

          <button
            className="rounded-3xl bg-amber-600/40 backdrop-blur-xl border-2 border-yellow-400/30 p-6 flex flex-col justify-between min-h-[160px] transition-all hover:bg-amber-600/50 hover:scale-[1.02] active:scale-95"
            onClick={() => navigate('content-islamic')}
          >
            <div>
              <h3 className="text-white text-base font-medium whitespace-pre-line">{t.quranAudio}</h3>
              <p className="text-emerald-100/70 text-xs mt-1">{t.listenReflect}</p>
            </div>
            <div className="flex items-end justify-between mt-3 w-full">
              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <Headphones className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl mb-1">📖</span>
            </div>
          </button>

          <button 
            className="rounded-3xl bg-purple-600/40 backdrop-blur-xl border border-purple-400/20 p-6 flex flex-col justify-between min-h-[160px] transition-all hover:bg-purple-600/50 hover:scale-[1.02] active:scale-95 text-left"
            onClick={() => navigate('content-islamic')}
          >
            <div>
              <h3 className="text-white text-base font-medium whitespace-pre-line">{t.dailyDuas}</h3>
              <p className="text-emerald-100/70 text-xs mt-1">{t.supplications}</p>
            </div>
            <div className="flex items-end justify-between mt-3 w-full">
              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl mb-1">🤲</span>
            </div>
          </button>

          <button 
            className="rounded-3xl bg-teal-600/40 backdrop-blur-xl border border-teal-400/20 p-6 flex flex-col justify-between min-h-[160px] transition-all hover:bg-teal-600/50 hover:scale-[1.02] active:scale-95 text-left"
            onClick={() => navigate('content-islamic')}
          >
            <div>
              <h3 className="text-white text-base font-medium whitespace-pre-line">{t.peacefulSounds}</h3>
              <p className="text-emerald-100/70 text-xs mt-1">{t.relaxation}</p>
            </div>
            <div className="flex items-end justify-between mt-3 w-full">
              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <Wind className="w-5 h-5 text-emerald-300/70 mb-1" />
            </div>
          </button>
        </div>
      </div>

      {/* Weekly Trend + Hadith side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Spiritual Progress */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-base font-medium">{t.thisWeek}</h3>
            <button className="text-emerald-100/60 text-sm hover:text-white transition-colors" onClick={() => navigate('mood-history-islamic')}>{t.seeDetails}</button>
          </div>
          <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/30 to-green-500/30 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{t.growingStronger}</p>
                <p className="text-emerald-100/70 text-xs">{t.spiritualGrowth}</p>
              </div>
            </div>
            <div className="flex items-end justify-between gap-3 h-20">
              {[65, 55, 75, 70, 85, 80, 92].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-gradient-to-t from-emerald-500/40 to-teal-500/40 rounded-t-lg transition-all" style={{ height: `${height}%` }} />
                  <span className="text-emerald-100/50 text-xs">{'SMTWTFS'[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hadith of the Day */}
        <div>
          <h3 className="text-white text-base font-medium mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            {t.hadithOfDay}
          </h3>
          <div className="rounded-3xl bg-gradient-to-br from-emerald-500/15 to-teal-500/15 border border-emerald-400/20 backdrop-blur-xl p-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400/30 to-amber-400/30 flex items-center justify-center mb-3">
              <span className="text-2xl">📿</span>
            </div>
            <p className="text-white/90 text-sm leading-relaxed italic mb-3">
              "{t.hadithContent}"
            </p>
            <p className="text-emerald-200/70 text-xs mb-4">{t.hadithSource}</p>
            <div className="pt-3 border-t border-white/10">
              <p className="text-emerald-200/80 text-xs mb-1.5">{t.todaysReflection}</p>
              <p className="text-emerald-100/80 text-xs leading-relaxed">{t.reflectionText}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function IslamicGoalItem({ icon, label, completed, onClick }: { icon: React.ReactNode; label: string; completed: boolean; onClick?: () => void }) {
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