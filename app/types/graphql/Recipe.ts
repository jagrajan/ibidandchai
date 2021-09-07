import { DocumentNode, gql } from '@apollo/client'
import { BaseResource } from './BaseResource'

export interface Recipe extends BaseResource {
  name: string
  description?: string
  prep_time?: string
  cook_time?: string
}

export interface RecipeQueryResponse {
  recipe: Partial<Recipe>[]
}

export interface InsertRecipeOnePayload {
  name: string
  description?: string
  prep_time?: string
  cook_time?: string
}

export interface InsertRecipeOneResponse {
  insert_recipe_one: Partial<Recipe>
}

export const buildRecipeQuery = (...response: Array<keyof Recipe>): DocumentNode => gql`
  query {
    recipe {
      ${response.join('\n')}
    }
  }
`

export const buildInsertRecipeOneMutation = (...response: Array<keyof Recipe>): DocumentNode => gql`
  mutation AddRecipe($name: String!, $description: String, $prep_time: String, $cook_time: String) {
    insert_recipe_one(object: { name: $name, description: $description, prep_time: $prep_time, cook_time: $cook_time }) {
      ${response.join('\n')}
    }
  }
`
