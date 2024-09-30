import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useId,
  useInteractions,
  useRole,
} from '@floating-ui/react'
import { useState } from 'react'

export const useFloatingDropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip({ fallbackAxisSideDirection: 'end' }), shift()],
    whileElementsMounted: autoUpdate,
  })
  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role])
  const id = useId()

  const handleClose = () => {
    setIsOpen(false)
  }

  return {
    refs,
    floatingStyles,
    context,
    getReferenceProps,
    getFloatingProps,
    id,
    isOpen,
    handleClose,
  }
}
