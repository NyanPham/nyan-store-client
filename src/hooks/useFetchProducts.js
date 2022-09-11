import axios from 'axios'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ROOT_URL } from '../config'
import useDebounce from './useDebounce'

export function useFetchProductsFromCollection(collections, collectionName) {
    const [products, setProducts] = useState([])
    const collectionId = collections.find((category) => category.name === collectionName)?._id
    const limit = 8

    useEffect(() => {
        const fetchProducts = async () => {
            let url = `${ROOT_URL}/api/v1/products?limit=${limit}`
            if (collectionId) url = `${ROOT_URL}/api/v1/collections/${collectionId}/products?limit=${limit}`

            try {
                const res = await axios({
                    method: 'GET',
                    url,
                })

                if (res.data.status === 'success') {
                    setProducts(res.data.data.docs)
                }
            } catch (err) {
                alert(err)
            }
        }

        fetchProducts()
    }, [collectionId])

    return products
}

export function useFetchProductsFromCategory(categoryName) {
    const [products, setProducts] = useState([])

    const fetchProducts = useCallback(async (categoryName) => {
        let categoryIds
        try {
            const res = await axios({
                method: 'GET',
                url: `${ROOT_URL}/api/v1/categories?name=${categoryName}`,
            })

            if (res.data.status === 'success') {
                categoryIds = res.data.data.docs.map((category) => category._id)
            }

            const responses = await Promise.all(
                categoryIds.map(async (categoryId) => {
                    return await axios({
                        method: 'GET',
                        url: `${ROOT_URL}/api/v1/categories/${categoryId}/products`,
                    })
                })
            )

            const products = [...responses.flatMap((res) => res.data.data.docs)]
            setProducts(products)
        } catch (err) {
            alert(err.response.data.message)
        }
    }, [])

    useDebounce(
        () => {
            fetchProducts(categoryName)
        },
        200,
        [categoryName]
    )

    return products
}
