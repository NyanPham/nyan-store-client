import ACTIONS from '../actions/categoriesActions'

export default function categoriesReducer(state = [], { type, payload }) {
    switch (type) {
        case ACTIONS.FETCH_CATEGORIES:
            return payload.categories
        case ACTIONS.FETCH_CATEGORIES_FAIL:
            return state
        default:
            return state
    }
}
