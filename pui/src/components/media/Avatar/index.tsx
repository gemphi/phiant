import React from 'react';
import { cn } from '../../../utils/cn';
import { Span } from '../../primitives/Span';
import { Stack } from '../../layout/Stack';
import styles from './styles.module.scss';

type AvatarProps = {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export const Avatar = ({ src, alt = '', initials, size = 'md', className = '' }: AvatarProps) => {
  return (
    <Stack direction="row" align="center" justify="center" className={cn(styles.avatar, styles[size], className)} aria-label={alt || initials}>
      {src ? (
        <img src={src} alt={alt} className={styles.image} />
      ) : (
        <Span className={styles.initials}>{initials}</Span>
      )}
    </Stack>
  );
};
