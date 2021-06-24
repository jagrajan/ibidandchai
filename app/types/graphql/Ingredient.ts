import { gql } from '@apollo/client'

export interface Ingredient {
  id: string
  singular: string
  plural: string
  created_at?: string
  updated_at?: string
}

export interface IngredientQueryResponse {
  ingredient: Partial<Ingredient>[]
}

export interface InsertIngredientOnePayload {
  singular: string
  plural: string
}

export interface InsertIngredientOneResponse {
  insert_ingredient_one: Partial<Ingredient>
}

export const buildIngredientQuery = (...response: Array<keyof Ingredient>) => gql`
  query {
    ingredient {
      ${response.join('\n')}
    }
  }
`

export const buildInsertIngredientOneMutation = (...response: Array<keyof Ingredient>) => gql`
  mutation AddIngredient($singular: String!, $plural: String!) {
    insert_ingredient_one(object: { singular: $singular, plural: $plural }) {
      ${response.join('\n')}
    }
  }
`
