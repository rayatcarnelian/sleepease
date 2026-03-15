import { useState } from 'react';
import { ChevronRight, Calendar, Award, Target, TrendingUp, Moon, Heart, Sun, BookOpen, Clock, Flame, Compass } from 'lucide-react';
import QiblaCompass from './QiblaCompass';

type Screen = 'mode-selection' | 'general-home' | 'islamic-home' | 'mood-check-general' | 'mood-check-islamic' | 'content-general' | 'content-islamic' | 'ai-chat' | 'ai-chat-islamic' | 'mood-history-general' | 'mood-history-islamic' | 'settings' | 'settings-islamic';
type Mode = 'general' | 'islamic' | null;

interface QiblaHistoryScreenProps {
  navigate: (screen: Screen, mode?: Mode) => void;
  currentLanguage: any; // We'll just accept any here or import Language if available
}

type MoodKey = 'peaceful' | 'grateful' | 'worried' | 'tired' | 'seeking';

const moodMeta: Record<MoodKey, { label: string; emoji: string; color: string; bgColor: string }> = {
  peaceful: { label: 'Peaceful', emoji: '🌙', color: 'text-emerald-400', bgColor: 'bg-emerald-400/30' },
  grateful: { label: 'Grateful', emoji: '🤲', color: 'text-green-400', bgColor: 'bg-green-400/30' },
  worried: { label: 'Worried', emoji: '😰', color: 'text-amber-400', bgColor: 'bg-amber-400/30' },
  tired: { label: 'Tired', emoji: '😴', color: 'text-purple-400', bgColor: 'bg-purple-400/30' },
  seeking: { label: 'Seeking', emoji: '🤔', color: 'text-blue-400', bgColor: 'bg-blue-400/30' },
};

const summary: { key: MoodKey; pct: number }[] = [
  { key: 'peaceful', pct: 38 }, { key: 'grateful', pct: 32 }, { key: 'worried', pct: 15 }, { key: 'tired', pct: 10 }, { key: 'seeking', pct: 5 }
];

const checkins: { day: string; time: string; mood: MoodKey; note?: string }[] = [
  { day: 'Today', time: '10:30 PM', mood: 'peaceful', note: 'Evening adhkar brought peace' },
  { day: 'Yesterday', time: '9:15 PM', mood: 'grateful', note: 'Alhamdulillah for blessings' },
  { day: 'Dec 29', time: '11:00 PM', mood: 'tired', note: 'Long day of fasting' },
  { day: 'Dec 28', time: '10:45 PM', mood: 'peaceful' },
  { day: 'Dec 27', time: '8:30 PM', mood: 'worried', note: 'Made dua for guidance' },
];

export default function QiblaHistoryScreen({ navigate, currentLanguage }: QiblaHistoryScreenProps) {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'insights' | 'history' | 'compass'>('overview');

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400/30 to-teal-400/30 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21 12.5c-1.2.7-2.6 1.1-4.1 1.1-4.4 0-8-3.6-8-8 0-1.5.4-2.9 1.1-4.1A9 9 0 1 0 21 12.5Z" stroke="#F5D36C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 18.2s-2.5-1.5-3.6-2.9c-1.1-1.4-.7-3.2.6-4.1 1-.7 2.3-.5 3 .4.7-.9 2-.9 3-.2 1.2.8 1.5 2.6.4 4-1.1 1.5-3.4 2.8-3.4 2.8Z" fill="#F5D36C" opacity="0.9" />
            </svg>
          </div>
          <div>
            <h1 className="text-white text-3xl font-light">Qibla & Journey</h1>
            <p className="text-emerald-100/70 mt-1">Your spiritual path</p>
          </div>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-white/10 border border-emerald-400/20 flex items-center gap-2 hover:bg-white/15 transition-all text-emerald-100/90 text-sm">
          <Calendar className="w-4 h-4 text-emerald-300" /> Week <ChevronRight className="w-4 h-4 opacity-50" />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="flex lg:flex-col gap-2 p-2 bg-white/5 border border-emerald-400/20 rounded-2xl overflow-x-auto">
            <button onClick={() => setSelectedTab('overview')} className={`px-4 py-3 rounded-xl text-sm font-medium transition-all text-left whitespace-nowrap ${selectedTab === 'overview' ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm' : 'text-emerald-100/60 hover:text-emerald-100'}`}>Overview</button>
            <button onClick={() => setSelectedTab('insights')} className={`px-4 py-3 rounded-xl text-sm font-medium transition-all text-left whitespace-nowrap ${selectedTab === 'insights' ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm' : 'text-emerald-100/60 hover:text-emerald-100'}`}>Insights</button>
            <button onClick={() => setSelectedTab('history')} className={`px-4 py-3 rounded-xl text-sm font-medium transition-all text-left whitespace-nowrap ${selectedTab === 'history' ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm' : 'text-emerald-100/60 hover:text-emerald-100'}`}>History</button>
            <button onClick={() => setSelectedTab('compass')} className={`px-4 py-3 rounded-xl text-sm font-medium transition-all text-left whitespace-nowrap ${selectedTab === 'compass' ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm' : 'text-emerald-100/60 hover:text-emerald-100 flex items-center gap-2'}`}>
              <Compass className="w-4 h-4" /> Compass
            </button>
          </div>
        </div>

        <div className="flex-1">
          {selectedTab === 'overview' && <OverviewTab />}
          {selectedTab === 'insights' && <InsightsTab />}
          {selectedTab === 'history' && <HistoryTab />}
          {selectedTab === 'compass' && <QiblaCompass />}
        </div>
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={<Flame className="w-8 h-8" />} value="12" label="Prayer Streak" gradient="from-emerald-500/25 to-teal-500/25" iconColor="text-emerald-400" />
        <StatCard icon={<Target className="w-8 h-8" />} value="35" label="Check-ins" gradient="from-amber-500/25 to-yellow-500/25" iconColor="text-yellow-400" />
        <StatCard icon={<Award className="w-8 h-8" />} value="6" label="Badges" gradient="from-purple-500/25 to-pink-500/25" iconColor="text-purple-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-white/5 border border-emerald-400/20 p-6 sm:p-8 flex flex-col h-80 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-lg font-medium">Spiritual Growth</h3>
            <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium bg-emerald-500/20 px-3 py-1 rounded-full"><TrendingUp className="w-4 h-4"/>+18%</div>
          </div>
          <div className="w-full flex items-end justify-between gap-4 flex-1 px-2 pb-8">
            {[70, 60, 80, 75, 88, 82, 92].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full sm:w-8 flex-1 flex flex-col justify-end relative group">
                  <div className="w-full bg-gradient-to-t from-emerald-500/40 to-teal-500/40 rounded-t-lg transition-all group-hover:from-emerald-400/60 group-hover:to-teal-400/60" style={{ height: `${height}%` }} />
                </div>
                <span className="text-emerald-100/40 text-xs sm:text-sm">{'SMTWTFS'[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white/5 border border-emerald-400/20 p-6 sm:p-8 h-80 flex flex-col justify-start">
          <h3 className="text-white text-lg font-medium mb-6">Emotional State</h3>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2">
            {summary.map(s => (
              <div key={s.key} className="flex items-center gap-4">
                <span className="text-3xl">{moodMeta[s.key].emoji}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <span className="text-emerald-100/90 font-medium">{moodMeta[s.key].label}</span><span className="text-emerald-100/70">{s.pct}%</span>
                  </div>
                  <div className="h-2.5 bg-white/10 rounded-full overflow-hidden"><div className={`h-full ${moodMeta[s.key].bgColor}`} style={{ width: `${s.pct}%` }}/></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-3xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/20 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0 text-3xl">🕌</div>
          <div className="flex-1"><h3 className="text-white font-medium text-lg">Prayer Consistency</h3><p className="text-emerald-100/80 text-sm mt-1">Completed 5 prayers for 12 days! 🌟</p></div>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/20 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
           <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0"><Award className="w-7 h-7 text-yellow-400" /></div>
           <div className="flex-1"><h3 className="text-white font-medium text-lg">New Milestone!</h3><p className="text-emerald-100/80 text-sm mt-1">12-day prayer streak unlocked 🌟</p></div>
        </div>
      </div>
    </div>
  );
}

function InsightsTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InsightCard icon={<TrendingUp className="w-6 h-6"/>} title="Spiritual Progress" description="Your peaceful moments increased by 28% this week, MashaAllah" gradient="from-emerald-500/20 to-green-500/20" iconBg="from-emerald-400/30 to-green-400/30" tag="MashaAllah" />
      <InsightCard icon={<Moon className="w-6 h-6"/>} title="Best Reflection Time" description="Evening check-ins after Maghrib show highest peace levels" gradient="from-indigo-500/20 to-purple-500/20" iconBg="from-indigo-400/30 to-purple-400/30" tag="Pattern" />
      <InsightCard icon={<BookOpen className="w-6 h-6"/>} title="Quran Reading Impact" description="Days with Quran reading show 65% more peacefulness" gradient="from-amber-500/20 to-yellow-500/20" iconBg="from-amber-400/30 to-yellow-400/30" tag="Discovery" />
      <InsightCard icon={<Heart className="w-6 h-6"/>} title="Dhikr Benefits" description="Regular dhikr practice leads to 70% better emotional balance" gradient="from-pink-500/20 to-rose-500/20" iconBg="from-pink-400/30 to-rose-400/30" tag="Insight" />
      <InsightCard icon={<Clock className="w-6 h-6"/>} title="Prayer Times" description="Never missed Fajr this week - keep up the dedication!" gradient="from-blue-500/20 to-cyan-500/20" iconBg="from-blue-400/30 to-cyan-400/30" tag="Achievement" />
      <InsightCard icon={<Sun className="w-6 h-6"/>} title="Morning Gratitude" description="Morning adhkar correlates with 50% better mood throughout the day" gradient="from-orange-500/20 to-amber-500/20" iconBg="from-orange-400/30 to-amber-400/30" tag="Tip" />
    </div>
  );
}

function HistoryTab() {
  return (
    <div className="space-y-4">
      {checkins.map((checkin, i) => (
        <div key={i} className="rounded-2xl bg-white/5 border border-emerald-400/20 p-6 flex flex-col sm:flex-row sm:items-center gap-5 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-5 w-full sm:w-auto">
            <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center text-3xl shadow-lg flex-shrink-0">{moodMeta[checkin.mood].emoji}</div>
            <div className="flex-1 sm:w-48">
              <h3 className="text-white font-medium text-lg mb-1">{moodMeta[checkin.mood].label}</h3>
              <p className="text-emerald-100/60 text-sm flex items-center gap-2"><Calendar className="w-4 h-4"/>{checkin.day} • {checkin.time}</p>
            </div>
          </div>
          {checkin.note && (
            <div className="flex-1 rounded-xl bg-emerald-500/10 p-4 border border-emerald-500/20 mt-4 sm:mt-0">
              <p className="text-emerald-100/80 italic">"{checkin.note}"</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function StatCard({ icon, value, label, gradient, iconColor }: { icon: React.ReactNode; value: string; label: string; gradient: string; iconColor: string; }) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${gradient} border border-white/10 p-6 flex items-center gap-4`}>
       <div className={`w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 ${iconColor}`}>{icon}</div>
       <div><p className="text-white text-3xl font-bold">{value}</p><p className="text-emerald-100/80 text-sm mt-1">{label}</p></div>
    </div>
  );
}

function InsightCard({ icon, title, description, gradient, iconBg, tag }: { icon: React.ReactNode; title: string; description: string; gradient: string; iconBg: string; tag?: string; }) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-colors flex flex-col sm:flex-row gap-5`}>
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${gradient}`}>{icon}</div>
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h4 className="text-white font-medium text-lg">{title}</h4>
          {tag && <span className="px-2.5 py-1 rounded-full bg-white/10 text-emerald-100/90 text-xs font-medium">{tag}</span>}
        </div>
        <p className="text-emerald-100/70 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}