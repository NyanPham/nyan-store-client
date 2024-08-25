import axios from 'axios'
import { ROOT_URL } from '../../config'

const ACTIONS = {
    GET_BIDDING_PRODUCTS: 'get-bidding-products',
    AUCTION_PRODUCT: 'auction-a-product',
    AUCTION_START: 'start-to-auction',
    AUCTION_FAILED: 'fail-to-auction',
    AUCTION_SUCCESS: 'succeed-to-auction',
    AUCTION_MESSAGE_ERRO_RESET: 'reset-auction-message-error',
}

export const resetMessagesAndError = () => {
    return {
        type: ACTIONS.AUCTION_MESSAGE_ERRO_RESET,
    }
}

export const getBiddingProduct = () => {
    return async (dispatch) => {
        try {
            const res = await axios({
                method: 'GET',
                url: `${ROOT_URL}/api/v1/products`,
                params: {
                    isAuctioned: true,
                },
                withCredentials: true,
            })

            if (res.data.status === 'success') {
                return dispatch({
                    type: ACTIONS.GET_BIDDING_PRODUCTS,
                    payload: {
                        biddingProducts: res.data.data.docs,
                    },
                })
            }
        } catch (err) {
            console.error(err.response.data.message)
        }
    }
}

export const auctionProduct = (data) => {
    return async (dispatch) => {
        dispatch({
            type: ACTIONS.AUCTION_START,
        })
        try {
            const res = await axios({
                method: 'POST',
                url: `${ROOT_URL}/api/v1/bidding`,
                data,
                withCredentials: true,
            })

            if (res.data.status === 'success') {
                dispatch({
                    type: ACTIONS.AUCTION_SUCCESS,
                })
            }
        } catch (err) {
            dispatch({
                type: ACTIONS.AUCTION_FAILED,
                payload: {
                    error: err.response.data.message,
                },
            })
        }
    }
}

export default ACTIONS
