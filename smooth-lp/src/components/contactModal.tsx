'use client'

import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { formatPhoneBR } from '../utiils/phone'

/* ===========================
   Schema Zod Validation
   =========================== */
const contactFormSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres.'),
  email: z.string().email('Por favor, insira um email válido.'),
  subject: z.string().min(5, 'O assunto deve ter no mínimo 5 caracteres.'),
  message: z.string().min(10, 'A mensagem deve ter no mínimo 10 caracteres.'),
  phone: z
    .string()
    .default('')
    .refine((val) => {
      if (!val || val.trim() === '') return true
      const digits = val.replace(/\D/g, '')
      return digits.length === 10 || digits.length === 11
    }, 'Insira um telefone válido.')
    .transform((v) => {
      if (!v) return undefined
      const digits = v.replace(/\D/g, '')
      return digits.length >= 10 ? digits : undefined
    }),
})

type ContactFormInputs = z.infer<typeof contactFormSchema>

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

/* ===========================
   Componente completo
   =========================== */
export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema as any),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      phone: '',
    },
  })

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpwvlkqb'

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone ?? '',
      subject: data.subject,
      message: data.message,
      _replyto: data.email,
      _subject: `Contato pelo site — ${data.subject}`,
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      // Formspree devolve 200 OK / 201 em geral; res.ok cobre ambos.
      if (!res.ok) {
        let errMsg = 'Erro ao enviar'
        try {
          const json = await res.json()
          if (json && json.error) errMsg = json.error
        } catch (e) {}
        throw new Error(errMsg)
      }

      toast.custom(
        () => (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-3 bg-white text-zinc-900 px-4 py-3 rounded-lg shadow-lg border border-zinc-200"
          >
            <CheckCircle2 className="text-green-500" size={22} />
            <span className="font-medium">Mensagem enviada com sucesso!</span>
          </motion.div>
        ),
        { id: 'contact-success' },
      )

      reset()
      onClose()
    } catch (err) {
      console.error('Formspree error:', err)
      toast.error(
        'Erro ao enviar a mensagem. Verifique sua conexão ou tente novamente.',
      )
    }
  }

  const inputCSS =
    'w-full p-3 bg-zinc-50 border border-zinc-200 rounded-md text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-amber-300 focus:border-transparent transition-all duration-200'

  const labelCSS = 'block text-sm font-medium text-zinc-700 mb-1'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 30 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="relative z-10 w-full max-w-md rounded-2xl bg-white/95 p-6 shadow-2xl backdrop-blur-lg max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Contato"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-800 cursor-pointer transition-colors duration-200"
              aria-label="Fechar modal"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-zinc-900 mb-4">
              Vamos conversar!
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Nome */}
              <div>
                <label htmlFor="name" className={labelCSS}>
                  Nome <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  {...register('name')}
                  placeholder="Digite seu nome completo"
                  className={inputCSS}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelCSS}>
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="seu@email.com"
                  className={inputCSS}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Telefone */}
              <div>
                <label htmlFor="phone" className={labelCSS}>
                  Telefone/Celular{' '}
                  <span className="text-zinc-400 text-xs font-normal">
                    (opcional)
                  </span>
                </label>
                <Controller
                  control={control}
                  name="phone"
                  render={({ field: { value, onChange, onBlur } }) => {
                    const digits = typeof value === 'string' ? value : ''
                    const display = formatPhoneBR(digits)
                    return (
                      <input
                        id="phone"
                        inputMode="numeric"
                        maxLength={15}
                        value={display}
                        onBlur={onBlur}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/\D/g, '')
                          onChange(raw)
                        }}
                        placeholder="(11) 91234-5678"
                        className={inputCSS}
                        aria-invalid={!!errors.phone}
                      />
                    )
                  }}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phone.message?.toString()}
                  </p>
                )}
              </div>

              {/* Assunto */}
              <div>
                <label htmlFor="subject" className={labelCSS}>
                  Assunto <span className="text-red-500">*</span>
                </label>
                <input
                  id="subject"
                  {...register('subject')}
                  placeholder="Sobre o que você quer falar?"
                  className={inputCSS}
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Mensagem */}
              <div>
                <label htmlFor="message" className={labelCSS}>
                  Mensagem <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  placeholder="Descreva seu projeto ou ideia..."
                  rows={5}
                  className={`${inputCSS} resize-none`}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-3 rounded-full bg-zinc-900 text-white font-medium hover:bg-zinc-800 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                </button>

                <button
                  type="button"
                  onClick={() => reset()}
                  className="px-4 py-3 rounded-full bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 cursor-pointer transition-all duration-200"
                >
                  Limpar
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
