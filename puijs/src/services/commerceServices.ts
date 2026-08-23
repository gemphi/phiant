import { BaseService } from './baseService';
import { cartStore, CartItemModel } from '../store/commerceStores';

export class CartService extends BaseService {
  readonly name = 'CartService';

  addToCart(item: Omit<CartItemModel, 'quantity'> & { quantity?: number }): void {
    cartStore.getState().addItem(item);
    this.emit('item_added', item);
    this.log(`Added "${item.title}" to cart`);
  }

  removeFromCart(id: string): void {
    cartStore.getState().removeItem(id);
    this.emit('item_removed', { id });
    this.log(`Removed item ${id} from cart`);
  }

  updateQuantity(id: string, quantity: number): void {
    cartStore.getState().updateQuantity(id, quantity);
    this.emit('quantity_changed', { id, quantity });
  }

  checkout(): Promise<{ success: boolean; orderId: string }> {
    return new Promise((resolve) => {
      const items = cartStore.getState().items;
      this.emit('checkout_started', { items });
      setTimeout(() => {
        const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
        cartStore.getState().clearCart();
        this.emit('checkout_completed', { orderId });
        resolve({ success: true, orderId });
      }, 1000);
    });
  }
}

export class TelemetryService extends BaseService {
  readonly name = 'TelemetryService';
  private logs: Array<{ timestamp: string; event: string; payload: any }> = [];

  track(event: string, payload?: any): void {
    const entry = {
      timestamp: new Date().toISOString(),
      event,
      payload,
    };
    this.logs.push(entry);
    this.emit('track', entry);
  }

  getRecentEvents() {
    return [...this.logs];
  }
}
