import React from 'react';
import './StarBorder.css';

const StarBorder = ({
  children,
  as: Component = 'button',
  color = '#9DC183',
  speed = '6s',
  className = '',
  ...rest
}) => {
  return (
    <Component 
      className={`star-border-container ${className}`} 
      style={{
        '--star-color': color,
        '--star-speed': speed
      }}
      {...rest}
    >
      <div className="star-border-border"></div>
      <div className="star-border-content">
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
