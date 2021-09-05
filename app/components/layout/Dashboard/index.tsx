import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment, useState } from 'react'
import { classNames } from '../../../utils/css'
import ProfileMenu from '../NavBar/ProfileMenu'

const navigation = [
  { id: 'home', path: '/', label: 'Home' },
  { id: 'dashboard', path: '/admin/dashboard', label: 'Dashboard' },
  { id: 'recipes', path: '/admin/recipe', label: 'Recipes' },
  { id: 'ingredients', path: '/admin/ingredients', label: 'Ingredients' },
  { id: 'units', path: '/admin/units', label: 'Units' },
]

const Dashboard: React.FC = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useRouter()
  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          open={sidebarOpen}
          onClose={setSidebarOpen}
          static
          className="fixed inset-0 flex z-40 lg:hidden"
        ></Dialog>
      </Transition.Root>
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 pt-5 pb-4 bg-gray-100">
          <div className="h-0 flex flex-col pl-2 pb-5">
            <ProfileMenu />
          </div>
          <nav className="px-3 mt-6">
            <div className="space-y-1">
              {navigation.map((item) => {
                const current = item.path !== '/' && pathname.startsWith(item.path)
                return (
                  <Link key={item.id} href={item.path}>
                    <a
                      className={classNames(
                        current ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                        'group flex items-center px-2 py-2 text-sm font-medium-md'
                      )}
                    >
                      {item.label}
                    </a>
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
      </div>
      <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">{children}</main>
    </div>
  )
}

export default Dashboard
