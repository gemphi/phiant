import React from 'react';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { Price } from '../Price';
import { Button } from '../../primitives/Button';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

export interface WishlistItemProps {
  id: string;
  title: string;
  price: number;
  image?: string;
  onMoveToCart?: (id: string) => void;
  onRemove?: (id: string) => void;
  className?: string;
}

export const WishlistItem: React.FC<WishlistItemProps> = ({
  id,
  title,
  price,
  image = 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&auto=format&fit=crop&q=60',
  onMoveToCart,
  onRemove,
  className,
}) => {
  return (
    <div className={cn(styles.item, className)}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.details}>
        <div className={styles.title}>{title}</div>
        <Price amount={price} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {onMoveToCart && (
          <Button
            variant="primary"
            size="sm"
            icon={<ShoppingCart size={14} />}
            onClick={() => onMoveToCart(id)}
          >
            Move to Cart
          </Button>
        )}
        {onRemove && (
          <Button variant="ghost" size="sm" onClick={() => onRemove(id)} aria-label="Remove">
            <Trash2 size={15} color="#ef4444" />
          </Button>
        )}
      </div>
    </div>
  );
};
