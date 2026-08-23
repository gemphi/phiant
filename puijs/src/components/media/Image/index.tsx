import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  aspect?: 'square' | 'video' | 'auto';
  className?: string;
};

export const Image = ({ src, alt, aspect = 'auto', className = '', ...props }: ImageProps) => {
  return <img src={src} alt={alt} className={cn(styles.image, styles[aspect], className)} {...props} />;
};
