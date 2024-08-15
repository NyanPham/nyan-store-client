import axios from 'axios'
import { useEffect, useMemo } from 'react'
import { useState } from 'react'
import { ROOT_URL } from '../config'

const getCollectionUrlAndSuccessHandler = ({ collections, collectionName, setProducts, limit, page }) => {
    const collectionId = collections.find((category) => category.name === collectionName)?._id
    const url = `${ROOT_URL}/api/v1/collections/${collectionId}/products?limit=${limit}&page=${page}`

    const successHandler = async (res) => {
        if (collectionId == null) {
            throw new Error('Not found collection id')
        }

        if (res.data.status !== 'success') return
        setProducts(res.data.data.docs)
    }

    return { successHandler, url }
}

const getCategoryUrlAndSuccessHandler = ({ categoryName, setProducts, limit, page }) => {
    const url = `${ROOT_URL}/api/v1/categories?name=${categoryName}`
    const successHandler = async (res) => {
        if (res.data.status !== 'success') {
            throw new Error(`Failed to fetch categories of name ${categoryName}`)
        }

        const categoryIds = res.data.data.docs.map((category) => category._id)

        const responses = await Promise.allSettled(
            categoryIds.map((categoryId) =>
                axios(`${ROOT_URL}/api/v1/categories/${categoryId}/products?limit=${limit}&page=${page}`)
            )
        )

        const products = responses
            .filter((res) => res.status === 'fulfilled')
            .map((res) => res.value.data.data.docs)
            .flat()

        setProducts(products)
    }

    return { url, successHandler }
}

const getTagsUrlAndSuccessHandler = ({ tags, setProducts, limit, page }) => {
    const tagQueryParams = tags.join(`&tags[in]=`)

    const url = `${ROOT_URL}/api/v1/products?tags[in]=${tagQueryParams}&limit=${limit}&page=${page}`
    const successHandler = async (res) => {
        if (res.data.status !== 'success') return
        setProducts(res.data.data.docs)
    }

    return { successHandler, url }
}

export function useFetchProducts(type, props) {
    const { collections, collectionName, categoryName, tags, limit = 4, page = 1 } = props

    const [products, setProducts] = useState([])

    const urlAndHandler = useMemo(() => {
        switch (type) {
            case 'collections':
                return getCollectionUrlAndSuccessHandler({
                    collections,
                    collectionName,
                    setProducts,
                    limit,
                    page,
                })
            case 'category':
                return getCategoryUrlAndSuccessHandler({ categoryName, setProducts, limit, page })
            case 'tags':
                return getTagsUrlAndSuccessHandler({ tags, setProducts, limit, page })
            default:
                throw new Error('Invalid type of fetch products')
        }
    }, [type, collectionName, categoryName, tags, setProducts, limit, page, collections])

    const { url, successHandler } = urlAndHandler || {
        url: `${ROOT_URL}/api/v1/products?limit=${limit}&page=${page}`,
        successHandler: async () => {},
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                try {
                    const res = await axios(url)
                    await successHandler(res)
                } catch (err) {
                    console.error(err)
                }
            } catch (err) {
                alert(err.response.data.message)
            }
        }

        fetchProducts()
    }, [url, successHandler])

    return products
}

// export function useFetchProductsFromCollection(collections, collectionName) {
//     const [products, setProducts] = useState([])
//     const collectionId = collections.find((category) => category.name === collectionName)?._id
//     const limit = 8
//     const page = 1

//     useEffect(() => {
//         const fetchProducts = async () => {
//             let url = `${ROOT_URL}/api/v1/products?limit=${limit}&page=${page}`
//             if (collectionId)
//                 url = `${ROOT_URL}/api/v1/collections/${collectionId}/products?limit=${limit}&page=${page}`

//             try {
//                 const res = await axios({
//                     method: 'GET',
//                     url,
//                 })

//                 if (res.data.status === 'success') {
//                     setProducts(res.data.data.docs)
//                 }
//             } catch (err) {
//                 alert(err)
//             }
//         }

//         fetchProducts()
//     }, [collectionId])

//     return products
// }

// export function useFetchProductsFromCategory(categoryName) {
//     const [products, setProducts] = useState([])

//     const fetchProducts = useCallback(async (categoryName) => {
//         let categoryIds
//         try {
//             const res = await axios({
//                 method: 'GET',
//                 url: `${ROOT_URL}/api/v1/categories?name=${categoryName}`,
//             })

//             if (res.data.status === 'success') {
//                 categoryIds = res.data.data.docs.map((category) => category._id)
//             }

//             const responses = await Promise.all(
//                 categoryIds.map(async (categoryId) => {
//                     return await axios({
//                         method: 'GET',
//                         url: `${ROOT_URL}/api/v1/categories/${categoryId}/products`,
//                     })
//                 })
//             )

//             const products = [...responses.flatMap((res) => res.data.data.docs)]
//             setProducts(products)
//         } catch (err) {
//             alert(err.response.data.message)
//         }
//     }, [])

//     useEffect(() => {
//         fetchProducts(categoryName)
//     }, [categoryName, fetchProducts])

//     return products
// }
