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
                url: 'https://enigmatic-harbor-26816.herokuapp.com/api/v1/categories',
            })

            dispatch({
                type: ACTIONS.FETCH_CATEGORIES,
                payload: {
                    categories: res.data.data.docs,
                },
            })
        } catch (err) {
            dispatch({
                type: ACTIONS.FETCH_COLLECTIONS_FAIL,
            })
        }
    }
}

export default ACTIONS
