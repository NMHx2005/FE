import { CartItem } from '../types';
import { api } from "../index";

export const cartService = {
  getCartItems: async () => {
    const response = await api.get<CartItem[]>('/cart/items');
    return response.data;
  },

  addToCart: async (productId: string, quantity: number) => {
    const response = await api.post<CartItem>('/cart/items', {
      productId,
      quantity,
    });
    return response.data;
  },

  updateCartItem: async (itemId: string, quantity: number) => {
    const response = await api.put<CartItem>(`/cart/items/${itemId}`, {
      quantity,
    });
    return response.data;
  },

  removeFromCart: async (itemId: string) => {
    await api.delete(`/cart/items/${itemId}`);
  },
}; 