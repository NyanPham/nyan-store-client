import axios from 'axios'
import { ROOT_URL } from '../../config'
import { Dispatch } from 'redux';
import { AddToCartItem, RemoveFromCartItem, UpdateInCartItem, Variant } from '../../types';

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

export type Actions =
    | {
          type: typeof ACTIONS.START_CART_ACT
      }
    | {
          type: typeof ACTIONS.CART_ACT_SUCCESS
          payload: {
              message: string
              cart: Variant[]
          }
      }
    | {
          type: typeof ACTIONS.CART_ACT_FAIL
          payload: {
              error: string
          }
      }
    | {
          type: typeof ACTIONS.FETCH_CART
          payload: {
              cart: Variant[]
          }
      }
    | {
          type: typeof ACTIONS.EMPTY_CART
      }
    | {
          type: typeof ACTIONS.ADD_TO_CART
      }
    | {
          type: typeof ACTIONS.RESET_MESSAGE_ERROR
      }
    | {
          type: typeof ACTIONS.REMOVE_FROM_CART
      }

export const addToCart = (data: AddToCartItem) => async (dispatch: Dispatch<Actions>) => {
    dispatch({
        type: ACTIONS.START_CART_ACT,
    })

    try {
        const res = await axios({
            method: 'PATCH',
            url: `${ROOT_URL}/api/v1/users/addToMyCart`,
            data,
            withCredentials: true,
        })

        if (res.data.status === 'success') {
            dispatch({
                type: ACTIONS.CART_ACT_SUCCESS,
                payload: { message: 'success', cart: res.data.data.cart },
            })
        }
    } catch (err: any) {
        console.error(err)
        dispatch({
            type: ACTIONS.CART_ACT_FAIL,
            payload: {
                error: err.response?.data?.message,
            },
        })
    }
}

export const getCart = () => async (dispatch : Dispatch<Actions>) => {
    dispatch({
        type: ACTIONS.START_CART_ACT,
    })

    try {
        const res = await axios({
            method: 'GET',
            url: `${ROOT_URL}/api/v1/users/getMyCart`,
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
    } catch (err: any) {
        console.error(err)
        dispatch({
            type: ACTIONS.CART_ACT_FAIL,
            payload: {
                error: err.response.data.message,
            },
        })
    }
}

export const updateCart = (data: UpdateInCartItem) => async (dispatch : Dispatch<Actions>) => {
    dispatch({
        type: ACTIONS.START_CART_ACT,
    })

    try {
        const res = await axios({
            method: 'PATCH',
            url: `${ROOT_URL}/api/v1/users/updateMyCart`,
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
    } catch (err: any) {
        console.error(err)
        dispatch({
            type: ACTIONS.CART_ACT_FAIL,
            payload: {
                error: err.response.data.message,
            },
        })
    }
}

export const removeCart = (data: RemoveFromCartItem) => async (dispatch : Dispatch<Actions>) => {
    dispatch({
        type: ACTIONS.START_CART_ACT,
    })
    
    try {
        const res = await axios({
            method: 'PATCH',
            url: `${ROOT_URL}/api/v1/users/removeMyCart`,
            data,
            withCredentials: true,
        })

        if (res.data.status === 'success') {
            getCart()(dispatch)
        }
    } catch (err : any) {
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
