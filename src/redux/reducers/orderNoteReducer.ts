import ACTIONS from '../actions/orderNoteActions'

const initialState = {
    orderNote: 'hi',
    error: '',
}

export default function orderNoteReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ACTIONS.GET_ORDER:
        case ACTIONS.UPDATE_ORDER:
            return {
                ...state,
                orderNote: payload.orderNote,
            }
        case ACTIONS.ERROR_NOTE:
            return {
                ...state,
                error: payload.error,
            }
        default:
            return state
    }
}
