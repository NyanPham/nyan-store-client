const ACTIONS = {
    SHOW_LOADING: 'SHOW_LOADING',
    HIDE_LOADING: 'HIDE_LOADING',
    SHOW_ALERT: 'SHOW_ALERT',
    HIDE_ALERT: 'HIDE_ALERT',
    SET_ERROR: 'SET_ERROR',
}

export const showLoading = () => ({ type: ACTIONS.SET_LOADING });
export const hideLoading = () => ({ type: ACTIONS.HIDE_LOADING });
export const showAlert = (payload) => ({ type: ACTIONS.SHOW_ALERT, payload });
export const hideAlert = () => ({ type: ACTIONS.HIDE_ALERT });
export const setError = (payload) => ({ type: ACTIONS.SET_ERROR, payload });

export default ACTIONS