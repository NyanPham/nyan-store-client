import ACTIONS from '../actions/collectionsActions'

export default function collectionsReducer(state = [], { type, payload }) {
    switch (type) {
        case ACTIONS.FETCH_COLLECTIONS:
            return payload.collections
        case ACTIONS.FETCH_COLLECTIONS_FAIL:
            return state
        default:
            return state
    }
}
