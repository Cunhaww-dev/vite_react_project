export default function Hero() {
  return (
    <main className="relative flex h-screen items-center justify-center overflow-hidden bg-linear-to-b from-zinc-50 to-zinc-100 text-zinc-900">
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover opacity-60 mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: "url('/shadowBackground.svg')" }}
      />

      {/* Glow vertical suave no centro (coluna de luz) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_100%_at_50%_10%,rgba(0,0,0,0.07),transparent_60%)]" />

      {/* Vignette sutil nas bordas para foco no centro */}
      <div className="pointer-events-none absolute inset-0 mask-[radial-gradient(90%_70%_at_50%_50%,black_60%,transparent_100%)] bg-[radial-gradient(120%_80%_at_50%_50%,rgba(0,0,0,0.08),transparent_60%)]" />

      <section className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight">
          Seu site é a extensão digital
          <br className="hidden sm:block" />
          <span className="inline-block"> da sua marca </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-zinc-600">
          Transforme sua marca, libere o poder do digital conosco e transforme
          visões ousadas em sucesso no mercado
        </p>

        <ul className="mx-auto mt-10 flex items-center justify-center gap-6 text-xs font-medium tracking-wider text-zinc-700">
          <li className="relative pl-4">
            <span
              className="absolute left-0 top-1/2 -translate-y-1/2 h-3.5 w-px bg-zinc-300/80"
              aria-hidden
            />
            WEB
          </li>
          <li className="relative pl-4">
            <span
              className="absolute left-0 top-1/2 -translate-y-1/2 h-3.5 w-px bg-zinc-300/80"
              aria-hidden
            />
            DESIGN
          </li>
          <li className="relative pl-4">
            <span
              className="absolute left-0 top-1/2 -translate-y-1/2 h-3.5 w-px bg-zinc-300/80"
              aria-hidden
            />
            SOCIAL
          </li>
          <li className="relative pl-4">
            <span
              className="absolute left-0 top-1/2 -translate-y-1/2 h-3.5 w-px bg-zinc-300/80"
              aria-hidden
            />
            APPS
          </li>
        </ul>
      </section>
    </main>
  );
}
