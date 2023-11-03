import { FormEvent } from 'react'
import { api } from '../../../lib'
import { toast } from 'react-toastify'
import { useAppSelector } from '../../../store'

export default function FormEditProducts({ product }) {
  const token = localStorage.getItem('token')

  const restaurant_id = useAppSelector(state => {
    return state.restaurant.id
  })
  async function handleAddNewProduct(event:FormEvent<HTMLFormElement>) {  
    event.preventDefault()
    
    if (restaurant_id) {
        const formData = new FormData(event.currentTarget)
        
        await api.put(`/products/${product.id}`, {
          name: formData.get('name') ,
          price: formData.get('price') ,
          quantity: formData.get('quantity'),
          description: formData.get('description')
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(() => {
          toast.success('Produto editado com sucesso!', {
            position: 'top-right',
            autoClose: 1000,
            theme: 'light',
          })
          setTimeout(() => window.location.reload(),1000)
        }).catch(() => {
          toast.error('Erro ao editar produto!', {
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
          defaultValue={product.name}
        />
      </fieldset>
      <fieldset className='mb-[15px] flex items-center gap-5'>
        <label className='w-[90px] text-right text-[15px]' htmlFor="price">
          Preço
        </label>
        <input
          className='focus:inline-flex h-[35px] w-[100px] items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]'
          id="price"
          type='string'
          name='price'
          placeholder="R$ 0,00"
          defaultValue={product.price}
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
          defaultValue={product.quantity}
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
          defaultValue={product.description}
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