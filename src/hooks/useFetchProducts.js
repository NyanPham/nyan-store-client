import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useFetchProducts(params) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    url: `/api/v1/products`,
                    params,
                })
                if (res.data.status === 'success') {
                    setProducts(res.data.data.docs)
                }
            } catch (err) {
                console.error(err)
            }
        }

        fetchProducts()
    }, [])

    return products
}
