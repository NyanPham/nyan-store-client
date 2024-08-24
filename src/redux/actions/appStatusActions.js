const ACTIONS = {
    SHOW_LOADING: 'SHOW_LOADING',
    HIDE_LOADING: 'HIDE_LOADING',
    SHOW_ALERT: 'SHOW_ALERT',
    HIDE_ALERT: 'HIDE_ALERT',
    SET_ERROR: 'SET_ERROR',
    SET_MESSAGE: 'SET_MESSAGE',
}

export const showLoading = () => ({ type: ACTIONS.SHOW_LOADING });
export const hideLoading = () => ({ type: ACTIONS.HIDE_LOADING });
export const showAlert = () => ({ type: ACTIONS.SHOW_ALERT });
export const hideAlert = () => ({ type: ACTIONS.HIDE_ALERT });
export const setError = (payload) => ({ type: ACTIONS.SET_ERROR, payload });
export const setMessage = (payload) => ({ type: ACTIONS.SET_MESSAGE, payload });

export default ACTIONS