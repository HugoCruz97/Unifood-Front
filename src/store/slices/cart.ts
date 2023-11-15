import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Product {
  id: string,
  name: string,
  price: string,
  quantity: string,
  description: string
}

interface List {
  items: Product[]
}

const initialState: List = {
  items: []
}

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    order: (state, action: PayloadAction<Product>) => {
      const { id, name, price, quantity, description } = action.payload;
      state.items.push({ ...state.items,id, name, price, quantity, description })
    },
    remove: (state, action: PayloadAction<string>) => {
      const productIdToRemove = action.payload;
      state.items = state.items.filter(product => product.id !== productIdToRemove);
    }
  }
})

export const shoppingCart = shoppingCartSlice.reducer

export const { order, remove } = shoppingCartSlice.actions