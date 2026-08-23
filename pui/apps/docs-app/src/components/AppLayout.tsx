import React from 'react';
import { useLocation } from 'react-router-dom';
import { Page } from '@phient/pui';
import { useInspector, InspectorDrawer, ExpandMode, SelectorBubble } from './inspector';
import { SettingsDrawer } from './SettingsDrawer';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { AppRoutes } from './AppRoutes';

export const AppLayout = () => {
  const [activeTab, setActiveTab] = React.useState('Overview');
  const [search, setSearch] = React.useState('');
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();
  const { inspectMode, setInspectMode, clearElements } = useInspector();

  React.useEffect(() => {
    clearElements();
  }, [location.pathname, clearElements]);

  React.useEffect(() => {
    const contentWrapper = document.querySelector('[class*="contentWrapper"]') as HTMLElement | null;
    if (!contentWrapper) return;
    const handleScroll = () => setScrolled(contentWrapper.scrollTop > 8);
    contentWrapper.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => contentWrapper.removeEventListener('scroll', handleScroll);
  }, []);

  const openSettings = () => setSettingsOpen(true);

  return (
    <>
      <Page
        sidebar={<AppSidebar onOpenSettings={openSettings} />}
        header={
          <AppHeader
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            search={search}
            setSearch={setSearch}
            inspectMode={inspectMode}
            setInspectMode={setInspectMode}
            onOpenSettings={openSettings}
            scrolled={scrolled}
          />
        }
      >
        <AppRoutes />
        <SelectorBubble />
        <InspectorDrawer />
        <ExpandMode />
      </Page>
      <SettingsDrawer isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
};
