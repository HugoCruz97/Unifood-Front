import { useEffect } from "react";
import { api } from "../../lib";
import dayjs from "dayjs";
import NewProducts from "./new-products";
import { useAppDispatch, useAppSelector } from "../../store";
import { restaurantView } from "../../store/slices/restaurant";
import { Pencil, X } from "lucide-react";
import { toast } from 'react-toastify'


export default function Restaurant() {
  const dispatch = useAppDispatch()
  let id = "";

  const token = localStorage.getItem("token");
  const userLogged = localStorage.getItem("user");

  const restaurant = useAppSelector(state => {
    return state.restaurant
  })

  if (userLogged) {
    const userData = JSON.parse(userLogged);
    id = userData.user.id;
  }
  
  useEffect(() => {
    if (id) {
      api.get(`/restaurant/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          dispatch(restaurantView(response.data))
        })
        .catch((error) => {
          console.error("Erro ao buscar dados dos restaurantes:", error);
        });
    }
  }, [dispatch, id, token]);

  const removeProduct = (index: string) => {
    api.delete(`/products/${index}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      toast.success('Produto removido com sucesso!', {
        position: 'top-right',
        autoClose: 1000,
        theme: 'light',
      })
      setTimeout(() => window.location.reload(),1000)
    })
  }

  const dateFormat = dayjs(restaurant.createdAt).format('DD/MM/YYYY')
  
  return (
    <div>
      <div className="flex justify-around items-center">
        <img className="w-24 h-24 rounded-full" src={restaurant.logoUrl} alt={`Logo do ${restaurant.name}`} />
        <div>
          <h1 className="text-zinc-900 font-bold text-4xl ml-24">{restaurant.name}</h1>
        </div>
        <div>
          <p className="text-zinc-500 text-sm mt-4">Inaugurado em {dateFormat}</p>
        </div>
      </div>
      <div className="w-full h-20"/>
      <div>
        {restaurant.description}
      </div>
      <div className="flex items-center">
        <div>
          Gostou de alguma coisa? 
          Clique no número e entre em contato:{' '}
          <span onClick={() => {console.log('Clicou')}} className="font-semibold text-zinc-900 cursor-pointer">{restaurant?.contact_number}</span>
        </div>
        <div className="text-white bg-emerald-500 ml-[700px] rounded-lg transition-colors hover:bg-emerald-400">
          <NewProducts />
        </div>
      </div>
      <div className="flex justify-center mt-32">
      <div className="w-full -ml-20">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">Descrição</th>
              <th className="px-4 py-2">Quantidade</th>
              <th className="px-4 py-2">Valor Unitário</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {restaurant.Products && restaurant.Products.map((product) => (
              <tr key={product.id}>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.description}</td>
                <td className="border px-4 py-2">{product.quantity}</td>
                <td className="border px-4 py-2">{product.price}</td>
                <td className="border px-4 py-2 flex items-center justify-center gap-5">
                  <Pencil className="w-4 h-4 cursor-pointer text-emerald-800 transition-colors hover:text-emerald-600" />
                  <X  onClick={() => removeProduct(product.id)} className="w-4 h-4 text-red-400 cursor-pointer transition-colors hover:text-red-600" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}
