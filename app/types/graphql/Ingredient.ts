import { DocumentNode, gql } from '@apollo/client'
import { BaseResource } from './BaseResource'

export interface Ingredient extends BaseResource {
  singular: string
  plural: string
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

export const buildIngredientQuery = (...response: Array<keyof Ingredient>): DocumentNode => gql`
  query {
    ingredient {
      ${response.join('\n')}
    }
  }
`

export const buildInsertIngredientOneMutation = (...response: Array<keyof Ingredient>): DocumentNode => gql`
  mutation AddIngredient($singular: String!, $plural: String!) {
    insert_ingredient_one(object: { singular: $singular, plural: $plural }) {
      ${response.join('\n')}
    }
  }
`
