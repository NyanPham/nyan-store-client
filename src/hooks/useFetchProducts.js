import axios from 'axios'
import { useState, useEffect } from 'react'
import useDebounce from './useDebounce'

export function useFetchProductsFromCollection(collections, collectionName) {
    const [products, setProducts] = useState([])

    useEffect(() => {
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
            } catch (err) {
                console.error(err)
            }
        }

        fetchProducts(collectionName)
    }, [collectionName])

    return products
}

export function useFetchProductsFromCategory(cateogryName) {
    const [products, setProducts] = useState([])

    useDebounce(
        async () => {
            const fetchProducts = async (cateogryName) => {
                let categoryIds
                try {
                    const res = await axios({
                        method: 'GET',
                        url: `api/v1/categories?name=${cateogryName}`,
                    })
                    if (res.data.status === 'success') {
                        categoryIds = res.data.data.docs.map((category) => category._id)
                    }

                    const responses = await Promise.all(
                        categoryIds.map(async (categoryId) => {
                            return await axios({
                                method: 'GET',
                                url: `api/v1/categories/${categoryId}/products`,
                            })
                        })
                    )

                    const products = [...responses.flatMap((res) => res.data.data.docs)]
                    setProducts(products)
                } catch (err) {
                    console.error(err.response.data.message)
                }
            }

            fetchProducts(cateogryName)
        },
        500,
        [cateogryName]
    )

    return products
}
