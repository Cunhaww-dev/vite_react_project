import { createRootRoute, Outlet } from '@tanstack/react-router'
import Header from '../components/header'
import Footer from '../components/footer'
import { Toaster } from 'react-hot-toast'

const RootLayout = () => (
  <>
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
          color: '#18181b', // Cor zinc-900
        },
      }}
    />
  </>
)

export const Route = createRootRoute({ component: RootLayout })
