import { Github, Linkedin, ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      id="site-footer"
      className="relative bg-slate-100 text-gray-900 border-t border-gray-200"
    >
      {/* Divider sutil */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-300 to-transparent" />

      {/* Conteúdo principal */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Nome e título */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Lucas Fabri
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto mb-8">
            Construindo soluções sólidas, escaláveis e eficientes — sem perder a
            simplicidade.
          </p>

          {/* Frase inspiradora */}
          <div className="relative inline-block">
            <p className="relative text-lg italic text-gray-500 px-6 py-3 border-l-4 border-gray-900">
              "Tecnologia é sobre transformar desafios em resultados reais."
            </p>
          </div>
        </div>

        {/* Botões sociais */}
        <div className="flex justify-center gap-6 mb-12">
          <a
            href="https://www.linkedin.com/in/lucas-da-cunha-fabri-b34ab4312/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-900 transition-all duration-300 hover:scale-110 hover:shadow-lg"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6 text-gray-600 group-hover:text-gray-900 transition-colors" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              LinkedIn
            </span>
          </a>

          <a
            href="https://github.com/Cunhaww-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-900 transition-all duration-300 hover:scale-110 hover:shadow-lg"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6 text-gray-600 group-hover:text-gray-900 transition-colors" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              GitHub
            </span>
          </a>
        </div>

        <div className="flex items-center justify-center mb-8">
          <div className="h-px w-32 bg-linear-to-r from-transparent via-gray-300 to-transparent" />
          <div className="mx-4 w-2 h-2 rounded-full bg-gray-900" />
          <div className="h-px w-32 bg-linear-to-r from-transparent via-gray-300 to-transparent" />
        </div>

        <div className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Lucas Fabri. Todos os direitos
          reservados.
        </div>
      </div>

      <div className="relative">
        <button
          onClick={scrollToTop}
          className="absolute right-6 bottom-6 p-3 bg-gray-900 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group text-white"
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </footer>
  )
}
