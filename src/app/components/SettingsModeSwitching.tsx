import { useState } from 'react';
import { ChevronRight, Sun, User, Globe, Shield, FileText, Bell, Palette, Volume2, HelpCircle, Mail, Star, Award, Heart, LogOut, Smartphone, ArrowLeft, X, Check, Moon, Camera, Save, ChevronDown, MessageCircle, ExternalLink, Trophy, Flame, Target, Zap } from 'lucide-react';
import { Language, translations } from '../translations';

type Mode = 'general' | 'islamic';
type Screen = 'mode-selection' | 'general-home' | 'islamic-home' | 'mood-check-general' | 'mood-check-islamic' | 'content-general' | 'content-islamic' | 'ai-chat' | 'ai-chat-islamic' | 'mood-history-general' | 'mood-history-islamic' | 'settings' | 'settings-islamic' | 'language-selection';

interface SettingsModeSwitchingProps {
  navigate: (screen: Screen, mode?: 'general' | 'islamic' | null) => void;
  currentMode: 'general' | 'islamic';
  userInfo: { name: string; email: string };
  onLogout: () => void;
  currentLanguage: Language;
}

type Panel = null | 'profile' | 'notifications' | 'theme' | 'sound' | 'account' | 'achievements' | 'favorites' | 'help' | 'contact' | 'privacy' | 'terms';

export default function SettingsModeSwitching({ navigate, currentMode, userInfo, onLogout, currentLanguage }: SettingsModeSwitchingProps) {
  const t = translations[currentLanguage].settings;
  const isIslamic = currentMode === 'islamic';
  const [activePanel, setActivePanel] = useState<Panel>(null);
  const [editName, setEditName] = useState(userInfo.name);
  const [editEmail, setEditEmail] = useState(userInfo.email);
  const [profileSaved, setProfileSaved] = useState(false);
  const [notifBedtime, setNotifBedtime] = useState(true);
  const [notifMood, setNotifMood] = useState(true);
  const [notifWeekly, setNotifWeekly] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'midnight' | 'ocean'>('dark');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [soundVolume, setSoundVolume] = useState(70);

  // Mock data
  const achievements = [
    { icon: '🔥', name: '7-Day Streak', desc: 'Checked in for 7 days straight', earned: true },
    { icon: '🧘', name: 'Zen Master', desc: 'Completed 10 breathing exercises', earned: true },
    { icon: '📖', name: 'Bookworm', desc: 'Read 5 articles', earned: true },
    { icon: '🎵', name: 'Sound Healer', desc: 'Listened to 60 min of audio', earned: true },
    { icon: '💬', name: 'Open Heart', desc: 'Had 5 AI chat sessions', earned: true },
    { icon: '🌙', name: 'Night Owl', desc: 'Used the app past midnight', earned: true },
    { icon: '🏆', name: 'Wellness Champion', desc: 'Complete all daily goals for 30 days', earned: false },
    { icon: '⭐', name: 'Explorer', desc: 'Try every feature in the app', earned: false },
  ];
  const favorites = [
    { icon: '🌊', type: 'Audio', title: 'Ocean Waves', subtitle: '15 min · Nature Sounds' },
    { icon: '📖', type: 'Reading', title: 'The Art of Letting Go', subtitle: 'Chapter 1 · Emma Sullivan' },
    { icon: '🎹', type: 'Audio', title: 'Ambient Piano', subtitle: '15 min · Relaxing Music' },
    { icon: '🧘‍♀️', type: 'Reading', title: 'Peaceful Mind Daily', subtitle: 'Chapter 3 · Sarah Williams' },
  ];

  if (activePanel) {
    return (
      <div className="w-full max-w-4xl mx-auto pb-16" style={{ animation: 'fadeSlideIn 0.3s ease-out' }}>
        {/* Panel header */}
        <button onClick={() => { setActivePanel(null); setProfileSaved(false); }} className="flex items-center gap-3 text-white/60 hover:text-white mb-8 transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Settings
        </button>

        {activePanel === 'profile' && (
          <div className="space-y-8">
            <h2 className="text-white text-3xl font-light">Edit Profile</h2>
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8 space-y-8">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-400/40 to-purple-400/40 flex items-center justify-center text-5xl relative group cursor-pointer">
                  👤
                  <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-7 h-7 text-white" />
                  </div>
                </div>
                <p className="text-white/40 text-sm">Click to change photo</p>
              </div>
              {/* Fields */}
              <div className="space-y-6 max-w-md mx-auto">
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Full Name</label>
                  <input value={editName} onChange={e => setEditName(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Email</label>
                  <input value={editEmail} onChange={e => setEditEmail(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all" placeholder="you@email.com" />
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Bio</label>
                  <textarea className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all resize-none h-24" placeholder="Tell us about yourself..." defaultValue="Wellness enthusiast 🌿 Working on better sleep habits." />
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Timezone</label>
                  <div className="relative">
                    <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-blue-400 transition-all cursor-pointer">
                      <option value="asia-kuala-lumpur">Asia/Kuala Lumpur (GMT+8)</option>
                      <option value="asia-singapore">Asia/Singapore (GMT+8)</option>
                      <option value="utc">UTC (GMT+0)</option>
                      <option value="us-eastern">US/Eastern (GMT-5)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-white/40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <button onClick={() => setProfileSaved(true)} className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:scale-[1.01] shadow-lg transition-all flex items-center justify-center gap-2">
                  {profileSaved ? <><Check className="w-5 h-5" /> Saved!</> : <><Save className="w-5 h-5" /> Save Changes</>}
                </button>
              </div>
            </div>
          </div>
        )}

        {activePanel === 'notifications' && (
          <div className="space-y-8">
            <h2 className="text-white text-3xl font-light">Notifications</h2>
            <div className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden divide-y divide-white/10">
              <ToggleRow label="Bedtime Reminder" desc="Get reminded 30 min before your target bedtime" checked={notifBedtime} onChange={setNotifBedtime} />
              <ToggleRow label="Mood Check-In" desc="Daily reminder to log your mood" checked={notifMood} onChange={setNotifMood} />
              <ToggleRow label="Weekly Summary" desc="Receive a wellness report every Sunday" checked={notifWeekly} onChange={setNotifWeekly} />
            </div>
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 space-y-4">
              <h3 className="text-white font-medium">Bedtime Reminder Time</h3>
              <div className="flex items-center gap-4">
                <input type="time" defaultValue="22:30" className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-400 transition-all" />
                <p className="text-white/40 text-sm">We'll remind you 30 minutes before</p>
              </div>
            </div>
          </div>
        )}

        {activePanel === 'theme' && (
          <div className="space-y-8">
            <h2 className="text-white text-3xl font-light">Theme & Appearance</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 'dark' as const, name: 'Dark Night', colors: 'from-slate-800 to-slate-900', border: 'border-blue-400' },
                { id: 'midnight' as const, name: 'Midnight Blue', colors: 'from-blue-900 to-indigo-950', border: 'border-indigo-400' },
                { id: 'ocean' as const, name: 'Ocean Depth', colors: 'from-teal-900 to-cyan-950', border: 'border-teal-400' },
              ].map(t => (
                <button key={t.id} onClick={() => setTheme(t.id)} className={`rounded-2xl border-2 ${theme === t.id ? t.border : 'border-white/10'} p-1 transition-all ${theme === t.id ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}>
                  <div className={`h-32 rounded-xl bg-gradient-to-br ${t.colors} flex items-center justify-center`}>
                    {theme === t.id && <Check className="w-8 h-8 text-white" />}
                  </div>
                  <p className={`text-center py-3 font-medium ${theme === t.id ? 'text-white' : 'text-white/60'}`}>{t.name}</p>
                </button>
              ))}
            </div>
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 space-y-4">
              <h3 className="text-white font-medium">Font Size</h3>
              <div className="flex items-center gap-4">
                <span className="text-white/60 text-sm">A</span>
                <input type="range" min="12" max="20" defaultValue="16" className="flex-1 accent-blue-500" />
                <span className="text-white/60 text-lg">A</span>
              </div>
            </div>
          </div>
        )}

        {activePanel === 'sound' && (
          <div className="space-y-8">
            <h2 className="text-white text-3xl font-light">Sound Settings</h2>
            <div className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden divide-y divide-white/10">
              <ToggleRow label="Sound Effects" desc="UI sounds and feedback" checked={soundEnabled} onChange={setSoundEnabled} />
            </div>
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 space-y-4">
              <h3 className="text-white font-medium">Volume</h3>
              <div className="flex items-center gap-4">
                <Volume2 className="w-5 h-5 text-white/60" />
                <input type="range" min="0" max="100" value={soundVolume} onChange={e => setSoundVolume(+e.target.value)} className="flex-1 accent-blue-500" />
                <span className="text-white/60 text-sm w-10 text-right">{soundVolume}%</span>
              </div>
            </div>
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 space-y-4">
              <h3 className="text-white font-medium">Default Audio Track</h3>
              <div className="grid grid-cols-2 gap-3">
                {['🌊 Ocean Waves', '🌧️ Rain Drops', '🎹 Ambient Piano', '✨ Binaural Beats'].map((s, i) => (
                  <button key={s} className={`p-3 rounded-xl border text-sm transition-all ${i === 0 ? 'bg-blue-500/20 border-blue-400/40 text-white' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}>{s}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activePanel === 'account' && (
          <div className="space-y-8">
            <h2 className="text-white text-3xl font-light">Manage Account</h2>
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8 space-y-6">
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <div><p className="text-white font-medium">Name</p><p className="text-white/60 text-sm">{userInfo.name}</p></div>
                <button onClick={() => setActivePanel('profile')} className="text-blue-400 text-sm hover:underline">Edit</button>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <div><p className="text-white font-medium">Email</p><p className="text-white/60 text-sm">{userInfo.email}</p></div>
                <button onClick={() => setActivePanel('profile')} className="text-blue-400 text-sm hover:underline">Edit</button>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <div><p className="text-white font-medium">Password</p><p className="text-white/60 text-sm">••••••••</p></div>
                <button className="text-blue-400 text-sm hover:underline">Change</button>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <div><p className="text-white font-medium">Member Since</p><p className="text-white/60 text-sm">March 2026</p></div>
              </div>
              <div className="flex items-center justify-between py-3">
                <div><p className="text-white font-medium">Account Type</p><p className="text-white/60 text-sm">Premium Member</p></div>
                <div className="px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-xs font-bold flex items-center gap-1"><Star className="w-3 h-3" /> Premium</div>
              </div>
            </div>
            <button className="w-full py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition-colors">Delete Account</button>
          </div>
        )}

        {activePanel === 'achievements' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-3xl font-light">Achievements</h2>
              <div className="px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-sm font-bold">{achievements.filter(a => a.earned).length} / {achievements.length}</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((a, i) => (
                <div key={i} className={`rounded-2xl p-5 border transition-all ${a.earned ? 'bg-white/5 border-white/15' : 'bg-white/[0.02] border-white/5 opacity-50'}`} style={{ animation: `fadeSlideIn 0.3s ease-out ${i * 0.05}s both` }}>
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${a.earned ? 'bg-gradient-to-br from-yellow-500/20 to-amber-500/20' : 'bg-white/5'}`}>{a.icon}</div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{a.name}</p>
                      <p className="text-white/50 text-sm">{a.desc}</p>
                    </div>
                    {a.earned && <Check className="w-5 h-5 text-green-400" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activePanel === 'favorites' && (
          <div className="space-y-8">
            <h2 className="text-white text-3xl font-light">Favorites</h2>
            {favorites.length === 0 ? (
              <div className="text-center py-16"><Heart className="w-12 h-12 text-white/20 mx-auto mb-4" /><p className="text-white/40">No favorites yet</p></div>
            ) : (
              <div className="space-y-3">
                {favorites.map((f, i) => (
                  <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-5 flex items-center gap-4 hover:bg-white/8 transition-colors cursor-pointer" style={{ animation: `fadeSlideIn 0.3s ease-out ${i * 0.05}s both` }}>
                    <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-2xl">{f.icon}</div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{f.title}</p>
                      <p className="text-white/50 text-sm">{f.subtitle}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs">{f.type}</span>
                    <Heart className="w-5 h-5 text-red-400 fill-red-400" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activePanel === 'help' && (
          <div className="space-y-8">
            <h2 className="text-white text-3xl font-light">Help Center</h2>
            <div className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden divide-y divide-white/10">
              {[
                { q: 'How do I track my mood?', a: 'Go to Mood Check-In from the header nav. Select how you\'re feeling and add optional notes. Your mood history is saved and viewable in the Explore page.' },
                { q: 'How do the audio tracks work?', a: 'Navigate to Personalized for You → Audio tab. Click any track to play calming sounds generated using Web Audio technology. Each track runs for 15 minutes.' },
                { q: 'How do I switch between General and Islamic mode?', a: 'Click the mode badge in the top-right corner of the header, or go to Settings → App Mode to switch.' },
                { q: 'Can I change the language?', a: 'Yes! Go to Settings → Language and choose from English, Chinese, Arabic, or Malay.' },
                { q: 'How does the AI chat work?', a: 'The AI chat uses Grok to provide compassionate wellness support. Navigate to the AI tab in the header to start a conversation.' },
              ].map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
            </div>
          </div>
        )}

        {activePanel === 'contact' && (
          <div className="space-y-8">
            <h2 className="text-white text-3xl font-light">Contact Support</h2>
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8 space-y-6">
              <div>
                <label className="text-white/60 text-sm mb-2 block">Subject</label>
                <input className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-400 transition-all" placeholder="What do you need help with?" />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-2 block">Message</label>
                <textarea className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-400 transition-all resize-none h-36" placeholder="Describe your issue or feedback..." />
              </div>
              <button className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:scale-[1.01] shadow-lg transition-all flex items-center justify-center gap-2">
                <Mail className="w-5 h-5" /> Send Message
              </button>
              <p className="text-white/40 text-sm text-center">We typically respond within 24 hours</p>
            </div>
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 flex items-center gap-4">
              <MessageCircle className="w-10 h-10 text-blue-400" />
              <div className="flex-1"><p className="text-white font-medium">Live Chat</p><p className="text-white/50 text-sm">Available Mon–Fri, 9am–5pm MYT</p></div>
              <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-xl text-sm transition-colors">Start Chat</button>
            </div>
          </div>
        )}

        {activePanel === 'privacy' && (
          <div className="space-y-8">
            <h2 className="text-white text-3xl font-light">Privacy Policy</h2>
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8 space-y-6 text-white/70 leading-relaxed">
              <p className="text-white font-medium text-lg">Last updated: March 2026</p>
              <h3 className="text-white font-medium">1. Information We Collect</h3>
              <p>SleepEase collects only the information necessary to provide you with a personalized wellness experience. This includes your name, email address, mood entries, and app usage preferences. All data is stored securely and encrypted.</p>
              <h3 className="text-white font-medium">2. How We Use Your Data</h3>
              <p>Your data is used solely to personalize your experience, track your wellness progress, and provide AI-powered support. We never sell your personal information to third parties.</p>
              <h3 className="text-white font-medium">3. Data Storage & Security</h3>
              <p>All personal data is stored using industry-standard encryption. Mood entries and chat conversations are stored locally on your device and in secure cloud storage with end-to-end encryption.</p>
              <h3 className="text-white font-medium">4. Your Rights</h3>
              <p>You have the right to access, modify, or delete your personal data at any time through Settings → Manage Account. You can also request a complete data export.</p>
              <h3 className="text-white font-medium">5. Contact</h3>
              <p>For privacy concerns, contact us at privacy@sleepease.app</p>
            </div>
          </div>
        )}

        {activePanel === 'terms' && (
          <div className="space-y-8">
            <h2 className="text-white text-3xl font-light">Terms of Service</h2>
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8 space-y-6 text-white/70 leading-relaxed">
              <p className="text-white font-medium text-lg">Effective: March 2026</p>
              <h3 className="text-white font-medium">1. Acceptance of Terms</h3>
              <p>By using SleepEase, you agree to these terms. The app is designed to support your wellness journey and is not a substitute for professional medical advice.</p>
              <h3 className="text-white font-medium">2. Account Responsibilities</h3>
              <p>You are responsible for maintaining the confidentiality of your account. Please use a strong password and do not share your login credentials.</p>
              <h3 className="text-white font-medium">3. AI Chat Disclaimer</h3>
              <p>The AI wellness support feature provides general guidance only. It is not a licensed counselor or therapist. If you are in crisis, please contact emergency services or a professional helpline.</p>
              <h3 className="text-white font-medium">4. Content Usage</h3>
              <p>All reading content, audio tracks, and educational materials are provided for personal use only and may not be redistributed without permission.</p>
              <h3 className="text-white font-medium">5. Modifications</h3>
              <p>We may update these terms from time to time. Continued use of the app constitutes acceptance of any changes.</p>
            </div>
          </div>
        )}

        <style>{`@keyframes fadeSlideIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }`}</style>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-10 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-white text-3xl font-light">{t.title}</h1>
        <p className="text-white/60 mt-1">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Profile Card */}
          <div className={`rounded-3xl bg-gradient-to-br ${isIslamic ? 'from-emerald-500/20 to-teal-500/20 border-emerald-400/20' : 'from-blue-500/20 to-purple-500/20 border-blue-400/20'} border p-6 flex items-center gap-5 shadow-lg`}>
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${isIslamic ? 'from-emerald-400/40 to-teal-400/40' : 'from-blue-400/40 to-purple-400/40'} flex items-center justify-center text-4xl shadow-inner`}>👤</div>
            <div className="flex-1">
              <h3 className="text-white text-xl font-medium mb-1">{userInfo.name || translations[currentLanguage].generalHome.guest}</h3>
              <p className="text-white/70 text-sm mb-2">{userInfo.email || 'No email'}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium"><Star className="w-3.5 h-3.5 text-yellow-400" />{t.premiumMember}</div>
            </div>
            <button onClick={() => setActivePanel('profile')} className={`${isIslamic ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300' : 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-300'} px-4 py-2 rounded-xl text-sm transition-colors`}>Edit</button>
          </div>

          <div className="space-y-4">
            <SectionLabel text={t.preferences} />
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden divide-y divide-white/10">
              <SettingRow icon={<Sun />} label={t.appMode} subtitle={currentMode === 'general' ? t.generalMode : t.islamicMode} iconBg="from-amber-500/30 to-orange-500/30" onClick={() => navigate(currentMode === 'general' ? 'islamic-home' : 'general-home', currentMode === 'general' ? 'islamic' : 'general')} />
              <SettingRow icon={<Bell />} label={t.notifications} subtitle={t.remindersUpdates} iconBg="from-blue-500/30 to-cyan-500/30" badge="3" onClick={() => setActivePanel('notifications')} />
              <SettingRow icon={<Palette />} label={t.theme} subtitle={t.darkMode} iconBg="from-purple-500/30 to-pink-500/30" onClick={() => setActivePanel('theme')} />
              <SettingRow icon={<Volume2 />} label={t.sound} subtitle={t.soundEnabled} iconBg="from-green-500/30 to-emerald-500/30" onClick={() => setActivePanel('sound')} />
              <SettingRow icon={<Globe />} label={t.language} subtitle={currentLanguage === 'en' ? 'English' : currentLanguage === 'zh' ? '中文' : currentLanguage === 'ar' ? 'العربية' : 'Bahasa Melayu'} iconBg="from-indigo-500/30 to-blue-500/30" onClick={() => navigate('language-selection')} />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div className="space-y-4">
            <SectionLabel text={t.account} />
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden divide-y divide-white/10">
              <SettingRow icon={<User />} label={t.manageAccount} subtitle={t.manageAccountDesc} iconBg="from-slate-500/30 to-gray-500/30" onClick={() => setActivePanel('account')} />
              <SettingRow icon={<Award />} label={translations[currentLanguage].generalHome.achievements} subtitle={t.achievementsDesc} iconBg="from-yellow-500/30 to-amber-500/30" onClick={() => setActivePanel('achievements')} />
              <SettingRow icon={<Heart />} label={t.favorites} subtitle={t.favoritesDesc} iconBg="from-red-500/30 to-pink-500/30" onClick={() => setActivePanel('favorites')} />
            </div>
          </div>

          <div className="space-y-4">
            <SectionLabel text={t.support} />
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden divide-y divide-white/10">
              <SettingRow icon={<HelpCircle />} label={t.helpCenter} subtitle={t.helpCenterDesc} iconBg="from-cyan-500/30 to-teal-500/30" onClick={() => setActivePanel('help')} />
              <SettingRow icon={<Mail />} label={t.contactSupport} subtitle={t.contactDesc} iconBg="from-blue-500/30 to-indigo-500/30" onClick={() => setActivePanel('contact')} />
            </div>
          </div>

          <div className="space-y-4">
            <SectionLabel text={t.legal} />
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden divide-y divide-white/10">
              <SettingRow icon={<Shield />} label={t.privacyPolicy} subtitle={t.yourDataSafe} iconBg="from-green-500/30 to-teal-500/30" onClick={() => setActivePanel('privacy')} />
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
  return <p className="text-white/40 text-xs font-semibold uppercase tracking-wider pl-4">{text}</p>;
}

function SettingRow({ icon, label, subtitle, iconBg, badge, hideArrow = false, onClick }: { icon: any; label: string; subtitle?: string; iconBg: string; badge?: string; hideArrow?: boolean; onClick?: () => void }) {
  return (
    <button className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors text-left" onClick={onClick}>
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${iconBg} flex items-center justify-center text-white flex-shrink-0 shadow-sm`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium text-base mb-0.5">{label}</p>
        {subtitle && <p className="text-white/60 text-sm">{subtitle}</p>}
      </div>
      {badge && <div className="px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-bold">{badge}</div>}
      {!hideArrow && <ChevronRight className="w-5 h-5 text-white/30 flex-shrink-0" />}
    </button>
  );
}

function ToggleRow({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center gap-4 p-5">
      <div className="flex-1">
        <p className="text-white font-medium">{label}</p>
        <p className="text-white/50 text-sm">{desc}</p>
      </div>
      <button onClick={() => onChange(!checked)} className={`w-14 h-8 rounded-full transition-colors relative ${checked ? 'bg-blue-500' : 'bg-white/20'}`}>
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
        <HelpCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
        <p className="text-white font-medium flex-1">{q}</p>
        <ChevronRight className={`w-5 h-5 text-white/30 transition-transform ${open ? 'rotate-90' : ''}`} />
      </div>
      {open && <div className="px-5 pb-5 pl-14 text-white/60 leading-relaxed">{a}</div>}
    </div>
  );
}