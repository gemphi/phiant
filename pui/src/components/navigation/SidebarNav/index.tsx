'use client';

import React, { useState, useEffect } from 'react';
import { type LucideIcon } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { Accordion, AccordionItem } from '../../data-display/Accordion';
import { Menu, MenuItem } from '../Menu';
import { Button } from '../../primitives/Button';
import { Icon } from '../../primitives/Icon';
import styles from './styles.module.scss';

export type SidebarNavItem = { label: string; path: string; };
export type SidebarNavGroup = { label: string; icon: LucideIcon; items: SidebarNavItem[]; };

export type SidebarNavProps = {
  groups: SidebarNavGroup[];
  collapsed?: boolean;
  activePath?: string;
  onItemClick?: (path: string) => void;
  renderLink?: (item: SidebarNavItem, isActive: boolean) => React.ReactNode;
  className?: string;
};

const isPathActive = (active: string, item: string) => active === item || (item !== '/' && active.startsWith(`${item}/`));

export const SidebarNav: React.FC<SidebarNavProps> = ({
  groups,
  collapsed = false,
  activePath = '',
  onItemClick,
  renderLink,
  className = '',
}) => {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    groups.forEach((g) => { init[g.label] = g.items.some((i) => isPathActive(activePath, i.path)); });
    return init;
  });

  useEffect(() => {
    setOpenGroups((prev) => {
      const next = { ...prev };
      groups.forEach((g) => {
        if (g.items.some((i) => isPathActive(activePath, i.path))) next[g.label] = true;
      });
      return next;
    });
  }, [activePath, groups]);

  if (collapsed) {
    return (
      <nav className={cn(styles.sidebarNav, styles.collapsed, className)}>
        {groups.map((group) => {
          const isGroupActive = group.items.some((item) => isPathActive(activePath, item.path));
          return (
            <div key={group.label} className={styles.collapsedItem}>
              <Button variant={isGroupActive ? 'primary' : 'ghost'} size="sm" className={styles.collapsedBtn} title={group.label}>
                <Icon icon={group.icon} size="sm" />
              </Button>
            </div>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className={cn(styles.sidebarNav, className)}>
      <Accordion allowMultiple>
        {groups.map((group) => (
          <AccordionItem
            key={group.label}
            title={<span className={styles.groupHeader}><Icon icon={group.icon} size="sm" />{group.label}</span>}
            isOpen={openGroups[group.label]}
            onToggle={() => setOpenGroups((p) => ({ ...p, [group.label]: !p[group.label] }))}
          >
            <Menu className={styles.groupMenu}>
              {group.items.map((item) => {
                const active = isPathActive(activePath, item.path);
                return renderLink ? (
                  <React.Fragment key={item.path}>{renderLink(item, active)}</React.Fragment>
                ) : (
                  <MenuItem key={item.path} onClick={() => onItemClick?.(item.path)} className={cn(active && styles.activeItem)}>
                    {item.label}
                  </MenuItem>
                );
              })}
            </Menu>
          </AccordionItem>
        ))}
      </Accordion>
    </nav>
  );
};
