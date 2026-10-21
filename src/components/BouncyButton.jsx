import React from 'react';
import './BouncyButton.css';

export default function BouncyButton({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'glass' | 'pill'
  as: Component = 'button',
  className = '',
  ...props
}) {
  return (
    <Component
      className={`bouncy-btn bouncy-btn-${variant} ${className}`}
      {...props}
    >
      <span className="bouncy-btn-inner">
        {children}
      </span>
    </Component>
  );
}
