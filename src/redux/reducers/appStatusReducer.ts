import ACTIONS from '../actions/appStatusActions'

const initialState = {
    loading: false,
    toShowAlert: false,
    message: '',
    error: null,
} 

const statusReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SHOW_LOADING:
            return { 
              ...state, 
              loading: true 
            }   
        case ACTIONS.HIDE_LOADING:
          return { 
            ...state, 
            loading: false 
          }
        case ACTIONS.SHOW_ALERT:
            return { 
              ...state, 
              toShowAlert: true, 
            }
        case ACTIONS.HIDE_ALERT:
            return { 
              ...state, 
              toShowAlert: false, 
            }
        case ACTIONS.SET_ERROR:
            return { 
              ...state, 
              error: action.payload 
            }
        case ACTIONS.SET_MESSAGE:
            return {
              ...state,
              message: action.payload
            }
        default:
            return state
    }
}

export default statusReducer
