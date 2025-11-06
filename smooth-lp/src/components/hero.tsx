import { ChevronDown } from "lucide-react";
import { Typography } from "./ui/typography";

export default function Hero() {
  return (
    <main className="flex h-[75dvh] pt-16 items-center justify-center overflow-hidden ">
      <section className="w-full mx-auto md:py-24 grid place-items-center text-center gap-6">
        <Typography
          as="h1"
          variant="display"
          className="sm:text-6xl lg:text-7xl leading-tight tracking-tight font-semibold text-zinc-950"
        >
          Seu site é a extensão digital
          <br className="hidden sm:block" />
          <span className="inline-block"> da sua marca </span>
        </Typography>

        <Typography variant="subtitle">
          Transforme sua marca, libere o poder do digital conosco e transforme
          visões ousadas em sucesso no mercado
        </Typography>

        <div className="mt-4 md:mt-6 flex justify-center">
          <a
            href="#next"
            className="inline-flex px-4 py-1.5 items-center gap-2 rounded-full text-sm font-medium bg-zinc-900 text-zinc-50 hover:bg-zinc-700 transition-colors duration-200"
          >
            <span className="pl-1">Role para descobrir</span>
            <ChevronDown className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
