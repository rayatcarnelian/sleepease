import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Bookmark, ChevronLeft, ChevronRight, BookOpen, Clock, Star, Sparkles, Moon } from 'lucide-react';
import { Language, translations } from '../translations';

type Screen = 'mode-selection' | 'general-home' | 'islamic-home' | 'mood-check-general' | 'mood-check-islamic' | 'content-general' | 'content-islamic' | 'ai-chat' | 'ai-chat-islamic' | 'mood-history-general' | 'mood-history-islamic' | 'settings' | 'reading-general' | 'reading-islamic';
type Mode = 'general' | 'islamic' | null;

interface ReadingScreenIslamicProps {
  navigate: (screen: Screen, mode?: Mode) => void;
  currentLanguage: Language;
}

interface DuaSection {
  heading: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
}

interface ReflectionSection {
  heading: string;
  body: string;
  quote?: undefined;
  arabic?: undefined;
}

interface QuoteSection {
  heading?: undefined;
  quote: string;
  body?: undefined;
  arabic?: undefined;
}

type Section = DuaSection | ReflectionSection | QuoteSection | { heading: string; body: string; arabic: string; transliteration?: string; translation?: string; reference?: string; };

interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  readTime: string;
  icon: string;
  category: string;
  sections: any[];
}

/* ─── Islamic Reading Content ─── */
const chapters: Chapter[] = [
  {
    id: 1,
    title: 'Evening Adhkar',
    subtitle: "Fortress of the Muslim",
    readTime: '10 min',
    icon: '📿',
    category: "Du'as",
    sections: [
      { heading: 'Seeking Protection Before Sleep', arabic: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا، بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ', transliteration: "Bismika Rabbee wada'tu janbee, wa bika arfa'uhu, fa'in amsakta nafsee farhamhaa, wa'in arsaltahaa fahfazhaa, bimaa tahfazu bihi 'ibaadakas-saaliheen.", translation: '"In Your name my Lord, I lie down and in Your name I rise, so if You should take my soul then have mercy upon it, and if You should return my soul then protect it in the manner You do so with Your righteous servants."', reference: '— Sahih Al-Bukhari 11:126, Muslim 4:2083' },
      { heading: 'Reaffirming Faith at Night', arabic: 'اللَّهُمَّ إِنَّكَ خَلَقْتَ نَفْسِي وَأَنْتَ تَوَفَّاهَا، لَكَ مَمَاتُهَا وَمَحْيَاهَا، إِنْ أَحْيَيْتَهَا فَاحْفَظْهَا، وَإِنْ أَمَتَّهَا فَاغْفِرْ لَهَا. اللَّهُمَّ إِنِّي أَسْأَلُكَ العَافِيَةَ', transliteration: "Allahumma innaka khalaqta nafsee wa anta tawaffaahaa, laka mamaatuhaa wa mahyaahaa, in ahyaytahaa fahfazhaa, wa in amattahaa faghfir lahaa. Allahumma innee as'alukal-'aafiyah.", translation: '"O Allah, You have created my soul and You take it back. Unto You is its death and its life. If You give it life then protect it, and if You cause it to die then forgive it. O Allah, I ask You for strength."', reference: '— Muslim 4:2083' },
      { heading: 'SubhanAllah, Alhamdulillah, Allahu Akbar', arabic: 'سُبْحَانَ اللَّهِ ٣٣ ، الحَمْدُ لِلَّهِ ٣٣ ، اللَّهُ أَكْبَرُ ٣٤', transliteration: "SubhanAllah (33 times), Alhamdulillah (33 times), Allahu Akbar (34 times)", translation: '"Glory be to Allah (33), Praise be to Allah (33), Allah is the Greatest (34). The Prophet ﷺ told Fatimah and Ali to recite this before sleeping — it is better than having a servant."', reference: '— Sahih Al-Bukhari, Muslim' },
      { heading: 'Ayat Al-Kursi (Verse of the Throne)', arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ', transliteration: "Allahu la ilaha illa Huwal-Hayyul-Qayyum...", translation: '"Allah — there is no deity except Him, the Ever-Living, the Self-Sustaining. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great."', reference: '— Al-Baqarah 2:255 — Whoever recites this before sleeping, a guardian from Allah will protect them until morning.' },
      { heading: 'The Last Two Verses of Al-Baqarah', arabic: 'آمَنَ الرَّسُولُ بِمَا أُنْزِلَ إِلَيْهِ مِنْ رَبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِنْ رُسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ', transliteration: "Aamanar-Rasoolu bimaa unzila ilayhi mir-Rabbihi wal-mu'minoon...", translation: '"The Messenger has believed in what was revealed to him from his Lord, and so have the believers. All of them have believed in Allah and His angels and His books and His messengers, saying: We make no distinction between any of His messengers. And they say: We hear and we obey. Grant us Your forgiveness, our Lord, and to You is the final destination."', reference: '— Al-Baqarah 2:285-286 — The Prophet ﷺ said: Whoever recites these two ayahs at night, they will suffice him.' },
    ],
  },
  {
    id: 2,
    title: 'Sahih Hadith on Sleep',
    subtitle: 'Teachings of the Prophet ﷺ',
    readTime: '12 min',
    icon: '📖',
    category: 'Hadith',
    sections: [
      { heading: 'The Sunnah of Sleeping', body: "The Prophet Muhammad ﷺ had a beautiful and consistent routine before sleeping. He would perform wudu (ablution), lie on his right side, place his right hand under his cheek, and recite specific supplications. This Sunnah is not merely tradition — modern sleep science confirms that sleeping on the right side reduces pressure on the heart, promotes better digestion, and improves lymphatic drainage.\n\nAisha (رضي الله عنها) narrated: \"The Prophet ﷺ used to sleep on his right side, and he would place his right hand under his right cheek. He would then say: 'Allahumma qinee 'adhaabaka yawma tab'athu 'ibaadak' (O Allah, protect me from Your punishment on the day You resurrect Your servants).\" (Abu Dawud)" },
      { heading: null, quote: '"إِنَّ عَيْنَيَّ تَنَامَانِ وَلَا يَنَامُ قَلْبِي"\n\n"My eyes sleep but my heart does not sleep."\n— Prophet Muhammad ﷺ (Sahih Al-Bukhari)' },
      { heading: 'Etiquettes of Sleep in Islam', body: "1. Perform wudu before sleeping — The Prophet ﷺ said: \"When you go to bed, perform wudu as you do for prayer, then lie down on your right side.\" (Sahih Al-Bukhari)\n\n2. Dust your bed three times — The Prophet ﷺ said: \"When any of you goes to bed, let him dust off his bed with the inside of his lower garment, for he does not know what came on it after he left it.\" (Sahih Al-Bukhari)\n\n3. Recite Surah Al-Mulk — The Prophet ﷺ said: \"There is a surah in the Quran which is only thirty verses. It intercedes for a person until he is forgiven. It is Surah Tabarak [Al-Mulk].\" (Abu Dawud, At-Tirmidhi)\n\n4. Blow into cupped hands and recite Surah Al-Ikhlas, Al-Falaq, and An-Nas, then wipe over the body — Aisha reported that the Prophet ﷺ would do this every night. (Sahih Al-Bukhari)\n\n5. Sleep in a state of dhikr — The Prophet ﷺ said: \"Whoever retires to his bed in a state of remembrance of Allah, and then wakes up during the night and asks Allah for good, Allah will give it to him.\" (At-Tirmidhi)" },
      { heading: 'What the Prophet ﷺ Avoided Before Sleep', body: "The Prophet ﷺ discouraged sleeping on the stomach. Abu Hurairah (رضي الله عنه) reported: \"The Prophet ﷺ saw a man lying on his stomach and said: 'This is a way of lying that Allah does not like.'\" (At-Tirmidhi)\n\nHe also advised against sleeping after Asr prayer (late afternoon), as it could disrupt the night's rest. And he encouraged sleeping early after Isha prayer rather than staying up unnecessarily.\n\nThe Prophet ﷺ said: \"Put out the lamps when you go to bed, close the doors, cover the water vessels, and cover the food and drink.\" (Sahih Al-Bukhari). This hadith mirrors modern sleep hygiene advice about creating a dark, safe environment for quality rest." },
      { heading: 'Waking Up — The Sunnah Way', body: "When the Prophet ﷺ woke up during the night, he would say:\n\n\"لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَٰهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ\"\n\n\"There is no god but Allah alone, with no partner. To Him belongs dominion and praise, and He has power over all things. Glory be to Allah, praise be to Allah, there is no god but Allah, and Allah is the Greatest.\"\n\nHe ﷺ said: \"Whoever wakes up at night and says this, then says 'O Allah, forgive me' or makes a supplication, it will be answered. If he performs wudu and prays, his prayer will be accepted.\" (Sahih Al-Bukhari)" },
    ],
  },
  {
    id: 3,
    title: 'Surah Al-Mulk',
    subtitle: 'The Sovereignty — with Tafsir',
    readTime: '15 min',
    icon: '🕌',
    category: 'Quran',
    sections: [
      { heading: 'Introduction & Virtue', body: "Surah Al-Mulk (The Sovereignty) is the 67th chapter of the Quran, consisting of 30 verses. It was revealed in Makkah and belongs to the category of Mufassal (shorter chapters recited frequently).\n\nThe Prophet ﷺ said: \"There is a surah in the Quran, consisting of thirty verses, which will intercede for its companion (the one who recites it regularly) until he is admitted to Paradise. It is Tabarak alladhi biyadihil-mulk (Blessed is He in whose hand is the dominion).\" (At-Tirmidhi, Abu Dawud)\n\nHe ﷺ also said: \"I wish that Surah Tabarak would be in the heart of every believer.\" The Prophet ﷺ himself would not sleep until he had recited Surah Al-Mulk and Surah As-Sajdah every night." },
      { heading: 'Verses 1-4: The Creator of Life and Death', arabic: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ ۝ الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ', translation: '"Blessed is He in whose hand is the dominion, and He is over all things competent — He who created death and life to test you as to which of you is best in deed — and He is the Exalted in Might, the Forgiving."', body: "Tafsir: The surah opens by establishing Allah's absolute sovereignty over all creation. The word \"Tabarak\" (تبارك) comes from the root \"barakah\" meaning blessings — it implies that all blessings originate from Allah, and His greatness surpasses all comprehension.\n\nRemarkably, death is mentioned before life. Scholars explain this is because death existed before life — before creation, there was non-existence. This ordering also reminds us that death is not an end but a transition, and life is the test that precedes it. The phrase \"best in deed\" (not \"most in deed\") teaches us that quality of actions matters more than quantity." },
      { heading: 'Verses 5-12: The Seven Heavens', arabic: 'وَلَقَدْ زَيَّنَّا السَّمَاءَ الدُّنْيَا بِمَصَابِيحَ وَجَعَلْنَاهَا رُجُومًا لِلشَّيَاطِينِ ۖ وَأَعْتَدْنَا لَهُمْ عَذَابَ السَّعِيرِ', translation: '"And We have certainly beautified the nearest heaven with stars and have made them as missiles to drive away the devils, and We have prepared for them the punishment of the Blaze."', body: "Tafsir: These verses draw our attention to the night sky — the very sky we gaze upon before sleep. The stars serve a dual purpose: they beautify the heavens for our contemplation, and they serve as protection. When you look up at the stars tonight, remember that each one is a sign (ayah) of Allah's creative power.\n\nVerses 8-12 describe the terrifying sound of Hellfire and the regret of those who rejected the truth. They admit: \"If only we had listened or understood, we would not be among the companions of the Blaze.\" This is a powerful reminder before sleep — to reflect on our day and whether our actions aligned with guidance." },
      { heading: 'Verses 13-22: Allah Knows All Secrets', arabic: 'وَأَسِرُّوا قَوْلَكُمْ أَوِ اجْهَرُوا بِهِ ۖ إِنَّهُ عَلِيمٌ بِذَاتِ الصُّدُورِ ۝ أَلَا يَعْلَمُ مَنْ خَلَقَ وَهُوَ اللَّطِيفُ الْخَبِيرُ', translation: '"And conceal your speech or publicize it; indeed, He is All-Knowing of what is within the hearts. Does He who created not know, while He is the Subtle, the All-Aware?"', body: "Tafsir: This is one of the most profound rhetorical questions in the Quran: \"Does He who created not know?\" Of course the Creator knows His creation intimately — more than we know ourselves. The name Al-Latif (the Subtle) means Allah knows the finest details of our inner world, our unspoken thoughts, our hidden fears.\n\nAs you prepare for sleep, this verse invites you to have an honest conversation with Allah. You don't need to say anything aloud. He already knows what weighs on your heart. This knowledge is not meant to inspire fear, but comfort — you are never alone, never unheard, never unseen." },
      { heading: 'Verses 23-30: Gratitude for Blessings', arabic: 'قُلْ هُوَ الَّذِي أَنشَأَكُمْ وَجَعَلَ لَكُمُ السَّمْعَ وَالْأَبْصَارَ وَالْأَفْئِدَةَ ۖ قَلِيلًا مَّا تَشْكُرُونَ', translation: '"Say, "It is He who produced you and made for you hearing and vision and hearts (intellect); little are you grateful.""', body: "Tafsir: The surah closes by reminding us of the blessings we take for granted: our hearing, our sight, our hearts. \"Little are you grateful\" is not a condemnation but an invitation — to pause and appreciate what we have.\n\nBefore you close your eyes tonight, reflect: your ability to hear the quiet of the night, to see the people you love, to feel emotions with your heart — each of these is a miracle you were given without asking for it. The surah ends with a question about water — the source of all life — reminding us that even the most basic necessity is a gift from Allah.\n\nMay this Surah be your nightly companion, interceding for you, protecting you, and bringing peace to your heart. آمين" },
    ],
  },
  {
    id: 4,
    title: 'Stories of the Prophets',
    subtitle: 'Lessons for the Heart',
    readTime: '15 min',
    icon: '⭐',
    category: 'Stories',
    sections: [
      { heading: "Prophet Yusuf (Joseph) عليه السلام — Patience Through Trials", body: "The story of Prophet Yusuf is described by Allah as \"the best of stories\" (أحسن القصص). It is a story that teaches us about patience (sabr), trust in Allah's plan (tawakkul), and how the darkest moments of our lives can lead to the greatest blessings.\n\nAs a young boy, Yusuf was thrown into a well by his own brothers out of jealousy. Imagine the fear — a child alone in darkness, abandoned by the people who should have protected him. Yet Allah says He inspired Yusuf in that dark well:\n\n\"وَأَوْحَيْنَا إِلَيْهِ لَتُنَبِّئَنَّهُم بِأَمْرِهِمْ هَـٰذَا وَهُمْ لَا يَشْعُرُونَ\"\n\"And We inspired him: You will surely inform them about this affair of theirs while they do not perceive.\" (12:15)\n\nEven in his worst moment, Allah was preparing his greatest future." },
      { heading: null, quote: '"فَصَبْرٌ جَمِيلٌ ۖ وَاللَّهُ الْمُسْتَعَانُ عَلَىٰ مَا تَصِفُونَ"\n\n"So patience is most fitting. And Allah is the one sought for help against that which you describe."\n— Prophet Ya\'qub (Jacob), Surah Yusuf 12:18' },
      { heading: "From Prison to Palace", body: "Yusuf was sold into slavery, falsely accused, and thrown into prison — not for months, but for years. Yet in prison, he did not despair. He used his time to invite others to Islam, to interpret dreams, and to maintain his connection with Allah.\n\nThe turning point came when the king of Egypt had a dream that no one could interpret. Yusuf, still in prison, interpreted the dream accurately and provided a plan to save the nation from famine. He was freed, exalted, and given authority over all the storehouses of Egypt.\n\nThe lesson: Your current hardship is not your final chapter. Allah's plan operates on a timeline we cannot see. The very thing that seems like your worst setback may be the bridge to your greatest elevation.\n\nWhen Yusuf's brothers finally came before him, not recognizing him, he revealed himself and said the words that echo through centuries:\n\n\"لاَ تَثْرِيبَ عَلَيْكُمُ الْيَوْمَ\"\n\"No blame on you today.\" (12:92)\n\nHe forgave completely. And his father Ya'qub, who had wept for decades until he lost his sight, was reunited with his beloved son." },
      { heading: "Prophet Ibrahim عليه السلام — Friendship with Allah", body: "Ibrahim (Abraham) is called \"Khalilullah\" — the Friend of Allah. What does it mean to be a friend of the Creator of the universe?\n\nIbrahim's life was a series of extraordinary tests. He was thrown into a fire by his own people for smashing their idols. Allah commanded the fire:\n\n\"قُلْنَا يَا نَارُ كُونِي بَرْدًا وَسَلَامًا عَلَىٰ إِبْرَاهِيمَ\"\n\"O fire, be cool and peaceful upon Ibrahim.\" (21:69)\n\nThe fire obeyed its Creator. Ibrahim sat in the flames unharmed, in perfect peace. This teaches us a profound truth: when Allah is with you, nothing can harm you — not fire, not enemies, not circumstances.\n\nLater, Ibrahim was commanded to sacrifice his own son Ismail. Both father and son submitted to Allah's will:\n\n\"يَا بُنَيَّ إِنِّي أَرَىٰ فِي الْمَنَامِ أَنِّي أَذْبَحُكَ فَانظُرْ مَاذَا تَرَىٰ\"\n\"O my son, I have seen in a dream that I sacrifice you, so what do you think?\"\n\nIsmail replied: \"O my father, do as you are commanded. You will find me, if Allah wills, among the patient.\" (37:102)\n\nAt the moment of ultimate sacrifice, Allah replaced Ismail with a ram. The test was never about the sacrifice — it was about the willingness to submit completely." },
      { heading: 'Lessons for Tonight', body: "These stories are not ancient history. They are mirrors.\n\nLike Yusuf in the well, you may feel alone in your struggles tonight. But Allah is closer to you than your jugular vein (50:16).\n\nLike Ibrahim in the fire, you may face situations that seem impossible. But Allah can make any fire cool and peaceful.\n\nLike Ya'qub, who never lost hope even after decades of separation, trust that Allah's plan will unfold in the most beautiful way.\n\nTonight, as you close your eyes, remember: \"إِنَّ مَعَ الْعُسْرِ يُسْرًا\" — \"Indeed, with hardship comes ease.\" (94:6)\n\nSleep with trust in your heart. Wake with gratitude on your lips. And know that the Author of your story writes only in wisdom." },
    ],
  },
  {
    id: 5,
    title: 'Daily Du\'as Collection',
    subtitle: "Supplications for Every Moment",
    readTime: '8 min',
    icon: '🤲',
    category: "Du'as",
    sections: [
      { heading: 'Upon Waking Up', arabic: 'الحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ', transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushoor", translation: '"All praise is for Allah who gave us life after having taken it from us, and unto Him is the resurrection."', reference: '— Sahih Al-Bukhari' },
      { heading: 'Before Eating', arabic: 'بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ', transliteration: "Bismillahi wa 'ala barakatillah", translation: '"In the name of Allah and with the blessings of Allah."', reference: '— Abu Dawud, At-Tirmidhi' },
      { heading: 'When Leaving Home', arabic: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', transliteration: "Bismillah, tawakkaltu 'alallah, wa la hawla wa la quwwata illa billah", translation: '"In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah." — When said, it is answered: You are guided, defended, and protected, and the devil keeps away from you.', reference: '— Abu Dawud, At-Tirmidhi' },
      { heading: 'When Feeling Anxious or Distressed', arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ', transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazani, wa a'udhu bika minal-'ajzi wal-kasali, wa a'udhu bika minal-jubni wal-bukhli, wa a'udhu bika min ghalabatid-dayni wa qahrir-rijal", translation: '"O Allah, I seek refuge in You from anxiety and sorrow, from weakness and laziness, from cowardice and miserliness, from the burden of debt and the oppression of men."', reference: '— Sahih Al-Bukhari — The Prophet ﷺ used to say this du\'a frequently' },
      { heading: 'For Forgiveness Before Sleep', arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ', transliteration: "Astaghfirullaahal-'azeemal-lathee la ilaaha illa Huwal-Hayyul-Qayyoomu wa atoobu ilayhi", translation: '"I seek the forgiveness of Allah the Magnificent, whom there is no god but Him, the Ever-Living, the Self-Sustaining, and I repent to Him." — Whoever says this, Allah will forgive him even if he fled from battle.', reference: '— Abu Dawud, At-Tirmidhi, Al-Hakim' },
      { heading: 'The Master Supplication for Forgiveness (Sayyidul Istighfar)', arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ', transliteration: "Allahumma anta Rabbi la ilaha illa anta, khalaqtanee wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu, a'oodhu bika min sharri ma sana'tu, aboo'u laka bini'matika 'alayya, wa aboo'u laka bidhanbee faghfir lee fa innahu la yaghfirudh-dhunooba illa anta", translation: '"O Allah, You are my Lord. There is no god but You. You created me and I am Your servant. I keep to my covenant and promise to You as much as I can. I seek refuge in You from the evil of what I have done. I acknowledge before You Your blessings upon me, and I acknowledge my sin. So forgive me, for no one forgives sins except You."', reference: '— Sahih Al-Bukhari — The Prophet ﷺ said: Whoever says this with conviction in the evening and dies that night will enter Paradise.' },
    ],
  },
];

export default function ReadingScreenIslamic({ navigate, currentLanguage }: ReadingScreenIslamicProps) {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showChapterList, setShowChapterList] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const chapter = chapters[currentChapter];

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

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    setReadProgress(0);
  }, [currentChapter]);

  const goNext = () => { if (currentChapter < chapters.length - 1) setCurrentChapter(currentChapter + 1); };
  const goPrev = () => { if (currentChapter > 0) setCurrentChapter(currentChapter - 1); };

  const categoryColors: Record<string, string> = {
    "Du'as": 'text-amber-300 bg-amber-500/20',
    'Hadith': 'text-emerald-300 bg-emerald-500/20',
    'Quran': 'text-blue-300 bg-blue-500/20',
    'Stories': 'text-purple-300 bg-purple-500/20',
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col h-[calc(100vh-80px)]">
      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <button onClick={() => navigate('content-islamic')} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all backdrop-blur-md border border-white/10">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowChapterList(!showChapterList)} className="px-4 py-2 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/20 text-emerald-200 text-sm flex items-center gap-2 transition-all">
            <BookOpen className="w-4 h-4" /> {currentChapter + 1} / {chapters.length}
          </button>
          <button onClick={() => setIsBookmarked(!isBookmarked)} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all border border-white/10">
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'text-amber-400 fill-amber-400' : 'text-white'}`} />
          </button>
        </div>
      </div>

      {/* ── Reading Progress Bar ── */}
      <div className="h-1 bg-white/10 rounded-full overflow-hidden mb-6 flex-shrink-0">
        <div className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 rounded-full transition-all duration-300" style={{ width: `${readProgress}%` }} />
      </div>

      {/* ── Chapter Selector ── */}
      {showChapterList && (
        <div className="mb-6 rounded-2xl bg-slate-800/95 backdrop-blur-xl border border-emerald-400/15 shadow-2xl p-2 flex-shrink-0" style={{ animation: 'fadeSlideIn 0.25s ease-out' }}>
          {chapters.map((ch, i) => (
            <button key={ch.id} onClick={() => { setCurrentChapter(i); setShowChapterList(false); }}
              className={`w-full px-4 py-3 rounded-xl text-left flex items-center gap-4 transition-all ${i === currentChapter ? 'bg-emerald-500/15 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
              <span className="text-2xl">{ch.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{ch.title}</p>
                <p className="text-xs opacity-60">{ch.subtitle} · {ch.readTime}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[ch.category] || ''}`}>{ch.category}</span>
            </button>
          ))}
        </div>
      )}

      {/* ── Scrollable Content ── */}
      <div ref={contentRef} className="flex-1 overflow-y-auto pr-2 pb-8" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
        {/* Chapter Header */}
        <div className="text-center mb-12" style={{ animation: 'fadeSlideIn 0.5s ease-out' }}>
          <div className="text-6xl mb-6">{chapter.icon}</div>
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium mb-4 ${categoryColors[chapter.category] || ''}`}>
            <Moon className="w-3 h-3" /> {chapter.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight">{chapter.title}</h1>
          <p className="text-emerald-100/60 text-lg">{chapter.subtitle}</p>
          <p className="text-emerald-100/40 text-sm mt-2 flex items-center justify-center gap-2"><Clock className="w-4 h-4" /> {chapter.readTime} read</p>
        </div>

        {/* Decorative Islamic Divider */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
          <span className="text-amber-300/60 text-lg">✦</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {chapter.sections.map((section: any, idx: number) => (
            <div key={idx} style={{ animation: `fadeSlideIn 0.5s ease-out ${0.1 * idx}s both` }}>
              {section.quote ? (
                /* ── Quote Block ── */
                <div className="my-10 p-8 rounded-3xl bg-gradient-to-br from-emerald-900/40 to-teal-900/30 border border-emerald-400/15 backdrop-blur-xl relative overflow-hidden">
                  <div className="absolute top-2 left-6 text-7xl text-emerald-300/10 font-serif">"</div>
                  <p className="text-xl md:text-2xl text-white/90 font-serif italic text-center leading-relaxed whitespace-pre-line relative z-10">
                    {section.quote}
                  </p>
                </div>
              ) : section.arabic ? (
                /* ── Arabic Du'a / Quran Verse Block ── */
                <div className="bg-white/5 backdrop-blur-xl border border-emerald-400/15 rounded-3xl p-8 hover:bg-white/8 transition-colors">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold font-serif text-sm">{idx + 1}</div>
                    <h3 className="text-white text-xl font-medium">{section.heading}</h3>
                  </div>
                  <div className="space-y-6">
                    <p className="text-right text-2xl sm:text-3xl leading-[2] text-white/95 font-serif" style={{ fontFamily: "'Amiri', serif" }}>{section.arabic}</p>
                    {section.transliteration && <div className="p-4 rounded-xl bg-black/20 text-emerald-100/70 italic text-sm leading-relaxed">{section.transliteration}</div>}
                    {section.translation && <p className="text-white/80 leading-relaxed text-base">{section.translation}</p>}
                    {section.body && section.body.split('\n\n').map((para: string, pidx: number) => (
                      <p key={pidx} className="text-white/75 leading-relaxed text-base">{para}</p>
                    ))}
                    {section.reference && <p className="text-emerald-300/50 text-xs italic mt-4 pt-4 border-t border-white/5">{section.reference}</p>}
                  </div>
                </div>
              ) : (
                /* ── Regular Text Section ── */
                <div>
                  {section.heading && (
                    <h2 className="text-2xl font-serif text-white mb-6 flex items-center gap-3">
                      <div className="w-1 h-8 rounded-full bg-gradient-to-b from-emerald-400 to-teal-400" />
                      {section.heading}
                    </h2>
                  )}
                  {section.body?.split('\n\n').map((para: string, pidx: number) => (
                    <p key={pidx} className="text-white/80 text-lg leading-relaxed mb-6">{para}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Islamic divider */}
        <div className="flex items-center justify-center gap-4 my-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
          <div className="text-2xl">🌙</div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
        </div>
      </div>

      {/* ── Bottom Navigation ── */}
      <div className="flex items-center justify-between pt-4 border-t border-emerald-500/15 flex-shrink-0">
        <button onClick={goPrev} disabled={currentChapter === 0}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all ${currentChapter === 0 ? 'opacity-30 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
          <ChevronLeft className="w-5 h-5" /> Previous
        </button>
        <p className="text-emerald-100/40 text-sm">{currentChapter + 1} of {chapters.length}</p>
        {currentChapter < chapters.length - 1 ? (
          <button onClick={goNext} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:scale-[1.02] shadow-lg shadow-emerald-500/20 transition-all">
            Next <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button onClick={() => navigate('content-islamic')} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:scale-[1.02] shadow-lg shadow-emerald-500/20 transition-all">
            Finished ✓
          </button>
        )}
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
