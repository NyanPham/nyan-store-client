import axios from 'axios'
import { ROOT_URL } from '../../config'
import { Dispatch } from 'redux'

const ACTIONS = {
    GET_ORDER_NOTE: 'get-order',
    UPDATE_ORDER: 'update-order',
    ERROR_NOTE: 'error-note',
}

export type GetOrderAction = {
    type: string,
    payload: {
        orderNote: string
    }
}

export type ErrorOrderAction = {
    type: string,
    payload: {
        error: string
    }
}

export type Actions = GetOrderAction | ErrorOrderAction

export function getOrderNote() {
    return async function (dispatch: Dispatch<Actions>) {
        try {
            const res = await axios({
                method: 'GET',
                url: `${ROOT_URL}/api/v1/users/myNote`,
                withCredentials: true,
            })

            if (res.data.status === 'success') {
                dispatch({
                    type: ACTIONS.GET_ORDER_NOTE,
                    payload: {
                        orderNote: res.data.data.orderNote,
                    },
                })
            }
        } catch (err: any) {
            dispatch({
                type: ACTIONS.ERROR_NOTE,
                payload: {
                    error: err.response.data.message,
                },
            })
        }
    }
}   

export const updateOrderNote = (orderNote: string) => async (dispatch: Dispatch<Actions>) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `${ROOT_URL}/api/v1/users/myNote`,
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
    } catch (err: any) {
        dispatch({
            type: ACTIONS.ERROR_NOTE,
            payload: {
                error: err.response.data.message,
            },  
        })
    }
}

export default ACTIONS
