import { combineReducers } from 'redux'
import biddingReducer from './biddingReducer'
import cartReducer from './cartReducer'
import categoriesReducer from './categoriesReducer'
import collectionsReducer from './collectionsReducer'
import orderNoteReducer from './orderNoteReducer'
import searchReducder from './searchReducer'
import wishlistReducer from './wishlistReducer'

const allReducers = combineReducers({
    wishlist: wishlistReducer,
    collections: collectionsReducer,
    categories: categoriesReducer,
    biddingProducts: biddingReducer,
    cart: cartReducer,
    orderNote: orderNoteReducer,
    search: searchReducder,
})

export default allReducers
