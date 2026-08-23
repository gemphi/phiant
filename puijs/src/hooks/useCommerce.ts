import { useStore } from './useStore';
import { cartStore, wishlistStore, CartState, WishlistState } from '../store/commerceStores';

export function useCart(): CartState {
  return useStore(cartStore);
}

export function useWishlist(): WishlistState {
  return useStore(wishlistStore);
}
