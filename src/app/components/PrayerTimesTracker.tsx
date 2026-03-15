import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface PrayerTimesTrackerProps {
  translations: any;
}

export default function PrayerTimesTracker({ translations: t }: PrayerTimesTrackerProps) {
  const [timings, setTimings] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [nextPrayer, setNextPrayer] = useState<{name: string, time: string, isTomorrow: boolean} | null>(null);
  const [timeUntil, setTimeUntil] = useState<string>('');

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`);
          if (!res.ok) throw new Error('API Error');
          const data = await res.json();
          
          if (data && data.data && data.data.timings) {
            const relevant = {
              Fajr: data.data.timings.Fajr,
              Dhuhr: data.data.timings.Dhuhr,
              Asr: data.data.timings.Asr,
              Maghrib: data.data.timings.Maghrib,
              Isha: data.data.timings.Isha
            };
            setTimings(relevant);
            calculateNextPrayer(relevant);
          }
        } catch (err) {
          setError('Failed to fetch prayer times');
          console.error(err);
        }
      },
      (err) => {
         setError('Location access denied');
      }
    );
  }, []);

  const calculateNextPrayer = (times: Record<string, string>) => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTotal = currentHour * 60 + currentMinute;

    let next = null;
    let minDiff = Infinity;
    let isTomorrow = false;

    // Find the next prayer today
    for (const [name, time] of Object.entries(times)) {
      const [h, m] = time.split(':').map(Number);
      const total = h * 60 + m;
      const diff = total - currentTotal;
      if (diff > 0 && diff < minDiff) {
        minDiff = diff;
        next = { name, time, isTomorrow: false };
      }
    }

    // If none found today, it's Fajr tomorrow
    if (!next && times.Fajr) {
      next = { name: 'Fajr', time: times.Fajr, isTomorrow: true };
    }

    setNextPrayer(next);
  };

  useEffect(() => {
    if (!nextPrayer) return;

    const interval = setInterval(() => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTotal = currentHour * 60 + currentMinute;

      const [h, m] = nextPrayer.time.split(':').map(Number);
      let targetTotal = h * 60 + m;
      
      if (nextPrayer.isTomorrow) {
        targetTotal += 24 * 60;
      }

      const diff = targetTotal - currentTotal;
      
      if (diff <= 0) {
        // Time reached, recalculate
        if (timings) calculateNextPrayer(timings);
      } else {
        const hrs = Math.floor(diff / 60);
        const mins = diff % 60;
        setTimeUntil(`In ${hrs}h ${mins}m`);
      }
    }, 60000); // Check every minute

    // Initial calculation for display immediately
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTotal = currentHour * 60 + currentMinute;
    const [h, m] = nextPrayer.time.split(':').map(Number);
    let targetTotal = h * 60 + m;
    if (nextPrayer.isTomorrow) targetTotal += 24 * 60;
    const diff = targetTotal - currentTotal;
    setTimeUntil(`In ${Math.floor(diff / 60)}h ${diff % 60}m`);

    return () => clearInterval(interval);
  }, [nextPrayer, timings]);

  const formatAMPM = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hr = h % 12 || 12;
    return `${hr}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  const getPrayerTranslation = (name: string) => {
    const map: any = {
      Fajr: t.fajrPrayer || 'Fajr',
      Dhuhr: 'Dhuhr',
      Asr: 'Asr',
      Maghrib: 'Maghrib',
      Isha: 'Isha'
    };
    return map[name] || name;
  };

  return (
    <div>
      <h3 className="text-white text-base font-medium mb-3">{t.nextPrayer || 'Next Prayer'}</h3>
      <div className="rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/20 backdrop-blur-xl p-4 flex items-center justify-between">
        {error ? (
          <p className="text-emerald-100/60 text-xs w-full text-center py-2">{error}</p>
        ) : !nextPrayer ? (
          <p className="text-emerald-100/60 text-xs w-full text-center py-2 animate-pulse">Detecting prayer times...</p>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
                <span className="text-2xl">🕌</span>
              </div>
              <div>
                <p className="text-white text-sm font-medium">{getPrayerTranslation(nextPrayer.name)}</p>
                <p className="text-emerald-100/60 text-xs">{nextPrayer.isTomorrow ? t.tomorrowMorning || 'Tomorrow' : 'Today'}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white text-lg font-semibold">{formatAMPM(nextPrayer.time)}</p>
              <p className="text-emerald-300/80 text-xs flex items-center justify-end gap-1">
                <Clock className="w-3 h-3" />
                {timeUntil}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
