import { useMutation } from '@apollo/client'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import HeaderWithActions from '../../../../components/layout/Header/HeaderWithActions'
import CloseButton from '../../../../components/layout/Header/HeaderWithActions/CloseButton'
import Button from '../../../../components/ui/Button'
import {
  buildInsertRecipeOneMutation,
  InsertRecipeOnePayload,
  InsertRecipeOneResponse,
} from '../../../../types/graphql/Recipe'

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label: string
}

const Input: React.FC<InputProps> = ({ label, name, ...rest }) => {
  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <input
          name={name}
          {...rest}
          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
        />
      </div>
    </>
  )
}

interface SectionProps {
  title: string
  description: string
}

const Section: React.FC<SectionProps> = ({ title, description, children }) => {
  return (
    <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>

        <div className="mt-5 md:mt-0 md:col-span-2 space-y-6">{children}</div>
      </div>
    </div>
  )
}

const RecipeCreatePage: React.FC = () => {
  const { register, handleSubmit } = useForm<InsertRecipeOnePayload>()
  const { push } = useRouter()

  const [addRecipe] = useMutation<InsertRecipeOneResponse, InsertRecipeOnePayload>(buildInsertRecipeOneMutation('id'), {
    onCompleted: () => {
      push('/admin/recipe')
    },
  })
  const onSubmit = handleSubmit((variables) => {
    console.log({ variables })
    addRecipe({ variables })
  })
  return (
    <>
      <Head>
        <title>Recipes</title>
      </Head>
      <HeaderWithActions title="Create Recipe">
        <CloseButton to="/admin/recipe" />
      </HeaderWithActions>
      <form className="space-y-6 container mx-auto" onSubmit={onSubmit}>
        <Section title="Metadata" description="Recipe metadata">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 sm:col-span-2">
              <Input label="Name" type="text" {...register('name')} />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div className="mt-1">
              <textarea
                rows={3}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="Description"
                defaultValue=""
                {...register('description')}
              />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <Input label="Prep time" type="text" {...register('prep_time')} />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Input label="Cook time" type="text" {...register('cook_time')} />
            </div>
          </div>
        </Section>
        <Section title="Ingredients" description="Recipe ingredients"></Section>
        <div className="flex justify-end">
          <Button type="button" variant="secondary">
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </>
  )
}

export default RecipeCreatePage
