import Link from 'next/link'
import React from 'react'

type ButtonProps = {
  variant?: 'primary' | 'secondary'
  type?: 'button' | 'submit'
  to?: string
}

function getBackgroundClass(variant?: ButtonProps['variant']): string {
  variant = variant || 'primary'
  switch (variant) {
    case 'primary':
      return 'bg-purple-600 hover:bg-purple-700 text-white border-transparent'
    case 'secondary':
      return 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
  }
}

const Button: React.FC<ButtonProps> = (props) => {
  const { type, to, children, variant } = props
  const className = [
    'order-0 inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3',
    getBackgroundClass(variant),
  ].join(' ')

  if (to) {
    return (
      <Link href={to}>
        <a className={className}>{children}</a>
      </Link>
    )
  }
  return (
    <button type={type || 'button'} className={className}>
      {children}
    </button>
  )
}

export default Button
