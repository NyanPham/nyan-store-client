import axios from 'axios'
import { useEffect, useState } from 'react'
import { ROOT_URL } from '../config'

export default function useFetchDocs(docType, setFunction) {
    const [docs, setDocs] = useState([])

    useEffect(() => {
        axios.get(`${ROOT_URL}/api/v1/${docType}`, { withCredentials: true })
            .then(res => {
                if (res.data.status === 'success') {
                    const docs = setFunction ? setFunction(res.data.data.docs) : res.data.data.docs
                    setDocs(docs)
                }
            })
            .catch(err => alert(err.response.data.message))
    }, [docType, setFunction])

    return [docs, setDocs]
}

