import type { ReactNode } from 'react'

export type ModalProps = {
  open: boolean
  onCancel: () => void
  onOk: () => void
  title: string
  children: ReactNode
}

const Modal = (props: ModalProps) => {
  return props.open ? (
    <>
      <div className="absolute  left-1/2 top-1/2 z-20 flex h-48 w-80 -translate-x-1/2 -translate-y-1/2 flex-col items-start bg-white p-5">
        <h1 className="mb-5 text-xl font-bold">{props.title}</h1>
        <p className="mb-5 text-lg">{props.children}</p>
        <div className="mt-auto flex w-full">
          <button
            className="mx-auto bg-slate-900 px-8 py-2 text-white hover:bg-slate-700"
            onClick={() => props.onOk()}
          >
            OK
          </button>
        </div>
      </div>
      <div
        // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
        className="fixed z-10 size-full bg-black bg-opacity-50"
        onClick={() => props.onCancel()}
      ></div>
    </>
  ) : (
    <></>
  )
}

export default Modal