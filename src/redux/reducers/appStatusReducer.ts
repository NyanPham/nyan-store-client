import ACTIONS, { Actions } from '../actions/appStatusActions'

export type AppStatus = {
  loading: boolean;
  toShowAlert: boolean;
  message: string;
  error: any;
}

const initialState = {
    loading: false,
    toShowAlert: false,
    message: '',
    error: null,
} 

const statusReducer = (state: AppStatus = initialState, action: Actions) => {
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
