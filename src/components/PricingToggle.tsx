'use client';

import { useEffect, useRef, useState } from 'react';

interface PricingToggleProps {
  defaultToggle?: 'monthly' | 'yearly';
}

export function usePricingToggle(defaultToggle: 'monthly' | 'yearly' = 'monthly') {
  const [currentToggle, setCurrentToggle] = useState(defaultToggle);
  const toggleMarkerRef = useRef<HTMLDivElement>(null);

  const handleToggleClick = (target: 'monthly' | 'yearly') => {
    if (currentToggle === target) return;

    const toggleMarker = toggleMarkerRef.current;
    if (!toggleMarker) return;

    // Find the target toggle element
    const targetToggle = document.querySelector(`[data-pricing-toggle="${target}"]`) as HTMLElement;
    if (!targetToggle) return;

    // Animate the toggle marker
    const targetToggleRect = targetToggle.getBoundingClientRect();
    const markerRect = toggleMarker.getBoundingClientRect();
    const translateX = targetToggleRect.left < markerRect.left ? targetToggleRect.left - markerRect.left : 0;

    toggleMarker.animate(
      [
        { transform: `translateX(${translateX}px)` }
      ],
      {
        duration: 300,
        easing: 'ease-in-out',
        fill: 'forwards'
      }
    );

    // Update pricing content
    document.querySelectorAll(`[data-pricing-${target}]`).forEach(targetElement => {
      const content = targetElement.getAttribute(`data-pricing-${target}`);
      if (content) {
        targetElement.innerHTML = content;
      }
    });

    setCurrentToggle(target);
  };

  return {
    currentToggle,
    handleToggleClick,
    toggleMarkerRef
  };
}

interface PricingToggleComponentProps {
  defaultToggle?: 'monthly' | 'yearly';
  className?: string;
}

export default function PricingToggle({ 
  defaultToggle = 'monthly', 
  className = '' 
}: PricingToggleComponentProps) {
  const { currentToggle, handleToggleClick, toggleMarkerRef } = usePricingToggle(defaultToggle);

  return (
    <div className={`pricing-toggle ${className}`}>
      <button 
        className={`toggle-option ${currentToggle === 'monthly' ? 'active' : ''}`}
        data-pricing-toggle="monthly"
        onClick={() => handleToggleClick('monthly')}
      >
        Monthly
      </button>
      <button 
        className={`toggle-option ${currentToggle === 'yearly' ? 'active' : ''}`}
        data-pricing-toggle="yearly"
        onClick={() => handleToggleClick('yearly')}
      >
        Yearly
      </button>
      <div 
        ref={toggleMarkerRef}
        className="toggle-marker"
        data-pricing-toggle-marker
        data-pricing-current={currentToggle}
      />
    </div>
  );
}
