import ACTIONS from '../actions/biddingActions'

export default function biddingReducer(state = [], { type, payload }) {
    switch (type) {
        case ACTIONS.GET_BIDDING_PRODUCTS:
            return payload.biddingProducts

        default:
            return state
    }
}
