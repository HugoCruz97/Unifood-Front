import { useNavigate } from "react-router-dom"
import ShoppingCart from "../pages/shopping-cart"

export default function Logo() {
  const navigate = useNavigate()

  let name = ''

  const userLogged = localStorage.getItem('user')

  if (userLogged) {
    const userData = JSON.parse(userLogged)

    name = userData.user.name
  }

  return (
    <>
      <div
        className="flex justify-between items-center p-3 ml-2"
      >
        <div className="cursor-pointer" onClick={() => navigate('/menu')}>
          <h1 className="font-bold text-3xl tracking-tighter uppercase">
            uni
            <span className="text-red-500 text-3xl">
              food
            </span>
          </h1>
        </div>
        <div className="flex gap-5 justify-center items-center">
          <h1>Bem vindo(a), {name}</h1>
          <ShoppingCart />
        </div>
      </div>
      <div className="w-full border-2 border-rose-900 border-opacity-50 outline-none border-x-0 border-t-0" />
    </>
  )
}