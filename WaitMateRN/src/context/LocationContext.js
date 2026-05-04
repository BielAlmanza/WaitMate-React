import React, { createContext, useState, useCallback } from 'react';

export const LocationContext = createContext(null);

export function LocationProvider({ children }) {
  const [userLocation, setUserLocation] = useState(null);

  const updateLocation = useCallback((lat, lng) => {
    setUserLocation({ lat, lng });
  }, []);

  return (
    <LocationContext.Provider value={{ userLocation, updateLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const ctx = React.useContext(LocationContext);
  if (!ctx) throw new Error('useLocation must be used within LocationProvider');
  return ctx;
}
