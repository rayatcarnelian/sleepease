import { useMemo } from 'react';

interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function ParticlesBackground({ mode = 'general' }: { mode?: 'general' | 'islamic' | null }) {
  const isIslamic = mode === 'islamic';
  
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.05,
    }));
  }, []);

  const color = isIslamic ? '16, 185, 129' : '99, 102, 241';

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 transition-colors duration-1000"
        style={{
          background: isIslamic
            ? 'radial-gradient(ellipse at 20% 50%, rgba(6,78,59,0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(16,185,129,0.15) 0%, transparent 50%)'
            : 'radial-gradient(ellipse at 20% 50%, rgba(30,27,75,0.5) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.15) 0%, transparent 50%)'
        }}
      />
      
      {/* Floating orbs */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
            background: `radial-gradient(circle, rgba(${color}, 0.8) 0%, rgba(${color}, 0) 70%)`,
            boxShadow: `0 0 ${p.size * 3}px rgba(${color}, 0.3)`,
            animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* Larger decorative orb — top right */}
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl"
        style={{
          top: '-10%',
          right: '-10%',
          background: isIslamic
            ? 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
          animation: 'float-orb 25s ease-in-out infinite',
        }}
      />

      {/* Larger decorative orb — bottom left */}
      <div
        className="absolute w-80 h-80 rounded-full blur-3xl"
        style={{
          bottom: '-5%',
          left: '-5%',
          background: isIslamic
            ? 'radial-gradient(circle, rgba(234,179,8,0.06) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)',
          animation: 'float-orb 30s ease-in-out 5s infinite reverse',
        }}
      />

      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(${Math.random() > 0.5 ? '' : '-'}30px, -40px) scale(1.2); }
          50% { transform: translate(${Math.random() > 0.5 ? '' : '-'}20px, 30px) scale(0.8); }
          75% { transform: translate(${Math.random() > 0.5 ? '' : '-'}40px, -20px) scale(1.1); }
        }
        @keyframes float-orb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 30px) scale(0.95); }
        }
      `}</style>
    </div>
  );
}
