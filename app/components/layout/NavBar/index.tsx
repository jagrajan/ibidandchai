import { MenuIcon, UserCircleIcon, XIcon } from '@heroicons/react/outline';
import React from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';

const navigation = [
  { id: 'dashboard', name: 'Dashboard' },
  { id: 'team', name: 'Team' },
  { id: 'projects', name: 'Projects' },
  { id: 'calendar', name: 'Calendar' },
]


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


const NavBar: React.FC = () => {
  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex justify-between h-16">
              <div className='absolute inset-y-0 left-0 flex items-center h-16 sm:hidden'>
                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden="true" />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img className="block h-8 w-auth" src='/Cat_silhouette.svg' alt="" />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <a key={item.id} href='#' className='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'>
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as='div' className='ml-3 relative'>
                  {({ open: menuOpen }) => (
                    <>
                      <div>
                        <Menu.Button className='flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                          <span className="sr-only">Open user menu</span>
                          <UserCircleIcon className='h-8 w-8' />
                        </Menu.Button>
                        <Transition
                          show={menuOpen}
                          as={React.Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Your Profile
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Settings
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Sign out
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </div>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </div>
          <Disclosure.Panel className='sm:hidden'>
            <div className="pt-2 pb-4 space-y-1">
              {navigation.map((item) => (
                <a key={item.id} href='#' className='border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'>
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default NavBar;