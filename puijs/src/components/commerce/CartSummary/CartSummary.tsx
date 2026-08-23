import React from 'react';
import { Button } from '../../primitives/Button';
import { Price } from '../Price';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

export interface CartSummaryProps {
  subtotal: number;
  shipping?: number;
  tax?: number;
  discount?: number;
  currency?: string;
  onCheckout?: () => void;
  loading?: boolean;
  className?: string;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  shipping = 0,
  tax = 0,
  discount = 0,
  currency = '$',
  onCheckout,
  loading = false,
  className,
}) => {
  const total = Math.max(0, subtotal + shipping + tax - discount);

  return (
    <div className={cn(styles.summary, className)}>
      <div className={styles.row}>
        <span>Subtotal</span>
        <Price amount={subtotal} currency={currency} />
      </div>

      {discount > 0 && (
        <div className={styles.row}>
          <span>Discount</span>
          <span style={{ color: '#ef4444', fontWeight: 600 }}>
            -{currency}
            {discount.toFixed(2)}
          </span>
        </div>
      )}

      <div className={styles.row}>
        <span>Estimated Shipping</span>
        {shipping === 0 ? (
          <span className={styles.freeTag}>FREE</span>
        ) : (
          <Price amount={shipping} currency={currency} />
        )}
      </div>

      {tax > 0 && (
        <div className={styles.row}>
          <span>Estimated Tax</span>
          <Price amount={tax} currency={currency} />
        </div>
      )}

      <div className={styles.totalRow}>
        <span>Total</span>
        <Price amount={total} currency={currency} />
      </div>

      {onCheckout && (
        <Button
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          disabled={subtotal <= 0}
          onClick={onCheckout}
          style={{ marginTop: '0.5rem' }}
        >
          Proceed to Checkout
        </Button>
      )}
    </div>
  );
};
