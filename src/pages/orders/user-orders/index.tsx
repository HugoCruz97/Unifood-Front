import { useEffect, useState } from "react";
import { api } from "../../../lib/index"
import dayjs from "dayjs";
import { useAppDispatch } from "../../../store/index";
import { restaurantView } from "../../../store/slices/restaurant";

interface RestaurantType {
  name: string,
}


interface OrderType {
  id: string,
  createdAt: Date,
  product_name: string,
  quantity: number,
  price: number,
  status: string,
  restaurant: RestaurantType
}

export default function UserOrders() {

  const [orders, setOrders] = useState<OrderType[]>([])
  const dispatch = useAppDispatch()
  const token = localStorage.getItem('token')
  let user_id = "";

  const userLogged = localStorage.getItem("user");

  if (userLogged) {
    const userData = JSON.parse(userLogged);
    user_id = userData.user.id;
  }

  useEffect(() => {
    if (user_id) {
      api.get(`/restaurant/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          dispatch(restaurantView(response.data))
        })
        .catch((error) => {
          console.error("Erro ao buscar dados dos restaurantes!", error);
        });
    }
  }, [dispatch, user_id, token]);

  useEffect(() => {
    api.get(`/user-orders/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      setOrders(response.data)
    })
  },[user_id, token])

  return (
    <div className="flex flex-col gap-10 justify-center">
      <p className="font-bold text-zinc-900 text-3xl leading-relaxed">Pedidos feitos por você!</p>
      <div className="w-full">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Restaurante</th>
              <th className="px-4 py-2">Produto</th>
              <th className="px-4 py-2">Quantidade</th>
              <th className="px-4 py-2">Preço</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Data do Pedido</th>
              {/* <th className="px-4 py-2">Salvar no carrinho</th> */}
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((order:OrderType) => (
              <tr key={order.id}>
                <td className="border px-4 py-2 text-center">{order.restaurant.name}</td>
                <td className="border px-4 py-2 text-center">{order.product_name}</td>
                <td className="border px-4 py-2 text-center">{order.quantity}</td>
                <td className="border px-4 py-2 text-center">
                  {(order.price).toLocaleString('pt-BR', {
                    style:"currency",
                    currency:"BRL"
                  })}
                </td>
                <td className="border px-4 py-2 flex gap-2 justify-center items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-600"></span> 
                  {order.status}
                </td>
                <td className="border px-4 py-2 text-center">{dayjs(order.createdAt).format('DD/MM/YYYY')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  </div>
  )
}