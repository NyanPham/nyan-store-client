import axios from 'axios'
import { ROOT_URL } from '../../config'
import { Dispatch } from 'redux'
import { Collection } from '../../types';

const ACTIONS = {
    FETCH_COLLECTIONS: 'fetch-collections',
    FETCH_COLLECTIONS_FAIL: 'fetch-collections-fail',
};

export type Actions = {
    type: typeof ACTIONS.FETCH_COLLECTIONS;
    payload: {
        collections: Collection[];
    };
} | {
    type: typeof ACTIONS.FETCH_COLLECTIONS_FAIL;
    payload: null
};

export function fetchCollections() {
    return async function (dispatch: Dispatch<Actions>) {
        try {
            const res = await axios({
                method: 'GET',
                url: `${ROOT_URL}/api/v1/collections`,
            })
            
            if (res.data.status === 'success') {
                dispatch({
                    type: ACTIONS.FETCH_COLLECTIONS,
                    payload: {
                        collections: res.data.data.docs,
                    },
                } as const)
            }
        } catch (err) { 
            dispatch({
                type: ACTIONS.FETCH_COLLECTIONS_FAIL,
                payload: null
            } as const)
        }
    }
}
export default ACTIONS
