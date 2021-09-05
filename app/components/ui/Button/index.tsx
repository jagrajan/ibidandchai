import Link from 'next/link'
import React from 'react'

type ButtonProps = {
  type?: 'button' | 'submit'
  to?: string
}

const Button: React.FC<ButtonProps> = (props) => {
  const className =
    'order-0 inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3'
  const { type, to, children } = props
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
