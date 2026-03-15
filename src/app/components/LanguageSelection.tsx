import { ArrowLeft, Check } from 'lucide-react';
import { Language, translations, languageNames, languageFlagEmojis } from '../translations';

type Mode = 'general' | 'islamic';
type Screen = 'mode-selection' | 'general-home' | 'islamic-home' | 'settings' | 'settings-islamic' | 'language-selection';

interface LanguageSelectionProps {
  navigate: (screen: Screen, mode?: Mode) => void;
  currentMode: Mode;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function LanguageSelection({ navigate, currentMode, currentLanguage, onLanguageChange }: LanguageSelectionProps) {
  const t = translations[currentLanguage].languageSelection;
  const isIslamic = currentMode === 'islamic';
  
  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'zh', label: '中文 (Chinese)' },
    { code: 'ar', label: 'العربية (Arabic)' },
    { code: 'ms', label: 'Bahasa Melayu (Malay)' },
  ];

  const handleLanguageSelect = (lang: Language) => {
    onLanguageChange(lang);
    setTimeout(() => { navigate(isIslamic ? 'settings-islamic' : 'settings'); }, 300);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(isIslamic ? 'settings-islamic' : 'settings')} className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className={`text-white text-3xl font-light ${currentLanguage === 'ar' ? 'text-right' : ''}`}>{t.title}</h1>
            <p className={`${isIslamic ? 'text-emerald-100/70' : 'text-white/60'} mt-1 ${currentLanguage === 'ar' ? 'text-right' : ''}`}>{t.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
            className={`rounded-3xl p-6 flex items-center gap-5 transition-all text-left group hover:scale-[1.02] ${
              currentLanguage === lang.code
                ? isIslamic ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-400/50 border-2 shadow-xl shadow-emerald-500/10' : 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-400/50 border-2 shadow-xl shadow-blue-500/10'
                : 'bg-white/5 border-2 border-transparent hover:border-white/20'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-4xl shadow-inner flex-shrink-0 group-hover:scale-110 transition-transform">
              {languageFlagEmojis[lang.code]}
            </div>
            
            <div className="flex-1">
              <p className="text-white text-xl font-medium mb-1">{lang.label}</p>
              <p className={`${isIslamic ? 'text-emerald-100/60' : 'text-white/50'} text-sm`}>{languageNames[lang.code]}</p>
            </div>
            
            {currentLanguage === lang.code ? (
              <div className={`w-8 h-8 rounded-full ${isIslamic ? 'bg-emerald-500/40' : 'bg-blue-500/40'} flex items-center justify-center flex-shrink-0`}>
                <Check className={`w-5 h-5 ${isIslamic ? 'text-emerald-300' : 'text-blue-300'}`} />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full border-2 border-white/20 flex-shrink-0 group-hover:border-white/40" />
            )}
          </button>
        ))}
      </div>

      <div className={`mt-10 rounded-2xl ${isIslamic ? 'bg-emerald-500/10 border-emerald-400/20' : 'bg-blue-500/10 border-blue-400/20'} border p-6 flex flex-col items-center justify-center text-center max-w-lg mx-auto`}>
        <div className="text-3xl mb-3">🌐</div>
        <p className={`${isIslamic ? 'text-emerald-100/80' : 'text-white/80'} text-lg`}>
          {currentLanguage === 'en' && 'Your language preference will be applied across the entire app'}
          {currentLanguage === 'zh' && '您的语言偏好将应用于整个应用程序'}
          {currentLanguage === 'ar' && 'سيتم تطبيق تفضيل اللغة الخاص بك على التطبيق بأكمله'}
          {currentLanguage === 'ms' && 'Pilihan bahasa anda akan digunakan di seluruh aplikasi'}
        </p>
      </div>
    </div>
  );
}
