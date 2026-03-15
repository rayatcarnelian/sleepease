import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Bookmark, Share2, ChevronLeft, ChevronRight, BookOpen, Clock, Star, Sparkles } from 'lucide-react';
import { Language, translations } from '../translations';

type Screen = 'mode-selection' | 'general-home' | 'islamic-home' | 'mood-check-general' | 'mood-check-islamic' | 'content-general' | 'content-islamic' | 'ai-chat' | 'ai-chat-islamic' | 'mood-history-general' | 'mood-history-islamic' | 'settings' | 'reading-general' | 'reading-islamic';
type Mode = 'general' | 'islamic' | null;

interface ReadingScreenProps {
  navigate: (screen: Screen, mode?: Mode) => void;
  currentLanguage: Language;
}

/* ─── Book Data ─── */
const chapters = [
  {
    id: 1,
    title: 'The Art of Letting Go',
    author: 'Emma Sullivan',
    readTime: '8 min',
    icon: '🍃',
    sections: [
      {
        heading: 'Release the Day',
        body: `The day has ended. The sky has turned from the vivid hues of sunset to the deep, absolute calm of midnight. Yet, for many of us, the mind continues to race, clinging tightly to the events, conversations, and worries of the past twenty-four hours. We carry our days into our nights, packing our beds with the invisible weight of tomorrow's anxieties.\n\nLetting go is not about forgetting or not caring. It is a profound act of self-compassion. It is the conscious decision to release your grip on things you can no longer control right now. Think of your mind as a crowded room. Throughout the day, people, tasks, and thoughts enter. At night, it's time to gently ask them to leave so you can rest.`,
      },
      {
        heading: null,
        quote: '"You cannot sweep darkness out of a room. You can only bring in the light. In sleep, you bring the light of release to the darkness of stress."',
      },
      {
        heading: 'The Stone Exercise',
        body: `Tonight, before closing your eyes, try a simple mental exercise. Imagine holding a heavy stone in each hand. Those stones are your worries. Notice how tightly you are gripping them. Your knuckles might be white, your arms tense. Now, slowly open your fingers. Let the stones drop to the floor. Feel the sudden lightness in your hands, the tension leaving your arms and shoulders.\n\nAs you lay in bed, extend that feeling of physical release to your mind. When a thought arises about work, or a difficult conversation, or a to-do list, picture it as a cloud drifting across the night sky. Acknowledge it, but do not anchor it. Let it drift out of view.`,
      },
      {
        heading: 'Radical Surrender',
        body: `Rest is a radical surrender. It requires trusting that the world will continue spinning without your active participation for a few hours. Grant yourself permission to be off duty. The problems of today will either resolve themselves or wait patiently for your renewed energy tomorrow. But right now, in this quiet moment, there is absolutely nothing you need to accomplish.\n\nBreathe in the stillness. Breathe out the noise. Let go.`,
      },
    ],
  },
  {
    id: 2,
    title: 'Sleep Better Tonight',
    author: 'Dr. James Chen',
    readTime: '10 min',
    icon: '🌙',
    sections: [
      {
        heading: 'The Science of Sleep',
        body: `Sleep is not merely the absence of wakefulness. It is a carefully orchestrated biological process governed by two primary systems: your circadian rhythm and your sleep pressure. Together, they form the delicate architecture of restorative rest.\n\nYour circadian rhythm is your body's internal 24-hour clock, regulated primarily by light exposure. When the sun sets and darkness falls, a tiny region of the brain called the suprachiasmatic nucleus signals the pineal gland to release melatonin, the hormone of sleep. This is why dimming your lights an hour before bed is not merely a preference — it is a biological imperative.\n\nSleep pressure, on the other hand, builds throughout the day as a molecule called adenosine accumulates in the brain. The longer you are awake, the more adenosine builds up, creating an irresistible pull toward sleep. Caffeine works by temporarily blocking adenosine receptors, which is why that late-afternoon coffee can sabotage your night.`,
      },
      {
        heading: null,
        quote: '"The best bridge between despair and hope is a good night\'s sleep." — E. Joseph Cossman',
      },
      {
        heading: 'The 90-Minute Rule',
        body: `Sleep occurs in cycles of approximately 90 minutes, each consisting of four stages. The first two stages are light sleep, where your body temperature drops and heart rate slows. Stage three is deep sleep — the most physically restorative phase, where growth hormone is released and tissues repair themselves. The fourth stage is REM (Rapid Eye Movement) sleep, where dreams occur and your brain consolidates memories and processes emotions.\n\nA full night's sleep typically consists of four to six of these cycles. Waking up at the end of a cycle — rather than in the middle of deep sleep — is the key to feeling refreshed. Try counting backward from your desired wake time in 90-minute increments to determine your ideal bedtime.`,
      },
      {
        heading: 'Building Your Sleep Sanctuary',
        body: `Your bedroom should be a temple dedicated to rest. Consider these evidence-based adjustments:\n\n• Temperature: Keep your room cool, ideally between 65-68°F (18-20°C). Your core body temperature needs to drop for sleep onset.\n\n• Darkness: Even small amounts of light — from a phone charger, a hallway light under the door — can suppress melatonin production. Use blackout curtains or a sleep mask.\n\n• Sound: Consistent ambient noise (white noise, rain sounds) can mask disruptive sounds and create a calming acoustic environment.\n\n• Scent: Lavender has been shown in multiple studies to reduce heart rate and blood pressure, promoting relaxation. A few drops of essential oil on your pillow can make a measurable difference.\n\n• Remove screens: The blue light from phones and tablets suppresses melatonin four times more than any other wavelength. Make your bedroom a device-free zone.`,
      },
      {
        heading: 'The Wind-Down Ritual',
        body: `Create a consistent 30-minute pre-sleep ritual that signals to your body that sleep is approaching. This might include:\n\n1. A warm bath or shower — the subsequent drop in body temperature mimics the natural cooling that occurs before sleep\n2. Gentle stretching or progressive muscle relaxation\n3. Journal writing — transferring worries from your mind to paper\n4. Reading a physical book (not a screen)\n5. A cup of chamomile or valerian tea\n\nConsistency is the key. When you perform the same sequence every night, your brain learns to associate these activities with sleep, making the transition from wakefulness effortless.`,
      },
    ],
  },
  {
    id: 3,
    title: 'Peaceful Mind Daily',
    author: 'Sarah Williams',
    readTime: '12 min',
    icon: '🧘‍♀️',
    sections: [
      {
        heading: 'The Architecture of Inner Peace',
        body: `Peace is not the absence of chaos. It is the ability to remain centered within it. Every day, we encounter hundreds of micro-stressors — the alarm that jolts us awake, the traffic that makes us late, the email that triggers anxiety, the news that unsettles us. We cannot eliminate these stressors, but we can fundamentally change our relationship with them.\n\nThe ancient Stoic philosophers understood this deeply. Marcus Aurelius wrote in his Meditations: "You have power over your mind — not outside events. Realize this, and you will find strength." This is not naive optimism. It is the recognition that between every stimulus and our response, there exists a space. In that space lies our freedom.`,
      },
      {
        heading: null,
        quote: '"Almost everything will work again if you unplug it for a few minutes, including you." — Anne Lamott',
      },
      {
        heading: 'The Body Scan Meditation',
        body: `One of the most powerful techniques for cultivating present-moment awareness is the body scan meditation. It takes only ten minutes but can profoundly shift your state of mind.\n\nBegin by lying down or sitting comfortably. Close your eyes and take three deep breaths. Now, bring your attention to the top of your head. Notice any sensations there — tingling, warmth, pressure, or nothing at all. Do not judge these sensations as good or bad. Simply notice them.\n\nSlowly move your attention downward: your forehead, your eyes (often holding so much tension), your jaw (where many of us clench without realizing), your throat, your shoulders. Spend a few moments with each area. Where you find tension, breathe into it. Imagine your breath as warm light, softening and dissolving the tightness.\n\nContinue through your chest, your belly, your hands, your hips, your knees, your feet. By the time you reach your toes, you will have completed an inventory of your physical state. Many people are surprised to discover tension they did not know they were carrying.`,
      },
      {
        heading: 'The Gratitude Reframe',
        body: `Neuroscience has confirmed what wisdom traditions have taught for millennia: gratitude literally rewires the brain. Studies using fMRI scans show that practicing gratitude activates the ventral tegmental area, the region responsible for producing dopamine, the "reward" neurotransmitter.\n\nThe practice is deceptively simple. Each evening, before sleep, write down three specific things you are grateful for. The key word is "specific." Rather than "I'm grateful for my family," try "I'm grateful for the way my daughter laughed at dinner tonight" or "I'm grateful that my friend texted to check on me."\n\nOver time, this practice trains your brain's reticular activating system — the filter that determines what you notice — to scan for positive experiences throughout the day. You begin to see beauty and kindness that was always there but invisible to your stressed mind.`,
      },
      {
        heading: 'Evening Reflection Protocol',
        body: `Before sleep, give yourself five minutes for this structured reflection:\n\n1. One Rose: What was the best moment of today? Relive it in detail — the sights, sounds, and feelings.\n\n2. One Thorn: What was challenging? Acknowledge it without judgment, then consciously choose to set it aside until tomorrow.\n\n3. One Bud: What are you looking forward to tomorrow? Plant a small seed of anticipation.\n\nThis simple framework processes the day's emotional residue, preventing it from festering overnight. It transforms sleep from an escape into a bridge — carrying you gently from today's experiences to tomorrow's possibilities.`,
      },
    ],
  },
  {
    id: 4,
    title: 'The Gratitude Journal',
    author: 'Michael Porter',
    readTime: '7 min',
    icon: '✨',
    sections: [
      {
        heading: 'Why Gratitude Changes Everything',
        body: `In 2003, psychologists Robert Emmons and Michael McCullough conducted a landmark study. They divided participants into three groups: one wrote about things they were grateful for, one wrote about things that irritated them, and one wrote about neutral events. After ten weeks, the gratitude group was 25% happier, exercised 1.5 hours more per week, and reported fewer visits to the doctor.\n\nGratitude is not about denying difficulty or forcing positivity. It is about expanding your awareness to include the full spectrum of your experience. Even on the hardest days, there are small mercies — the warmth of a blanket, the taste of morning tea, the simple miracle of breathing.`,
      },
      {
        heading: null,
        quote: '"Gratitude turns what we have into enough, and more. It turns denial into acceptance, chaos into order, confusion into clarity." — Melody Beattie',
      },
      {
        heading: 'The Micro-Gratitude Practice',
        body: `You do not need a formal journal to practice gratitude. Throughout the day, look for "micro-gratitude" moments — tiny instances that normally pass unnoticed:\n\n• The first sip of a hot drink on a cold morning\n• A stranger holding the door open\n• The sound of birds outside your window\n• A text from someone you love\n• The feeling of clean sheets against your skin\n\nPause for just three seconds when you notice these moments. Take a conscious mental photograph. This is mindful gratitude — not writing about life, but tasting it as it happens.`,
      },
      {
        heading: 'Gratitude Before Sleep',
        body: `The last thoughts before sleep have an outsized impact on your brain's overnight processing. When you fall asleep replaying worries, your brain continues to work on those problems throughout the night, often producing anxious dreams and fragmented rest.\n\nHowever, when you fall asleep in a state of gratitude, your brain consolidates positive memories and emotions. You wake up with a fundamentally different neural baseline — calmer, more optimistic, more resilient.\n\nTonight, as you close your eyes, complete this sentence three times: "Today, I am grateful for _____________ because _____________." The "because" is essential — it moves gratitude from a thought to a feeling, embedding it more deeply in your neural pathways.\n\nOver thirty days, this single practice can measurably increase your baseline happiness, improve your sleep quality, and strengthen your relationships. Gratitude is not a feeling to be waited for. It is a muscle to be exercised.`,
      },
    ],
  },
];

export default function ReadingScreen({ navigate, currentLanguage }: ReadingScreenProps) {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showChapterList, setShowChapterList] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const chapter = chapters[currentChapter];

  // Track reading progress via scroll
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const handleScroll = () => {
      const scrollable = el.scrollHeight - el.clientHeight;
      if (scrollable > 0) setReadProgress(Math.min(100, (el.scrollTop / scrollable) * 100));
    };
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [currentChapter]);

  // Reset scroll on chapter change
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    setReadProgress(0);
  }, [currentChapter]);

  const goNext = () => { if (currentChapter < chapters.length - 1) setCurrentChapter(currentChapter + 1); };
  const goPrev = () => { if (currentChapter > 0) setCurrentChapter(currentChapter - 1); };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col h-[calc(100vh-80px)]">
      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <button onClick={() => navigate('content-general')} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all backdrop-blur-md border border-white/10">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowChapterList(!showChapterList)} className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white/80 text-sm flex items-center gap-2 transition-all">
            <BookOpen className="w-4 h-4" /> Ch. {currentChapter + 1} / {chapters.length}
          </button>
          <button onClick={() => setIsBookmarked(!isBookmarked)} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all border border-white/10">
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'text-blue-400 fill-blue-400' : 'text-white'}`} />
          </button>
        </div>
      </div>

      {/* ── Reading Progress Bar ── */}
      <div className="h-1 bg-white/10 rounded-full overflow-hidden mb-6 flex-shrink-0">
        <div className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full transition-all duration-300" style={{ width: `${readProgress}%` }} />
      </div>

      {/* ── Chapter Selector Dropdown ── */}
      {showChapterList && (
        <div className="mb-6 rounded-2xl bg-slate-800/95 backdrop-blur-xl border border-white/10 shadow-2xl p-2 flex-shrink-0" style={{ animation: 'fadeSlideIn 0.25s ease-out' }}>
          {chapters.map((ch, i) => (
            <button key={ch.id} onClick={() => { setCurrentChapter(i); setShowChapterList(false); }}
              className={`w-full px-4 py-3 rounded-xl text-left flex items-center gap-4 transition-all ${i === currentChapter ? 'bg-white/15 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
              <span className="text-2xl">{ch.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{ch.title}</p>
                <p className="text-xs opacity-60">{ch.author} · {ch.readTime}</p>
              </div>
              {i === currentChapter && <div className="w-2 h-2 rounded-full bg-blue-400" />}
            </button>
          ))}
        </div>
      )}

      {/* ── Scrollable Content Area ── */}
      <div ref={contentRef} className="flex-1 overflow-y-auto pr-2 pb-8" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
        {/* Chapter Header */}
        <div className="text-center mb-12" style={{ animation: 'fadeSlideIn 0.5s ease-out' }}>
          <div className="text-6xl mb-6">{chapter.icon}</div>
          <p className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" /> Chapter {currentChapter + 1}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight">{chapter.title}</h1>
          <p className="text-white/60 text-lg italic mb-2">by {chapter.author}</p>
          <p className="text-white/40 text-sm flex items-center justify-center gap-2"><Clock className="w-4 h-4" /> {chapter.readTime} read</p>
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <Star className="w-4 h-4 text-white/20" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Content Sections */}
        <div className="space-y-8" style={{ fontFamily: "'Inter', sans-serif" }}>
          {chapter.sections.map((section, idx) => (
            <div key={idx} style={{ animation: `fadeSlideIn 0.5s ease-out ${0.1 * idx}s both` }}>
              {section.quote ? (
                /* ── Quote Block ── */
                <div className="my-10 p-8 rounded-3xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-white/10 backdrop-blur-xl relative overflow-hidden">
                  <div className="absolute top-3 left-6 text-7xl text-white/5 font-serif">"</div>
                  <p className="text-xl md:text-2xl text-white/90 font-serif italic text-center leading-relaxed relative z-10">
                    {section.quote}
                  </p>
                </div>
              ) : (
                /* ── Text Section ── */
                <div>
                  {section.heading && (
                    <h2 className="text-2xl font-serif text-white mb-6 flex items-center gap-3">
                      <div className="w-1 h-8 rounded-full bg-gradient-to-b from-blue-400 to-purple-400" />
                      {section.heading}
                    </h2>
                  )}
                  {section.body?.split('\n\n').map((para, pidx) => (
                    <p key={pidx} className="text-white/80 text-lg leading-relaxed mb-6">{para}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom decorative divider */}
        <div className="flex items-center justify-center gap-4 my-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="text-2xl">🍃</div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>

      {/* ── Bottom Navigation ── */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10 flex-shrink-0">
        <button onClick={goPrev} disabled={currentChapter === 0}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all ${currentChapter === 0 ? 'opacity-30 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
          <ChevronLeft className="w-5 h-5" /> Previous
        </button>
        <p className="text-white/40 text-sm">{currentChapter + 1} of {chapters.length}</p>
        {currentChapter < chapters.length - 1 ? (
          <button onClick={goNext} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:scale-[1.02] shadow-lg transition-all">
            Next <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button onClick={() => navigate('content-general')} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:scale-[1.02] shadow-lg transition-all">
            Finished ✓
          </button>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
