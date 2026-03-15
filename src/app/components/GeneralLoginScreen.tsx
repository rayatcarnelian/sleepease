import { useState } from 'react';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Language, translations } from '../translations';
import { signIn, signInWithGoogle } from '../../services/auth';

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

interface GeneralLoginScreenProps {
  navigate: (screen: Screen, mode?: Mode) => void;
  currentLanguage: Language;
}

export default function GeneralLoginScreen({ navigate, currentLanguage }: GeneralLoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const t = translations[currentLanguage].login;

  const handleGoogleSignIn = async () => {
    setError('');
    setIsSubmitting(true);
    try {
      await signInWithGoogle();
      navigate('general-home', 'general');
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await signIn(email, password);
      navigate('general-home', 'general');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Full-screen background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-blue-900" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-60 h-60 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-32 left-1/4 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md mx-4 sm:mx-auto">
        <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-10 shadow-2xl">
          {/* Back button */}
          <button
            className="mb-6 w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center transition-all hover:bg-white/15 active:scale-95"
            onClick={() => navigate('mode-selection')}
          >
            <ArrowLeft className="w-5 h-5 text-white/80" />
          </button>

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 backdrop-blur-xl flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="2" opacity="0.95" />
                <circle cx="18" cy="20" r="2" fill="white" opacity="0.95" />
                <circle cx="30" cy="20" r="2" fill="white" opacity="0.95" />
                <path d="M17 28 Q24 34 31 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.95" fill="none" />
              </svg>
            </div>
            <h2 className="text-white text-2xl font-light mb-1">Welcome Back</h2>
            <p className="text-white/50 text-sm">Sign in to SleepEase · General Mode</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-white/70 text-xs mb-2 block">{t.emailLabel}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-400/50 focus:bg-white/15 transition-all text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-white/70 text-xs mb-2 block">{t.passwordLabel}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-400/50 focus:bg-white/15 transition-all text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-blue-400 text-xs hover:text-blue-300">{t.forgotPassword}</button>
            </div>

            {error && (
              <div className="p-3 rounded-2xl bg-red-500/20 border border-red-400/30">
                <p className="text-red-300 text-xs text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl text-white text-sm font-medium transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              style={{ backgroundColor: '#3A5F7D', boxShadow: '0 4px 20px rgba(58, 95, 125, 0.3)' }}
            >
              {isSubmitting ? '...' : t.signInButton}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/20" />
              <span className="text-white/40 text-xs">or</span>
              <div className="flex-1 h-px bg-white/20" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
                className="py-3 rounded-2xl bg-white/10 border border-white/20 text-white text-sm hover:bg-white/15 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="text-xs">Google</span>
              </button>
              <button
                type="button"
                className="py-3 rounded-2xl bg-white/10 border border-white/20 text-white text-sm hover:bg-white/15 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <span className="text-xs">Apple</span>
              </button>
            </div>

            <div className="text-center pt-2">
              <p className="text-white/50 text-xs">
                {t.noAccount}{' '}
                <button type="button" onClick={() => navigate('general-signup')} className="text-blue-400 hover:text-blue-300">
                  {t.signUpLink}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}