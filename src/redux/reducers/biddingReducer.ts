import ACTIONS from '../actions/biddingActions'

const initialState = {
    loading: false,
    message: '',
    error: '',
    data: [],
}

export default function biddingReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ACTIONS.GET_BIDDING_PRODUCTS:
            return {
                ...state,
                data: payload.biddingProducts,
            }

        case ACTIONS.AUCTION_START:
            return {
                ...state,
                loading: true,
                message: '',
                error: '',
            }
        case ACTIONS.AUCTION_SUCCESS:
            return {
                ...state,
                loading: false,
                message: 'You have auctioned successfully!',
            }
        case ACTIONS.AUCTION_FAILED:
            return {
                ...state,
                loading: false,
                error: payload.error,
            }
        case ACTIONS.AUCTION_MESSAGE_ERRO_RESET:
            return {
                ...state,
                error: '',
                message: '',
            }
        default:
            return state
    }
}
