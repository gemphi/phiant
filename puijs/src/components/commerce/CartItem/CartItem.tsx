import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Price } from '../Price';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

export interface CartItemProps {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  readonly?: boolean;
  onUpdateQuantity?: (id: string, qty: number) => void;
  onRemove?: (id: string) => void;
  className?: string;
}

export const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  price,
  quantity,
  image = 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&auto=format&fit=crop&q=60',
  readonly = false,
  onUpdateQuantity,
  onRemove,
  className,
}) => {
  return (
    <div className={cn(styles.item, className)}>
      <img src={image} alt={title} className={styles.thumbnail} />
      <div className={styles.details}>
        <div className={styles.title}>{title}</div>
        <Price amount={price * quantity} />
      </div>

      <div className={styles.actions}>
        {!readonly && onUpdateQuantity ? (
          <>
            <button
              type="button"
              className={styles.stepperBtn}
              onClick={() => onUpdateQuantity(id, quantity - 1)}
              aria-label="Decrease quantity"
            >
              <Minus size={12} />
            </button>
            <span className={styles.quantity}>{quantity}</span>
            <button
              type="button"
              className={styles.stepperBtn}
              onClick={() => onUpdateQuantity(id, quantity + 1)}
              aria-label="Increase quantity"
            >
              <Plus size={12} />
            </button>
          </>
        ) : (
          <span className={styles.quantity}>x{quantity}</span>
        )}

        {!readonly && onRemove && (
          <button
            type="button"
            className={styles.removeBtn}
            onClick={() => onRemove(id)}
            aria-label="Remove item"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
