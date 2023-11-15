import { FormEvent, useState } from "react"
import { toast } from 'react-toastify'
import { api } from "../../lib"

export default function User() {
  const [edit, setEdit] = useState(true)

  const token = localStorage.getItem('token')

  let name = ''
  let email = ''
  let id = ''

  const userLogged = localStorage.getItem('user')

  if (userLogged) {
    const userData = JSON.parse(userLogged)

    name = userData.user.name
    email = userData.user.email
    id = userData.user.id
  }

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  async function updateUser(event:FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget)
     await api.put(`user/${id}`, {
      name: formData.get('name'),
      email: formData.get('email'),
    }, config).then(() => {
      toast.success('Usuário editado com sucesso!', {
        position: 'top-right',
        autoClose: 5000,
        theme: 'light'
      })
      setTimeout(() => window.location.reload(),1000)
    }).catch(() => {
      toast.error('Erro ao criar usuário', {
        position: 'top-right',
        autoClose: 5000,
        theme: 'light',
      })
    })
  }

  return (
    <div>
      <form className="flex gap-10" onSubmit={updateUser}>
        <div className="flex items-center gap-2 mt-6">
          <label>Nome:</label>
          <input 
            className="h-10 w-80 border-2 border-zinc-900 border-opacity-50 outline-none p-2 disabled:bg-zinc-200" 
            type="text" 
            name="name"
            defaultValue={name} 
            disabled={edit}
          />
        </div>
        <div className="flex gap-2 mt-6 items-center">
          <label>E-mail:</label>
          <input 
            className="h-10 w-80 border-2 border-zinc-900 border-opacity-50 outline-none p-2 disabled:bg-zinc-200" 
            type="text" 
            name="email"
            defaultValue={email} 
            disabled={edit}
          />
        </div>
      </form>
      <div>
          <button 
            className="w-24 h-12 bg-red-600 rounded-2xl text-white my-11 font-semibold text-sm uppercase transition-colors hover:bg-red-500"
            onClick={() => {setEdit(false)}}
            hidden={!edit}  
          >
            Editar
          </button>
        </div>
        <div>
          <button 
            className="w-24 h-12 bg-red-600 rounded-2xl text-white my-11 font-semibold text-sm uppercase transition-colors hover:bg-red-500"
            hidden={edit}
            type="submit"
          >
            Salvar
          </button>
        </div>
    </div>
  )
}