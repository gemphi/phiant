import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

export interface PriceProps {
  amount: number;
  currency?: string;
  saleAmount?: number;
  className?: string;
  showDiscount?: boolean;
}

export const Price: React.FC<PriceProps> = ({
  amount,
  currency = '$',
  saleAmount,
  className,
  showDiscount = true,
}) => {
  const hasDiscount = saleAmount !== undefined && saleAmount < amount;
  const currentPrice = hasDiscount ? saleAmount : amount;
  const discountPercent = hasDiscount ? Math.round(((amount - saleAmount) / amount) * 100) : 0;

  return (
    <div className={cn(styles.priceContainer, className)}>
      <span className={styles.amount}>
        {currency}
        {currentPrice.toFixed(2)}
      </span>
      {hasDiscount && (
        <>
          <span className={styles.original}>
            {currency}
            {amount.toFixed(2)}
          </span>
          {showDiscount && (
            <span className={styles.discountBadge}>-{discountPercent}%</span>
          )}
        </>
      )}
    </div>
  );
};
