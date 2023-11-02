import { useEffect, useState } from "react";
import { api } from "../../../lib";

export default function FavoriteRestaurant() {

  const [favoriteRestaurants, setFavoriteRestaurants] = useState([])

  let id = "";

  const token = localStorage.getItem("token");
  const userLogged = localStorage.getItem("user");

  if (userLogged) {
    const userData = JSON.parse(userLogged);
    id = userData.user.id;
  }

  useEffect(() => {
    api.get(`/favorite-restaurant/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setFavoriteRestaurants(response.data)
    })
  },[token])

  return (
    <h1>teste</h1>
  )
}