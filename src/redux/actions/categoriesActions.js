import axios from 'axios'

const ACTIONS = {
    FETCH_CATEGORIES: 'fetch-categories',
    FETCH_CATEGORIES_FAIL: 'fetch-categories-fail',
}

export function fetchCategories() {
    return async function (dispatch) {
        try {
            const res = await axios({
                method: 'GET',
                url: '/api/v1/categories',
            })

            if (res.data.status === 'success') {
                dispatch({
                    type: ACTIONS.FETCH_CATEGORIES,
                    payload: {
                        categories: res.data.data.docs,
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
