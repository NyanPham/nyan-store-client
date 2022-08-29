import { combineReducers } from 'redux'
import collectionsReducer from './collectionsReducer'
import wishlistReducer from './wishlistReducer'

const allReducers = combineReducers({
    wishlist: wishlistReducer,
    collections: collectionsReducer,
})

export default allReducers
