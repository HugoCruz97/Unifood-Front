import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from 'zod'
import { toast } from 'react-toastify'
import { api } from "../../lib"

const updateSchema = zod.object({
  email: zod.string(),
  password: zod.string(),
  name: zod.string()
})

type FormData = zod.infer<typeof updateSchema>;


export default function User() {
  const [edit, setEdit] = useState(true)

  const token = localStorage.getItem('token')

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(updateSchema)
  })

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

  const updateUser:SubmitHandler<FormData> = ({ email, name }) => {
     api.put(`user/${id}`, {
      email,
      name
    }, config).then(() => {
      toast.success('Usuário criado com sucesso!', {
        position: 'top-right',
        autoClose: 5000,
        theme: 'light'
      })
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
      <form className="flex gap-10" onSubmit={handleSubmit(updateUser)}>
        <div className="flex items-center gap-2 mt-6">
          <label>Nome:</label>
          <input 
            className="h-10 w-80 border-2 border-zinc-900 border-opacity-50 outline-none p-2" 
            type="text" 
            defaultValue={name} 
            readOnly={edit}
            {...register('name')} 
          />
        </div>
        <div className="flex gap-2 mt-6 items-center">
          <label>E-mail:</label>
          <input 
            className="h-10 w-80 border-2 border-zinc-900 border-opacity-50 outline-none p-2" 
            type="text" 
            defaultValue={email} 
            readOnly={edit}
            {...register('email')} 
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