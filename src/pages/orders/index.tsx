import { useEffect, useState } from "react";
import { api } from "../../lib"
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../store";
import { restaurantView } from "../../store/slices/restaurant";

interface UserType {
  name: string,
}


interface OrderType {
  id: string,
  createdAt: Date,
  product_name: string,
  quantity: number,
  price: number,
  status: string,
  user: UserType
}

export default function Orders() {

  const [orders, setOrders] = useState<OrderType[]>([])
  const dispatch = useAppDispatch()
  const token = localStorage.getItem('token')
  let user_id = "";

  const userLogged = localStorage.getItem("user");

  if (userLogged) {
    const userData = JSON.parse(userLogged);
    user_id = userData.user.id;
  }
  
  const { id, name } = useAppSelector(state => {
    return state.restaurant
  })

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
  }, [dispatch, id, token]);

  useEffect(() => {
    api.get(`/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      setOrders(response.data)
    })
  },[id, token])

  return (
    <div className="flex flex-col gap-10 justify-center">
      <p className="font-bold text-zinc-900 text-3xl leading-relaxed">Pedidos feitos no seu {name}!</p>
      <div className="w-full">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Cliente</th>
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
                <td className="border px-4 py-2 text-center">{order.user.name}</td>
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