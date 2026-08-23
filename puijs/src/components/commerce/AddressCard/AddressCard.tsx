import React from 'react';
import { MapPin, Check } from 'lucide-react';
import { Button } from '../../primitives/Button';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

export interface AddressModel {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface AddressCardProps {
  address: AddressModel;
  selected?: boolean;
  onSelect?: (id: string) => void;
  onEdit?: (id: string) => void;
  className?: string;
}

export const AddressCard: React.FC<AddressCardProps> = ({
  address,
  selected = false,
  onSelect,
  onEdit,
  className,
}) => {
  return (
    <div
      className={cn(styles.card, selected && styles.selected, className)}
      onClick={() => onSelect?.(address.id)}
      style={{ cursor: onSelect ? 'pointer' : 'default' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MapPin size={16} color="#3b82f6" />
          <span className={styles.name}>{address.name}</span>
        </div>
        {selected && <Check size={16} color="#3b82f6" />}
      </div>

      <div className={styles.text}>
        {address.street}
        <br />
        {address.city}, {address.state} {address.postalCode}
        <br />
        {address.country}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
        {address.isDefault && <span className={styles.defaultBadge}>Default</span>}
        {onEdit && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(address.id);
            }}
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};
