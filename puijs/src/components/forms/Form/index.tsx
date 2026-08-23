'use client';

import React from 'react';
import { cn } from '../../../utils/cn';
import { Title } from '../../primitives/Title';
import { Text } from '../../primitives/Text';
import { Stack } from '../../layout/Stack';
import styles from './styles.module.scss';

type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  title?: string;
  error?: string;
  className?: string;
  children?: React.ReactNode;
};

export const Form = ({ title, error, className = '', children, onSubmit, ...props }: FormProps) => {
  return (
    <form onSubmit={onSubmit} className={cn(styles.form, className)} {...props}>
      {title && <Title variant="h3">{title}</Title>}
      {error && (
        <Text variant="sm" className={styles.error}>
          {error}
        </Text>
      )}
      {children}
    </form>
  );
};

type FormFieldProps = {
  label: string;
  error?: string;
  children: React.ReactElement<{ id?: string }>;
  className?: string;
};

export const FormField = ({ label, error, children, className = '' }: FormFieldProps) => {
  const id = React.useId();
  return (
    <Stack direction="column" gap={2} className={cn(styles.field, error && styles.fieldError, className)}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {React.cloneElement(children, { id })}
      {error && (
        <Text variant="xs" className={styles.fieldErrorText}>
          {error}
        </Text>
      )}
    </Stack>
  );
};

type FormRowProps = {
  children: React.ReactNode;
  className?: string;
};

export const FormRow = ({ children, className = '' }: FormRowProps) => {
  return <Stack direction="row" gap={2} className={cn(styles.row, className)}>{children}</Stack>;
};

type FormActionsProps = {
  children: React.ReactNode;
  className?: string;
};

export const FormActions = ({ children, className = '' }: FormActionsProps) => {
  return <Stack direction="row" gap={2} justify="end" className={cn(styles.actions, className)}>{children}</Stack>;
};
