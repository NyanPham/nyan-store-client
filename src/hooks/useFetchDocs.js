import axios from 'axios'
import { useEffect, useState } from 'react'
import { ROOT_URL } from '../config'

export default function useFetchDocs(docType, setFunction) {
    const [docs, setDocs] = useState([])

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    url: `${ROOT_URL}/api/v1/${docType}`,
                    withCredentials: true,
                })

                if (res.data.status === 'success') {
                    if (typeof setFunction !== 'function') return setDocs(res.data.data.docs)

                    setDocs(setFunction(res.data.data.docs))
                }
            } catch (err) {
                alert(err.response.data.message)
            }
        }

        fetchDocs()
        // eslint-disable-next-line
    }, [docType])

    return [docs, setDocs]
}
