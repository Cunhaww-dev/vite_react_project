import { getExperience } from "../utiils/experience";

const careerStart = "2023";

// função de helper para formatar o texto PT-BR
function formatExperienceText(years: number, months: number): string {
  if (years >= 1) {
    return `${years} ${years === 1 ? "ano" : "anos"} de experiência`;
  }
  if (months > 0) {
    return `< 1 ano (${months} ${months === 1 ? "mês" : "meses"})`;
  }
  return "< 1 ano";
}

export default function Hero() {
  const { years, months } = getExperience(careerStart);
  const experienceText = formatExperienceText(years, months);
  return (
    <main className="relative w-full min-h-screen bg-white overflow-hidden flex items-center">
      {/* Background gradients e formas geométricas */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradiente principal suave */}
        <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-white to-slate-100"></div>

        {/* Círculos decorativos com blur */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/3 rounded-full blur-3xl"></div>

        {/* Grid pattern muito sutil */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>

        {/* Formas geométricas sutis */}
        <div className="absolute top-32 left-10 w-32 h-32 border border-zinc-200/40 rounded-lg rotate-12"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 border border-zinc-200/40 rounded-full"></div>
      </div>

      <section className="relative z-10 mx-auto max-w-7xl px-6 w-full">
        <div className="flex flex-col items-center text-center py-20 pt-12 md:pt-40">
          {/* Foto circular no centro */}
          <figure className="relative mb-8">
            <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden ring-4 ring-slate-100 shadow-2xl bg-slate-50">
              <img
                src="/profile.webp"
                alt="Lucas Fabri"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Glow effect sutil */}
            <div className="absolute inset-0 rounded-full bg-linear-to-t from-blue-500/10 to-transparent blur-xl"></div>
          </figure>

          {/* Título e subtítulo */}
          <div className="mb-5">
            <h1 className="text-5xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-tight mb-3">
              Lucas da Cunha Fabri
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-light text-zinc-600">
              Engenheiro de Software & Desenvolvedor
            </p>
          </div>

          {/* Descrição curta */}
          <p className="text-base sm:text-lg text-zinc-600 max-w-2xl mb-8 leading-relaxed">
            Crio interfaces limpas, performáticas e acessíveis — full-stack com
            foco em front-end moderno e componentes reutilizáveis.
          </p>

          {/* Badge de experiência */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-100 border border-slate-200 rounded-full mb-10">
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-amber-500"
                  aria-hidden="true"
                >
                  <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.788 1.402 8.168L12 18.897l-7.336 3.87 1.402-8.168L.132 9.211l8.2-1.193z" />
                </svg>
              ))}
            </div>
            <div className="h-4 w-px bg-zinc-300"></div>
            <span className="text-sm font-medium text-zinc-700">
              {experienceText}
            </span>
          </div>

          {/* Citação do Martin Fowler */}
          <div className="max-w-3xl mx-auto border-l-4 border-zinc-800 pl-6 py-2 mb-10 bg-slate-50 rounded-r-lg pr-6">
            <blockquote className="text-base sm:text-lg text-zinc-500 italic leading-relaxed">
              "Qualquer um pode escrever código que um computador entenda. Bons
              programadores escrevem código que humanos entendem."
            </blockquote>
            <cite className="block mt-3 text-sm font-medium text-zinc-800 not-italic">
              — Martin Fowler
            </cite>
          </div>

          {/* CTA Button */}
          {/* <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-zinc-900 text-white rounded-full font-medium shadow-lg hover:bg-zinc-800 hover:shadow-xl transition-all duration-300"
            >
              Entre em contato
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-8 py-3 bg-slate-100 border border-slate-200 text-zinc-900 rounded-full font-medium hover:bg-slate-200 transition-all duration-300"
            >
              Ver projetos
            </a>
          </div> */}

          {/* Stack badges */}
          {/* <div className="mt-12 flex flex-wrap justify-center gap-3">
            {["React", "TypeScript", "CSS Moderno", "Vite"].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-zinc-700 font-medium shadow-sm hover:bg-slate-50 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div> */}
        </div>
      </section>
    </main>
  );
}
