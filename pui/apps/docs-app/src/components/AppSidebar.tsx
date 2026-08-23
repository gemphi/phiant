import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Button, Icon, Title, Divider, Span, Tooltip, Menu, MenuItem,
  Avatar, Sidebar, SidebarHeader, SidebarBody, SidebarFooter,
  useSidebarContext, Stack, SidebarNav,
} from '@phient/pui';
import { ChevronLeft, Settings, LayoutGrid } from 'lucide-react';
import { NAV_GROUPS } from '../datasets';
import { handleItemClick } from '../utils/navigation';
import styles from '../App.module.scss';

const LogoIcon = ({ onClick }: { onClick: () => void }) => (
  <Button variant="ghost" size="sm" onClick={onClick} aria-label="Logo" className={styles.logoBtn}>
    <Icon name={LayoutGrid} size="md" />
  </Button>
);

const SidebarInner = ({ onOpenSettings }: { onOpenSettings: () => void }) => {
  const { sidebarCollapsed, setSidebarCollapsed } = useSidebarContext();
  const location = useLocation();
  const collapsed = sidebarCollapsed;

  const logoEl = collapsed ? (
    <Tooltip content="Expand sidebar" position="right" pushed>
      <LogoIcon onClick={() => setSidebarCollapsed(false)} />
    </Tooltip>
  ) : (
    <LogoIcon onClick={() => {}} />
  );

  return (
    <>
      <SidebarHeader className={`pui-sidebar-header ${styles.sidebarHeader} ${collapsed ? styles.isCollapsed : ''}`}>
        <Stack direction="row" align="center" justify="between" className={styles.sidebarHeaderTop}>
          <Stack direction="row" align="center" gap={2} className={styles.logoContainer}>
            {logoEl}
            {!collapsed && <Title variant="h3" className={styles.logoText}>PUIBook</Title>}
          </Stack>
          {!collapsed && (
            <Button variant="ghost" size="sm" iconLeft={ChevronLeft} onClick={() => setSidebarCollapsed(true)} aria-label="Collapse sidebar" className={styles.collapseBtn} />
          )}
        </Stack>
      </SidebarHeader>
      <Divider />
      <SidebarBody>
        <SidebarNav
          groups={NAV_GROUPS}
          collapsed={collapsed}
          activePath={location.pathname}
          onItemClick={handleItemClick}
          renderLink={(item, isActive) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive: navActive }) => `${styles.navLink} ${(navActive || isActive) ? styles.navLinkActive : ''}`}
              onClick={() => handleItemClick(item.path)}
            >
              <Span className={styles.navLinkLabelText}>{item.label}</Span>
            </NavLink>
          )}
        />
      </SidebarBody>
      <SidebarFooter className={`${styles.sidebarFooter} ${collapsed ? styles.isCollapsed : ''}`}>
        <Stack direction={collapsed ? 'column' : 'row'} align="center" justify="between" className={styles.userProfileBtn}>
          <Stack direction="row" align="center" gap={2} className={styles.userProfileContent}>
            <Avatar initials="B" size="sm" alt="Batanayi" />
            {!collapsed && <Span className={styles.userNameText}>Batanayi</Span>}
          </Stack>
          <Menu position={collapsed ? 'right' : 'bottom-end'} trigger={<Button variant="ghost" size="sm" iconLeft={Settings} aria-label="User menu" />}>
            <MenuItem onClick={onOpenSettings}>Settings</MenuItem>
            <MenuItem onClick={onOpenSettings}>Help</MenuItem>
            <MenuItem className={styles.dangerBtn}>Sign out</MenuItem>
          </Menu>
        </Stack>
      </SidebarFooter>
    </>
  );
};

export const AppSidebar = ({ onOpenSettings }: { onOpenSettings: () => void }) => (
  <Sidebar defaultCollapsed={false}>
    <SidebarInner onOpenSettings={onOpenSettings} />
  </Sidebar>
);
