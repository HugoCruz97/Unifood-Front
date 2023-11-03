import * as Dialog from '@radix-ui/react-dialog'
import { X, Pencil } from 'lucide-react'
import FormEditProducts from './form'


export default function EditProducts({ productSelected }) {

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Pencil className="w-4 h-4 cursor-pointer text-emerald-800 transition-colors hover:text-emerald-600" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-black/70 fixed inset-0' />
        <Dialog.Content className='fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'>
        <Dialog.Title className='m-0 text-[17px] font-medium'>
          Altere o que quiser do produto selecionado
        </Dialog.Title>
        <Dialog.Description className='mt-[10px] mb-5 text-[15px] leading-normal'>
          Lembre-se de não deixar nenhuma informação em branco!
        </Dialog.Description>
        <FormEditProducts product={productSelected} />
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