import axios from 'axios'

const ACTIONS = {
    GET_WISHLIST: 'get-wishlist',
    ADD_TO_WISHLIST: 'add-to-wishlist',
    REMOVE_FROM_WISHLIST: 'remove-from-wishlist',
    EMPTY_WISHLIST: 'empty-wishlist',
    MAINTAIN_WISHLIST: 'maintain-wishlist',
}

export const addWishlist = (productId) => {
    return async (dispatch) => {
        try {
            const res = await axios({
                method: 'PATCH',
                url: `https://enigmatic-harbor-26816.herokuapp.com/api/v1/users/myWishlist`,
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

export const removeWishlist = (wishlist, productId) => {
    const newWishlist = wishlist.filter((item) => item.item._id !== productId)

    return async (dispatch) => {
        try {
            await axios({
                method: 'DELETE',
                url: `https://enigmatic-harbor-26816.herokuapp.com/api/v1/users/myWishlist`,
                data: {
                    wishlist,
                    product: productId,
                },
            })
            dispatch({
                type: ACTIONS.GET_WISHLIST,
                payload: {
                    wishlist: newWishlist,
                },
            })
        } catch (err) {
            return {
                type: ACTIONS.MAINTAIN_WISHLIST,
            }
        }
    }
}

export const getWishlist = () => {
    return async (dispatch) => {
        try {
            const res = await axios({
                method: 'GET',
                url: `https://enigmatic-harbor-26816.herokuapp.com/api/v1/users/myWishlist`,
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
