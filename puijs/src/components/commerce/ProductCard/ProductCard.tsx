import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Price } from '../Price';
import { Button } from '../../primitives/Button';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

export interface ProductCardProps {
  id: string;
  title: string;
  category?: string;
  price: number;
  salePrice?: number;
  image: string;
  rating?: number;
  inWishlist?: boolean;
  onAddToCart?: (id: string) => void;
  onToggleWishlist?: (id: string) => void;
  onClick?: (id: string) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  category,
  price,
  salePrice,
  image,
  inWishlist = false,
  onAddToCart,
  onToggleWishlist,
  onClick,
  className,
}) => {
  return (
    <div className={cn(styles.card, className)}>
      <div className={styles.imageWrapper} onClick={() => onClick?.(id)}>
        <img src={image} alt={title} className={styles.image} loading="lazy" />
        {onToggleWishlist && (
          <button
            type="button"
            className={styles.wishlistBtn}
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(id);
            }}
            aria-label="Wishlist"
          >
            <Heart
              size={16}
              color={inWishlist ? '#ef4444' : '#64748b'}
              fill={inWishlist ? '#ef4444' : 'none'}
            />
          </button>
        )}
      </div>

      <div className={styles.body}>
        {category && <span className={styles.category}>{category}</span>}
        <h3 className={styles.title} onClick={() => onClick?.(id)} style={{ cursor: onClick ? 'pointer' : 'default' }}>
          {title}
        </h3>

        <div className={styles.footer}>
          <Price amount={price} saleAmount={salePrice} />
          {onAddToCart && (
            <Button
              variant="primary"
              size="sm"
              icon={<ShoppingCart size={15} />}
              onClick={() => onAddToCart(id)}
            >
              Add
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
