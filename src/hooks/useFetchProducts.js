import axios from 'axios'
import { useEffect, useCallback } from 'react'
import { useState } from 'react'
import { ROOT_URL } from '../config'

const getCollectionUrlAndSuccessHandler = ({ collections, collectionName, setProducts, limit, page }) => {
    const collection = collections.find((c) => c.name === collectionName);
    if (!collection) {
        throw new Error(`Collection with name ${collectionName} not found`);
    }
    
    const { _id: collectionId } = collection;
    if (!collectionId) {
        throw new Error('Collection does not have a valid id');
    }

    const url = `${ROOT_URL}/api/v1/collections/${collectionId}/products?limit=${limit}&page=${page}`;

    const successHandler = async (res) => {
        if (res.status !== 200) {
            throw new Error(`Failed to fetch products from collection ${collectionName}`);
        }

        const { status, data } = res.data;
        if (status !== 'success') {
            throw new Error(`Failed to fetch products from collection ${collectionName}`);
        }

        setProducts(data.docs);
    };

    return { successHandler, url };
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
    const [isLoading, setIsLoading] = useState(false)

    const fetchProducts = useCallback(async () => {
        setIsLoading(true)
        try {
            let url, successHandler
            switch (type) {
                case 'collections':
                    ({ url, successHandler } = getCollectionUrlAndSuccessHandler({
                        collections,
                        collectionName,
                        setProducts,
                        limit,
                        page,
                    }))
                    break
                case 'category':
                    ({ url, successHandler } = getCategoryUrlAndSuccessHandler({
                        categoryName,
                        setProducts,
                        limit,
                        page,
                    }))
                    break
                case 'tags':
                    ({ url, successHandler } = getTagsUrlAndSuccessHandler({
                        tags,
                        setProducts,
                        limit,
                        page,
                    }))
                    break
                default:
                    throw new Error('Invalid type of fetch products')
            }

            const res = await axios(url)
            await successHandler(res)
        } catch (err) {
            console.error(err.response?.data?.message || err.message)
        } finally { 
            setIsLoading(false)
        }   
    }, [type, collectionName, categoryName, tags, setProducts, limit, page, collections])
    
    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    return { data: products, isLoading }
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
