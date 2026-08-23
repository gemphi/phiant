import React from 'react';
import { Drawer, Stack, Title, Text, Input, Button, Divider, Badge, Span, Textarea, Select, Checkbox, Slider } from '@phient/pui';
import {
  usePageStore,
  getComponentAtPath,
  getBreadcrumbPaths,
  getAtPath,
} from './PageStore';
import type { PageData, PageComponent } from './types';
import styles from './PageOptionsDrawer.module.scss';

const IGNORED_PROPS = ['children', 'className', 'style'];

/* ---------- Section wrapper (collapsible) ---------- */

type SectionProps = {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

const Section = ({ title, defaultOpen = true, children }: SectionProps) => {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className={styles.section}>
      <button
        type="button"
        className={styles.sectionHeader}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <Span variant="bold" className={styles.sectionTitle}>{title}</Span>
        <Span variant="sm" className={styles.chevron}>{open ? '−' : '+'}</Span>
      </button>
      {open && <div className={styles.sectionBody}>{children}</div>}
    </div>
  );
};

/* ---------- Typed prop controls ---------- */

type PropControlProps = {
  propKey: string;
  value: any;
  onChange: (key: string, next: any) => void;
};

const BOOLEAN_PROPS = ['hoverable', 'disabled', 'compact', 'active', 'loading', 'fullWidth', 'truncate', 'block'];
const SELECT_PROPS: Record<string, string[]> = {
  variant: ['primary', 'secondary', 'ghost', 'outline', 'error', 'success', 'warning', 'info'],
  size: ['sm', 'md', 'lg'],
  direction: ['row', 'column'],
  align: ['start', 'center', 'end', 'stretch'],
  justify: ['start', 'center', 'end', 'between', 'around'],
  layout: ['row', 'col', 'grid', 'stack'],
};
const NUMBER_PROPS = ['gap', 'cols', 'columns', 'rows', 'span', 'spacing', 'padding', 'margin', 'radius', 'size', 'fontSize', 'width', 'height', 'min', 'max', 'step', 'value'];

const PropControl = ({ propKey, value, onChange }: PropControlProps) => {
  /* Boolean toggle */
  if (typeof value === 'boolean' || BOOLEAN_PROPS.includes(propKey)) {
    return (
      <div className={styles.controlRow}>
        <Span variant="sm" className={styles.controlLabel}>{propKey}</Span>
        <Checkbox
          checked={!!value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(propKey, e.target.checked)}
        />
      </div>
    );
  }

  /* Select dropdown for known enum props */
  const options = SELECT_PROPS[propKey];
  if (options && (typeof value === 'string' || value === undefined)) {
    return (
      <div className={styles.controlGroup}>
        <Span variant="sm" className={styles.controlLabel}>{propKey}</Span>
        <Select
          value={value ?? ''}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(propKey, e.target.value)}
        >
          <option value="">—</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </Select>
      </div>
    );
  }

  /* Slider for numeric gap/size values */
  if (typeof value === 'number' && (propKey === 'gap' || propKey === 'cols' || propKey === 'columns')) {
    const max = propKey === 'gap' ? 8 : 12;
    return (
      <div className={styles.controlGroup}>
        <div className={styles.controlRow}>
          <Span variant="sm" className={styles.controlLabel}>{propKey}</Span>
          <Span variant="sm" className={styles.controlValue}>{value}</Span>
        </div>
        <input
          type="range"
          min={0}
          max={max}
          value={value}
          onChange={(e) => onChange(propKey, Number(e.target.value))}
          className={styles.rangeInput}
        />
      </div>
    );
  }

  /* Default: text input */
  const stringValue = typeof value === 'string' || typeof value === 'number' ? String(value) : '';
  return (
    <div className={styles.controlGroup}>
      <Span variant="sm" className={styles.controlLabel}>{propKey}</Span>
      <Input
        type="text"
        value={stringValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const raw = e.target.value;
          onChange(propKey, typeof value === 'number' && raw !== '' ? Number(raw) : raw);
        }}
      />
    </div>
  );
};

/* ---------- Breadcrumb ---------- */

const BreadcrumbNav = ({
  pageData,
  selectedPath,
  onSelect,
}: {
  pageData: PageData;
  selectedPath: string;
  onSelect: (path: string) => void;
}) => {
  const crumbs = getBreadcrumbPaths(selectedPath);

  return (
    <div className={styles.breadcrumb}>
      {crumbs.map((crumbPath, i) => {
        const node = getAtPath(pageData, crumbPath);
        if (!node) return null;
        const isLast = crumbPath === selectedPath;
        const label =
          typeof node === 'object' && node.type
            ? node.type
            : typeof node === 'object' && node.id
              ? node.id
              : crumbPath.split('.').pop() ?? crumbPath;

        return (
          <React.Fragment key={crumbPath}>
            {i > 0 && <Span variant="sm" className={styles.breadcrumbSep}>›</Span>}
            <button
              type="button"
              className={`${styles.breadcrumbItem} ${isLast ? styles.breadcrumbActive : ''}`}
              onClick={() => onSelect(crumbPath)}
            >
              {label}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
};

/* ---------- Children list ---------- */

const ChildList = ({
  component,
  selectedPath,
  onSelect,
}: {
  component: PageComponent;
  selectedPath: string;
  onSelect: (path: string) => void;
}) => {
  if (!component.children || typeof component.children === 'string') return null;

  return (
    <div className={styles.childList}>
      {component.children.map((child, index) => {
        const childPath = `${selectedPath}.children.${index}`;
        return (
          <button
            key={childPath}
            type="button"
            className={styles.childItem}
            onClick={() => onSelect(childPath)}
          >
            <Badge variant="secondary">{child.type}</Badge>
            <Span variant="sm" className={styles.childIndex}>#{index}</Span>
          </button>
        );
      })}
    </div>
  );
};

/* ---------- Main drawer ---------- */

export const PageOptionsDrawer = () => {
  const { pageData, selectedPath, selectPath, updatePropsAtPath, updateChildrenAtPath } = usePageStore();

  const component = React.useMemo(
    () => (selectedPath ? getComponentAtPath(pageData, selectedPath) : null),
    [pageData, selectedPath]
  );

  const handleClose = () => selectPath(null);

  const handlePropChange = (key: string, value: any) => {
    if (!selectedPath) return;
    updatePropsAtPath(selectedPath, { [key]: value });
  };

  const handleChildrenChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!selectedPath) return;
    updateChildrenAtPath(selectedPath, e.target.value);
  };

  const propEntries = React.useMemo(() => {
    if (!component?.props) return [];
    return Object.entries(component.props).filter(([key]) => !IGNORED_PROPS.includes(key));
  }, [component?.props]);

  const hasStringChildren = typeof component?.children === 'string';
  const hasComponentChildren = !!component?.children && typeof component.children !== 'string';

  return (
    <Drawer
      isOpen={!!selectedPath}
      onClose={handleClose}
      title="Inspector"
      position="right"
      size="md"
    >
      <div className={styles.drawerContent}>
        {component && selectedPath && (
          <>
            {/* Header block */}
            <div className={styles.headerBlock}>
              <div className={styles.headerRow}>
                <Badge variant="primary">{component.type}</Badge>
                <Button variant="ghost" size="sm" onClick={handleClose} className={styles.closeBtn}>
                  ✕
                </Button>
              </div>
              <BreadcrumbNav
                pageData={pageData}
                selectedPath={selectedPath}
                onSelect={selectPath}
              />
            </div>

            <Divider />

            {/* Props section */}
            <Section title="Properties">
              {propEntries.length === 0 ? (
                <Text variant="sm" className={styles.emptyText}>No editable props.</Text>
              ) : (
                <div className={styles.propsGrid}>
                  {propEntries.map(([key, value]) => (
                    <PropControl
                      key={key}
                      propKey={key}
                      value={value}
                      onChange={handlePropChange}
                    />
                  ))}
                </div>
              )}
            </Section>

            {/* Text content section */}
            {hasStringChildren && (
              <Section title="Text Content">
                <Textarea
                  value={component.children as string}
                  onChange={handleChildrenChange}
                  rows={4}
                  className={styles.textarea}
                />
              </Section>
            )}

            {/* Children section */}
            {hasComponentChildren && (
              <Section title={`Children (${(component.children as any[]).length})`}>
                <ChildList
                  component={component}
                  selectedPath={selectedPath}
                  onSelect={selectPath}
                />
              </Section>
            )}

            <Divider />

            {/* Actions */}
            <div className={styles.actions}>
              <Button variant="ghost" size="sm" onClick={handleClose}>
                Deselect
              </Button>
            </div>
          </>
        )}

        {!component && (
          <div className={styles.emptyState}>
            <Text variant="sm">Select a component on the page to edit its options.</Text>
          </div>
        )}
      </div>
    </Drawer>
  );
};
