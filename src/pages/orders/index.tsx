import { useEffect, useState } from "react";
import { api } from "../../lib"
import dayjs from "dayjs";

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

export default function Orders() {

  const [orders, setOrders] = useState<OrderType[]>([])
  const token = localStorage.getItem('token')
  let id = "";

  const userLogged = localStorage.getItem("user");

  if (userLogged) {
    const userData = JSON.parse(userLogged);
    id = userData.user.id;
  }
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
    <div className="flex justify-center mt-12">
              <div className="w-full">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Produto</th>
                      <th className="px-4 py-2">Quantidade</th>
                      <th className="px-4 py-2">Preço</th>
                      <th className="px-4 py-2">Restaurante</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Data do Pedido</th>
                      {/* <th className="px-4 py-2">Salvar no carrinho</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {orders && orders.map((order:OrderType) => (
                      <tr key={order.id}>
                        <td className="border px-4 py-2 text-center">{order.product_name}</td>
                        <td className="border px-4 py-2 text-center">{order.quantity}</td>
                        <td className="border px-4 py-2 text-center">
                          {(order.price).toLocaleString('pt-BR', {
                            style:"currency",
                            currency:"BRL"
                          })}
                        </td>
                        <td className="border px-4 py-2 text-center">{order.restaurant.name}</td>
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