import { combineReducers } from 'redux'
import biddingReducer from './biddingReducer'
import categoriesReducer from './categoriesReducer'
import collectionsReducer from './collectionsReducer'
import wishlistReducer from './wishlistReducer'

const allReducers = combineReducers({
    wishlist: wishlistReducer,
    collections: collectionsReducer,
    categories: categoriesReducer,
    biddingProducts: biddingReducer,
})

export default allReducers
