import { createContext, useCallback, useReducer, useState } from 'react';
import { products as initialProducts } from "../products";

interface ProductProps {
  id: number;
  name: string;
  url: string;
  description: string;
  quantity: number;
  tags: string[];
  price: number;
}

interface Props {
  children: React.ReactNode
}

interface CartContextProps {
  productState: ProductProps[];
  cart: ProductProps[];
  handleAddToCart: (product: ProductProps) => void;
  handleQuantityChange: (productId: number, quantity: number) => void;
  handleRemoveItemFromCart: (productId: number) => void;
  setSelectedPaymentMethod: (number: number) => void;
  selectedPaymentMethod: number;
}

export const CartContext = createContext({} as CartContextProps);

export const CartProvider = ({ children }: Props) => {
  const [productState, dispatch] = useReducer((state: ProductProps[], action: any) => {
    switch (action.type) {
      case 'QUANTITY_CHANGE':
        return state.map((product) =>
          product.id === action.payload.productId ?
            { ...product, quantity: action.payload.quantity }
            : product
        )
      default:
        return state;
    }
  }, initialProducts);

  const [cart, setCart] = useState<ProductProps[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(-1);

  const handleAddToCart = useCallback((product: ProductProps) => {
    setCart(state => [...state, product]);
  }, []);

  const handleQuantityChange = useCallback((productId: number, quantity: number) => {
    dispatch({
      type: 'QUANTITY_CHANGE',
      payload: {
        productId,
        quantity,
      }
    });
  }, []);

  const handleRemoveItemFromCart = useCallback((productId: number) => {
    const newProducts = cart.filter(p => p.id !== productId);
    setCart(newProducts);
  }, [cart]);

  return (
    <CartContext.Provider value={{
      cart,
      productState,
      handleAddToCart,
      handleQuantityChange,
      selectedPaymentMethod,
      handleRemoveItemFromCart,
      setSelectedPaymentMethod,
    }}>
      {children}
    </CartContext.Provider>
  );
};
