import axios from 'axios'

export async function getOrderNote(cb) {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/users/myNote`,
        })
        if (res.data.status('success')) {
            cb(res.data.data.orderNote)
        }
    } catch (err) {
        console.error(err.response.data.message)
    }
}

export async function updateMyNote(orderNote) {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/users/myNote`,
            data: {
                orderNote,
            },
        })
        if (res.data.status('success')) {
            return res.data.data.orderNote
        }
    } catch (err) {
        console.error(err.response.data.message)
        return null
    }
}
