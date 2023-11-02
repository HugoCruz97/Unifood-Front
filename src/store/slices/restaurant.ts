import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Products {
  id: string
  name: string,
  price: string,
  quantity: string,
  description: string,
  restaurant_id: string
}

interface Restaurant {
  id: string,
  name: string,
  createdAt: Date,
  logoUrl: string,
  address: string,
  cep: string,
  description: string,
  contact_number: string,
  user_id: string,
  Products: Products[]
}

const initialState: Restaurant = {
  id: '',
  name: '',
  createdAt: new Date(),
  logoUrl: '',
  address: '',
  cep: '',
  description: '',
  contact_number: '',
  user_id: '',
  Products: []
}

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    restaurantView: (state, action: PayloadAction<Restaurant>) => {
      // state.address = action.payload.address
      // state.cep = action.payload.cep
      // state.contact_number = action.payload.contact_number
      // state.createdAt = action.payload.createdAt
      // state.description = action.payload.description
      // state.id = action.payload.id
      // state.logoUrl = action.payload.logoUrl
      // state.name = action.payload.name
      // state.user_id = action.payload.user_id
      // state.products = action.payload.products
      Object.assign(state, action.payload)
    }
  }
})

export const restaurant = restaurantSlice.reducer

export const { restaurantView } = restaurantSlice.actions