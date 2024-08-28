import { Product } from '../../types'
import ACTIONS, { Actions, GetWishlistAction } from '../actions/wishlistActions'

type WishlistItem = {
    item: Product
}

export type WishlistState = WishlistItem[]

export default function wishlistReducer(state: WishlistState = [], action: Actions) {
    switch (action.type) {
        case ACTIONS.GET_WISHLIST:
            return (action as GetWishlistAction).payload.wishlist
        case ACTIONS.EMPTY_WISHLIST:
            return []
        default:
            return state
    }
}
