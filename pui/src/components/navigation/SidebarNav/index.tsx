'use client';

import React from 'react';
import { type LucideIcon } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { Accordion, AccordionItem } from '../../data-display/Accordion';
import { Menu, MenuItem } from '../Menu';
import { Button } from '../../primitives/Button';
import { Icon } from '../../primitives/Icon';
import { Stack } from '../../layout/Stack';
import { Row } from '../../layout/Row';
import { Span } from '../../primitives/Span';
import styles from './styles.module.scss';

export type SidebarNavItem = {
  label: string;
  path: string;
};

export type SidebarNavGroup = {
  label: string;
  icon: LucideIcon;
  items: SidebarNavItem[];
};

export type SidebarNavProps = {
  groups: SidebarNavGroup[];
  collapsed?: boolean;
  activePath?: string;
  onItemClick?: (path: string) => void;
  renderLink?: (item: SidebarNavItem, isActive: boolean) => React.ReactNode;
  className?: string;
};

const isPathActive = (activePath: string, itemPath: string) => {
  if (activePath === itemPath) return true;
  if (itemPath !== '/' && activePath.startsWith(`${itemPath}/`)) return true;
  return false;
};

export const SidebarNav = ({
  groups,
  collapsed = false,
  activePath = '',
  onItemClick,
  renderLink,
  className = '',
}: SidebarNavProps) => {
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    groups.forEach((group) => {
      initial[group.label] = group.items.some((item) => isPathActive(activePath, item.path));
    });
    return initial;
  });

  React.useEffect(() => {
    setOpenGroups((prev) => {
      const next: Record<string, boolean> = { ...prev };
      groups.forEach((group) => {
        if (group.items.some((item) => isPathActive(activePath, item.path))) {
          next[group.label] = true;
        }
      });
      return next;
    });
  }, [activePath, groups]);

  const handleToggle = (label: string) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  if (collapsed) {
    return (
      <Stack direction="column" gap={1} className={cn(styles.nav, className)}>
        {groups.map((group) => (
          <Stack key={group.label} align="center" className={styles.navGroup}>
            <Menu
              position="right"
              trigger={
                <Button variant="ghost" size="sm" aria-label={group.label} className={styles.navIconBtn}>
                  <Icon name={group.icon} size="sm" />
                </Button>
              }
            >
              {group.items.map((item) => (
                <MenuItem key={item.path} onClick={() => onItemClick?.(item.path)}>
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </Stack>
        ))}
      </Stack>
    );
  }

  return (
    <Accordion className={cn(styles.nav, className)}>
      {groups.map((group) => (
        <AccordionItem
          key={group.label}
          title={(
            <Row align="center" gap={2}>
              <Icon name={group.icon} size="sm" />
              <Span>{group.label}</Span>
            </Row>
          )}
          open={!!openGroups[group.label]}
          onToggle={() => handleToggle(group.label)}
        >
          <Stack direction="column" gap={1} className={styles.navGroupItems}>
            {renderLink
              ? group.items.map((item) => renderLink(item, isPathActive(activePath, item.path)))
              : group.items.map((item) => (
                  <Span key={item.path} className={isPathActive(activePath, item.path) ? styles.navLinkActive : ''}>
                    {item.label}
                  </Span>
                ))}
          </Stack>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

SidebarNav.displayName = 'SidebarNav';
