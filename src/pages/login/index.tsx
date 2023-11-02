
import { SubmitHandler, useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { LoadingComponent } from '../../components/loading'
import { api } from '../../lib'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const loginValidationSchema = zod.object({
  email: zod.string(),
  password: zod.string(),
})

type FormData = zod.infer<typeof loginValidationSchema>;

export default function Login () {
  const [ loading ,setLoading] = useState(false)

  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(loginValidationSchema)
  })

  const loginUser:SubmitHandler<FormData> = ({ email, password }) => {
    setLoading(true)
     api.post('register', {
      email,
      password
    }).then((response) => {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data))
      setLoading(false)
      navigate('/menu')
    }).catch(() => {
      toast.error('Usuário e/ou senha incorretos', {
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
          onSubmit={handleSubmit(loginUser)}
          className="w-full flex flex-col items-center mt-20"
        >
          <div className="flex flex-col justify-center items-center gap-4">
            <fieldset className="flex flex-col">
              <label className="text-xl font-bold text-rose-900 flex justify-center">
                Login
              </label>
              <input
                className="h-20 w-80 border-2 border-rose-900 border-opacity-50 outline-none border-x-0 border-t-0"
                id="login"
                placeholder="Digite seu login"
                autoFocus
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
              Entrar
            </button>
            <p>
              É novo aqui?{' '}
              <button
                onClick={() => navigate('/signin')}
                className="text-rose-900 font-semibold"
              >
                Cadastre-se!
              </button>
            </p>
          </div>
        </form>
      )}
    </div>
  )
}