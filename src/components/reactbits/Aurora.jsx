import { useEffect, useRef } from 'react';
import './Aurora.css';

/**
 * Aurora background effect — adapted from React Bits
 * Renders animated gradient aurora lights
 */
export default function Aurora({ 
  colorOne = 'hsla(340, 80%, 85%, 0.3)',
  colorTwo = 'hsla(270, 40%, 70%, 0.25)',
  colorThree = 'hsla(30, 70%, 50%, 0.2)',
  speed = 1,
  blur = 80,
  opacity = 0.6,
  className = '',
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.style.setProperty('--aurora-speed', `${12 / speed}s`);
      container.style.setProperty('--aurora-blur', `${blur}px`);
      container.style.setProperty('--aurora-opacity', opacity);
      container.style.setProperty('--aurora-color-1', colorOne);
      container.style.setProperty('--aurora-color-2', colorTwo);
      container.style.setProperty('--aurora-color-3', colorThree);
    }
  }, [colorOne, colorTwo, colorThree, speed, blur, opacity]);

  return (
    <div ref={containerRef} className={`aurora-container ${className}`}>
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      <div className="aurora-noise" />
    </div>
  );
}
