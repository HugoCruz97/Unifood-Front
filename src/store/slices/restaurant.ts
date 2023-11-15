import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Products {
  id: string
  name: string,
  price: number,
  quantity: number,
  description: string,
  restaurant_id: string
}

interface Restaurant {
  id: string,
  name: string,
  createdAt: string,
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
  createdAt: '',
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
      Object.assign(state, action.payload)
    }
  }
})

export const restaurant = restaurantSlice.reducer

export const { restaurantView } = restaurantSlice.actions