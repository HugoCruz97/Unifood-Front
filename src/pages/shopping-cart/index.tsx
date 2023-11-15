import { ShoppingCartIcon, X } from "lucide-react";
import * as Dialog from '@radix-ui/react-dialog'
import Cart from "./cart";

export default function ShoppingCart() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button>
          <ShoppingCartIcon className="w-7 h-7 mt-1 cursor-pointer" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-black/70 fixed inset-0' />
        <Dialog.Content className='fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[900px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'>
        <Dialog.Title className='m-0 text-[17px] font-medium'>
          Aqui está seu carrinho!
        </Dialog.Title>
        <Dialog.Description className='mt-[10px] mb-5 text-[15px] leading-normal'>
          Finalize a compra para salvar seu pedido!
        </Dialog.Description>
        <Cart />
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