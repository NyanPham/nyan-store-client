import ACTIONS from '../actions/cartActions'

const intitialState = {
    cart: [],
    loading: false,
    message: '',
    error: '',
}

export default function cartReducer(state = intitialState, { type, payload }) {
    switch (type) {
        case ACTIONS.START_CART_ACT:
            return {
                ...state,
                loading: true,
                error: '',
                message: '',
            }
        case ACTIONS.CART_ACT_SUCCESS:
            return {
                ...state,
                loading: false,
                message: 'success',
            }
        case ACTIONS.CART_ACT_FAIL:
            return {
                ...state,
                loading: false,
                error: payload.error,
            }
        case ACTIONS.FETCH_CART:
            return {
                ...state,
                cart: payload.cart,
            }
        case ACTIONS.ADD_TO_CART:
            return {
                ...state,
            }
        case ACTIONS.REMOVE_FROM_CART:
            return {
                ...state,
            }
        default:
            return state
    }
}
