import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React from 'react'
import { Disclosure } from '@headlessui/react'
import { useProfile } from '../../../contexts/ProfileContext'
import { Role } from '../../../types/Role'
import { classNames } from '../../../utils/css'
import ProfileMenu from './ProfileMenu'
import Link from 'next/link'

interface NavItem {
  id: string
  name: string
  path: string
}

function useNavigationItems(): NavItem[] {
  const { activeRole } = useProfile()
  const items = [
    { id: 'recipes', name: 'Recipes', path: '/recipes' },
    { id: 'blog', name: 'Blog', path: '/blog' },
  ]
  if (activeRole === Role.admin) {
    items.push({ id: 'dashboard', name: 'Dashboard', path: '/admin/dashboard' })
  }
  return items
}

const NavBar: React.FC = () => {
  const navigation = useNavigationItems()
  const { pathname } = useRouter()

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center h-16 sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img className="block h-8 w-auth" src="/Cat_silhouette.svg" alt="" />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link href={item.path} key={item.id}>
                      <a
                        className={classNames(
                          pathname.startsWith(item.path)
                            ? 'border-indigo-500 text-gray-900'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                          'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                        )}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <ProfileMenu />
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-4 space-y-1">
              {navigation.map((item) => (
                <Link key={item.id} href={item.path}>
                  <a className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default NavBar
