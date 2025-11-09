'use client'

import type { ElementType, HTMLAttributes, ReactNode } from 'react'

type ContainerProps = {
  as?: ElementType
  className?: string
  children?: ReactNode
} & HTMLAttributes<HTMLElement>

export function Container({ as = 'div', className = '', children, ...props }: ContainerProps): JSX.Element {
  const Component = as as ElementType
  const composedClassName = [
    'mx-auto w-full max-w-5xl px-6 sm:px-8',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Component className={composedClassName} {...props}>
      {children}
    </Component>
  )
}
