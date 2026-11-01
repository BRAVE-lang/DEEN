// ==============================================================================
// DEEN — Qibla Direction & Interactive Compass Page
// Great Circle Spherical Trigonometry to Kaaba (Makkah al-Mukarramah)
// 3D Tilt Compensation, Landscape/Portrait Orientation & Manual Fallback
// ==============================================================================

import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  MapPin,
  RefreshCw,
  AlertCircle,
  ShieldCheck,
  RotateCw,
  Sliders,
  CheckCircle,
  HelpCircle,
  X
} from 'lucide-react';
import {
  calculateQiblaDirection,
  calculateDistanceToKaaba,
  computeCompassHeading,
  getShortestAngleDiff,
  requestOrientationPermission
} from '@/services/qiblaService';
import { PRESET_CITIES, LocationCoords } from '@/services/prayerService';
import { IslamicPattern } from '@/components/common/IslamicPattern';

export const Qibla: React.FC = () => {
  const [currentCity, setCurrentCity] = useState<LocationCoords>(PRESET_CITIES[0]);
  const [qiblaAngle, setQiblaAngle] = useState<number>(0);
  const [distanceKm, setDistanceKm] = useState<number>(0);

  // Sensor state
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [smoothHeading, setSmoothHeading] = useState<number>(0);
  const [hasOrientation, setHasOrientation] = useState<boolean>(false);
  const [sensorError, setSensorError] = useState<string | null>(null);
  const [screenAngle, setScreenAngle] = useState<number>(0);
  const [isCalibrated, setIsCalibrated] = useState<boolean>(false);
  const [showCalibrationModal, setShowCalibrationModal] = useState<boolean>(false);

  // Manual fallback mode
  const [isManualMode, setIsManualMode] = useState<boolean>(false);
  const [manualFacingHeading, setManualFacingHeading] = useState<number>(0);

  const animFrameRef = useRef<number | null>(null);
  const targetHeadingRef = useRef<number>(0);
  const currentSmoothRef = useRef<number>(0);
  const sensorTimeoutRef = useRef<any>(null);

  // Calculate Great Circle Azimuth and Distance
  useEffect(() => {
    const angle = calculateQiblaDirection(currentCity.latitude, currentCity.longitude);
    const dist = calculateDistanceToKaaba(currentCity.latitude, currentCity.longitude);
    setQiblaAngle(Math.round(angle * 10) / 10);
    setDistanceKm(dist);
  }, [currentCity]);

  // Handle Screen Rotation (Portrait 0°, Landscape 90°/270°, Inverted 180°)
  useEffect(() => {
    const updateScreenAngle = () => {
      const angle = window.screen?.orientation?.angle ?? (window as any).orientation ?? 0;
      setScreenAngle(angle);
    };

    updateScreenAngle();

    if (window.screen?.orientation) {
      window.screen.orientation.addEventListener('change', updateScreenAngle);
    }
    window.addEventListener('orientationchange', updateScreenAngle);

    return () => {
      if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener('change', updateScreenAngle);
      }
      window.removeEventListener('orientationchange', updateScreenAngle);
    };
  }, []);

  // Smooth Compass Animation Loop (Avoids 360° flip-around jitter)
  useEffect(() => {
    const animate = () => {
      const target = isManualMode ? manualFacingHeading : targetHeadingRef.current;
      const current = currentSmoothRef.current;
      const diff = getShortestAngleDiff(target, current);

      // Low-pass filter smoothing (lerp factor 0.15 for smooth fluid motion)
      const step = diff * 0.15;
      const next = (current + step + 360) % 360;

      currentSmoothRef.current = next;
      setSmoothHeading(Math.round(next * 10) / 10);

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isManualMode, manualFacingHeading]);

  // Device Orientation Event Listeners
  useEffect(() => {
    let receivedEvent = false;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      receivedEvent = true;
      if (sensorTimeoutRef.current) clearTimeout(sensorTimeoutRef.current);

      const heading = computeCompassHeading(e, screenAngle);
      if (heading !== null) {
        setDeviceHeading(heading);
        targetHeadingRef.current = heading;
        setHasOrientation(true);
        setSensorError(null);
      }
    };

    // Prefer deviceorientationabsolute on Chrome Android, fallback to deviceorientation
    const hasAbsolute = 'ondeviceorientationabsolute' in window;
    if (hasAbsolute) {
      window.addEventListener('deviceorientationabsolute', handleOrientation as any, true);
    } else {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    // Set timeout to detect devices/browsers without orientation sensors (e.g. desktop)
    sensorTimeoutRef.current = setTimeout(() => {
      if (!receivedEvent) {
        setHasOrientation(false);
        setSensorError('Magnetometer hardware sensor not detected or disabled in your browser.');
      }
    }, 2000);

    return () => {
      if (hasAbsolute) {
        window.removeEventListener('deviceorientationabsolute', handleOrientation as any, true);
      } else {
        window.removeEventListener('deviceorientation', handleOrientation, true);
      }
      if (sensorTimeoutRef.current) clearTimeout(sensorTimeoutRef.current);
    };
  }, [screenAngle]);

  const enableCompassSensors = async () => {
    const granted = await requestOrientationPermission();
    if (granted) {
      setSensorError(null);
    } else {
      setSensorError('Orientation permission was denied. You can still use the Manual Compass mode.');
    }
  };

  // Needle relative rotation: when device points at Kaaba, needle points directly UP (0°)
  const effectiveHeading = isManualMode ? manualFacingHeading : smoothHeading;
  const needleRotation = (qiblaAngle - effectiveHeading + 360) % 360;
  const angularDiff = Math.abs(getShortestAngleDiff(qiblaAngle, effectiveHeading));
  const isAligned = angularDiff <= 3.5;

  // Gentle haptic feedback on perfect alignment
  useEffect(() => {
    if (isAligned && 'vibrate' in navigator) {
      try {
        navigator.vibrate(25);
      } catch {}
    }
  }, [isAligned]);

  return (
    <div className="pb-28 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-deen-forest dark:text-deen-ivory">
            Qibla Compass
          </h1>
          <p className="text-xs text-stone-500">Direction towards Kaaba (Makkah)</p>
        </div>

        {/* Location Dropdown */}
        <div className="flex items-center gap-1.5 bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 px-2.5 py-1.5 rounded-xl text-xs shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-deen-emerald shrink-0" />
          <select
            value={currentCity.city}
            onChange={(e) => {
              const found = PRESET_CITIES.find(c => c.city === e.target.value);
              if (found) setCurrentCity(found);
            }}
            className="bg-transparent text-deen-forest dark:text-deen-ivory font-medium focus:outline-none cursor-pointer text-xs"
          >
            {PRESET_CITIES.map(c => (
              <option key={c.city} value={c.city} className="bg-deen-charcoal text-white">
                {c.city} ({c.country})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Interactive Compass Dial Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-deen-forest via-deen-forest-light to-deen-emerald p-6 text-white text-center shadow-2xl border border-emerald-700/40">
        <IslamicPattern opacity={0.08} />

        {/* Top Status Bar: Mode, Sensor Calibration & iOS Permission */}
        <div className="relative z-10 flex items-center justify-between mb-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                hasOrientation && !isManualMode ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span className="text-[11px] text-emerald-200">
              {isManualMode
                ? 'Manual Compass Mode'
                : hasOrientation
                ? screenAngle !== 0
                  ? `Hardware Sensor (Landscape ${screenAngle}°)`
                  : 'Hardware Compass Active'
                : 'Sensor Awaiting Permission'}
            </span>
          </div>

          <button
            onClick={() => setShowCalibrationModal(true)}
            className="p-1 text-emerald-200 hover:text-white transition-colors"
            title="Calibration Help"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Alignment Pill */}
        <div className="relative z-10 mb-4">
          <span
            className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold transition-all ${
              isAligned
                ? 'bg-emerald-300 text-emerald-950 shadow-glow-emerald scale-105'
                : 'bg-black/30 text-emerald-100 border border-white/10'
            }`}
          >
            {isAligned
              ? '✓ Aligned with Kaaba (Makkah)'
              : `Turn ${Math.round(angularDiff)}° to align with Qibla`}
          </span>
        </div>

        {/* Compass Visual Dial */}
        <div className="relative w-64 h-64 mx-auto my-2 flex items-center justify-center">
          {/* Compass Outer Ring (Rotates opposite to device heading) */}
          <div
            className="absolute inset-0 rounded-full border-4 border-white/15 shadow-inner flex items-center justify-center"
            style={{ transform: `rotate(${-effectiveHeading}deg)` }}
          >
            {/* Cardinal Markers */}
            <span className="absolute top-2 font-bold text-xs text-rose-400 font-mono">N</span>
            <span className="absolute bottom-2 font-bold text-xs text-stone-300 font-mono">S</span>
            <span className="absolute left-2 font-bold text-xs text-stone-300 font-mono">W</span>
            <span className="absolute right-2 font-bold text-xs text-stone-300 font-mono">E</span>

            {/* Dial Ticks */}
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className={`absolute ${i % 6 === 0 ? 'w-0.5 h-3 bg-white/60' : 'w-0.5 h-1.5 bg-white/20'}`}
                style={{
                  top: '6px',
                  transformOrigin: '50% 120px',
                  transform: `rotate(${i * 15}deg)`
                }}
              />
            ))}
          </div>

          {/* Qibla Direction Indicator / Kaaba Icon Needle */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-75 ease-out"
            style={{ transform: `rotate(${needleRotation}deg)` }}
          >
            {/* Kaaba Marker */}
            <div className="flex flex-col items-center -translate-y-20">
              <div className="w-10 h-10 rounded-xl bg-deen-charcoal border-2 border-deen-gold flex items-center justify-center shadow-lg shadow-black/40">
                {/* Kaaba Representation */}
                <div className="w-5 h-5 bg-black border border-deen-gold-accent rounded-sm flex flex-col justify-start items-center">
                  <div className="w-full h-1 bg-deen-gold" />
                </div>
              </div>
              <div className="w-0.5 h-10 bg-gradient-to-t from-transparent via-deen-gold to-deen-gold-light mt-1" />
            </div>
          </div>

          {/* Center Hub */}
          <div className="w-8 h-8 rounded-full bg-deen-gold border-2 border-white flex items-center justify-center shadow-md shadow-deen-gold/50 z-10">
            <div className="w-2.5 h-2.5 rounded-full bg-deen-forest" />
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-xs text-emerald-100">
          <div>
            <span className="text-[10px] uppercase text-emerald-300 block">Distance</span>
            <span className="text-sm font-bold font-mono text-deen-gold-accent">
              {distanceKm.toLocaleString()} km
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase text-emerald-300 block">Qibla Angle</span>
            <span className="text-sm font-bold font-mono text-white">
              {qiblaAngle}°
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase text-emerald-300 block">Phone Facing</span>
            <span className="text-sm font-bold font-mono text-emerald-200">
              {Math.round(effectiveHeading)}°
            </span>
          </div>
        </div>
      </div>

      {/* Manual Compass Controls / Sensor Fallback Toggle */}
      <div className="bg-white dark:bg-deen-charcoal-card rounded-2xl p-4 border border-emerald-900/10 dark:border-emerald-800/20 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-deen-emerald" />
            <span className="text-xs font-bold text-deen-forest dark:text-deen-ivory">
              Compass Mode
            </span>
          </div>

          <div className="flex gap-1.5">
            <button
              onClick={() => setIsManualMode(false)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                !isManualMode
                  ? 'bg-deen-emerald text-white'
                  : 'bg-stone-100 dark:bg-deen-charcoal text-stone-600 dark:text-stone-300'
              }`}
            >
              Sensor
            </button>
            <button
              onClick={() => setIsManualMode(true)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                isManualMode
                  ? 'bg-deen-emerald text-white'
                  : 'bg-stone-100 dark:bg-deen-charcoal text-stone-600 dark:text-stone-300'
              }`}
            >
              Manual Dial
            </button>
          </div>
        </div>

        {/* Manual Dial Slider when in Manual Mode */}
        {isManualMode ? (
          <div className="space-y-2 pt-1">
            <div className="flex justify-between text-xs text-stone-500">
              <span>Adjust Facing Direction:</span>
              <span className="font-mono font-bold text-deen-emerald">{manualFacingHeading}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="359"
              value={manualFacingHeading}
              onChange={(e) => setManualFacingHeading(Number(e.target.value))}
              className="w-full accent-deen-emerald cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-stone-400">
              <span>0° (North)</span>
              <span>90° (East)</span>
              <span>180° (South)</span>
              <span>270° (West)</span>
            </div>
          </div>
        ) : !hasOrientation && (
          <div className="space-y-2">
            <p className="text-[11px] text-stone-500 dark:text-stone-400">
              If your phone's sensor is not rotating, tap below to grant orientation access or switch to the Manual Dial.
            </p>
            <div className="flex gap-2">
              <button
                onClick={enableCompassSensors}
                className="flex-1 py-2 rounded-xl bg-deen-emerald text-white text-xs font-semibold hover:bg-deen-emerald-light transition-colors flex items-center justify-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Grant Sensor Access</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Calibration Guidance Modal */}
      {showCalibrationModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-deen-charcoal rounded-3xl p-5 space-y-3.5 shadow-2xl text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
              <h3 className="font-bold text-sm text-deen-forest dark:text-deen-ivory flex items-center gap-1.5">
                <RotateCw className="w-4 h-4 text-deen-emerald" />
                Compass Calibration Guide
              </h3>
              <button
                onClick={() => setShowCalibrationModal(false)}
                className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-stone-600 dark:text-stone-300 leading-relaxed">
              <div className="p-3 rounded-2xl bg-stone-50 dark:bg-deen-charcoal-card border border-stone-200 dark:border-stone-800 space-y-1">
                <h4 className="font-bold text-deen-forest dark:text-deen-ivory">1. The Figure-8 Motion</h4>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  Hold your phone flat and gently wave it in a figure-8 motion in the air 3 to 4 times to recalibrate the magnetometer.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-stone-50 dark:bg-deen-charcoal-card border border-stone-200 dark:border-stone-800 space-y-1">
                <h4 className="font-bold text-deen-forest dark:text-deen-ivory">2. Avoid Magnetic Interference</h4>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  Keep away from magnetic phone cases, laptops, steel desks, or speakers which distort magnetic field readings.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-stone-50 dark:bg-deen-charcoal-card border border-stone-200 dark:border-stone-800 space-y-1">
                <h4 className="font-bold text-deen-forest dark:text-deen-ivory">3. Landscape & Portrait Support</h4>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  DEEN automatically detects screen orientation ({screenAngle}°) and calculates 3D tilt compensation so you can use it in landscape or portrait.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowCalibrationModal(false)}
              className="w-full py-2.5 rounded-xl bg-deen-emerald text-white font-semibold text-xs mt-2"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
