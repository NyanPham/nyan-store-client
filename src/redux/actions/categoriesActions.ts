import axios from 'axios'
import { ROOT_URL } from '../../config'
import { Category } from '../../types';
import { Dispatch } from 'redux';

const ACTIONS = {
    FETCH_CATEGORIES: 'fetch-categories',
    FETCH_CATEGORIES_FAIL: 'fetch-categories-fail',
}

export type FetchCategoriesAction = {
    type: typeof ACTIONS.FETCH_CATEGORIES;
    payload: {
        categories: Category[];
    };
}

export type FailCategoriesAction = {
    type: typeof ACTIONS.FETCH_CATEGORIES_FAIL;
};
    
export type Actions = FetchCategoriesAction | FailCategoriesAction

export function fetchCategories() {
    return async function (dispatch: Dispatch<Actions>) {
        try {
            const res = await axios({
                method: 'GET',
                url: `${ROOT_URL}/api/v1/categories`,
            })
            
            dispatch({
                type: ACTIONS.FETCH_CATEGORIES,
                payload: {
                    categories: res.data.data.docs,
                },
            })
        } catch (err) {
            dispatch({
                type: ACTIONS.FETCH_CATEGORIES_FAIL,
                payload: null
            })
        }
    }
}

export default ACTIONS
