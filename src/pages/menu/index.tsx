import { useNavigate } from "react-router-dom"
import { UserCog, LogOut, UtensilsCrossed, BadgeDollarSign } from 'lucide-react'
import { ReactNode } from "react"
import Logo from "../../components/logo"

interface MenuProps {
  children?: ReactNode
}

export default function Menu ({ children }: MenuProps){
  const navigate = useNavigate()

  let hasRestaurant = false

  const userLogged = localStorage.getItem('user')

  if (userLogged) {
    const userData = JSON.parse(userLogged)

    hasRestaurant = userData.user.hasRestaurant
  }

  const logOut = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div>
      {/* <div className="border-r-2 border-rose-900"></div> */}
      <Logo />
      <nav className="w-52 mt-12">
        <div
          onClick={() => navigate('/perfil')}
          className="flex p-5 justify-start gap-2 items-center cursor-pointer hover:bg-slate-100 hover:duration-200"
        >
          <UserCog size={24} />
          <p className="p-1">Meu usuário</p>
        </div>
        <div className="w-52 border-2 border-rose-900 border-opacity-50 outline-none border-x-0 border-t-0" />
        {!hasRestaurant && (
          <div
            onClick={() => navigate('/new-restaurant')}
            className="flex p-5 justify-start gap-2 items-center cursor-pointer hover:bg-slate-100 hover:duration-200"
          >
            <UtensilsCrossed size={24} />
            <p className="p-1">Criar Restaurante</p>
          </div>
        )}
        {hasRestaurant && (
          <div
            onClick={() => navigate('/restaurant')}
            className="flex p-5 justify-start gap-2 items-center cursor-pointer hover:bg-slate-100 hover:duration-200"
          >
            <UtensilsCrossed size={24} />
            <p className="p-1">Meu restaurante</p>
          </div>
        )}
        <div className="w-52 border-2 border-rose-900 border-opacity-50 outline-none border-x-0 border-t-0" />
        <div
          onClick={() => navigate('/orders')} 
          className="flex p-5 justify-start gap-2 items-center cursor-pointer hover:bg-slate-100 hover:duration-200"
        >
          <BadgeDollarSign size={24} />
          <p className="p-1">Pedidos</p>
        </div>
        <div className="w-52 border-2 border-rose-900 border-opacity-50 outline-none border-x-0 border-t-0" />
        <div
          onClick={logOut}
          className="flex p-5 justify-start gap-2 items-center cursor-pointer hover:bg-slate-100 hover:duration-200"
        >
          <LogOut size={24} />
          <p className="p-1">Sair</p>
        </div>
      </nav>
      <main className="ml-72 -mt-[281px]">{children}</main>
    </div>
  )
}