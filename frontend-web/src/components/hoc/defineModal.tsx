import type { ModalProps } from 'flowbite-react'
import type { JSXElementConstructor } from 'react'

export default function defineModal<T>(Child: JSXElementConstructor<ModalProps & T>) {
  // eslint-disable-next-line react/display-name
  return (props: ModalProps & T) => <Child {...props} />
}
