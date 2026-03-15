import React, { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

interface WhatsButtonSimpleProps {
  phoneNumber?: string
  message?: string
  className?: string
  footerId?: string
}

const WhatsButtonSimple: React.FC<WhatsButtonSimpleProps> = ({
  phoneNumber = '5511960549510',
  message = 'Olá, gostaria de saber mais sobre os serviços!',
  className = '',
  footerId = 'site-footer',
}) => {
  const [footerVisible, setFooterVisible] = useState(false)

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
    message,
  )}`

  useEffect(() => {
    // roda só no cliente
    const footerEl = document.getElementById(footerId)
    if (!footerEl) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setFooterVisible(entry.isIntersecting && entry.intersectionRatio > 0)
        })
      },
      {
        root: null,
        threshold: 0.01,
      },
    )

    observer.observe(footerEl)

    return () => {
      observer.disconnect()
    }
  }, [footerId])

  if (footerVisible) return null

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className={`
        fixed bottom-6 right-6 z-50 
        bg-green-500 hover:bg-green-600 active:bg-green-700
        text-white p-4 rounded-full 
        shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/35
        focus:outline-none focus:ring-opacity-50
        transition-all duration-300 ease-in-out 
        hover:scale-105 hover:-translate-y-0.5
        active:scale-95
        group
        ${className}
      `}
    >
      <FaWhatsapp className="w-8 h-8" />
    </a>
  )
}

export default WhatsButtonSimple
