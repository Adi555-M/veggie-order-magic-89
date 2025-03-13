
export interface UserInfo {
  name: string;
  phone: string;
  address: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  unit: 'kg' | 'g' | 'piece';
  totalPrice: number;
}

// Save user info to local storage
export const saveUserInfo = (userInfo: UserInfo): void => {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
};

// Get user info from local storage
export const getUserInfo = (): UserInfo | null => {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? JSON.parse(userInfo) : null;
};

// Save cart to local storage
export const saveCart = (cart: CartItem[]): void => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Get cart from local storage
export const getCart = (): CartItem[] => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

// Save order history to local storage
export const saveOrderHistory = (order: any): void => {
  const orderHistory = getOrderHistory();
  orderHistory.push({
    ...order,
    orderId: `ORD${Date.now()}`,
    orderDate: new Date().toISOString(),
  });
  localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
};

// Get order history from local storage
export const getOrderHistory = (): any[] => {
  const orderHistory = localStorage.getItem('orderHistory');
  return orderHistory ? JSON.parse(orderHistory) : [];
};

// Clear cart
export const clearCart = (): void => {
  localStorage.removeItem('cart');
};
