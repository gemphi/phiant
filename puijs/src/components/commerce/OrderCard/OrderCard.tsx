import React from 'react';
import { Package, ArrowRight } from 'lucide-react';
import { Price } from '../Price';
import { Button } from '../../primitives/Button';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

export type OrderStatus = 'completed' | 'processing' | 'cancelled';

export interface OrderItemSummary {
  id: string;
  title: string;
  quantity: number;
  price: number;
}

export interface OrderCardProps {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: OrderItemSummary[];
  onViewDetails?: (id: string) => void;
  className?: string;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  id,
  date,
  total,
  status,
  items,
  onViewDetails,
  className,
}) => {
  const statusClass =
    status === 'completed'
      ? styles.statusCompleted
      : status === 'processing'
      ? styles.statusProcessing
      : styles.statusCancelled;

  return (
    <div className={cn(styles.card, className)}>
      <div className={styles.header}>
        <div>
          <div className={styles.orderId}>
            <Package size={16} style={{ display: 'inline', marginRight: 6 }} />
            Order #{id}
          </div>
          <div className={styles.date}>{date}</div>
        </div>
        <span className={cn(styles.status, statusClass)}>{status.toUpperCase()}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {items.map((item) => (
          <div key={item.id} className={styles.itemRow}>
            <span>
              {item.title} <span style={{ color: '#94a3b8' }}>x{item.quantity}</span>
            </span>
            <Price amount={item.price * item.quantity} />
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div>
          <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Total Paid: </span>
          <Price amount={total} />
        </div>
        {onViewDetails && (
          <Button variant="ghost" size="sm" onClick={() => onViewDetails(id)}>
            Details <ArrowRight size={14} style={{ marginLeft: 4 }} />
          </Button>
        )}
      </div>
    </div>
  );
};
