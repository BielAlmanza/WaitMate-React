import React, { createContext, useState, useCallback } from 'react';

export const BadgeContext = createContext(null);

export function BadgeProvider({ children }) {
  const [messageBadge, setMessageBadge] = useState(0);

  const incrementMessageBadge = useCallback(() => {
    setMessageBadge((prev) => prev + 1);
  }, []);

  const clearMessageBadge = useCallback(() => {
    setMessageBadge(0);
  }, []);

  const setMessageBadgeCount = useCallback((count) => {
    setMessageBadge(count);
  }, []);

  return (
    <BadgeContext.Provider
      value={{ messageBadge, incrementMessageBadge, clearMessageBadge, setMessageBadgeCount }}
    >
      {children}
    </BadgeContext.Provider>
  );
}
