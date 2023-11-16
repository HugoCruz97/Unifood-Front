import { Trash } from "lucide-react"
import { api } from "../../lib"
import { toast } from 'react-toastify'
import { useState} from 'react'
import { useCart } from '../../contexts/cartContext'

export default function Cart() {

  const [qtd, setQtd] = useState(1)
  const { items, setItems } = useCart()
  let user_id = "";

  const token = localStorage.getItem("token");
  const userLogged = localStorage.getItem("user");

  if (userLogged) {
    const userData = JSON.parse(userLogged);
    user_id = userData.user.id;
  }


  const increaseQtd = () => {
    items.map((item) => {
      const { quantity } = item
      if (qtd != quantity) {
        setQtd(qtd + 1)
      }
    })
  };

  const decreaseQtd = () => {
    if (qtd != 1) {
      setQtd(qtd - 1)
    }
  }

  const removeItensCart = (index: number) => {
    const updateCartItems = [...items]
    updateCartItems.splice(index, 1)
    setItems(updateCartItems)
  }

  const handleBuyItems = () => {

    items.map((item) => {
      const { name, restaurant_id, price } = item
      const priceTotal = price * qtd
      return (
        api.post('/order', {
          name,
          restaurant_id,
          user_id,
          priceTotal,
          qtd
        },{
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(() => {
          toast.success('Compra realizada com sucesso!', {
            position: 'top-right',
            autoClose: 1000,
            theme: 'light',
          })
          setTimeout(() => window.location.reload(),1000)
          setItems([])
        }).catch(() => {
          toast.error('Erro ao finalizar compra!', {
            position: 'top-right',
            autoClose: 5000,
            theme: 'light',
          })
        })
      )
    })
  }

  return (
    <div className="flex flex-col w-full gap-24">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">Descrição</th>
            <th className="px-4 py-2">Quantidade</th>
            <th className="px-4 py-2">Valor</th>
            <th className="px-4 py-2"></th>
            {/* <th className="px-4 py-2">Salvar no carrinho</th> */}
          </tr>
        </thead>
        <tbody>
        {items && items.map((item,index) => {
          return (
            <tr key={index}>
              <td className="border px-6 py-4 text-center">{item.name}</td>
              <td className="border px-6 py-4 text-center">{item.description}</td>
              <td className="border px-6 py-5 itens-center justify-center flex gap-2">
                <button onClick={decreaseQtd} className="text-base font-bold text-red-500/60 transition-colors hover:text-red-600/80">-</button>
                <p className="text-base">{qtd}</p>
                <button onClick={increaseQtd} className="text-base font-bold text-emerald-500/60 transition-colors hover:text-emerald-600/80">+</button>
              </td>
              <td className="border px-6 py-4 text-center">
                {(item.price * qtd).toLocaleString('pt-BR', {
                  style: "currency",
                  currency: "BRL"
                })}
              </td>
              <td className="border px-1 py-5 flex items-center justify-center">
                <Trash 
                  className="w-5 h-5 text-red-500 transition-colors cursor-pointer hover:text-red-700" 
                  onClick={(index) => {
                    removeItensCart(index)
                  }}
                />
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
      <button 
        className="bg-emerald-500 p-3 rounded-xl text-white font-semibold transition-colors cursor-pointer hover:bg-emerald-600"
        onClick={handleBuyItems}
      >
        Finalizar compra
      </button>
    </div>  
  )
}