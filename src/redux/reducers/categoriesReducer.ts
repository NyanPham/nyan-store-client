import { Category } from '../../types'
import ACTIONS, { Actions } from '../actions/categoriesActions'

export default function categoriesReducer(state : Category[] = [], { type, payload } : Actions ) {
    switch (type) {
        case ACTIONS.FETCH_CATEGORIES:
            return (payload as { categories: Category[] }).categories
        case ACTIONS.FETCH_CATEGORIES_FAIL:
            return state
        default:
            return state
    }
}
