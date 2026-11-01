// ==============================================================================
// DEEN — Qibla Direction & Geodesic Calculation Service
// Great Circle Spherical Trigonometry to Kaaba (Makkah, Saudi Arabia)
// 3D Euler Tilt Compensation, Landscape/Portrait Screen Rotation Handling
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
 * Compute real-time device heading relative to True/Magnetic North
 * Corrects for:
 * 1. Screen orientation angle (portrait 0°, landscape 90°, 270°, portrait-inverted 180°)
 * 2. 3D tilt compensation (pitch beta and roll gamma)
 * 3. iOS Safari webkitCompassHeading
 * 4. Android deviceorientationabsolute vs deviceorientation
 */
export function computeCompassHeading(
  event: DeviceOrientationEvent,
  screenAngle: number = 0
): number | null {
  // Case A: iOS Safari provides webkitCompassHeading directly relative to North
  if (typeof (event as any).webkitCompassHeading === 'number') {
    let heading = (event as any).webkitCompassHeading;
    if (heading < 0) heading += 360;
    // On iOS, webkitCompassHeading represents the heading of the top of the physical device
    // Adjust by screen rotation angle for landscape
    const adjustedHeading = (heading + screenAngle) % 360;
    return Math.round(adjustedHeading * 10) / 10;
  }

  // Case B: Standard DeviceOrientation (alpha, beta, gamma)
  if (event.alpha === null) {
    return null;
  }

  const alpha = (event.alpha || 0) * (Math.PI / 180);
  const beta = (event.beta || 0) * (Math.PI / 180);
  const gamma = (event.gamma || 0) * (Math.PI / 180);

  // Tait-Bryan angles rotation matrix to determine heading of phone's top (+Y)
  // X and Y components projected onto the horizontal earth plane
  const cA = Math.cos(alpha);
  const sA = Math.sin(alpha);
  const cB = Math.cos(beta);
  const sB = Math.sin(beta);
  const cG = Math.cos(gamma);
  const sG = Math.sin(gamma);

  const Vx = -cA * sG - sA * sB * cG;
  const Vy = -sA * sG + cA * sB * cG;

  let headingDeg: number;
  // If phone is flat on table (beta and gamma close to 0), use direct alpha
  if (Math.abs(event.beta || 0) < 15 && Math.abs(event.gamma || 0) < 15) {
    headingDeg = 360 - (event.alpha || 0);
  } else {
    let headingRad = Math.atan2(Vy, Vx);
    headingDeg = (headingRad * 180) / Math.PI;
    if (headingDeg < 0) headingDeg += 360;
  }

  // Adjust for screen orientation angle (e.g. landscape 90° or 270°)
  let finalHeading = (headingDeg + screenAngle) % 360;
  if (finalHeading < 0) finalHeading += 360;

  return Math.round(finalHeading * 10) / 10;
}

/**
 * Calculates shortest angular difference between target angle and current angle
 * Prevents needle from spinning 360 degrees when crossing 0° / 360° boundary
 */
export function getShortestAngleDiff(target: number, current: number): number {
  return ((target - current + 540) % 360) - 180;
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
  return true;
}
