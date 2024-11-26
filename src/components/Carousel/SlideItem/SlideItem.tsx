'use client';

import React, { useState } from 'react';
import styles from '../../../styles/Carousel/SlideItem.module.css';
import Skeleton from '@/components/Common/Skeleton/Skeleton';

interface Slide {
  title: string;
  category: string;
  date: string;
  img: string;
}

interface SlideItemProps {
  slide: Slide;
}

const SlideItem: React.FC<SlideItemProps> = ({ slide }) => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  return (
    <div className={styles.slideWrapper}>
      <div className={styles.slide}>
        <div className={styles.slideInner}>
          <div className={styles.imageContainer}>
            {!isImageLoaded && (
              <Skeleton
                height="100%"
                width="100%"
                borderRadius="0.3125rem"
                isImage
              />
            )}
            <img
              src={slide.img}
              alt={slide.title}
              className={styles.slideImage}
              onLoad={() => setIsImageLoaded(true)}
              style={isImageLoaded ? {} : { display: 'none' }}
            />
          </div>
          <div className={styles.slideContent}>
            {!isImageLoaded ? (
              <>
                <Skeleton
                  height="1.25rem"
                  width="80%"
                  style={{ marginBottom: '0.625rem' }}
                  borderRadius="0.25rem"
                />
                <Skeleton
                  height="1.125rem"
                  width="60%"
                  style={{ marginBottom: '0.5rem' }}
                  borderRadius="0.25rem"
                />
                <Skeleton
                  height="0.938rem"
                  width="40%"
                  borderRadius="0.25rem"
                />
              </>
            ) : (
              <>
                <span className={`${styles.text}`}>{slide.category}</span>
                <h3 className={`${styles.slideTitle}`}>{slide.title}</h3>
                <p className={`${styles.slideDate}`}>{slide.date}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideItem;
