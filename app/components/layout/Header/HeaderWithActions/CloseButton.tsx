import Link from 'next/link'
import { XIcon } from '@heroicons/react/outline'

interface CloseButtonProps {
  to: string
}

const CloseButton: React.FC<CloseButtonProps> = (props) => {
  const { to } = props
  return (
    <Link href={to}>
      <a className="inline-flex items-center rounded-full bg-white hover:bg-gray-100 p-2">
        <XIcon className="h-6 w-6" />
      </a>
    </Link>
  )
}

export default CloseButton
