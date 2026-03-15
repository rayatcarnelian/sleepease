import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Clock, Headphones, BookOpen, MessageCircle } from 'lucide-react';
import { translations, Language } from '../translations';

const audioTracks = [
  { id: 1, title: "Deep Listening", subtitle: "Binaural Beats", icon: "✨", duration: "∞", url: "https://actions.google.com/sounds/v1/ambiences/ambience_outer_space.ogg", gradient: "from-blue-500/20 to-purple-500/20" },
  { id: 2, title: "Ocean Waves", subtitle: "Nature Sounds", icon: "🌊", duration: "∞", url: "https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg", gradient: "from-cyan-500/20 to-blue-500/20" },
  { id: 3, title: "Rain Drops", subtitle: "Ambient Sounds", icon: "🌧️", duration: "∞", url: "https://actions.google.com/sounds/v1/water/rain_on_roof.ogg", gradient: "from-green-500/20 to-emerald-500/20" },
  { id: 4, title: "Ambient Piano", subtitle: "Relaxing Music", icon: "🎹", duration: "∞", url: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Gymnopedie_No_1_-_Erik_Satie.ogg", gradient: "from-orange-500/20 to-amber-500/20" },
  { id: 5, title: "Wind in Trees", subtitle: "Nature Sounds", icon: "🍃", duration: "∞", url: "https://actions.google.com/sounds/v1/weather/wind_through_trees.ogg", gradient: "from-purple-500/20 to-pink-500/20" },
  { id: 6, title: "Gentle Flow", subtitle: "Background Calm", icon: "💫", duration: "∞", url: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Moonlight_Sonata_-_1st_Movement.ogg", gradient: "from-indigo-500/20 to-blue-500/20" }
];

type Screen = 'mode-selection' | 'general-home' | 'islamic-home' | 'mood-check-general' | 'mood-check-islamic' | 'content-general' | 'content-islamic' | 'ai-chat' | 'ai-chat-islamic' | 'mood-history-general' | 'mood-history-islamic' | 'settings' | 'reading-general' | 'reading-islamic';
type Mode = 'general' | 'islamic' | null;

interface UserInfo { name: string; email: string; }

interface ContentReflectionScreenProps {
  navigate: (screen: Screen, mode?: Mode) => void;
  currentLanguage: Language;
  userInfo: UserInfo;
}

export default function ContentReflectionScreen({ navigate, currentLanguage, userInfo }: ContentReflectionScreenProps) {
  const t = translations[currentLanguage];
  const [tab, setTab] = useState<'audio' | 'reading'>('audio');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = audioTracks[currentTrackIndex];

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

  const switchTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const nextTrack = () => switchTrack((currentTrackIndex + 1) % audioTracks.length);
  const prevTrack = () => switchTrack(currentTrackIndex === 0 ? audioTracks.length - 1 : currentTrackIndex - 1);

  const selectTrack = (index: number) => {
    switchTrack(index);
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
        <h1 className="text-white text-3xl font-light">{t.contentReflection.greeting.replace('Sarah', userInfo.name || t.generalHome.guest)}</h1>
        <p className="text-white/60 mt-2">{t.contentReflection.subtitle}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/10 pb-4">
        <button onClick={() => setTab('audio')} className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${tab === 'audio' ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white/80'}`}>
          <Headphones className="w-5 h-5" /> <span className="font-medium">{t.contentReflection.audio}</span>
        </button>
        <button onClick={() => setTab('reading')} className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${tab === 'reading' ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white/80'}`}>
          <BookOpen className="w-5 h-5" /> <span className="font-medium">{t.contentReflection.reading}</span>
        </button>
      </div>

      {tab === 'audio' && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Main Player */}
          <div className={`rounded-3xl bg-gradient-to-br ${currentTrack.gradient} backdrop-blur-xl border border-white/20 overflow-hidden flex flex-col h-full`}>
            <audio ref={audioRef} src={currentTrack.url} preload="metadata" loop />
            <div className="h-64 bg-gradient-to-br from-blue-400/30 to-purple-400/30 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className={`w-32 h-32 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-6xl shadow-2xl ${isPlaying ? 'animate-pulse' : ''}`}>
                {currentTrack.icon}
              </div>
              <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-white text-sm font-medium flex items-center gap-2">
                {isPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <Heart className="w-4 h-4" />}
                {isPlaying ? 'Now Playing' : t.contentReflection.recommended}
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-white text-2xl font-medium mb-2">{currentTrack.title}</h3>
                <p className="text-white/60 flex items-center gap-2 mb-8"><Clock className="w-4 h-4" />{currentTrack.duration} • {currentTrack.subtitle}</p>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="relative h-2 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                    <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>{formatTime(currentTime)}</span><span>{currentTrack.duration === '∞' ? '∞' : (totalDuration > 0 ? formatTime(totalDuration) : '--:--')}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-8">
                  <button onClick={prevTrack} className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"><SkipBack className="w-5 h-5 text-white" /></button>
                  <button onClick={togglePlay} className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center hover:scale-105 active:scale-95 shadow-xl transition-all">
                    {isPlaying ? <Pause className="w-8 h-8 text-white" fill="white" /> : <Play className="w-8 h-8 text-white ml-2" fill="white" />}
                  </button>
                  <button onClick={nextTrack} className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"><SkipForward className="w-5 h-5 text-white" /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Playlist */}
          <div className="space-y-4">
            <h3 className="text-white text-xl font-medium mb-4">{t.contentReflection.moreForYou}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {audioTracks.map((track, idx) => (
                <div key={track.id} onClick={() => selectTrack(idx)} className={`cursor-pointer rounded-2xl p-4 transition-all flex items-center gap-4 ${idx === currentTrackIndex ? `bg-gradient-to-br ${track.gradient} border border-white/30 scale-[1.02]` : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}>
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-2xl">{track.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{track.title}</h4>
                    <p className="text-white/60 text-sm">{track.subtitle}</p>
                  </div>
                  <div className="text-white/40 text-sm">{track.duration}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'reading' && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Book */}
          <div className="rounded-3xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-white/20 overflow-hidden flex flex-col h-full">
            <div className="h-64 bg-gradient-to-br from-amber-400/30 to-orange-400/30 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="relative w-40 aspect-[2/3] rounded-lg shadow-2xl overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-300 to-orange-400 p-4 flex flex-col items-center justify-center">
                  <BookOpen className="w-12 h-12 text-white/90 mb-4" />
                  <div className="w-full text-center"><h3 className="font-serif text-white font-bold leading-tight shadow-sm">The Art of</h3><h3 className="font-serif text-white font-bold leading-tight shadow-sm">Letting Go</h3></div>
                </div>
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-white text-2xl font-medium mb-2">The Art of Letting Go</h3>
              <p className="text-white/60 mb-4">by Emma Sullivan</p>
              <p className="text-white/80 leading-relaxed mb-6 flex-1">A gentle guide to releasing anxiety and finding peace through mindfulness and self-compassion. Learn practical techniques to quiet your mind.</p>
              <div className="flex items-center gap-4 mb-6 text-white/60 text-sm">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 20 min read</span><span>•</span><span>4 Chapters</span>
              </div>
              <button onClick={() => navigate('reading-general')} className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium hover:scale-[1.02] shadow-lg transition-all cursor-pointer">Start Reading</button>
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-4">
            <h3 className="text-white text-xl font-medium mb-4">{t.contentReflection.recommended}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div onClick={() => navigate('reading-general')} className="rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-white/10 p-5 flex gap-4 hover:scale-[1.02] transition-all cursor-pointer">
                <div className="w-16 h-16 rounded-xl bg-white/10 flex flex-shrink-0 items-center justify-center text-3xl">🌙</div>
                <div><h4 className="text-white font-medium mb-1">Sleep Better Tonight</h4><p className="text-white/60 text-sm mb-2">Dr. James Chen</p><p className="text-white/40 text-xs">10 min read • Chapter 2</p></div>
              </div>
              <div onClick={() => navigate('reading-general')} className="rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 p-5 flex gap-4 hover:scale-[1.02] transition-all cursor-pointer">
                <div className="w-16 h-16 rounded-xl bg-white/10 flex flex-shrink-0 items-center justify-center text-3xl">🧘‍♀️</div>
                <div><h4 className="text-white font-medium mb-1">Peaceful Mind Daily</h4><p className="text-white/60 text-sm mb-2">Sarah Williams</p><p className="text-white/40 text-xs">12 min read • Chapter 3</p></div>
              </div>
              <div onClick={() => navigate('reading-general')} className="rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-white/10 p-5 flex gap-4 hover:scale-[1.02] transition-all cursor-pointer">
                <div className="w-16 h-16 rounded-xl bg-white/10 flex flex-shrink-0 items-center justify-center text-3xl">✨</div>
                <div><h4 className="text-white font-medium mb-1">The Gratitude Journal</h4><p className="text-white/60 text-sm mb-2">Michael Porter</p><p className="text-white/40 text-xs">7 min read • Chapter 4</p></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Support Prompt at Bottom */}
      <button onClick={() => navigate('ai-chat')} className="w-full rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 p-6 flex items-center justify-between hover:bg-white/5 transition-all">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center"><MessageCircle className="w-7 h-7 text-blue-400" /></div>
          <div className="text-left"><h3 className="text-white font-medium text-lg">{t.contentReflection.needSupport}</h3><p className="text-white/60">{t.contentReflection.chatWithAI}</p></div>
        </div>
        <div className="px-6 py-3 rounded-full bg-white/10 text-white font-medium">Start Chat</div>
      </button>

    </div>
  );
}