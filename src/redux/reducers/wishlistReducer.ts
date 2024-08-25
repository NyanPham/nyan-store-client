import ACTIONS from '../actions/wishlistActions'

export default function wishlistReducer(state = [], { type, payload }) {
    switch (type) {
        case ACTIONS.GET_WISHLIST:
            return payload.wishlist
        case ACTIONS.EMPTY_WISHLIST:
            return []
        default:
            return state
    }
}
