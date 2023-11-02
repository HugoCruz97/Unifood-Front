import { useState } from "react"
import { LoadingComponent } from "../../components/loading"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import * as zod from 'zod'
import 'react-toastify/dist/ReactToastify.css'
import { api } from "../../lib"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const signinValidationSchema = zod.object({
  email: zod.string(),
  password: zod.string(),
  name: zod.string()
})

type FormData = zod.infer<typeof signinValidationSchema>;

export default function NewUser () {
  const [ loading ,setLoading] = useState(false)
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(signinValidationSchema)
  })

  const newUserSubmit:SubmitHandler<FormData> = ({ email, password, name }) => {
    setLoading(true)
     api.post('signin', {
      email,
      password,
      name
    }).then(() => {
      setLoading(false)
      navigate('/')
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
      setLoading(false)
    })
  }

  return (
    <div>
      <div className="flex justify-center items-center mt-12">
        <h1 className="font-bold text-6xl tracking-tighter uppercase">
          uni
          <span className="text-red-500 text-6xl">food</span>
        </h1>
      </div>
      {loading && <LoadingComponent />}
      {!loading && (
        <form
          onSubmit={handleSubmit(newUserSubmit)}
          className="w-full flex flex-col items-center mt-20"
        >
          <div className="flex flex-col justify-center items-center gap-4">
          <fieldset className="flex flex-col">
              <label className="text-xl font-bold text-rose-900 flex justify-center">
                Nome
              </label>
              <input
                className="h-20 w-80 border-2 border-rose-900 border-opacity-50 outline-none border-x-0 border-t-0"
                id="nome"
                placeholder="Digite seu nome"
                autoFocus
                {...register('name')}
              />
            </fieldset>

            <fieldset className="flex flex-col">
              <label className="text-xl font-bold text-rose-900 flex justify-center">
                Email
              </label>
              <input
                className="h-20 w-80 border-2 border-rose-900 border-opacity-50 outline-none border-x-0 border-t-0"
                id="email"
                placeholder="Digite seu email"
                {...register('email')}
              />
            </fieldset>

            <fieldset className="flex flex-col">
              <label className="text-xl font-bold text-rose-900 flex justify-center">
                Senha
              </label>
              <input
                className="h-20 w-80 border-2 border-rose-900 border-opacity-50 outline-none border-x-0 border-t-0"
                id="password"
                placeholder="Digite sua senha"
                type="password"
                {...register('password')}
              />
            </fieldset>

            <button
              type="submit"
              className="w-48 h-16 bg-red-600 rounded-2xl text-white my-11 font-semibold text-xl uppercase transition-colors hover:bg-red-500"
            >
              Criar
            </button>
          </div>
        </form>
      )}
    </div>
  )
}