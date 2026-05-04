import { useState, useCallback } from 'react';

export function useTripDurations(waypoints = []) {
  const [durations, setDurations] = useState([]);
  const [loading, setLoading] = useState(false);

  const calculate = useCallback(async () => {
    if (waypoints.length < 2) return;
    setLoading(true);
    try {
      // Replace with real routing API call (e.g. OSRM or Google Directions)
      const mockDurations = waypoints.slice(1).map((_, i) => ({
        from: waypoints[i],
        to: waypoints[i + 1],
        minutes: Math.floor(Math.random() * 30) + 10,
      }));
      setDurations(mockDurations);
    } finally {
      setLoading(false);
    }
  }, [waypoints]);

  return { durations, loading, calculate };
}
