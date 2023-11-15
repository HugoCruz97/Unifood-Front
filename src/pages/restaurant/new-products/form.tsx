import { FormEvent } from 'react'
import { api } from '../../../lib'
import { toast } from 'react-toastify'
import { useAppSelector } from '../../../store'

export default function FormNewProducts() {
  const token = localStorage.getItem('token')

  const restaurant_id = useAppSelector(state => {
    return state.restaurant.id
  })
  async function handleAddNewProduct(event:FormEvent<HTMLFormElement>) {  
    event.preventDefault()
    
    if (restaurant_id) {
        const formData = new FormData(event.currentTarget)
        await api.post('/products', {
          name: formData.get('name') ,
          price: Number(formData.get('price')) ,
          quantity: Number(formData.get('quantity')),
          description: formData.get('description') ,
          restaurant_id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(() => {
          toast.success('Produto adicionado com sucesso!', {
            position: 'top-right',
            autoClose: 1000,
            theme: 'light',
          })
          setTimeout(() => window.location.reload(),1000)
        }).catch(() => {
          toast.error('Erro ao adicionar produto!', {
            position: 'top-right',
            autoClose: 5000,
            theme: 'light',
          })
        })
      }
  }
  
  return (
    <form onSubmit={handleAddNewProduct}>
      <fieldset className='mb-[15px] flex items-center gap-5'>
        <label className='w-[90px] text-right text-[15px]' htmlFor="name">
          Nome do produto
        </label>
        <input
          className='focus:inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]'
          id="name"
          type='string'
          name='name'
        />
      </fieldset>
      <fieldset className='mb-[15px] flex items-center gap-5'>
        <label className='w-[90px] text-right text-[15px]' htmlFor="price">
          Preço
        </label>
        <input
          className='focus:inline-flex h-[35px] w-[100px] items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]'
          id="price"
          type='number'
          name='price'
          placeholder="R$ 0,00"
        />
      </fieldset>
      <fieldset className='mb-[15px] flex items-center gap-5'>
        <label className='w-[90px] text-right text-[15px]' htmlFor="quantity">
          Quantidade em estoque
        </label>
        <input
          className='focus:inline-flex h-[35px] w-[100px] items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]'
          id="quantity"
          name='quantity'
          type='number'
        />
      </fieldset>
      <fieldset className='mb-[15px] flex items-center gap-5'>
        <label className='w-[90px] text-right text-[15px]' htmlFor="description">
          Escreva aqui uma breve descrição do produto
        </label>
        <textarea
          className='focus:inline-flex h-[128px] leading-6  resize-none p-2 w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]'
          id="description"
          typeof='string'
          name='description'
        />
      </fieldset>
      <fieldset className='mt-[25px] flex justify-end'>
        <button type='submit' className= 'bg-emerald-500 text-white hover:bg-emerald-400 focus:shadow-emerald-700 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none'>
          Salvar
        </button>
      </fieldset>
    </form>
  )
}