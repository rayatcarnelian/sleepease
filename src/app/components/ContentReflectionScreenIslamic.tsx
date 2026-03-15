import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Clock, Headphones, BookOpen, MessageCircle } from 'lucide-react';
import { translations, Language } from '../translations';

const islamicAudioTracks = [
  { id: 1, title: "Surah Al-Mulk", subtitle: "The Sovereignty", icon: "📖", duration: "12 min", url: "https://server8.mp3quran.net/afs/067.mp3", gradient: "from-emerald-500/20 to-teal-500/20" },
  { id: 2, title: "Surah Ar-Rahman", subtitle: "The Most Merciful", icon: "💚", duration: "13 min", url: "https://server8.mp3quran.net/afs/055.mp3", gradient: "from-amber-500/20 to-yellow-500/20" },
  { id: 3, title: "Surah Yasin", subtitle: "The Heart of Quran", icon: "❤️", duration: "15 min", url: "https://server8.mp3quran.net/afs/036.mp3", gradient: "from-red-500/20 to-pink-500/20" },
  { id: 4, title: "Surah Al-Kahf", subtitle: "The Cave", icon: "🕌", duration: "25 min", url: "https://server8.mp3quran.net/afs/018.mp3", gradient: "from-blue-500/20 to-cyan-500/20" },
  { id: 5, title: "Surah Al-Waqiah", subtitle: "The Event", icon: "✨", duration: "10 min", url: "https://server8.mp3quran.net/afs/056.mp3", gradient: "from-purple-500/20 to-indigo-500/20" },
  { id: 6, title: "Surah Al-Baqarah", subtitle: "The Cow", icon: "📿", duration: "2 hrs", url: "https://server8.mp3quran.net/afs/002.mp3", gradient: "from-teal-500/20 to-green-500/20" },
  { id: 7, title: "Ayat Al-Kursi", subtitle: "Verse of the Throne", icon: "👑", duration: "2 min", url: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/262.mp3", gradient: "from-yellow-500/20 to-orange-500/20" },
  { id: 8, title: "Last 10 Surahs", subtitle: "Short Surahs", icon: "🌙", duration: "8 min", url: "https://server8.mp3quran.net/afs/105.mp3", gradient: "from-indigo-500/20 to-violet-500/20" }
];

type Screen = 'mode-selection' | 'general-home' | 'islamic-home' | 'mood-check-general' | 'mood-check-islamic' | 'content-general' | 'content-islamic' | 'ai-chat' | 'ai-chat-islamic' | 'mood-history-general' | 'mood-history-islamic' | 'settings' | 'settings-islamic' | 'reading-general' | 'reading-islamic';
type Mode = 'general' | 'islamic' | null;

interface UserInfo { name: string; email: string; }

interface ContentReflectionScreenIslamicProps {
  navigate: (screen: Screen, mode?: Mode) => void;
  currentLanguage: Language;
  userInfo: UserInfo;
}

export default function ContentReflectionScreenIslamic({ navigate, currentLanguage, userInfo }: ContentReflectionScreenIslamicProps) {
  const t = translations[currentLanguage];
  const [tab, setTab] = useState<'audio' | 'reading'>('audio');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = islamicAudioTracks[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setTotalDuration(audio.duration || 0);
    const handleEnded = () => { setIsPlaying(false); setCurrentTime(0); };
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.pause(); else audio.play();
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((currentTrackIndex + 1) % islamicAudioTracks.length);
    setIsPlaying(false); setCurrentTime(0);
  };

  const prevTrack = () => {
    setCurrentTrackIndex(currentTrackIndex === 0 ? islamicAudioTracks.length - 1 : currentTrackIndex - 1);
    setIsPlaying(false); setCurrentTime(0);
  };

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(false); setCurrentTime(0);
    setTimeout(() => { audioRef.current?.play(); setIsPlaying(true); }, 100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-white text-3xl font-light">{t.contentReflectionIslamic.greeting.replace('Sarah', userInfo.name || 'Guest')}</h1>
        <p className="text-emerald-100/70 mt-2">{t.contentReflectionIslamic.subtitle}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-emerald-500/20 pb-4">
        <button onClick={() => setTab('audio')} className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${tab === 'audio' ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30' : 'text-emerald-100/60 hover:text-emerald-100/90'}`}>
          <Headphones className="w-5 h-5" /> <span className="font-medium">{t.contentReflectionIslamic.audio}</span>
        </button>
        <button onClick={() => setTab('reading')} className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${tab === 'reading' ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30' : 'text-emerald-100/60 hover:text-emerald-100/90'}`}>
          <BookOpen className="w-5 h-5" /> <span className="font-medium">{t.contentReflectionIslamic.reading}</span>
        </button>
      </div>

      {tab === 'audio' && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Main Player */}
          <div className={`rounded-3xl bg-gradient-to-br ${currentTrack.gradient} backdrop-blur-xl border border-emerald-400/20 overflow-hidden flex flex-col h-full shadow-lg`}>
            <audio ref={audioRef} src={currentTrack.url} preload="metadata" />
            <div className="h-64 bg-gradient-to-br from-emerald-400/30 to-teal-400/30 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-6xl shadow-2xl">
                {currentTrack.icon}
              </div>
              <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-white text-sm font-medium flex items-center gap-2">
                {isPlaying ? <Volume2 className="w-4 h-4 animate-pulse text-emerald-300" /> : <Heart className="w-4 h-4 text-emerald-300" />}
                {isPlaying ? 'Now Playing' : t.contentReflectionIslamic.recommended}
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-white text-2xl font-medium mb-2">{currentTrack.title}</h3>
                <p className="text-emerald-100/70 flex items-center gap-2 mb-8"><Clock className="w-4 h-4" />{currentTrack.duration} • {currentTrack.subtitle}</p>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="relative h-2 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                    <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="flex items-center justify-between text-sm text-emerald-100/70">
                    <span>{formatTime(currentTime)}</span><span>{totalDuration > 0 ? formatTime(totalDuration) : '--:--'}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-8">
                  <button onClick={prevTrack} className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"><SkipBack className="w-5 h-5 text-white" /></button>
                  <button onClick={togglePlay} className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center hover:scale-105 active:scale-95 shadow-xl shadow-emerald-500/30 transition-all">
                    {isPlaying ? <Pause className="w-8 h-8 text-white" fill="white" /> : <Play className="w-8 h-8 text-white ml-2" fill="white" />}
                  </button>
                  <button onClick={nextTrack} className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"><SkipForward className="w-5 h-5 text-white" /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Playlist */}
          <div className="space-y-4">
            <h3 className="text-white text-xl font-medium mb-4">{t.contentReflectionIslamic.moreForYou}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {islamicAudioTracks.map((track, idx) => (
                <div key={track.id} onClick={() => selectTrack(idx)} className={`cursor-pointer rounded-2xl p-4 transition-all flex items-center gap-4 ${idx === currentTrackIndex ? `bg-gradient-to-br ${track.gradient} border border-emerald-500/40 scale-[1.02] shadow-lg` : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'}`}>
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-2xl">{track.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{track.title}</h4>
                    <p className="text-emerald-100/60 text-sm">{track.subtitle}</p>
                  </div>
                  <div className="text-emerald-100/40 text-sm font-medium">{track.duration}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'reading' && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Book */}
          <div className="rounded-3xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/20 overflow-hidden flex flex-col h-full shadow-lg">
            <div className="h-64 bg-gradient-to-br from-amber-400/30 to-orange-400/30 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="relative w-40 aspect-[2/3] rounded-lg shadow-2xl overflow-hidden hover:scale-105 transition-transform cursor-pointer border border-amber-200/30 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600">
                <div className="text-center p-4">
                  <BookOpen className="w-12 h-12 text-white/90 mx-auto mb-3" />
                  <div className="w-full text-center"><h3 className="font-serif text-white font-bold leading-tight shadow-sm text-sm">Fortress of</h3><h3 className="font-serif text-white font-bold leading-tight shadow-sm text-sm">the Muslim</h3></div>
                </div>
              </div>
              <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white/20 backdrop-blur-xl border border-amber-300/30 text-amber-100 text-sm font-medium flex items-center gap-2">
                <Heart className="w-4 h-4 text-amber-300" /> {t.contentReflectionIslamic.recommended}
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-white text-2xl font-medium mb-2">Fortress of the Muslim</h3>
              <p className="text-emerald-100/70 mb-4">Collection of Authentic Du'as</p>
              <p className="text-white/80 leading-relaxed mb-6 flex-1 text-sm">A beautiful collection of authentic supplications and remembrances from the Quran and Sunnah for daily life.</p>
              <div className="flex items-center gap-4 mb-6 text-emerald-100/70 text-sm">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 15 min read</span><span>•</span><span>Morning Du'as</span>
              </div>
              <button onClick={() => navigate('reading-islamic')} className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:scale-[1.02] active:scale-95 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer">Start Reading</button>
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-4">
            <h3 className="text-white text-xl font-medium mb-4">{t.contentReflectionIslamic.islamicLibrary}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div onClick={() => navigate('reading-islamic')} className="rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-white/10 p-5 flex gap-4 hover:scale-[1.02] transition-all cursor-pointer">
                <div className="w-16 h-16 rounded-xl bg-white/10 flex flex-shrink-0 items-center justify-center text-3xl">📚</div>
                <div><h4 className="text-white font-medium mb-1">Stories of the Prophets</h4><p className="text-emerald-100/60 text-sm mb-2">Ibn Kathir</p><p className="text-white/40 text-xs flex items-center gap-1"><Clock className="w-3 h-3"/> 20 min read</p></div>
              </div>
              <div onClick={() => navigate('reading-islamic')} className="rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-white/10 p-5 flex gap-4 hover:scale-[1.02] transition-all cursor-pointer">
                <div className="w-16 h-16 rounded-xl bg-white/10 flex flex-shrink-0 items-center justify-center text-3xl">🕌</div>
                <div><h4 className="text-white font-medium mb-1">The Sealed Nectar</h4><p className="text-emerald-100/60 text-sm mb-2">Biography of Prophet ﷺ</p><p className="text-white/40 text-xs flex items-center gap-1"><Clock className="w-3 h-3"/> 25 min read</p></div>
              </div>
              <div onClick={() => navigate('reading-islamic')} className="rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 p-5 flex gap-4 hover:scale-[1.02] transition-all cursor-pointer">
                <div className="w-16 h-16 rounded-xl bg-white/10 flex flex-shrink-0 items-center justify-center text-3xl">📖</div>
                <div><h4 className="text-white font-medium mb-1">Tafsir Al-Jalalayn</h4><p className="text-emerald-100/60 text-sm mb-2">Quran Commentary</p><p className="text-white/40 text-xs flex items-center gap-1"><Clock className="w-3 h-3"/> 18 min read</p></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Support Prompt */}
      <button onClick={() => navigate('ai-chat-islamic')} className="w-full rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 p-6 flex items-center justify-between hover:bg-emerald-500/20 transition-all shadow-lg">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center"><MessageCircle className="w-7 h-7 text-emerald-300" /></div>
          <div className="text-left"><h3 className="text-white font-medium text-lg">{t.contentReflectionIslamic.needGuidance}</h3><p className="text-emerald-100/70">{t.contentReflectionIslamic.chatWithAI}</p></div>
        </div>
        <div className="hidden sm:block px-6 py-3 rounded-full bg-emerald-500/20 text-emerald-100 font-medium">Start Chat</div>
      </button>

    </div>
  );
}
