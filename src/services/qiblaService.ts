// ==============================================================================
// DEEN — Qibla Direction & Geodesic Calculation Service
// Great Circle Spherical Trigonometry to Kaaba (Makkah, Saudi Arabia)
// ==============================================================================

import { QiblaCompassData } from '@/types';

// Precise Coordinates of Holy Kaaba in Makkah al-Mukarramah
export const KAABA_COORDS = {
  latitude: 21.422487,
  longitude: 39.826206
};

/**
 * Calculates bearing from observer to Kaaba using Great Circle Forward Azimuth
 * Returns angle in degrees (0° - 360° clockwise from True North)
 */
export function calculateQiblaDirection(latitude: number, longitude: number): number {
  const phi1 = (latitude * Math.PI) / 180;
  const lambda1 = (longitude * Math.PI) / 180;
  const phi2 = (KAABA_COORDS.latitude * Math.PI) / 180;
  const lambda2 = (KAABA_COORDS.longitude * Math.PI) / 180;

  const deltaLambda = lambda2 - lambda1;

  const y = Math.sin(deltaLambda);
  const x = Math.cos(phi1) * Math.tan(phi2) - Math.sin(phi1) * Math.cos(deltaLambda);

  let qiblaRad = Math.atan2(y, x);
  let qiblaDeg = (qiblaRad * 180) / Math.PI;

  return (qiblaDeg + 360) % 360;
}

/**
 * Calculates distance from observer to Kaaba in kilometers using Haversine formula
 */
export function calculateDistanceToKaaba(latitude: number, longitude: number): number {
  const R = 6371; // Earth's mean radius in km
  const dLat = ((KAABA_COORDS.latitude - latitude) * Math.PI) / 180;
  const dLon = ((KAABA_COORDS.longitude - longitude) * Math.PI) / 180;

  const lat1 = (latitude * Math.PI) / 180;
  const lat2 = (KAABA_COORDS.latitude * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Complete Qibla calculation summary
 */
export function getQiblaCompassData(latitude: number, longitude: number, city?: string): QiblaCompassData {
  return {
    directionDegrees: Math.round(calculateQiblaDirection(latitude, longitude) * 10) / 10,
    distanceKm: calculateDistanceToKaaba(latitude, longitude),
    currentLatitude: latitude,
    currentLongitude: longitude,
    city
  };
}

/**
 * Request device orientation permission for modern iOS Safari
 */
export async function requestOrientationPermission(): Promise<boolean> {
  if (
    typeof DeviceOrientationEvent !== 'undefined' &&
    typeof (DeviceOrientationEvent as any).requestPermission === 'function'
  ) {
    try {
      const response = await (DeviceOrientationEvent as any).requestPermission();
      return response === 'granted';
    } catch (e) {
      console.warn('Orientation permission denied:', e);
      return false;
    }
  }
  return true; // Non-iOS or older Android doesn't require explicit prompt
}
