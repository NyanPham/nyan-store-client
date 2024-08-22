import ACTIONS from '../actions/appStatusActions'

const initialState = {
    loading: false,
    showAlert: true,
    message: 'Hello world',
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
              showAlert: true, 
              message: action.payload 
            }
        case ACTIONS.HIDE_ALERT:
            return { 
              ...state, 
              showAlert: false, 
              message: '' 
            }
        case ACTIONS.SET_ERROR:
            return { 
              ...state, 
              error: action.payload 
            }
        default:
            return state
    }
}

export default statusReducer
