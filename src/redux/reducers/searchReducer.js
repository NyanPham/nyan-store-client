import ACTIONS from '../actions/searchActions'

export default function searchReducder(state = '', { type, payload }) {
    switch (type) {
        case ACTIONS.SEARCH_TERMS:
            return payload.searchTerm

        default:
            return state
    }
}
