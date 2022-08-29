import axios from 'axios'
import { useState } from 'react'
import useDebounce from './useDebounce'

export default function useFetchProducts(collections, collectionName) {
    const [products, setProducts] = useState([])

    useDebounce(
        async () => {
            const fetchProducts = async (collectionName) => {
                const collectionId = collections.find((category) => category.name === collectionName)?._id

                let url = '/api/v1/products'
                if (collectionId) url = `/api/v1/collections/${collectionId}/products`

                try {
                    const res = await axios({
                        method: 'GET',
                        url,
                    })
                    if (res.data.status === 'success') {
                        setProducts(res.data.data.docs)
                    }
                    console.log(res.data.data.docs)
                } catch (err) {
                    console.error(err)
                }
            }

            fetchProducts(collectionName)
        },
        500,
        [collectionName]
    )

    return products
}
