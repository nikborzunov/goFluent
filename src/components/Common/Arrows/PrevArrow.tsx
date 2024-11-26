'use client';

import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import styles from '../../../styles/Carousel/PrevArrow.module.css';

interface ArrowProps {
  onClick?: () => void;
}

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    className={`${styles.arrow} ${styles.prev}`}
    onClick={onClick}
    aria-label="Previous Slide"
  >
    <FaChevronLeft />
  </button>
);

export default PrevArrow;
