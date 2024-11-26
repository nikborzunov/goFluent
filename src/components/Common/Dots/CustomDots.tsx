'use client';

import React from 'react';
import styles from '../../../styles/Carousel/CustomDots.module.css';

interface CustomDotsProps {
  totalDots: number;
  currentPage: number;
  onDotClick: (index: number) => void;
}

const CustomDots: React.FC<CustomDotsProps> = ({
  totalDots,
  currentPage,
  onDotClick,
}) => (
  <div className={styles.customDotsContainer}>
    {Array.from({ length: totalDots }).map((_, index) => (
      <button
        key={index}
        className={`${styles.customDot} ${currentPage === index ? styles.activeDot : ''}`}
        onClick={() => onDotClick(index)}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>
);

export default CustomDots;
