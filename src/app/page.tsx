'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import Slider from '@/components/Carousel/Slider';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import Calendar from '@/components/Calendar/Calendar';

export default function Home() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleToggleCalendar = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  return (
    <Provider store={store}>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1 className={styles.title}>Your Learning Plan</h1>
          <button
            onClick={handleToggleCalendar}
            className={styles.toggleButton}
          >
            {isCalendarOpen ? 'Close Calendar' : 'Open Calendar'}
          </button>
          <p>Manage your classes and schedule.</p>
        </main>
        <div className={styles.sliderContainer}>
          <Slider />
        </div>
        <footer className={styles.footer}>
          <a
            href="https://nextjs.org/learn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more..
          </a>
        </footer>
        <Calendar isOpen={isCalendarOpen} onClose={handleToggleCalendar} />
      </div>
    </Provider>
  );
}
