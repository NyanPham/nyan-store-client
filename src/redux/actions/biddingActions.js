import axios from 'axios'

const ACTIONS = {
    GET_BIDDING_PRODUCTS: 'get-bidding-products',
}

export const getBiddingProduct = () => {
    return async (dispatch) => {
        try {
            const res = await axios({
                method: 'GET',
                url: `/api/v1/products`,
                params: {
                    isAuctioned: true,
                },
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
            console.log(err.response.data.message)
        }
    }
}

export default ACTIONS
