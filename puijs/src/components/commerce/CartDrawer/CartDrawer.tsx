import React from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { Drawer } from '../../overlays/Drawer';
import { CartItem, CartItemProps } from '../CartItem';
import { CartSummary } from '../CartSummary';
import { Button } from '../../primitives/Button';
import styles from './styles.module.scss';

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemProps[];
  onUpdateQuantity?: (id: string, qty: number) => void;
  onRemoveItem?: (id: string) => void;
  onCheckout?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} position="right" size="md">
      <div className={styles.drawerContent}>
        <div className={styles.header}>
          <div className={styles.title}>Your Cart ({items.length})</div>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className={styles.emptyState}>
            <ShoppingBag size={48} strokeWidth={1.5} />
            <div>Your cart is empty</div>
            <Button variant="secondary" size="sm" onClick={onClose}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className={styles.itemList}>
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  {...item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemoveItem}
                />
              ))}
            </div>

            <CartSummary subtotal={subtotal} onCheckout={onCheckout} />
          </>
        )}
      </div>
    </Drawer>
  );
};
