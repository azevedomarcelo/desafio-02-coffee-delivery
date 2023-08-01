import { createContext, useCallback, useState } from 'react';
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
  products: ProductProps[];
  cart: ProductProps[];
  handleAddToCart: (product: ProductProps) => void;
  handleQuantityChange: (productId: number, quantity: number) => void;
  handleRemoveItemFromCart: (productId: number) => void;
  setSelectedPaymentMethod: (number: number) => void;
  selectedPaymentMethod: number;
}

export const CartContext = createContext({} as CartContextProps);

export const CartProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<ProductProps[]>(initialProducts);
  const [cart, setCart] = useState<ProductProps[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(0);


  const handleAddToCart = useCallback((product: ProductProps) => {
    setCart(state => [...state, product]);
  }, []);

  const handleQuantityChange = useCallback((productId: number, quantity: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, quantity } : product
      )
    );
  }, []);

  const handleRemoveItemFromCart = useCallback((productId: number) => {
    console.log(productId);
  }, []);
  
  return (
    <CartContext.Provider value={{
      cart,
      products,
      handleAddToCart,
      handleQuantityChange,
      handleRemoveItemFromCart,
      selectedPaymentMethod, 
      setSelectedPaymentMethod,
    }}>
      {children}
    </CartContext.Provider>
  );
};
