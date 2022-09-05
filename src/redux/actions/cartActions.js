import axios from 'axios'

const ACTIONS = {
    START_CART_ACT: 'start-cart-act',
    CART_ACT_SUCCESS: 'done-cart-act',
    CART_ACT_FAIL: 'fail-cart-act',
    ADD_TO_CART: 'add-to-cart',
    REMOVE_FROM_CART: 'remove-from-cart',
    UPDATE_CART: 'update-cart',
    FETCH_CART: 'fetch-cart',
    EMPTY_CART: 'empty-cart',
    RESET_MESSAGE_ERROR: 'reset-message-error',
}

export const addToCart = (data) => async (dispatch) => {
    dispatch({
        type: ACTIONS.START_CART_ACT,
    })

    try {
        const res = await axios({
            method: 'PATCH',
            url: `https://enigmatic-harbor-26816.herokuapp.com/api/v1/users/addToMyCart`,
            data,
            withCredentials: true,
        })

        if (res.data.status === 'success') {
            dispatch({
                type: ACTIONS.CART_ACT_SUCCESS,
                payload: { message: 'success', cart: res.data.data.cart },
            })
        }
    } catch (err) {
        dispatch({
            type: ACTIONS.CART_ACT_FAIL,
            payload: {
                error: err.response.data.message,
            },
        })
    }
}

export const getCart = () => async (dispatch) => {
    dispatch({
        type: ACTIONS.START_CART_ACT,
    })

    try {
        const res = await axios({
            method: 'GET',
            url: `https://enigmatic-harbor-26816.herokuapp.com/api/v1/users/getMyCart`,
            withCredentials: true,
        })

        if (res.data.status === 'success') {
            dispatch({
                type: ACTIONS.FETCH_CART,
                payload: {
                    cart: res.data.data.cart,
                },
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

export const updateCart = (data) => async (dispatch) => {
    dispatch({
        type: ACTIONS.START_CART_ACT,
    })

    try {
        const res = await axios({
            method: 'PATCH',
            url: `https://enigmatic-harbor-26816.herokuapp.com/api/v1/users/updateMyCart`,
            data,
            withCredentials: true,
        })

        if (res.data.status === 'success') {
            dispatch({
                type: ACTIONS.CART_ACT_SUCCESS,
                payload: {
                    message: 'Cart update successfully',
                    cart: res.data.data.cart,
                },
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

export const removeCart = (data) => async (dispatch) => {
    dispatch({
        type: ACTIONS.START_CART_ACT,
    })

    try {
        const res = await axios({
            method: 'PATCH',
            url: `https://enigmatic-harbor-26816.herokuapp.com/api/v1/users/removeMyCart`,
            data,
            withCredentials: true,
        })

        if (res.data.status === 'success') {
            dispatch(getCart())
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

export const resetMessageError = () => {
    return {
        type: ACTIONS.RESET_MESSAGE_ERROR,
    }
}

export const emptyCart = () => {
    return {
        type: ACTIONS.EMPTY_CART,
    }
}
export default ACTIONS
