import axios from 'axios'

const ACTIONS = {
    GET_ORDER: 'get-order',
    UPDATE_ORDER: 'update-order',
    ERROR_NOTE: 'error-note',
}

export function getOrderNote() {
    return async function (dispatch) {
        try {
            const res = await axios({
                method: 'GET',
                url: `https://enigmatic-harbor-26816.herokuapp.com/api/v1/users/myNote`,
            })

            if (res.data.status === 'success') {
                dispatch({
                    type: ACTIONS.GET_NOTE,
                    payload: {
                        orderNote: res.data.data.orderNote,
                    },
                })
            }
        } catch (err) {
            dispatch({
                type: ACTIONS.ERROR_NOTE,
                payload: {
                    error: err.response.data.message,
                },
            })
        }
    }
}

export const updateOrderNote = (orderNote) => async (dispatch) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `https://enigmatic-harbor-26816.herokuapp.com/api/v1/users/myNote`,
            data: {
                orderNote,
            },
            withCredentials: true,
        })

        dispatch({
            type: ACTIONS.UPDATE_ORDER,
            payload: {
                orderNote: res.data.data.orderNote,
            },
        })
    } catch (err) {
        dispatch({
            type: ACTIONS.ERROR_NOTE,
            payload: {
                error: err.response.data.message,
            },
        })
    }
}

export default ACTIONS
