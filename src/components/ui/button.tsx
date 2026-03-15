import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { tv, type VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

/**
 * tailwind-variants com twMerge habilitado para evitar classes conflitantes.
 */
const buttonTv = tv(
  {
    base: [
      'inline-flex items-center justify-center gap-2',
      'whitespace-nowrap rounded-md text-sm font-medium',
      'transition-all outline-none',
      'disabled:pointer-events-none disabled:opacity-50',
      // ícones
      "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
      'shrink-0 [&_svg]:shrink-0',
      // focus/aria
      'focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring',
      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
    ].join(' '),
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
      loading: {
        true: 'cursor-progress',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
  { twMerge: true },
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonTv> & {
    asChild?: boolean
    isLoading?: boolean
  }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp: any = asChild ? Slot : 'button'
    const classes = buttonTv({ variant, size, loading: isLoading })

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={twMerge(classes, className)}
        disabled={disabled ?? isLoading}
        aria-busy={isLoading || undefined}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="inline-block size-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
            <span className="sr-only">Carregando…</span>
            <span>{children}</span>
          </>
        ) : (
          children
        )}
      </Comp>
    )
  },
)

Button.displayName = 'Button'

export const buttonVariants = buttonTv
