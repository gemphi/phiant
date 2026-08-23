import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

type DividerProps = React.HTMLAttributes<HTMLHRElement> & {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
};

export const Divider = ({ orientation = 'horizontal', className = '', ...props }: DividerProps) => {
  return <hr className={cn(styles.divider, styles[orientation], className)} {...props} />;
};
