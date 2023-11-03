import { Routes ,Route } from 'react-router-dom'
import Menu from '../pages/menu'
import Login from '../pages/login'
import NewUser from '../pages/user/new-user'
import Restaurant from '../pages/restaurant'
import NewRestaurant from '../pages/restaurant/new-restaurant'
import User from '../pages/user'
import ListRestaurants from '../pages/restaurant/list-restaurants'
import FavoriteRestaurant from '../pages/restaurant/favorite-restaurant'

export function RoutesComponent() {
  return (
    <Routes>
      {/* Rotas Login */}
      <Route path='/' element={<Login />} />
      {/* Rotas Menu */}
      <Route path='/menu' element={<Menu><ListRestaurants /></Menu>} />
      {/* Rotas Restaurante */}
      <Route path='/restaurant' element={<Menu><Restaurant /></Menu>} />
      <Route path='/new-restaurant' element={<Menu><NewRestaurant /></Menu>} />
      <Route path='/favorites' element={<Menu><FavoriteRestaurant /></Menu>} />
      {/* Rotas Usuário */}
      <Route path='/perfil' element={<Menu><User /></Menu>} />
      <Route path='/signin' element={<NewUser />} />
    </Routes>
  )
}