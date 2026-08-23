/* ---------- Block: the universal tree node ---------- */

/**
 * A Block is the universal building block of a page.
 * A page is a tree of Blocks. Each Block has:
 * - type: a PUI (Phient UI) component type (must exist in componentRegistry)
 * - variant: optional variant (e.g. 'primary', 'outline')
 * - props: pure data (no functions — actions use `action` string identifiers)
 * - style: CSS custom properties / inline styles
 * - children: string text or nested Blocks
 * - dataSource: optional key to fetch data from the store
 */
export type Block = {
  id?: string;
  type: string;
  variant?: string;
  props?: Record<string, any>;
  style?: Record<string, string | number>;
  children?: string | Block[];
  /** Store key — renderer fetches data and merges into props */
  dataSource?: string;
  /** Template for each item when dataSource returns { items: [...] }.
   *  Placeholders like {item.field} are interpolated from each item. */
  itemTemplate?: Block;
};

/* ---------- Section: a Block with header/body/footer ---------- */

/**
 * A Section is a structured Block that has a header, body, and footer.
 * Each part is itself a Block (or array of Blocks).
 * Sections are the top-level blocks of a page.
 */
export type Section = {
  id: string;
  name?: string;
  variant?: string;
  props?: Record<string, any>;
  style?: Record<string, string | number>;
  header?: Block | Block[];
  body?: Block | Block[];
  footer?: Block | Block[];
  /** Store key — renderer fetches section data from store */
  dataSource?: string;
};

/* ---------- Page: a collection of sections ---------- */

export type PageData = {
  id: string;
  name: string;
  description?: string;
  layoutType: string;
  themeVars?: Record<string, string>;
  sections: Section[];
  /** Store key — renderer fetches page-level data */
  dataSource?: string;
};

/* ---------- Site: a collection of pages with a theme ---------- */

export type SiteDefinition = {
  id: string;
  name: string;
  description?: string;
  themeVars?: Record<string, string>;
  pages: PageData[];
};

/* ---------- Store data types ---------- */

/**
 * Store data is resolved by dataSource key.
 * The store returns props that get merged into the block's props.
 */
export type StoreData = {
  [key: string]: Record<string, any>;
};

/* ---------- Backward compat: PageComponent → Block ---------- */

export type PageComponent = Block;
export type PageComponentType = string;
export type PageSection = Section;
export type PageSectionLayout = string;
export type PageLayoutType = string;
