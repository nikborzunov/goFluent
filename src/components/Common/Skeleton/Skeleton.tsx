import React from 'react';
import styles from './skeleton.module.css';

interface SkeletonProps {
  height: number | string;
  width: number | string;
  borderRadius?: string;
  style?: React.CSSProperties;
  isImage?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  height,
  width,
  borderRadius,
  style,
  isImage = false,
}) => {
  const className = isImage
    ? `${styles.skeleton} ${styles.imageSkeleton}`
    : styles.skeleton;

  return (
    <div
      className={className}
      style={{
        height: typeof height === 'number' ? `${height}px` : height,
        width: typeof width === 'number' ? `${width}px` : width,
        borderRadius: borderRadius || '4px',
        ...style,
      }}
    />
  );
};

export default Skeleton;
