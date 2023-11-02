import { ChangeEvent, useState } from 'react'
import { LoadingComponent } from '../../../components/loading'
import { toast } from 'react-toastify'
import { Image } from 'lucide-react'
import { FormEvent } from 'react'
import { api } from '../../../lib'
import { useNavigate } from 'react-router-dom'

export default function Restaurant() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  let userName = ''
  let userId = ''

  const userLogged = localStorage.getItem('user')

  if (userLogged) {
    const userData = JSON.parse(userLogged)

    userName = userData.user.name
    userId = userData.user.id
  }

  const [logo, setLogo] = useState<string | null>(null)

  function handleFileSelected (event:ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }

    const logo = URL.createObjectURL(files[0])

    setLogo(logo)
  }

  async function handleCreateRestaurant(event:FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    const formData = new FormData(event.currentTarget)

    const fileToUpload = formData.get('logo')

    let logoUrl = ''

    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('logo', fileToUpload)

      const uploadResponse = await api.post('/upload', uploadFormData)

      logoUrl = uploadResponse.data.fileUrl
    }
    
    await api.post('/new-restaurant', {
      name: formData.get('name'),
      logoUrl,
      address: formData.get('address'),
      cep: formData.get('cep'),
      description: formData.get('description'),
      contact: formData.get('contact'),
      userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(() => {
      toast.success('Restaurante criado com sucesso!', {
        position: 'top-right',
        autoClose: 5000,
        theme: 'light',
      })
      const userLogged = localStorage.getItem('user')

      if (userLogged) {
        const userData = JSON.parse(userLogged)

        userData.user.hasRestaurant = true
        localStorage.setItem('user', JSON.stringify(userData))
      }
      setLoading(false)
      navigate('/menu')
    }).catch(() => {
      toast.error('Erro ao criar restaurante!', {
        position: 'top-right',
        autoClose: 5000,
        theme: 'light',
      })
      setLoading(false)
    })
  }
  
  return (
    <div>
      {loading && <LoadingComponent />}
      {!loading && (
        <form onSubmit={handleCreateRestaurant} className='flex flex-col gap-4'>
          <div className="flex gap-3">
            <label className="text-xl font-bold text-zinc-700">
              Dono do restaurante:
            </label>
            <label className="text-xl font-semibold text-zinc-700">{userName}</label>
          </div>
          <div className='flex flex-wrap'>
            <div className='flex-auto w-1/2 mt-1'>
              <div className="flex flex-col gap-3">
                <label className="text-xl font-bold text-zinc-700">
                  Nome do restaurante
                </label>
                <input
                  className="h-10 w-80 border-2 border-zinc-900 border-opacity-50 outline-none p-2"
                  id="name"
                  name='name'
                  autoFocus
                />
              </div>
              <div className="flex flex-col mt-2">
                <label
                  htmlFor='logo' 
                  className="border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center border-zinc-800 w-80 hover:bg-zinc-200"
                >
                  {logo ? (
                    <img src={logo} />
                  ) : (
                    <>
                      <Image className='w-4 h-4' />
                      Logo do Restaurante
                    </>
                  )}
                </label>
                <input
                  className="sr-only"
                  id='logo'
                  name='logo'
                  accept='image/*'
                  type='file'
                  onChange={handleFileSelected}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-xl font-bold text-zinc-700 mt-3">
                  CEP
                </label>
                <input
                  className="h-10 w-80 border-2 border-zinc-900 border-opacity-50 outline-none p-2"
                  id="cep"
                  name='cep'
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-xl font-bold text-zinc-700 mt-3">
                  Endereço
                </label>
                <input
                  className="h-10 w-80 border-2 border-zinc-900 border-opacity-50 outline-none p-2"
                  id="address"
                  name='address'
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-xl font-bold text-zinc-700 mt-3">
                  Telefone
                </label>
                <input
                  className="h-10 w-80 border-2 border-zinc-900 border-opacity-50 outline-none p-2"
                  id="contact"
                  name='contact'
                  placeholder="(XX) XXXXX-XXXX"
                />
              </div>
            </div>
            <div className='flex-auto w-1/2 mt-1'>
              <div className="flex flex-col gap-3">
                <label className="text-xl font-bold text-zinc-700">
                  Conte um pouco mais sobre seu restaurante: 
                </label>
                <textarea
                  className="h-72 w-[580px] border-2 border-zinc-900 border-opacity-50 outline-none p-2"
                  id="description"
                  name='description'
                />
              </div>
            </div>
          </div>
          <button 
            type="submit"
            className='w-48 h-16 bg-red-600 rounded-2xl text-white my-5 font-semibold text-xl uppercase transition-colors hover:bg-red-500'
          >
            Criar
          </button>
        </form>
      )}
    </div>
  )
}