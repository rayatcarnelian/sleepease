import { useState } from 'react';
import { ChevronRight, Moon, User, Sun, Globe, Shield, FileText, Bell, Palette, Volume2, HelpCircle, Mail, Star, Award, Heart, LogOut, BookOpen, Smartphone, Calendar, Compass, ArrowLeft, Check, Camera, Save, ChevronDown, MessageCircle, X } from 'lucide-react';
import { Language, translations } from '../translations';

type Mode = 'general' | 'islamic';
type Screen = 'mode-selection' | 'general-home' | 'islamic-home' | 'mood-check-general' | 'mood-check-islamic' | 'content-general' | 'content-islamic' | 'ai-chat' | 'ai-chat-islamic' | 'mood-history-general' | 'mood-history-islamic' | 'settings' | 'settings-islamic' | 'language-selection';

interface SettingsModeSwitchingIslamicProps {
  navigate: (screen: Screen, mode?: 'general' | 'islamic' | null) => void;
  currentMode: 'general' | 'islamic';
  userInfo: { name: string; email: string };
  onLogout: () => void;
  currentLanguage: Language;
}

type Panel = null | 'profile' | 'notifications' | 'theme' | 'sound' | 'account' | 'achievements' | 'favorites' | 'help' | 'contact' | 'privacy' | 'terms' | 'prayer-times' | 'qibla' | 'hijri' | 'quran-progress';

export default function SettingsModeSwitchingIslamic({ navigate, currentMode, userInfo, onLogout, currentLanguage }: SettingsModeSwitchingIslamicProps) {
  const t = translations[currentLanguage].settings;
  const [activePanel, setActivePanel] = useState<Panel>(null);
  const [editName, setEditName] = useState(userInfo.name);
  const [editEmail, setEditEmail] = useState(userInfo.email);
  const [profileSaved, setProfileSaved] = useState(false);
  const [notifPrayer, setNotifPrayer] = useState(true);
  const [notifMood, setNotifMood] = useState(true);
  const [notifQuran, setNotifQuran] = useState(true);
  const [theme, setTheme] = useState<'emerald' | 'midnight' | 'gold'>('emerald');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [soundVolume, setSoundVolume] = useState(75);
  const [adhanStyle, setAdhanStyle] = useState('makkah');

  // Mock prayer times
  const prayerTimes = [
    { name: 'Fajr', time: '5:42 AM', icon: '🌅', active: false },
    { name: 'Dhuhr', time: '12:35 PM', icon: '☀️', active: false },
    { name: 'Asr', time: '3:48 PM', icon: '🌤️', active: false },
    { name: 'Maghrib', time: '6:52 PM', icon: '🌅', active: false },
    { name: 'Isha', time: '8:12 PM', icon: '🌙', active: true },
  ];

  // Islamic achievements
  const achievements = [
    { icon: '🕌', name: '5 Prayers Complete', desc: 'Logged all 5 daily prayers', earned: true },
    { icon: '📖', name: 'Quran Reader', desc: 'Read 3 surahs in the app', earned: true },
    { icon: '🤲', name: 'Dua Master', desc: 'Learned 10 daily du\'as', earned: true },
    { icon: '🔥', name: '7-Day Streak', desc: 'Used the app for 7 days straight', earned: true },
    { icon: '🌙', name: 'Night Worshipper', desc: 'Read Quran after Isha for 7 days', earned: true },
    { icon: '💬', name: 'Seeker of Knowledge', desc: 'Had 5 AI chat sessions', earned: true },
    { icon: '⭐', name: 'Ramadan Ready', desc: 'Complete 30 days of spiritual goals', earned: false },
    { icon: '🏆', name: 'Hafiz Journey', desc: 'Memorize Juz Amma (30th part)', earned: false },
  ];

  const favorites = [
    { icon: '📿', type: 'Du\'a', title: 'Evening Adhkar', subtitle: 'Ayat Al-Kursi · Fortress of the Muslim' },
    { icon: '📖', type: 'Quran', title: 'Surah Al-Mulk', subtitle: 'The Sovereignty · with Tafsir' },
    { icon: '🕌', type: 'Audio', title: 'Surah Ar-Rahman', subtitle: '13 min · Quran Recitation' },
    { icon: '⭐', type: 'Story', title: 'Stories of the Prophets', subtitle: 'Yusuf & Ibrahim AS' },
  ];

  if (activePanel) {
    return (
      <div className="w-full max-w-4xl mx-auto pb-16" style={{ animation: 'fadeSlideIn 0.3s ease-out' }}>
        <button onClick={() => { setActivePanel(null); setProfileSaved(false); }} className="flex items-center gap-3 text-emerald-100/60 hover:text-white mb-8 transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Settings
        </button>

        {activePanel === 'profile' && (
          <div className="space-y-8">
            <h2 className="text-white text-3xl font-light">Edit Profile</h2>
            <div className="rounded-3xl bg-white/5 border border-emerald-400/15 p-8 space-y-8">
              <div className="flex flex-col items-center gap-4">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-emerald-400/40 to-teal-400/40 flex items-center justify-center relative group cursor-pointer">
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="none"><path d="M21 12.5c-1.2.7-2.6 1.1-4.1 1.1-4.4 0-8-3.6-8-8 0-1.5.4-2.9 1.1-4.1A9 9 0 1 0 21 12.5Z" stroke="#F5D36C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 18.2s-2.5-1.5-3.6-2.9c-1.1-1.4-.7-3.2.6-4.1 1-.7 2.3-.5 3 .4.7-.9 2-.9 3-.2 1.2.8 1.5 2.6.4 4-1.1 1.5-3.4 2.8-3.4 2.8Z" fill="#F5D36C" opacity="0.9" /></svg>
                  <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Camera className="w-7 h-7 text-white" /></div>
                </div>
              </div>
              <div className="space-y-6 max-w-md mx-auto">
                <div>
                  <label className="text-emerald-100/60 text-sm mb-2 block">Full Name</label>
                  <input value={editName} onChange={e => setEditName(e.target.value)} className="w-full bg-white/10 border border-emerald-400/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all" />
                </div>
                <div>
                  <label className="text-emerald-100/60 text-sm mb-2 block">Email</label>
                  <input value={editEmail} onChange={e => setEditEmail(e.target.value)} className="w-full bg-white/10 border border-emerald-400/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all" />
                </div>
                <div>
                  <label className="text-emerald-100/60 text-sm mb-2 block">Location (for prayer times)</label>
                  <input className="w-full bg-white/10 border border-emerald-400/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-400 transition-all" defaultValue="Kuala Lumpur, Malaysia" />
                </div>
                <button onClick={() => setProfileSaved(true)} className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:scale-[1.01] shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2">
                  {profileSaved ? <><Check className="w-5 h-5" /> Saved!</> : <><Save className="w-5 h-5" /> Save Changes</>}
                </button>
              </div>
            </div>
          </div>
        )}

        {activePanel === 'prayer-times' && (
          <div className="space-y-8">
            <h2 className="text-white text-3xl font-light flex items-center gap-3"><Moon className="w-8 h-8 text-yellow-300" /> Prayer Times</h2>
            <p className="text-emerald-100/60">Kuala Lumpur, Malaysia · March 15, 2026</p>
            <div className="space-y-3">
              {prayerTimes.map((p, i) => (
                <div key={i} className={`rounded-2xl p-5 flex items-center gap-4 border transition-all ${p.active ? 'bg-emerald-500/15 border-emerald-400/30' : 'bg-white/5 border-white/10'}`} style={{ animation: `fadeSlideIn 0.3s ease-out ${i * 0.05}s both` }}>
                  <div className="text-3xl">{p.icon}</div>
                  <div className="flex-1"><p className="text-white font-medium text-lg">{p.name}</p></div>
                  <p className={`text-lg font-mono ${p.active ? 'text-emerald-300 font-bold' : 'text-white/70'}`}>{p.time}</p>
                  {p.active && <div className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">Next</div>}
                </div>
              ))}
            </div>
            <div className="rounded-3xl bg-white/5 border border-emerald-400/15 p-6 space-y-4">
              <h3 className="text-white font-medium">Calculation Method</h3>
              <div className="grid grid-cols-2 gap-3">
                {['JAKIM (Malaysia)', 'Egyptian Authority', 'ISNA', 'Umm Al-Qura'].map((m, i) => (
                  <button key={m} className={`p-3 rounded-xl border text-sm transition-all ${i === 0 ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-200' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}>{m}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activePanel === 'qibla' && (
          <div className="space-y-8">
            <h2 className="text-white text-3xl font-light flex items-center gap-3"><Compass className="w-8 h-8 text-emerald-300" /> Qibla Direction</h2>
            <div className="rounded-3xl bg-white/5 border border-emerald-400/15 p-8 flex flex-col items-center gap-6">
              <div className="w-48 h-48 rounded-full border-4 border-emerald-400/30 flex items-center justify-center relative">
                <div className="absolute w-2 h-20 bg-gradient-to-t from-emerald-400 to-transparent rounded-full" style={{ transform: 'rotate(293deg)', transformOrigin: 'bottom center', bottom: '50%' }} />
                <div className="w-4 h-4 rounded-full bg-emerald-400" />
                <p className="absolute -top-8 text-white/60 text-sm">N</p>
                <p className="absolute -bottom-8 text-white/60 text-sm">S</p>
                <p className="absolute -right-6 text-white/60 text-sm">E</p>
                <p className="absolute -left-6 text-white/60 text-sm">W</p>
              </div>
              <div className="text-center">
                <p className="text-white text-2xl font-bold">293° NW</p>
                <p className="text-emerald-100/60 mt-2">Direction to Makkah from Kuala Lumpur</p>
                <p className="text-emerald-100/40 text-sm mt-1">Distance: 7,595 km</p>
              </div>
            </div>
          </div>
        )}

        {activePanel === 'hijri' && (
          <div className="space-y-8">
            <h2 className="text-white text-3xl font-light flex items-center gap-3"><Calendar className="w-8 h-8 text-purple-300" /> Hijri Calendar</h2>
            <div className="rounded-3xl bg-white/5 border border-emerald-400/15 p-8 text-center space-y-6">
              <div>
                <p className="text-emerald-300 text-sm uppercase tracking-widest">Today's Islamic Date</p>
                <p className="text-white text-4xl font-serif mt-3">15 Ramadan 1447</p>
                <p className="text-emerald-100/50 mt-2">Saturday, March 15, 2026</p>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="rounded-2xl bg-white/5 p-4"><p className="text-2xl mb-1">🌙</p><p className="text-white/60 text-sm">Ramadan</p><p className="text-white font-medium">Month of Fasting</p></div>
                <div className="rounded-2xl bg-white/5 p-4"><p className="text-2xl mb-1">📖</p><p className="text-white/60 text-sm">Day 15</p><p className="text-white font-medium">Half Complete</p></div>
                <div className="rounded-2xl bg-white/5 p-4"><p className="text-2xl mb-1">⭐</p><p className="text-white/60 text-sm">Upcoming</p><p className="text-white font-medium">Laylat Al-Qadr</p></div>
              </div>
            </div>
          </div>
        )}

        {activePanel === 'quran-progress' && (
          <div className="space-y-8">
            <h2 className="text-white text-3xl font-light flex items-center gap-3"><BookOpen className="w-8 h-8 text-amber-300" /> Quran Progress</h2>
            <div className="rounded-3xl bg-white/5 border border-emerald-400/15 p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div><p className="text-white font-medium text-lg">Overall Progress</p><p className="text-emerald-100/60">Juz 30 (Amma)</p></div>
                <div className="text-3xl font-bold text-emerald-300">15%</div>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" style={{ width: '15%' }} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-emerald-500/10 border border-emerald-400/20 p-4"><p className="text-emerald-300 text-2xl font-bold">5</p><p className="text-white/60 text-sm">Surahs Read</p></div>
                <div className="rounded-2xl bg-teal-500/10 border border-teal-400/20 p-4"><p className="text-teal-300 text-2xl font-bold">2.5h</p><p className="text-white/60 text-sm">Total Listening</p></div>
                <div className="rounded-2xl bg-amber-500/10 border border-amber-400/20 p-4"><p className="text-amber-300 text-2xl font-bold">10</p><p className="text-white/60 text-sm">Du'as Learned</p></div>
                <div className="rounded-2xl bg-purple-500/10 border border-purple-400/20 p-4"><p className="text-purple-300 text-2xl font-bold">7</p><p className="text-white/60 text-sm">Day Streak</p></div>
              </div>
            </div>
            <div className="rounded-3xl bg-white/5 border border-emerald-400/15 p-6 space-y-4">
              <h3 className="text-white font-medium">Recently Read</h3>
              {['Surah Al-Mulk · Completed', 'Surah Ar-Rahman · In Progress', 'Surah Al-Kahf · Not Started'].map((s, i) => (
                <div key={s} className="flex items-center gap-3 py-2">
                  <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-emerald-400' : i === 1 ? 'bg-amber-400' : 'bg-white/20'}`} />
                  <p className="text-white/70 text-sm">{s}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activePanel === 'notifications' && (
          <div className="space-y-8">
            <h2 className="text-white text-3xl font-light">Notifications</h2>
            <div className="rounded-3xl bg-white/5 border border-emerald-400/15 overflow-hidden divide-y divide-white/10">
              <ToggleRow label="Prayer Time Alerts" desc="Get notified for each prayer time" checked={notifPrayer} onChange={setNotifPrayer} />
              <ToggleRow label="Mood Check-In" desc="Daily reminder to log your mood" checked={notifMood} onChange={setNotifMood} />
              <ToggleRow label="Quran Reading Reminder" desc="Daily reminder to read Quran" checked={notifQuran} onChange={setNotifQuran} />
            </div>
            <div className="rounded-3xl bg-white/5 border border-emerald-400/15 p-6 space-y-4">
              <h3 className="text-white font-medium">Adhan Sound</h3>
              <div className="grid grid-cols-2 gap-3">
                {[{ id: 'makkah', n: 'Makkah' }, { id: 'madinah', n: 'Madinah' }, { id: 'cairo', n: 'Cairo' }, { id: 'silent', n: 'Silent' }].map(s => (
                  <button key={s.id} onClick={() => setAdhanStyle(s.id)} className={`p-3 rounded-xl border text-sm transition-all ${adhanStyle === s.id ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-200' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}>{s.n}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activePanel === 'theme' && (
          <div className="space-y-8">
            <h2 className="text-white text-3xl font-light">Theme & Appearance</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 'emerald' as const, name: 'Emerald Night', colors: 'from-emerald-900 to-teal-950', border: 'border-emerald-400' },
                { id: 'midnight' as const, name: 'Midnight ', colors: 'from-slate-900 to-indigo-950', border: 'border-indigo-400' },
                { id: 'gold' as const, name: 'Golden Sands', colors: 'from-amber-900 to-yellow-950', border: 'border-amber-400' },
              ].map(t => (
                <button key={t.id} onClick={() => setTheme(t.id)} className={`rounded-2xl border-2 ${theme === t.id ? t.border : 'border-white/10'} p-1 transition-all ${theme === t.id ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}>
                  <div className={`h-32 rounded-xl bg-gradient-to-br ${t.colors} flex items-center justify-center`}>{theme === t.id && <Check className="w-8 h-8 text-white" />}</div>
                  <p className={`text-center py-3 font-medium ${theme === t.id ? 'text-white' : 'text-white/60'}`}>{t.name}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {activePanel === 'sound' && (
          <div className="space-y-8">
            <h2 className="text-white text-3xl font-light">Sound Settings</h2>
            <div className="rounded-3xl bg-white/5 border border-emerald-400/15 overflow-hidden divide-y divide-white/10">
              <ToggleRow label="Sound Effects" desc="UI sounds and feedback" checked={soundEnabled} onChange={setSoundEnabled} />
            </div>
            <div className="rounded-3xl bg-white/5 border border-emerald-400/15 p-6 space-y-4">
              <h3 className="text-white font-medium">Volume</h3>
              <div className="flex items-center gap-4">
                <Volume2 className="w-5 h-5 text-emerald-100/60" />
                <input type="range" min="0" max="100" value={soundVolume} onChange={e => setSoundVolume(+e.target.value)} className="flex-1 accent-emerald-500" />
                <span className="text-emerald-100/60 text-sm w-10 text-right">{soundVolume}%</span>
              </div>
            </div>
          </div>
        )}

        {activePanel === 'account' && (
          <div className="space-y-8">
            <h2 className="text-white text-3xl font-light">Manage Account</h2>
            <div className="rounded-3xl bg-white/5 border border-emerald-400/15 p-8 space-y-6">
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <div><p className="text-white font-medium">Name</p><p className="text-emerald-100/60 text-sm">{userInfo.name}</p></div>
                <button onClick={() => setActivePanel('profile')} className="text-emerald-400 text-sm hover:underline">Edit</button>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <div><p className="text-white font-medium">Email</p><p className="text-emerald-100/60 text-sm">{userInfo.email}</p></div>
                <button onClick={() => setActivePanel('profile')} className="text-emerald-400 text-sm hover:underline">Edit</button>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <div><p className="text-white font-medium">Password</p><p className="text-emerald-100/60 text-sm">••••••••</p></div>
                <button className="text-emerald-400 text-sm hover:underline">Change</button>
              </div>
              <div className="flex items-center justify-between py-3">
                <div><p className="text-white font-medium">Account Type</p><p className="text-emerald-100/60 text-sm">Blessed Member</p></div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400" /> Blessed</div>
              </div>
            </div>
          </div>
        )}

        {activePanel === 'achievements' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-3xl font-light">Spiritual Milestones</h2>
              <div className="px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-bold">{achievements.filter(a => a.earned).length} / {achievements.length}</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((a, i) => (
                <div key={i} className={`rounded-2xl p-5 border transition-all ${a.earned ? 'bg-white/5 border-emerald-400/15' : 'bg-white/[0.02] border-white/5 opacity-50'}`} style={{ animation: `fadeSlideIn 0.3s ease-out ${i * 0.05}s both` }}>
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${a.earned ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20' : 'bg-white/5'}`}>{a.icon}</div>
                    <div className="flex-1"><p className="text-white font-medium">{a.name}</p><p className="text-emerald-100/50 text-sm">{a.desc}</p></div>
                    {a.earned && <Check className="w-5 h-5 text-emerald-400" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activePanel === 'favorites' && (
          <div className="space-y-8">
            <h2 className="text-white text-3xl font-light">Saved Du'as & Content</h2>
            <div className="space-y-3">
              {favorites.map((f, i) => (
                <div key={i} className="rounded-2xl bg-white/5 border border-emerald-400/15 p-5 flex items-center gap-4 hover:bg-white/8 transition-colors cursor-pointer" style={{ animation: `fadeSlideIn 0.3s ease-out ${i * 0.05}s both` }}>
                  <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center text-2xl">{f.icon}</div>
                  <div className="flex-1"><p className="text-white font-medium">{f.title}</p><p className="text-emerald-100/50 text-sm">{f.subtitle}</p></div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300/60 text-xs">{f.type}</span>
                  <Heart className="w-5 h-5 text-red-400 fill-red-400" />
                </div>
              ))}
            </div>
          </div>
        )}

        {activePanel === 'help' && (
          <div className="space-y-8">
            <h2 className="text-white text-3xl font-light">Help Center</h2>
            <div className="rounded-3xl bg-white/5 border border-emerald-400/15 overflow-hidden divide-y divide-white/10">
              {[
                { q: 'How do I set up prayer time notifications?', a: 'Go to Settings → Prayer Times. Prayer times are calculated based on your location (Kuala Lumpur by default). Enable notifications to get alerts before each prayer.' },
                { q: 'How do I find the Qibla direction?', a: 'Go to Settings → Qibla Direction. The compass shows the direction to Makkah from your current location.' },
                { q: 'How do I access Quran recitations?', a: 'Navigate to Personalized for You → Audio tab. You\'ll find Surah recitations from renowned reciters.' },
                { q: 'How does the Islamic AI chat work?', a: 'The AI chat provides Islamic wellness support with references to Quran and Hadith. Navigate to the AI tab in the header.' },
                { q: 'Can I switch to General mode?', a: 'Yes! Click the \'Islamic\' badge in the top-right corner of the header, or go to Settings → App Mode.' },
              ].map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
            </div>
          </div>
        )}

        {activePanel === 'contact' && (
          <div className="space-y-8">
            <h2 className="text-white text-3xl font-light">Contact Support</h2>
            <div className="rounded-3xl bg-white/5 border border-emerald-400/15 p-8 space-y-6">
              <div>
                <label className="text-emerald-100/60 text-sm mb-2 block">Subject</label>
                <input className="w-full bg-white/10 border border-emerald-400/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-400 transition-all" placeholder="What do you need help with?" />
              </div>
              <div>
                <label className="text-emerald-100/60 text-sm mb-2 block">Message</label>
                <textarea className="w-full bg-white/10 border border-emerald-400/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-400 transition-all resize-none h-36" placeholder="Describe your issue or feedback..." />
              </div>
              <button className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:scale-[1.01] shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2">
                <Mail className="w-5 h-5" /> Send Message
              </button>
            </div>
          </div>
        )}

        {activePanel === 'privacy' && (
          <div className="space-y-8">
            <h2 className="text-white text-3xl font-light">Privacy Policy</h2>
            <div className="rounded-3xl bg-white/5 border border-emerald-400/15 p-8 space-y-6 text-emerald-100/70 leading-relaxed">
              <p className="text-white font-medium text-lg">Last updated: March 2026</p>
              <h3 className="text-white font-medium">1. Information We Collect</h3>
              <p>SleepEase collects only the information necessary to provide you with a personalized wellness and spiritual experience. This includes your name, email, location (for prayer times), mood entries, and app preferences.</p>
              <h3 className="text-white font-medium">2. How We Use Your Data</h3>
              <p>Your data is used to personalize your experience, calculate prayer times, track spiritual progress, and provide AI-powered support. We never sell your personal information.</p>
              <h3 className="text-white font-medium">3. Data Security</h3>
              <p>All personal data is encrypted using industry-standard protocols. Your spiritual data is treated with the highest respect and confidentiality.</p>
            </div>
          </div>
        )}

        {activePanel === 'terms' && (
          <div className="space-y-8">
            <h2 className="text-white text-3xl font-light">Terms of Service</h2>
            <div className="rounded-3xl bg-white/5 border border-emerald-400/15 p-8 space-y-6 text-emerald-100/70 leading-relaxed">
              <p className="text-white font-medium text-lg">Effective: March 2026</p>
              <h3 className="text-white font-medium">1. Acceptance of Terms</h3>
              <p>By using SleepEase Islamic Mode, you agree to these terms. The app provides spiritual content for educational purposes and is not a substitute for scholarly authority.</p>
              <h3 className="text-white font-medium">2. Islamic Content Disclaimer</h3>
              <p>All Quran verses, Hadith references, and Du'as are sourced from authentic collections. However, for specific fiqh (jurisprudence) questions, please consult a qualified scholar.</p>
              <h3 className="text-white font-medium">3. AI Chat Disclaimer</h3>
              <p>The AI wellness support provides general Islamic guidance but is not a mufti or scholar. Always verify important religious matters with qualified authorities.</p>
            </div>
          </div>
        )}

        <style>{`@keyframes fadeSlideIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }`}</style>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-10 pb-16">
      <div>
        <h1 className="text-white text-3xl font-light flex items-center gap-3"><Moon className="w-8 h-8 text-yellow-300" />{t.title}</h1>
        <p className="text-emerald-100/70 mt-1">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Profile Card */}
          <div className="rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/20 p-6 flex items-center gap-5 shadow-lg">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400/40 to-teal-400/40 flex items-center justify-center text-4xl shadow-inner">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M21 12.5c-1.2.7-2.6 1.1-4.1 1.1-4.4 0-8-3.6-8-8 0-1.5.4-2.9 1.1-4.1A9 9 0 1 0 21 12.5Z" stroke="#F5D36C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 18.2s-2.5-1.5-3.6-2.9c-1.1-1.4-.7-3.2.6-4.1 1-.7 2.3-.5 3 .4.7-.9 2-.9 3-.2 1.2.8 1.5 2.6.4 4-1.1 1.5-3.4 2.8-3.4 2.8Z" fill="#F5D36C" opacity="0.9" /></svg>
            </div>
            <div className="flex-1">
              <h3 className="text-white text-xl font-medium mb-1">{userInfo.name || translations[currentLanguage].islamicHome.guest}</h3>
              <p className="text-emerald-100/80 text-sm mb-2">{userInfo.email || 'No email'}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-100/90 text-xs font-medium border border-emerald-500/30"><Star className="w-3.5 h-3.5 text-yellow-400" />{t.blessedMember}</div>
            </div>
            <button onClick={() => setActivePanel('profile')} className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 px-4 py-2 rounded-xl text-sm transition-colors border border-emerald-500/20">Edit</button>
          </div>

          <div className="space-y-4">
             <SectionLabel text={t.islamicSettingsTitle} />
             <div className="bg-white/5 border border-emerald-400/20 rounded-3xl overflow-hidden divide-y divide-white/10 shadow-lg">
                <SettingRow icon={<Moon className="w-5 h-5"/>} label={t.prayerTimes} subtitle={t.prayerTimesDesc} iconBg="from-emerald-500/30 to-teal-500/30" onClick={() => setActivePanel('prayer-times')} />
                <SettingRow icon={<Compass className="w-5 h-5" />} label={t.qiblaDirection} subtitle={t.qiblaDesc} iconBg="from-blue-500/30 to-cyan-500/30" onClick={() => setActivePanel('qibla')} />
                <SettingRow icon={<Calendar className="w-5 h-5" />} label={t.hijriCalendar} subtitle={t.hijriDesc} iconBg="from-purple-500/30 to-indigo-500/30" onClick={() => setActivePanel('hijri')} />
                <SettingRow icon={<BookOpen className="w-5 h-5" />} label={t.quranProgress} subtitle={t.quranDesc} iconBg="from-amber-500/30 to-yellow-500/30" onClick={() => setActivePanel('quran-progress')} />
             </div>
          </div>
          
          <div className="space-y-4">
             <SectionLabel text={t.preferences} />
             <div className="bg-white/5 border border-emerald-400/20 rounded-3xl overflow-hidden divide-y divide-white/10 shadow-lg">
               <SettingRow icon={<Sun />} label={t.appMode} subtitle={currentMode === 'general' ? t.generalMode : t.islamicMode} iconBg="from-orange-500/30 to-amber-500/30" onClick={() => navigate(currentMode === 'general' ? 'islamic-home' : 'general-home', currentMode === 'general' ? 'islamic' : 'general')} />
               <SettingRow icon={<Bell />} label={t.notifications} subtitle={t.prayerReminders} iconBg="from-emerald-500/30 to-green-500/30" badge="On" onClick={() => setActivePanel('notifications')} />
               <SettingRow icon={<Palette />} label={t.theme} subtitle={t.islamicMode} iconBg="from-teal-500/30 to-cyan-500/30" onClick={() => setActivePanel('theme')} />
               <SettingRow icon={<Volume2 />} label={t.sound} subtitle={t.makkahAdhan} iconBg="from-blue-500/30 to-indigo-500/30" onClick={() => setActivePanel('sound')} />
               <SettingRow icon={<Globe />} label={t.language} subtitle={currentLanguage === 'en' ? 'English' : currentLanguage === 'zh' ? '中文' : currentLanguage === 'ar' ? 'العربية' : 'Bahasa Melayu'} iconBg="from-purple-500/30 to-pink-500/30" onClick={() => navigate('language-selection')} />
             </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <SectionLabel text={t.account} />
            <div className="bg-white/5 border border-emerald-400/20 rounded-3xl overflow-hidden divide-y divide-white/10 shadow-lg">
              <SettingRow icon={<User />} label={t.manageAccount} subtitle={t.personalInfo} iconBg="from-slate-500/30 to-gray-500/30" onClick={() => setActivePanel('account')} />
              <SettingRow icon={<Award />} label={t.spiritualMilestones} subtitle={t.achievementsDesc} iconBg="from-yellow-500/30 to-amber-500/30" onClick={() => setActivePanel('achievements')} />
              <SettingRow icon={<Heart />} label={t.savedDuas} subtitle={t.favoritesDesc} iconBg="from-red-500/30 to-rose-500/30" onClick={() => setActivePanel('favorites')} />
            </div>
          </div>

          <div className="space-y-4">
            <SectionLabel text={t.support} />
            <div className="bg-white/5 border border-emerald-400/20 rounded-3xl overflow-hidden divide-y divide-white/10 shadow-lg">
              <SettingRow icon={<HelpCircle />} label={t.helpCenter} subtitle={t.helpCenterDesc} iconBg="from-cyan-500/30 to-teal-500/30" onClick={() => setActivePanel('help')} />
              <SettingRow icon={<Mail />} label={t.contactSupport} subtitle={t.contactDesc} iconBg="from-blue-500/30 to-indigo-500/30" onClick={() => setActivePanel('contact')} />
            </div>
          </div>

          <div className="space-y-4">
            <SectionLabel text={t.legal} />
            <div className="bg-white/5 border border-emerald-400/20 rounded-3xl overflow-hidden divide-y divide-white/10 shadow-lg">
              <SettingRow icon={<Shield />} label={t.privacyPolicy} subtitle={t.yourDataSafe} iconBg="from-green-500/30 to-emerald-500/30" onClick={() => setActivePanel('privacy')} />
              <SettingRow icon={<FileText />} label={t.termsOfService} subtitle={t.usageAgreement} iconBg="from-slate-500/30 to-gray-500/30" onClick={() => setActivePanel('terms')} />
              <SettingRow icon={<Smartphone />} label={t.appVersion} subtitle={t.appVersionDesc} hideArrow iconBg="from-purple-500/30 to-indigo-500/30" />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <button onClick={onLogout} className="w-full max-w-sm mx-auto rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 p-4 transition-colors flex items-center justify-center gap-3 group">
          <LogOut className="w-5 h-5 text-red-400 group-hover:-translate-x-1 transition-transform" />
          <span className="text-red-400 font-medium text-lg">{t.logOut}</span>
        </button>
      </div>
    </div>
  );
}

/* ─── Sub-Components ─── */
function SectionLabel({ text }: { text: string }) {
  return <p className="text-emerald-100/50 text-xs font-semibold uppercase tracking-wider pl-4">{text}</p>;
}

function SettingRow({ icon, label, subtitle, iconBg, badge, hideArrow = false, onClick }: { icon: any; label: string; subtitle?: string; iconBg: string; badge?: string; hideArrow?: boolean; onClick?: () => void }) {
  return (
    <button className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors text-left" onClick={onClick}>
       <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${iconBg} flex items-center justify-center text-white flex-shrink-0 shadow-sm border border-white/20`}>{icon}</div>
       <div className="flex-1 min-w-0">
          <p className="text-white font-medium text-base mb-0.5">{label}</p>
          {subtitle && <p className="text-emerald-100/70 text-sm">{subtitle}</p>}
       </div>
       {badge && <div className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold">{badge}</div>}
       {!hideArrow && <ChevronRight className="w-5 h-5 text-emerald-100/30 flex-shrink-0" />}
    </button>
  );
}

function ToggleRow({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center gap-4 p-5">
      <div className="flex-1"><p className="text-white font-medium">{label}</p><p className="text-emerald-100/50 text-sm">{desc}</p></div>
      <button onClick={() => onChange(!checked)} className={`w-14 h-8 rounded-full transition-colors relative ${checked ? 'bg-emerald-500' : 'bg-white/20'}`}>
        <div className={`w-6 h-6 rounded-full bg-white shadow-md absolute top-1 transition-all ${checked ? 'left-7' : 'left-1'}`} />
      </button>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="cursor-pointer" onClick={() => setOpen(!open)}>
      <div className="flex items-center gap-4 p-5">
        <HelpCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        <p className="text-white font-medium flex-1">{q}</p>
        <ChevronRight className={`w-5 h-5 text-emerald-100/30 transition-transform ${open ? 'rotate-90' : ''}`} />
      </div>
      {open && <div className="px-5 pb-5 pl-14 text-emerald-100/60 leading-relaxed">{a}</div>}
    </div>
  );
}