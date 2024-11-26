'use client';

import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import styles from '../../styles/Carousel/slider.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PrevArrow from '../Common/Arrows/PrevArrow';
import NextArrow from '../Common/Arrows/NextArrow';
import Skeleton from '../Common/Skeleton/Skeleton';
import SlideItem from './SlideItem/SlideItem';
import CustomDots from '../Common/Dots/CustomDots';

interface Slide {
  title: string;
  category: string;
  date: string;
  img: string;
}

const SampleSlider: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const sliderRef = useRef<Slider>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch('/mockData/mockCarouselData.json');
        if (!response.ok) throw new Error('Network response was not ok');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data: Slide[] = await response.json();
        setSlides(data);
      } catch (error) {
        console.error('Error fetching slides:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSlides();
  }, []);

  const totalDots = Math.ceil(slides.length / 3);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    rows: 1,
    slidesPerRow: 1,
    lazyLoad: 'ondemand' as const,
    arrows: !isLoading,
    prevArrow: !isLoading ? <PrevArrow /> : null,
    nextArrow: !isLoading ? <NextArrow /> : null,
    responsive: [
      {
        breakpoint: 1440,
        settings: { slidesToShow: 3, slidesToScroll: 3 },
      },
      {
        breakpoint: 1200,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
    afterChange: (currentSlide: number) => handleAfterChange(currentSlide),
  };

  const handleDotClick = (dotIndex: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(
        dotIndex * (settings.slidesToScroll as number)
      );
      setCurrentPage(dotIndex);
    }
  };

  const handleAfterChange = (currentSlide: number) => {
    const newPage = Math.floor(
      currentSlide / (settings.slidesToScroll as number)
    );
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  };

  const renderSlides = () => {
    if (isLoading) {
      return Array.from({ length: settings.slidesToShow }).map((_, index) => (
        <div key={index} className={styles.slideWrapper}>
          <div className={styles.slide}>
            <div className={styles.slideInner}>
              <div className={styles.imageContainer}>
                <Skeleton
                  height="100%"
                  width="100%"
                  borderRadius="0.3125rem"
                  isImage
                />
              </div>
              <div className={styles.slideContent}>
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
              </div>
            </div>
          </div>
        </div>
      ));
    }

    return slides.map((slide, index) => (
      <SlideItem key={index} slide={slide} />
    ));
  };

  return (
    <div className={styles.sliderContainer}>
      <h2 className={styles.title}>Your Learning Plan</h2>
      <p className={styles.subTitle}>
        {isLoading
          ? 'Loading...'
          : `You have ${slides.length} pending assignments`}
      </p>
      <Slider {...settings} ref={sliderRef}>
        {renderSlides()}
      </Slider>
      {!isLoading && (
        <CustomDots
          totalDots={totalDots}
          currentPage={currentPage}
          onDotClick={handleDotClick}
        />
      )}
      <a href="#" className={styles.viewAllAssignments}>
        View all assignments
      </a>
    </div>
  );
};

export default SampleSlider;
