import React from 'react';
import { Stack, Row, Col, Grid, Card, CardHeader, CardBody, CardFooter } from '@phient/pui';
import type { GridGap } from '@phient/pui';
import { COMPONENT_REGISTRY } from './componentRegistry';
import { ICON_REGISTRY } from './iconRegistry';
import { resolveActions, type ActionHandler } from './actionMap';
import { resolveDataSource } from './store/services/storeService';
import type { Block, PageData, Section } from './types';

const VALID_GAPS: GridGap[] = [1, 2, 3, 4, 6, 8];
const toGap = (value?: number): GridGap | undefined => {
  if (value == null) return undefined;
  return VALID_GAPS.includes(value as GridGap) ? value as GridGap : undefined;
};

/* ---------- Template interpolation ---------- */

/** Replace {item.field} and {item.field.subfield} placeholders in a string */
const interpolate = (str: string, item: Record<string, any>): string =>
  str.replace(/\{item\.([a-zA-Z0-9_.]+)\}/g, (_, path: string) => {
    const value = path.split('.').reduce((obj, key) => obj?.[key], item);
    return value != null ? String(value) : '';
  });

/** Deep-clone a block tree with interpolated values from a data item */
const interpolateBlock = (block: Block, item: Record<string, any>): Block => {
  const interpolated: Block = { type: block.type };
  if (block.id) interpolated.id = block.id;
  if (block.variant) interpolated.variant = block.variant;
  if (block.dataSource) interpolated.dataSource = block.dataSource;

  if (block.props) {
    interpolated.props = {};
    for (const [key, value] of Object.entries(block.props)) {
      if (typeof value === 'string') {
        interpolated.props[key] = interpolate(value, item);
      } else {
        interpolated.props[key] = value;
      }
    }
  }

  if (block.style) interpolated.style = { ...block.style };

  if (block.children) {
    if (typeof block.children === 'string') {
      interpolated.children = interpolate(block.children, item);
    } else {
      interpolated.children = block.children.map((child) => interpolateBlock(child, item));
    }
  }

  return interpolated;
};

/* ---------- Resolve props: icons + store data + actions ---------- */

const resolveProps = (
  props: Record<string, any> = {},
  blockType: string,
  path: string,
  dataSource?: string,
  onAction?: ActionHandler,
): Record<string, any> => {
  // 1. Merge store data if dataSource key is set
  let merged = { ...props };
  if (dataSource) {
    const storeData = resolveDataSource(dataSource);
    if (storeData) merged = { ...storeData, ...merged };
  }

  // 2. Resolve icon strings to icon components
  const resolved: Record<string, any> = {};
  Object.entries(merged).forEach(([key, value]) => {
    if ((key === 'icon' || key === 'iconLeft' || key === 'iconRight' || key === 'name') && typeof value === 'string') {
      resolved[key] = ICON_REGISTRY[value] ?? value;
    } else {
      resolved[key] = value;
    }
  });

  // 3. Resolve action identifiers to callbacks
  return resolveActions(resolved, blockType, path, onAction);
};

/* ---------- Selectable wrapper ---------- */

const SelectableWrapper = ({
  path,
  onSelect,
  children,
}: {
  path: string;
  onSelect?: (path: string) => void;
  children: React.ReactNode;
}) => {
  if (!onSelect) return <>{children}</>;
  return (
    <div
      data-pui-path={path}
      className="pui-play-node"
      onClick={(e) => { e.stopPropagation(); onSelect(path); }}
      style={{ display: 'contents' }}
    >
      {children}
    </div>
  );
};

/* ---------- Block renderer (recursive tree node) ---------- */

type BlockNodeProps = {
  block: Block;
  path: string;
  onSelect?: (path: string) => void;
  onAction?: ActionHandler;
};

const BlockNode = ({ block, path, onSelect, onAction }: BlockNodeProps) => {
  const Component = COMPONENT_REGISTRY[block.type];
  if (!Component) return null;

  // If block has dataSource + itemTemplate, generate children from store data
  const dataChildren = React.useMemo(() => {
    if (!block.dataSource || !block.itemTemplate) return null;
    const storeData = resolveDataSource(block.dataSource);
    if (!storeData) return null;
    const items: Record<string, any>[] = storeData.items ?? storeData;
    if (!Array.isArray(items)) return null;
    return items.map((item, index) =>
      interpolateBlock(block.itemTemplate!, item)
    );
  }, [block.dataSource, block.itemTemplate]);

  const resolvedProps = React.useMemo(
    () => resolveProps(block.props, block.type, path, block.dataSource, onAction),
    [block.props, block.type, path, block.dataSource, onAction],
  );

  const childNodes = React.useMemo(() => {
    // Priority: data-generated children > static children
    const children = dataChildren ?? block.children;
    if (!children) return undefined;
    if (typeof children === 'string') return children;
    return children.map((child, index) => (
      <BlockNode
        key={`${path}.children.${index}`}
        block={child}
        path={`${path}.children.${index}`}
        onSelect={onSelect}
        onAction={onAction}
      />
    ));
  }, [dataChildren, block.children, path, onSelect, onAction]);

  return (
    <SelectableWrapper path={path} onSelect={onSelect}>
      <Component {...resolvedProps} style={block.style} variant={block.variant}>
        {childNodes}
      </Component>
    </SelectableWrapper>
  );
};

/* ---------- Render a block or array of blocks ---------- */

const renderBlocks = (
  blocks: Block | Block[],
  basePath: string,
  onSelect?: (path: string) => void,
  onAction?: ActionHandler,
): React.ReactNode => {
  if (Array.isArray(blocks)) {
    return blocks.map((b, i) => (
      <BlockNode key={`${basePath}.${i}`} block={b} path={`${basePath}.${i}`} onSelect={onSelect} onAction={onAction} />
    ));
  }
  return <BlockNode block={blocks} path={basePath} onSelect={onSelect} onAction={onAction} />;
};

/* ---------- Section renderer (header / body / footer) ---------- */

type SectionNodeProps = {
  section: Section;
  sectionIndex: number;
  onSelect?: (path: string) => void;
  onAction?: ActionHandler;
};

const SectionNode = ({ section, sectionIndex, onSelect, onAction }: SectionNodeProps) => {
  const basePath = `sections.${sectionIndex}`;
  const sectionProps = resolveProps(section.props, 'Card', basePath, section.dataSource, onAction);

  // If section has header/body/footer, render as a Card structure
  if (section.header || section.footer) {
    return (
      <SelectableWrapper path={basePath} onSelect={onSelect}>
        <Card {...sectionProps} style={section.style} variant={section.variant}>
          {section.header && (
            <CardHeader>{renderBlocks(section.header, `${basePath}.header`, onSelect, onAction)}</CardHeader>
          )}
          {section.body && (
            <CardBody>{renderBlocks(section.body, `${basePath}.body`, onSelect, onAction)}</CardBody>
          )}
          {section.footer && (
            <CardFooter>{renderBlocks(section.footer, `${basePath}.footer`, onSelect, onAction)}</CardFooter>
          )}
        </Card>
      </SelectableWrapper>
    );
  }

  // Body-only section: render blocks directly in a Stack
  return (
    <SelectableWrapper path={basePath} onSelect={onSelect}>
      <Stack direction="column" gap={3} style={section.style}>
        {section.body ? renderBlocks(section.body, `${basePath}.body`, onSelect, onAction) : null}
      </Stack>
    </SelectableWrapper>
  );
};

/* ---------- Theme applier ---------- */

const ThemeApplier = ({
  themeVars,
  children,
}: {
  themeVars?: Record<string, string>;
  children: React.ReactNode;
}) => {
  React.useEffect(() => {
    if (!themeVars) return undefined;
    Object.entries(themeVars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
    return () => {
      Object.keys(themeVars).forEach((key) => {
        document.documentElement.style.removeProperty(key);
      });
    };
  }, [themeVars]);

  return <>{children}</>;
};

/* ---------- Page renderer ---------- */

type PageRendererProps = {
  page: PageData;
  className?: string;
  onSelect?: (path: string) => void;
  onAction?: ActionHandler;
};

export const PageRenderer = ({ page, className, onSelect, onAction }: PageRendererProps) => {
  const sections = React.useMemo(
    () => page.sections.map((section, index) => (
      <SectionNode key={section.id} section={section} sectionIndex={index} onSelect={onSelect} onAction={onAction} />
    )),
    [page.sections, onSelect, onAction],
  );

  return (
    <ThemeApplier themeVars={page.themeVars}>
      <Stack direction="column" gap={4} className={className}>
        {sections}
      </Stack>
    </ThemeApplier>
  );
};
