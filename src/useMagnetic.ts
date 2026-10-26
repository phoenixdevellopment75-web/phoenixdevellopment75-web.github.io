import { useEffect, useRef } from 'react';

export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const move = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      const bounds = element.getBoundingClientRect();
      const x = (event.clientX - bounds.left - bounds.width / 2) * 0.14;
      const y = (event.clientY - bounds.top - bounds.height / 2) * 0.14;
      element.style.setProperty('--mag-x', `${x.toFixed(2)}px`);
      element.style.setProperty('--mag-y', `${y.toFixed(2)}px`);
    };
    const reset = () => {
      element.style.setProperty('--mag-x', '0px');
      element.style.setProperty('--mag-y', '0px');
    };

    element.addEventListener('pointermove', move);
    element.addEventListener('pointerleave', reset);
    return () => {
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerleave', reset);
    };
  }, []);

  return ref;
}
