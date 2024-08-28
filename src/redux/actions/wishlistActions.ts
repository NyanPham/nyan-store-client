import axios from 'axios'
import { ROOT_URL } from '../../config'
import { Dispatch } from 'redux'
import { VariantWithOrderNum } from '../../types'

const ACTIONS = {
    GET_WISHLIST: 'get-wishlist',
    ADD_TO_WISHLIST: 'add-to-wishlist',
    REMOVE_FROM_WISHLIST: 'remove-from-wishlist',
    EMPTY_WISHLIST: 'empty-wishlist',
    MAINTAIN_WISHLIST: 'maintain-wishlist',
}

export type GetWishlistAction = {
    type: typeof ACTIONS.GET_WISHLIST
    payload: {
        wishlist: VariantWithOrderNum[]
    }
}

export type AddToWishlistAction = {
    type: typeof ACTIONS.ADD_TO_WISHLIST
        payload: {
        wishlist: VariantWithOrderNum[]
    }
}

export type RemoveFromWishlistAction = {
    type: typeof ACTIONS.REMOVE_FROM_WISHLIST
    payload: {
        wishlist: VariantWithOrderNum[]
    }
}

export type EmptyWishlistAction = {
    type: typeof ACTIONS.EMPTY_WISHLIST
}

export type Actions = GetWishlistAction | AddToWishlistAction | RemoveFromWishlistAction | EmptyWishlistAction

export const addWishlist = (productId: string) => {
    return async (dispatch: Dispatch<Actions>) => {
        try {
            const res = await axios({
                method: 'PATCH',
                url: `${ROOT_URL}/api/v1/users/myWishlist`,
                data: {
                    product: productId,
                },
                withCredentials: true,
            })

            if (res.data.status === 'success') {
                dispatch({
                    type: ACTIONS.GET_WISHLIST,
                    payload: {
                        wishlist: res.data.data.wishlist,
                    },
                })
            }
        } catch (err) {
            return {
                type: ACTIONS.MAINTAIN_WISHLIST,
            }
        }
    }
}

export const removeWishlist = (productId: string) => {
    return async (dispatch: Dispatch<Actions>) => {
        try {
            const res = await axios({
                method: 'PATCH',
                url: `${ROOT_URL}/api/v1/users/removeWishlist`,
                data: {
                    product: productId,
                },
                withCredentials: true,
            })  

            if (res.data.status === 'success') {
                dispatch({
                    type: ACTIONS.GET_WISHLIST,
                    payload: {
                        wishlist: res.data.data.wishlist,
                    },
                })
            }
        } catch (err) {
            return {
                type: ACTIONS.MAINTAIN_WISHLIST,
            }
        }
    }
}
        
export const getWishlist = () => {
    return async (dispatch: Dispatch<Actions>) => {
        try {
            const res = await axios({
                method: 'GET',
                url: `${ROOT_URL}/api/v1/users/myWishlist`,
                withCredentials: true,
            })

            if (res.data.status === 'success') {
                dispatch({
                    type: ACTIONS.GET_WISHLIST,
                    payload: {
                        wishlist: res.data.data.wishlist,
                    },
                })
            }
        } catch (err) {
            console.error(err)
            dispatch({
                type: ACTIONS.EMPTY_WISHLIST,
            })
        }
    }
}

export const emptyWishlist = () => {
    return {
        type: ACTIONS.EMPTY_WISHLIST,
    }
}

export default ACTIONS
