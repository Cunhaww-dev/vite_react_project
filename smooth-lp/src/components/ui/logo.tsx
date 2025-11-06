// src/components/ui/logo.tsx
type LogoProps = {
  src: string // ex.: "/infinit-loop/react.svg"
  alt?: string // opcional (cai num alt derivado do filename)
  width?: number
  height?: number
}

export default function Logo({ src, alt }: LogoProps) {
  const derivedAlt =
    alt ??
    src.split('/').pop()?.replace('.svg', '').replace(/[-_]/g, ' ') ??
    'logo'

  return (
    <div className="shrink-0">
      <div className="flex w-32 h-20 items-center justify-center hover:scale-105 transition-transform duration-200">
        <img
          src={src}
          alt={derivedAlt}
          loading="lazy"
          decoding="async"
          className="max-h-[80%] max-w-[80%] object-contain"
        />
      </div>
    </div>
  )
}
