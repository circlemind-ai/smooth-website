'use client';

import { useEffect, useRef } from 'react';

export function useMobileNavigation() {
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const navigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mobileToggle = mobileToggleRef.current;
    const navigation = navigationRef.current;

    if (!mobileToggle || !navigation) return;

    const handleToggleClick = () => {
      navigation.classList.toggle("open");
      mobileToggle.classList.toggle("active");
    };

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!mobileToggle.contains(target) && !navigation.contains(target)) {
        navigation.classList.remove("open");
        mobileToggle.classList.remove("active");
      }
    };

    mobileToggle.addEventListener("click", handleToggleClick);
    document.documentElement.addEventListener("click", handleDocumentClick);

    // Cleanup
    return () => {
      mobileToggle.removeEventListener("click", handleToggleClick);
      document.documentElement.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return {
    mobileToggleRef,
    navigationRef
  };
}
