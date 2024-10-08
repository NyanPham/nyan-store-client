import axios from 'axios'
import { ROOT_URL } from '../config'

export async function getOrderNote(cb: (orderNote: string) => void) {
    try {
        const res = await axios({
            method: 'GET',
            url: `${ROOT_URL}/api/v1/users/myNote`,
        })
        if (res.data.status('success')) {
            cb(res.data.data.orderNote)
        }
    } catch (err: any) {
        console.error(err.response.data.message)
    }
}

export async function updateMyNote(orderNote: string) {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `${ROOT_URL}/api/v1/users/myNote`,
            data: {
                orderNote,
            },
            withCredentials: true,
        })
        if (res.data.status('success')) {
            return res.data.data.orderNote
        }
    } catch (err: any) {
        console.error(err.response.data.message)
        return null
    }
}
