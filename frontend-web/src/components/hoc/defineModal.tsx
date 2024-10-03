import type { ModalProps } from 'flowbite-react'
import type { JSXElementConstructor } from 'react'

export default function defineModal(Child: JSXElementConstructor<ModalProps>) {
  // eslint-disable-next-line react/display-name
  return (props: ModalProps) => <Child {...props} />
}
