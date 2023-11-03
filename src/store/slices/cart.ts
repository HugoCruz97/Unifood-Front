import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Products {
  name: string,
  price: string,
  quantity: string
}

interface List {
  listProducts: Products[]
}

const initialState: List = {
  listProducts: []
}

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    order: (state, action: PayloadAction<List>) => {
      Object.assign(state, action.payload)
    }
  }
})

export const shoppingCart = shoppingCartSlice.reducer

export const { order } = shoppingCartSlice.actions