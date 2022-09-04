import axios from 'axios'

const ACTIONS = {
    FETCH_COLLECTIONS: 'fetch-collections',
    FETCH_COLLECTIONS_FAIL: 'fetch-collections-fail',
}

export function fetchCollections() {
    return async function (dispatch) {
        try {
            const res = await axios({
                method: 'GET',
                url: `https://enigmatic-harbor-26816.herokuapp.com/api/v1/collections`,
            })

            if (res.data.status === 'success') {
                dispatch({
                    type: ACTIONS.FETCH_COLLECTIONS,
                    payload: {
                        collections: res.data.data.docs,
                    },
                })
            }
        } catch (err) {
            dispatch({
                type: ACTIONS.FETCH_COLLECTIONS_FAIL,
            })
        }
    }
}

export default ACTIONS
