import ACTIONS, { Actions, ErrorOrderAction, GetOrderAction } from '../actions/orderNoteActions'

const initialState = {
    orderNote: 'hi',
    error: '',
}
    
export default function orderNoteReducer(state = initialState, action: Actions) {
    switch (action.type) { 
        case ACTIONS.GET_ORDER_NOTE:
        case ACTIONS.UPDATE_ORDER:
            return {
                ...state,
                orderNote: (action as GetOrderAction).payload.orderNote,
            }
        case ACTIONS.ERROR_NOTE:
            return {
                ...state,
                error: (action as ErrorOrderAction).payload.error,
            }
        default:
            return state
    }
}
