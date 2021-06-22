import { Menu, Transition } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/outline'
import React from 'react'
import { useProfile } from '../../../contexts/ProfileContext'
import { Option } from '../../../types/Option'
import { Role } from '../../../types/Role'
import { classNames } from '../../../utils/css'
import Select from '../../ui/Select'

const roleToOption = (role: Role): Option => ({ label: role, value: role })

function rolesToOptions(roles: Role[]): Option[] {
  return roles.map(roleToOption)
}

const ProfileMenu: React.FC = () => {
  const { isLoggedIn, logout, availableRoles, activeRole, setActiveRole } = useProfile()
  const isAdmin = availableRoles.includes(Role.admin)

  const onRoleChange = (option: Option): void => {
    setActiveRole(option.value as Role)
  }
  const selectedRole = roleToOption(activeRole)

  return (
    <Menu as="div" className="ml-3 relative">
      {({ open: menuOpen }) => (
        <>
          <div>
            <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">Open user menu</span>
              <UserCircleIcon className="h-8 w-8" />
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
                {isLoggedIn ? (
                  <>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Your Profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Settings
                        </a>
                      )}
                    </Menu.Item>
                    {isAdmin && (
                      <div className="px-4 py-2">
                        <Select
                          options={rolesToOptions(availableRoles)}
                          label="Active Role"
                          onChange={onRoleChange}
                          selected={selectedRole}
                        />
                      </div>
                    )}
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          onClick={() => {
                            logout()
                            return false
                          }}
                        >
                          Sign out
                        </a>
                      )}
                    </Menu.Item>
                  </>
                ) : (
                  <>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href={`${process.env.cognitoDomain}/login?client_id=${process.env.cognitoClientId}&response_type=token&scope=email+openid&redirect_uri=http://localhost:3000/user/login`}
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Log in
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href={`${process.env.cognitoDomain}/signup?client_id=${process.env.cognitoClientId}&response_type=token&scope=email+openid&redirect_uri=http://localhost:3000/user/login`}
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Sign up
                        </a>
                      )}
                    </Menu.Item>
                  </>
                )}
              </Menu.Items>
            </Transition>
          </div>
        </>
      )}
    </Menu>
  )
}

export default ProfileMenu
