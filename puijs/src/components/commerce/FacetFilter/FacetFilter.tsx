import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

export interface FacetOption {
  value: string;
  label: string;
  count?: number;
}

export interface FacetFilterProps {
  title: string;
  options: FacetOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  className?: string;
}

export const FacetFilter: React.FC<FacetFilterProps> = ({
  title,
  options,
  selectedValues,
  onChange,
  className,
}) => {
  const handleToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className={cn(styles.filterGroup, className)}>
      <div className={styles.title}>{title}</div>
      <div className={styles.optionList}>
        {options.map((opt) => {
          const checked = selectedValues.includes(opt.value);
          return (
            <label key={opt.value} className={styles.optionItem}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => handleToggle(opt.value)}
              />
              <span>{opt.label}</span>
              {opt.count !== undefined && <span className={styles.count}>({opt.count})</span>}
            </label>
          );
        })}
      </div>
    </div>
  );
};
