import { VariantWithOrderNum } from '../../types'
import ACTIONS, { Actions, GetWishlistAction } from '../actions/wishlistActions'
    
export type WishlistState = VariantWithOrderNum[]

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
