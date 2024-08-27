import { Collection } from '../../types'
import ACTIONS, { Actions } from '../actions/collectionsActions'
    
export default function collectionsReducer(state: Collection[] = [], { type, payload } : Actions) {
    switch (type) { 
        case ACTIONS.FETCH_COLLECTIONS:
            return (payload as { collections: Collection[] }).collections
        case ACTIONS.FETCH_COLLECTIONS_FAIL:
            return state
        default:
            return state
    }
}
