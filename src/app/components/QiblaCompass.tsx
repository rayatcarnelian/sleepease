import { useState, useEffect } from 'react';
import { Compass, Navigation } from 'lucide-react';

const MECCA_LAT = 21.422487;
const MECCA_LNG = 39.826206;

function calculateQibla(lat: number, lng: number) {
  const phi1 = (lat * Math.PI) / 180;
  const phi2 = (MECCA_LAT * Math.PI) / 180;
  const deltaLambda = ((MECCA_LNG - lng) * Math.PI) / 180;

  const y = Math.sin(deltaLambda);
  const x = Math.cos(phi1) * Math.tan(phi2) - Math.sin(phi1) * Math.cos(deltaLambda);

  let bearing = (Math.atan2(y, x) * 180) / Math.PI;
  return (bearing + 360) % 360;
}

export default function QiblaCompass() {
  const [heading, setHeading] = useState<number | null>(null);
  const [qibla, setQibla] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCalibrating, setIsCalibrating] = useState(true);

  useEffect(() => {
    // 1. Get location
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsCalibrating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const qiblaAngle = calculateQibla(latitude, longitude);
        setQibla(qiblaAngle);
        setIsCalibrating(false);
      },
      (err) => {
        setError("Unable to retrieve your location for Qibla.");
        setIsCalibrating(false);
        console.error(err);
      }
    );

    // 2. Get device orientation
    const handleOrientation = (event: DeviceOrientationEvent) => {
      // iOS
      if ((event as any).webkitCompassHeading) {
        setHeading((event as any).webkitCompassHeading);
      } else if (event.alpha !== null) {
        // Android / standard (alpha is rotation around z-axis from north)
        // Usually, 360 - alpha + (device orientation adjustments if needed)
        // This is a simplified fallback
        setHeading(360 - event.alpha);
      }
    };

    // Need user interaction to request DeviceOrientation on iOS 13+
    // But we'll try to just listen first
    window.addEventListener('deviceorientationabsolute', handleOrientation as any, true);
    window.addEventListener('deviceorientation', handleOrientation, true);

    return () => {
      window.removeEventListener('deviceorientationabsolute', handleOrientation as any);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  // Request permissions for iOS 13+
  const requestPermissions = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          // Listeners are already attached
        } else {
          setError("Permission to access device orientation was denied");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to request orientation permissions");
      }
    }
  };

  const hasCompass = heading !== null;

  return (
    <div className="rounded-3xl bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border border-emerald-400/20 backdrop-blur-xl p-6 sm:p-8 flex flex-col items-center place-content-center sm:h-80 relative overflow-hidden">
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
        <h3 className="text-white text-lg font-medium flex items-center gap-2">
          <Compass className="w-5 h-5 text-emerald-400" /> Qibla Compass
        </h3>
      </div>

      <div className="mt-12 flex flex-col items-center min-h-[160px] justify-center text-center">
        {error ? (
          <p className="text-red-300 text-sm max-w-xs">{error}</p>
        ) : isCalibrating ? (
          <p className="text-emerald-100/60 text-sm animate-pulse">Finding your location...</p>
        ) : (
          <>
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-4 flex items-center justify-center">
              {/* Compass Ring */}
              <div 
                className="absolute inset-0 rounded-full border-4 border-emerald-500/30 transition-transform duration-500 ease-out"
                style={{ transform: `rotate(${hasCompass ? -heading : 0}deg)` }}
              >
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]" /> {/* North marker */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-white/20 rounded-full" />
                <div className="absolute left-1 top-1/2 -translate-y-1/2 w-3 h-1.5 bg-white/20 rounded-full" />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-1.5 bg-white/20 rounded-full" />
              </div>
              
              {/* Qibla Pointer */}
              <div 
                className="absolute inset-0 transition-transform duration-500 ease-out flex items-start justify-center pt-4"
                style={{ transform: `rotate(${hasCompass ? (qibla! - heading!) : qibla}deg)` }}
              >
                <div className="w-2 h-10 sm:w-3 sm:h-12 bg-gradient-to-b from-emerald-400 to-transparent rounded-full shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
              </div>
              
              {/* Center Dot */}
              <div className="w-3 h-3 bg-white rounded-full shadow-lg z-10" />
            </div>

            {hasCompass ? (
              <p className="text-white font-medium">Turn device to point the green line to Qibla</p>
            ) : (
              <div className="space-y-3">
                <p className="text-emerald-100/70 text-sm">
                  Qibla is <strong>{Math.round(qibla || 0)}°</strong> from North.
                </p>
                {typeof (DeviceOrientationEvent as any).requestPermission === 'function' && (
                  <button 
                    onClick={requestPermissions}
                    className="px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-xl text-xs border border-emerald-500/30 hover:bg-emerald-500/30 transition"
                  >
                    Enable Compass
                  </button>
                )}
                {!hasCompass && typeof (DeviceOrientationEvent as any).requestPermission !== 'function' && (
                  <p className="text-emerald-100/40 text-xs">Device compass not available. Point phone North to use the bearing.</p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
