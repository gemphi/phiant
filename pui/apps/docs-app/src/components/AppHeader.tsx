import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Button, Icon, Input, Divider, Navbar, NavbarSection, NavbarItem,
  usePuiTheme, Stack,
} from '@phient/pui';
import { Sun, Moon, Monitor, Search, MousePointerClick } from 'lucide-react';
import { BrandSelector } from './inspector';
import { HEADER_TABS } from '../datasets';
import styles from '../App.module.scss';

const TAB_ROUTES: Record<string, string> = {
  'Overview': '/overview',
  'Design': '/showcase',
  'Code': '/play',
  'Play': '/play',
};

const ThemeToggle = ({ onOpenSettings }: { onOpenSettings: () => void }) => {
  const { theme } = usePuiTheme();
  const icons: Record<string, any> = { light: Sun, dark: Moon, system: Monitor };
  return (
    <Button variant="ghost" size="sm" iconLeft={icons[theme]} onClick={onOpenSettings} aria-label="Open theme settings" />
  );
};

type AppHeaderProps = {
  activeTab: string;
  setActiveTab: (t: string) => void;
  search: string;
  setSearch: (s: string) => void;
  inspectMode: boolean;
  setInspectMode: (v: boolean) => void;
  onOpenSettings: () => void;
  scrolled: boolean;
};

export const AppHeader = ({
  activeTab, setActiveTab, search, setSearch,
  inspectMode, setInspectMode, onOpenSettings, scrolled,
}: AppHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    const route = TAB_ROUTES[tab];
    if (route && location.pathname !== route) navigate(route);
  };

  return (
    <Navbar sticky variant="default" height={64} className={`${styles.mainHeader} ${scrolled ? styles.headerScrolled : ''}`}>
      <NavbarSection align="start">
        <Stack className={styles.searchBox}>
          <Input
            icon={<Icon name={Search} size="md" />}
            type="text"
            placeholder="Search components..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </Stack>
        {HEADER_TABS.map((tab: string) => (
          <NavbarItem key={tab} active={activeTab === tab} onClick={() => handleTabClick(tab)}>
            {tab}
          </NavbarItem>
        ))}
      </NavbarSection>
      <NavbarSection align="end">
        <ThemeToggle onOpenSettings={onOpenSettings} />
        <Divider orientation="vertical" className={styles.headerDivider} />
        <Button
          variant="ghost"
          size="sm"
          iconLeft={MousePointerClick}
          onClick={() => setInspectMode(!inspectMode)}
          className={inspectMode ? styles.inspectActive : ''}
        >
          Inspect
        </Button>
        <BrandSelector />
      </NavbarSection>
    </Navbar>
  );
};
