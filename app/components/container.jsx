'use client'

export function Container({ as: Component = 'div', className = '', children }) {
  const composedClassName = [
    'mx-auto w-full max-w-5xl px-6 sm:px-8',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <Component className={composedClassName}>{children}</Component>
}
