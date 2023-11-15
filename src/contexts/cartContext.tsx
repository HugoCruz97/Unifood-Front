import { createContext, useContext, useState } from "react";

interface CartItem {
  id: string,
  name: string,
  price: number,
  quantity: number
  description: string,
  restaurant_id: string
}

interface CartContextProps {
  items: CartItem[]
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>
}

export const CartContext = createContext<CartContextProps>({
  items: [],
  setItems: () => {}
});

export const CartProvider = ({ children }:any) => {
  const [items, setItems] = useState<CartItem[]>([])

  return (
    <CartContext.Provider
      value={{ items, setItems }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)