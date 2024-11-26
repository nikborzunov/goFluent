'use client';

import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import styles from '../../../styles/Carousel/NextArrow.module.css';

interface ArrowProps {
  onClick?: () => void;
}

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    className={`${styles.arrow} ${styles.next}`}
    onClick={onClick}
    aria-label="Next Slide"
  >
    <FaChevronRight />
  </button>
);

export default NextArrow;
