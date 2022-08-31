import axios from 'axios'

const ACTIONS = {
    START_CART_ACT: 'start-cart-act',
    CART_ACT_SUCCESS: 'done-cart-act',
    CART_ACT_FAIL: 'fail-cart-act',
    ADD_TO_CART: 'add-to-cart',
    REMOVE_FROM_CART: 'remove-from-cart',
    UPDATE_CART: 'update-cart',
    FETCH_CART: 'fetch-cart',
}

export const addToCart = (data) => async (dispatch) => {
    dispatch({
        type: ACTIONS.START_CART_ACT,
    })

    try {
        const res = await axios({
            method: 'PATCH',
            url: '/api/v1/users/addToMyCart',
            data,
        })

        if (res.data.status === 'success') {
            console.log(res.data.data.cart)
            dispatch({
                type: ACTIONS.FETCH_CART,
                payload: {
                    cart: res.data.data.cart,
                },
            })
            dispatch({
                type: ACTIONS.CART_ACT_SUCCESS,
            })
        }
    } catch (err) {
        console.error(err)
        dispatch({
            type: ACTIONS.CART_ACT_FAIL,
            payload: {
                error: err.response.data.message,
            },
        })
    }
}

export default ACTIONS
