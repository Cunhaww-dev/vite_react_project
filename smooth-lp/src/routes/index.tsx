import { createFileRoute } from "@tanstack/react-router";
import TrustLogos from "../components/trustLogos";
import Hero from "../components/hero";
import StickyPanel from "../components/stickyPanel";
import ShikoBlockCode from "../components/shiki";
import HorizontalScrollCards from "../components/horizontalScroll";
import { SplitLetters } from "../components/ui/motion/split-text";
import WhatsButtonSimple from "../components/ui/whatsapp-btn";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const TS_EXAMPLE = `export function mergeConfig<T extends object>(
  base: T,
  override?: Partial<T>
) {

if (!override) return base;
  return {
    ...base,
    ...override,
    theme: override?.theme ?? base.theme,
  } as const;
}
`;

  return (
    <main className="min-h-screen">
      <Hero />
      <TrustLogos />

      <StickyPanel zIndex={1} height="h-screen" fullBleed>
        {/* Simplified hero section — copy-paste inside o return do RouteComponent */}
        <section
          className="min-h-screen flex items-center px-6 md:px-10 lg:px-20 bg-slate-100"
          aria-labelledby="hero-title"
        >
          <div className="container mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Texto (coluna esquerda) */}
              <header className="pt-10 md:pt-0 max-w-[56ch]">
                <h1
                  id="hero-title"
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
                >
                  Códigos limpos e
                  <br />
                  Inteligentes
                </h1>

                <span className="mt-4 block h-2 w-24 bg-[#F6C94A] rounded-full" />

                <p className="mt-6 text-sm sm:text-base text-slate-600 max-w-xl">
                  Criamos aplicações modernas com foco em performance,
                  escalabilidade e um código limpo que você entende no primeiro
                  olhar.
                </p>

                <nav className="mt-8">
                  <a
                    href="#contato"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-blue-500 text-white rounded-md text-sm font-medium shadow hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200"
                  >
                    Entre em contato
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </nav>
              </header>

              {/* Código (coluna direita) */}
              <figure className="order-2 md:order-last md:flex md:justify-end">
                <ShikoBlockCode
                  code={TS_EXAMPLE}
                  lang="typescript"
                  theme="min-dark"
                  className="w-full md:max-w-[700px]"
                  heightClass="h-[260px] sm:h-[300px] md:h-[360px]"
                />
              </figure>
            </div>
          </div>
        </section>
      </StickyPanel>

      <StickyPanel
        zIndex={2}
        height="h-[100svh]"
        bgColor="bg-zinc-800"
        fullBleed
      >
        <section
          className="min-h-screen flex items-center px-6 md:px-10 lg:px-20"
          aria-labelledby="hero-title"
        >
          <div className="container mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* TEXTO — mobile primeiro, desktop segundo */}
              <header className="order-1 md:order-2 pt-10 md:pt-0 max-w-[56ch]">
                <h1
                  id="hero-title"
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white"
                >
                  As melhores tecnologias
                  <br />
                  soluções eficientes
                </h1>

                <span className="mt-4 block h-2 w-24 bg-[#F6C94A] rounded-full" />

                <p className="mt-6 text-sm sm:text-base text-gray-300 max-w-xl">
                  Utilizando as melhores tecnologias do mercado, entregamos
                  soluções eficientes, escaláveis e de alta performance para o
                  seu negócio.
                </p>
              </header>

              {/* SVG — mobile segundo, desktop primeiro */}
              <figure className="order-2 md:order-1 md:flex md:justify-start sm:pb-20">
                <img
                  src="/stack-system.svg"
                  alt="Mapa de tecnologias"
                  loading="lazy"
                  className="w-full max-h-[280px] sm:max-h-100 md:max-w-[700px] object-contain mx-auto"
                />
              </figure>
            </div>
          </div>
        </section>
      </StickyPanel>

      <div className="relative z-10 ">
        <section
          id="showcase"
          className="w-full py-24 px-6 md:px-10 lg:px-20 bg-white rounded-t-[5rem]"
          aria-labelledby="showcase-title"
        >
          <header className="max-w-3xl mx-auto text-center flex flex-col items-center gap-y-6">
            {/* Linha decorativa */}
            <span className="block h-1 w-16 bg-[#F6C94A] rounded-full" />

            <h2
              id="showcase-title"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight text-balance"
            >
              <SplitLetters text="Projetos que provam nosso código" />
            </h2>

            {/* Parágrafo */}
            <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-balance">
              Trabalhamos com TypeScript, testes automatizados, arquitetura
              limpa e deploys confiáveis. Aqui estão alguns projetos onde
              aplicamos desempenho, escalabilidade e um design pensado para o
              usuário.
            </p>
          </header>
        </section>
      </div>

      <div className="relative z-10 bg-white">
        <HorizontalScrollCards />
      </div>
      <WhatsButtonSimple />
    </main>
  );
}
