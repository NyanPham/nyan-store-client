import { Category } from '../../types'
import ACTIONS, { Actions, FetchCategoriesAction } from '../actions/categoriesActions'

export type CategoriesState = Category[]

export default function categoriesReducer(state : CategoriesState = [], action : Actions ) {
    switch (action.type) {
        case ACTIONS.FETCH_CATEGORIES:
            return (action as FetchCategoriesAction).payload.categories
        case ACTIONS.FETCH_CATEGORIES_FAIL:
            return state
        default:
            return state
    }
}
