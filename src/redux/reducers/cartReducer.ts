import { Cart } from '../../types'
import ACTIONS, { Actions, CartActFailAction, CartActSuccessAction, FetchCartAction } from '../actions/cartActions'

const initialState = {
    cart: [],
    loading: false,
    message: '',
    error: '',
}

export type CartState = {
    cart: Cart,
    loading: boolean,
    message: string,
    error: string,
}

export default function cartReducer(state: CartState = initialState, action: Actions) {
    switch (action.type) {
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
                message: (action as CartActSuccessAction).payload.message,
                cart: (action as CartActSuccessAction).payload.cart,
            }
        case ACTIONS.CART_ACT_FAIL:
            return {
                ...state,
                loading: false,
                error: (action as CartActFailAction).payload.error,
            }
        case ACTIONS.FETCH_CART:
            return {
                ...state,
                loading: false,
                cart: (action as FetchCartAction).payload.cart,
            }
        case ACTIONS.EMPTY_CART:
            return {
                ...state,
                cart: [],
            }
        case ACTIONS.ADD_TO_CART:
            return {
                ...state,
            }   
        case ACTIONS.RESET_MESSAGE_ERROR:
            return {
                ...state,
                message: '',
                error: '',
            }
        case ACTIONS.REMOVE_FROM_CART:
            return {
                ...state,
            }
        default:
            return state
    }
}