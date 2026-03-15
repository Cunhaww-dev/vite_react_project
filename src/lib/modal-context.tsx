'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import ContactModal from '../components/contactModal'

type ModalContextValue = {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={closeModal} />
    </ModalContext.Provider>
  )
}

export function useModal() {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used within a ModalProvider')
  return ctx
}
