// ==============================================================================
// DEEN — Qibla Direction & Interactive Compass Page
// Great Circle Trigonometry directly toward the Holy Kaaba (Makkah)
// ==============================================================================

import React, { useState, useEffect } from 'react';
import { Compass, MapPin, RefreshCw, AlertCircle, ShieldCheck } from 'lucide-react';
import {
  calculateQiblaDirection,
  calculateDistanceToKaaba,
  requestOrientationPermission,
  KAABA_COORDS
} from '@/services/qiblaService';
import { PRESET_CITIES, LocationCoords } from '@/services/prayerService';
import { IslamicPattern } from '@/components/common/IslamicPattern';

export const Qibla: React.FC = () => {
  const [currentCity, setCurrentCity] = useState<LocationCoords>(PRESET_CITIES[0]);
  const [compassHeading, setCompassHeading] = useState<number>(0);
  const [qiblaAngle, setQiblaAngle] = useState<number>(0);
  const [distanceKm, setDistanceKm] = useState<number>(0);
  const [hasOrientation, setHasOrientation] = useState<boolean>(false);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  useEffect(() => {
    const angle = calculateQiblaDirection(currentCity.latitude, currentCity.longitude);
    const dist = calculateDistanceToKaaba(currentCity.latitude, currentCity.longitude);
    setQiblaAngle(Math.round(angle * 10) / 10);
    setDistanceKm(dist);
  }, [currentCity]);

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      let heading = 0;
      if ((e as any).webkitCompassHeading) {
        // iOS Safari uses webkitCompassHeading directly relative to magnetic North
        heading = (e as any).webkitCompassHeading;
      } else if (e.alpha !== null) {
        // Standard Android DeviceOrientation
        heading = 360 - e.alpha;
      }
      setCompassHeading(Math.round(heading));
      setHasOrientation(true);
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  const enableCompassSensors = async () => {
    const granted = await requestOrientationPermission();
    setPermissionGranted(granted);
  };

  // Difference between current device heading and Qibla angle
  // When device points straight at Kaaba, needle aligns to top (0)
  const needleRotation = (qiblaAngle - compassHeading + 360) % 360;
  const isAligned = Math.abs(needleRotation) < 4 || Math.abs(needleRotation - 360) < 4;

  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-deen-forest dark:text-deen-ivory">
            Qibla Compass
          </h1>
          <p className="text-xs text-stone-500">Direction towards Kaaba (Makkah)</p>
        </div>

        {/* Location Dropdown */}
        <div className="flex items-center gap-1.5 bg-white dark:bg-deen-charcoal-card border border-emerald-900/10 dark:border-emerald-800/20 px-2.5 py-1.5 rounded-xl text-xs">
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
                {c.city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Interactive Compass Dial Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-deen-forest via-deen-forest-light to-deen-emerald p-6 text-white text-center shadow-2xl border border-emerald-700/40">
        <IslamicPattern opacity={0.08} />

        {/* Sensor Enable Button for iOS */}
        {!hasOrientation && (
          <button
            onClick={enableCompassSensors}
            className="mb-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-deen-gold/20 text-deen-gold-accent border border-deen-gold/30 text-xs font-semibold hover:bg-deen-gold/30 transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            Enable Motion Sensors
          </button>
        )}

        {/* Dynamic Alignment Pill */}
        <div className="mb-4">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-bold transition-colors ${
              isAligned
                ? 'bg-emerald-400 text-emerald-950 shadow-glow-emerald animate-pulse'
                : 'bg-black/30 text-emerald-200 border border-white/10'
            }`}
          >
            {isAligned ? '✓ Facing Kaaba' : `${Math.round(qiblaAngle)}° from True North`}
          </span>
        </div>

        {/* Compass Visual Dial */}
        <div className="relative w-64 h-64 mx-auto my-3 flex items-center justify-center">
          {/* Compass Outer Ring (Rotates with device heading if sensor active) */}
          <div
            className="absolute inset-0 rounded-full border-4 border-white/10 shadow-inner flex items-center justify-center transition-transform duration-100 ease-out"
            style={{ transform: `rotate(${-compassHeading}deg)` }}
          >
            {/* Cardinal Markers */}
            <span className="absolute top-2 font-bold text-xs text-red-400">N</span>
            <span className="absolute bottom-2 font-bold text-xs text-stone-400">S</span>
            <span className="absolute left-2 font-bold text-xs text-stone-400">W</span>
            <span className="absolute right-2 font-bold text-xs text-stone-400">E</span>

            {/* Dial Ticks */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-2 bg-white/20"
                style={{
                  top: '6px',
                  transformOrigin: '50% 120px',
                  transform: `rotate(${i * 30}deg)`
                }}
              />
            ))}
          </div>

          {/* Qibla Direction Indicator / Kaaba Icon */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-150 ease-out"
            style={{ transform: `rotate(${needleRotation}deg)` }}
          >
            {/* Kaaba Direction Arrow */}
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

        {/* Distance & Coordinates Info */}
        <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-xs text-emerald-100">
          <div>
            <span className="text-[10px] uppercase text-emerald-300 block">Distance to Makkah</span>
            <span className="text-base font-bold font-mono text-deen-gold-accent">
              {distanceKm.toLocaleString()} km
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-emerald-300 block">Qibla Heading</span>
            <span className="text-base font-bold font-mono text-white">
              {qiblaAngle}°
            </span>
          </div>
        </div>
      </div>

      {/* Calibration Tips Card */}
      <div className="bg-white dark:bg-deen-charcoal-card rounded-2xl p-4 border border-emerald-900/10 dark:border-emerald-800/20 text-xs space-y-2">
        <h3 className="font-bold text-deen-forest dark:text-deen-ivory flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-deen-emerald" />
          Compass Calibration & Accuracy
        </h3>
        <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
          For the most accurate heading, hold your device horizontally flat and move it in a figure-8 motion away from metal cases, laptops, or strong magnetic fields.
        </p>
      </div>
    </div>
  );
};
