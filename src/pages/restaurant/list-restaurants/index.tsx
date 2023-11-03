import { api } from "../../../lib";
import { FormEvent, useEffect, useState } from 'react'
import { Heart } from "lucide-react";
import dayjs from "dayjs";
import ModalRestaurant from "./modal-restaurant";

interface Restaurant {
  id: string
  name: string,
  description: string,
  logoUrl: string,
  createdAt: Date
}

export default function ListRestaurants() {

  const token = localStorage.getItem("token");
  let id = "";

  const userLogged = localStorage.getItem("user");

  if (userLogged) {
    const userData = JSON.parse(userLogged);
    id = userData.user.id;
  }

  const [restaurants, setRestaurants] = useState<Restaurant[]>()

  useEffect(() => {
    api.get(`/list-restaurant/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setRestaurants(response.data)
    }
    )
  },[token])

  const searchRestaurants = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    api.post('/filter',{
      nome: formData.get("filter"),
      id
    },{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setRestaurants(response.data)
    })
  }

  return (
    <div>
      <div className="w-full -ml-20">
        <form onSubmit={searchRestaurants} className="ml-10 flex justify-start items-center gap-28">
          <fieldset>
            <label>Restaurante: </label>
            <input 
              placeholder="Digite o nome do restaurante" 
              name="filter" 
              type="text" 
              className="ml-3 w-56 border-2 border-rose-900 border-opacity-50 outline-none border-x-0 border-t-0 placeholder:text-xs" 
            />
          </fieldset>
          <button className="p-2 -ml-20 rounded-lg bg-emerald-500 text-white transition-colors hover:bg-emerald-400">
            Pesquisar
          </button>
        </form>
        <div className="flex flex-col gap-10 p-8 mt-8">
        {restaurants && restaurants.map((restaurant) => (
          <>
            <div className="flex justify-between">
              <div className="flex gap-8">
                <img className="h-20 w-20" src={restaurant.logoUrl} alt="Logo do Restaurante" />
                <div className="flex flex-col gap-2">
                  <p className="text-3xl text-zinc-600 font-semibold">{restaurant.name}</p>
                  <p className="text-sm leading-relaxed text-zinc-400">{restaurant.description}</p>
                  <p className="text-sm leading-relaxed text-zinc-400">Fundado em {dayjs(restaurant.createdAt).format('DD/MM/YYYY')}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <ModalRestaurant restaurantSelected={restaurant} />
                <Heart className="w-8 h-8 text-red-700 cursor-pointer transition-colors hover:text-red-500" />
              </div>
            </div>
            <div className="ml-3 w-full border-2 border-rose-900 border-opacity-50 outline-none border-x-0 border-t-0" />
          </>
        ))}
      </div>
    </div>
  </div>
  )
}