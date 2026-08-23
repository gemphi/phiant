import React, { createContext, useContext, useState, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { Stack } from '../../layout/Stack';
import { Card, CardHeader, CardBody, CardFooter } from '../../data-display/Card';
import styles from './styles.module.scss';

export type SidebarContextType = {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  sidebarHovered: boolean;
  setSidebarHovered: (hovered: boolean) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebarContext must be used within a Sidebar component');
  }
  return context;
};

export type SidebarProps = {
  children: ReactNode;
  defaultCollapsed?: boolean;
  className?: string;
};

export const Sidebar = ({ children, defaultCollapsed = false, className }: SidebarProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(defaultCollapsed);

  return (
    <SidebarContext.Provider value={{ sidebarCollapsed, setSidebarCollapsed, sidebarHovered: false, setSidebarHovered: () => {} }}>
      <Stack className={sidebarCollapsed ? styles.sidebarSpacerCollapsed : styles.sidebarSpacerExpanded} />
      <Card
        hoverable={false}
        variant="flat"
        className={cn(
          'pui-sidebar',
          styles.sidebar,
          sidebarCollapsed ? styles.sidebarCollapsed : styles.sidebarExpanded,
          className
        )}
      >
        {children}
      </Card>
    </SidebarContext.Provider>
  );
};

export const SidebarHeader = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <CardHeader className={cn('pui-sidebar-header', styles.sidebarHeader, className)}>
      {children}
    </CardHeader>
  );
};

export const SidebarBody = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <CardBody className={cn('pui-sidebar-body', styles.sidebarBody, className)}>
      {children}
    </CardBody>
  );
};

export const SidebarFooter = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <CardFooter className={cn('pui-sidebar-footer', styles.sidebarFooter, className)}>
      {children}
    </CardFooter>
  );
};