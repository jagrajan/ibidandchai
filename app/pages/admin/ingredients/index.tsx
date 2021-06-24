import { useMutation, useQuery } from '@apollo/client'
import { Popover, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import DashboardLayout from '../../../components/layout/Dashboard'
import HeaderWithActions from '../../../components/layout/Header/HeaderWithActions'
import {
  buildIngredientQuery,
  buildInsertIngredientOneMutation,
  IngredientQueryResponse,
  InsertIngredientOnePayload,
  InsertIngredientOneResponse,
} from '../../../types/graphql/Ingredient'

const Dashboard: React.FC = () => {
  const { register, handleSubmit, reset: resetForm, setFocus } = useForm<InsertIngredientOnePayload>()
  const { data, refetch: refetchIngredients } = useQuery<IngredientQueryResponse>(
    buildIngredientQuery('id', 'singular', 'plural')
  )

  const [addIngredient] = useMutation<InsertIngredientOneResponse, InsertIngredientOnePayload>(
    buildInsertIngredientOneMutation('id'),
    {
      onCompleted: () => {
        resetForm()
        void refetchIngredients()
        setFocus('singular')
      },
    }
  )

  const onSubmit = handleSubmit((data): void => {
    addIngredient({ variables: data })
  })

  return (
    <DashboardLayout>
      <HeaderWithActions title="Ingredients">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3">
                <span>Create</span>
              </Popover.Button>
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel static className="absolute z-10 right-0 mt-3 px-2 w-screen max-w-md sm:px-0">
                  <form onSubmit={onSubmit}>
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="bg-white px-5 py-6 space-y-3">
                        <div>
                          <label htmlFor="singular" className="block text-sm font-medium text-gray-700">
                            Singular
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                              {...register('singular')}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="plural" className="block text-sm font-medium text-gray-700">
                            Plural
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              {...register('plural')}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="px-5 py-5 bg-gray-50 flex justify-end">
                        <button
                          type="submit"
                          className="order-0 inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
                        >
                          <span>Submit</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </HeaderWithActions>
      <div className="hidden mt-8 sm:block">
        <div className="align-middle inline-block min-w-full border-b border-gray-200">
          <table className="min-w-full">
            <thead>
              <tr className="border-t border-gray-200">
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Singular
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plural
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {(data?.ingredient || []).map((ingredient) => (
                <tr key={ingredient.id}>
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">{ingredient.singular}</td>
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">{ingredient.plural}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
