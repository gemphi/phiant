import React from 'react';
import { ProductCard, ProductCardProps } from '../ProductCard';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

export interface ProductGridProps {
  products: Array<ProductCardProps>;
  loading?: boolean;
  skeletonCount?: number;
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  skeletonCount = 4,
  className,
}) => {
  if (loading) {
    return (
      <div className={cn(styles.grid, className)}>
        {Array.from({ length: skeletonCount }).map((_, idx) => (
          <div key={idx} className={styles.skeletonCard}>
            <div className={styles.skeletonImage} />
            <div className={styles.skeletonBody}>
              <div className={styles.skeletonLine} style={{ width: '40%' }} />
              <div className={styles.skeletonLine} style={{ width: '90%' }} />
              <div className={styles.skeletonLine} style={{ width: '60%' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn(styles.grid, className)}>
      {products.map((prod) => (
        <ProductCard key={prod.id} {...prod} />
      ))}
    </div>
  );
};
