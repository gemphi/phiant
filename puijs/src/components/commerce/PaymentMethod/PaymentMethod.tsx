import React from 'react';
import { CreditCard, Check } from 'lucide-react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

export interface PaymentMethodModel {
  id: string;
  type: 'card' | 'bank' | 'wallet';
  label: string;
  last4?: string;
  expiry?: string;
  brand?: string;
}

export interface PaymentMethodProps {
  method: PaymentMethodModel;
  selected?: boolean;
  onSelect?: (id: string) => void;
  className?: string;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = ({
  method,
  selected = false,
  onSelect,
  className,
}) => {
  return (
    <div
      className={cn(styles.methodCard, selected && styles.selected, className)}
      onClick={() => onSelect?.(method.id)}
    >
      <CreditCard size={20} color="#3b82f6" />
      <div className={styles.details}>
        <div className={styles.title}>
          {method.label} {method.last4 ? `•••• ${method.last4}` : ''}
        </div>
        {method.expiry && <div className={styles.subtitle}>Expires {method.expiry}</div>}
      </div>
      {selected && <Check size={18} color="#3b82f6" />}
    </div>
  );
};
