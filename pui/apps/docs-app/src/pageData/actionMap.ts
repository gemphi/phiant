import React from 'react';

/* ---------- Generic action system ---------- */

/**
 * A generic action handler. Receives the action name, payload, and context.
 * The store provides this — data just says `action: 'addToCart'`.
 */
export type ActionHandler = (action: string, payload: any, context: ActionContext) => void;

export type ActionContext = {
  /** The component path in the page data tree */
  path: string;
  /** The component type, e.g. 'ProductCard' */
  type: string;
  /** All props of the component */
  props: Record<string, any>;
};

/**
 * Map of which callback prop name each component type uses.
 * The renderer reads `action` + `actionPayload` from props,
 * then assigns the handler to the correct callback prop.
 *
 * This is the ONLY place that knows about component-specific prop names.
 * Add new components here as needed.
 */
const CALLBACK_PROP_MAP: Record<string, string> = {
  ProductCard: 'onAddToCart',
  ItemCard: 'onQuantityChange',
  OrderCard: 'onCheckout',
  Button: 'onClick',
  // Default: most components use onClick
};

const getCallbackProp = (componentType: string): string =>
  CALLBACK_PROP_MAP[componentType] ?? 'onClick';

/**
 * Resolve `action` / `actionPayload` from a component's props into
 * actual callback functions that the PUI (Phient UI) component expects.
 *
 * - `action` → mapped to the component's callback prop (e.g. onAddToCart)
 * - `actionPayload` → passed to the handler
 * - `removeAction` → mapped to onRemove (for ItemCard etc.)
 */
export const resolveActions = (
  props: Record<string, any> = {},
  componentType: string,
  path: string,
  handler?: ActionHandler,
): Record<string, any> => {
  if (!handler) return props;

  const resolved: Record<string, any> = { ...props };
  const context: ActionContext = { path, type: componentType, props };

  // Primary action → component's main callback
  if (props.action) {
    const callbackProp = getCallbackProp(componentType);
    resolved[callbackProp] = (value?: any) => {
      handler(props.action, props.actionPayload ?? value, context);
    };
  }

  // Remove action → onRemove (for cart items, wishlist, etc.)
  if (props.removeAction) {
    resolved.onRemove = () => {
      handler(props.removeAction, props.removePayload, context);
    };
  }

  // Clean up action identifiers from props (they're not real component props)
  delete resolved.action;
  delete resolved.actionPayload;
  delete resolved.removeAction;
  delete resolved.removePayload;

  return resolved;
};
