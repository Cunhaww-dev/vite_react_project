'use client'

import { createRootRoute, Outlet } from '@tanstack/react-router'
import Header from '../components/header'
import Footer from '../components/footer'
import { Toaster } from 'react-hot-toast'
import { ModalProvider } from '../lib/modal-context'

const RootLayout = () => (
  <ModalProvider>
    <Header />
    <Outlet />
    <Footer />
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        style: {
          borderRadius: '8px',
          background: '#fff',
          color: '#18181b',
        },
      }}
    />
  </ModalProvider>
)

export const Route = createRootRoute({ component: RootLayout })
