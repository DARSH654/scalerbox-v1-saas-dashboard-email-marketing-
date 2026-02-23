
'use client';

import React from 'react';

interface AnimatedMailProps {
  onClick: () => void;
}

export function AnimatedMail({ onClick }: AnimatedMailProps) {
  return (
    <div className="letter-image" onClick={onClick}>
      <div className="animated-mail">
        <div className="back-fold"></div>
        <div className="letter">
          <div className="letter-border"></div>
          <div className="letter-title"></div>
          <div className="letter-context"></div>
          <div className="letter-stamp">
            <div className="letter-stamp-inner"></div>
          </div>
        </div>
        <div className="top-fold"></div>
        <div className="body"></div>
        <div className="left-fold"></div>
      </div>
      <div className="shadow"></div>
    </div>
  );
}
