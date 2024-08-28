import { Collection } from '../../types'
import ACTIONS, { Actions, FetchCollectionsAction } from '../actions/collectionsActions'
    
export type CollectionsState = Collection[]

export default function collectionsReducer(state: CollectionsState = [], action : Actions) {
    switch (action.type) { 
        case ACTIONS.FETCH_COLLECTIONS:
            return (action as FetchCollectionsAction).payload.collections
        case ACTIONS.FETCH_COLLECTIONS_FAIL:
            return state    
        default:
            return state
    }
}
