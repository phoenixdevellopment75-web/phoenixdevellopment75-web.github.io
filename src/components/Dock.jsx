import React, { useState, useRef, useEffect } from 'react';
import './Dock.css';

/**
 * DockItem — Individual item with proximity-based magnification
 */
const DockItem = ({ item, mouseX, maxScale, distance }) => {
  const itemRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (mouseX === null || !itemRef.current) {
      setScale(1);
      return;
    }

    const rect = itemRef.current.getBoundingClientRect();
    const itemCenterX = rect.left + rect.width / 2;
    const dist = Math.abs(mouseX - itemCenterX);

    if (dist < distance) {
      const newScale = 1 + (maxScale - 1) * (1 - dist / distance);
      setScale(newScale);
    } else {
      setScale(1);
    }
  }, [mouseX, maxScale, distance]);

  const Tag = item.href ? 'a' : 'button';
  const linkProps = item.href
    ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
    : { onClick: item.onClick };

  return (
    <div className="dock-item-wrapper">
      <div className="dock-tooltip">{item.label}</div>
      <Tag
        ref={itemRef}
        className="dock-item"
        style={{
          transform: `scale(${scale})`,
          margin: `0 ${8 * (scale - 1)}px`
        }}
        {...linkProps}
        aria-label={item.label}
      >
        {item.icon}
      </Tag>
    </div>
  );
};

/**
 * Dock — macOS-style magnification dock
 * Inspired by reactbits.dev/components/dock
 */
const Dock = ({
  items = [],
  maxScale = 2,
  distance = 120,
  className = ''
}) => {
  const [mouseX, setMouseX] = useState(null);

  return (
    <div
      className={`dock-container ${className}`}
      onMouseMove={(e) => setMouseX(e.clientX)}
      onMouseLeave={() => setMouseX(null)}
    >
      {items.map((item, index) => (
        <DockItem
          key={index}
          item={item}
          mouseX={mouseX}
          maxScale={maxScale}
          distance={distance}
        />
      ))}
    </div>
  );
};

export default Dock;
