import * as Dialog from '@radix-ui/react-dialog'
import { Eye, X } from 'lucide-react'
import dayjs from 'dayjs'

export default function ModalRestaurant({restaurantSelected}) {

  const dateFormat = dayjs(restaurantSelected.createdAt).format('DD/MM/YYYY')

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Eye 
          onClick={() => {console.log(restaurantSelected)}} 
          className="w-8 h-8 -mt-10 text-emerald-500 cursor-pointer hover:text-emerald-400" 
        />  
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-black/70 fixed inset-0' />
        <Dialog.Content className='fixed top-[50%] left-[50%] max-h-[600px] w-[90vw] max-w-[1100px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] overflow-y-auto scrollbar-none scrollbar-track-zinc-100 scrollbar-thumb-zinc-500 focus:outline-none'>
          <div>
            <div className="flex justify-around items-center">
              <img className="w-24 h-24" src={restaurantSelected.logoUrl} alt={`Logo do ${restaurantSelected.name}`} />
              <div>
                <h1 className="text-zinc-900 font-bold text-4xl ml-24">{restaurantSelected.name}</h1>
              </div>
              <div>
                <p className="text-zinc-500 text-sm mt-4">Inaugurado em {dateFormat}</p>
              </div>
            </div>
            <div className="w-full h-20"/>
            <div className='flex flex-col gap-3'>
              <div>
                {restaurantSelected.description}
              </div>
              <div className="flex items-center">
                <div>
                  Gostou de alguma coisa? 
                  Clique no número e entre em contato:{' '}
                  <span onClick={() => {console.log('Clicou')}} className="font-semibold text-zinc-900 cursor-pointer">{restaurantSelected.contact_number}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-12">
              <div className="w-full">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2" />
                      <th className="px-4 py-2">Nome</th>
                      <th className="px-4 py-2">Descrição</th>
                      <th className="px-4 py-2">Quantidade</th>
                      <th className="px-4 py-2">Valor Unitário</th>
                    </tr>
                  </thead>
                  <tbody>
                    {restaurantSelected.Products && restaurantSelected.Products.map((product) => (
                      <tr key={product.id}>
                        <td className="border px-4 py-2">
                          <input type="checkbox" onClick={() => {console.log(product)}} />
                        </td>
                        <td className="border px-4 py-2">{product.name}</td>
                        <td className="border px-4 py-2">{product.description}</td>
                        <td className="border px-4 py-2">{product.quantity}</td>
                        <td className="border px-4 py-2">{product.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          </div>
      </div>
        <Dialog.Close>
          <button
            className='absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full'
            aria-label="Close"
          >
            <X className='w-4 h-4 text-red-600' />
          </button>
        </Dialog.Close>
      </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}