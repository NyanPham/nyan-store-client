import axios from 'axios'
import { useEffect, useCallback, useMemo } from 'react'
import { useState } from 'react'
import { ROOT_URL } from '../config'
import { Category, Collection, ServerResponse, Tag, Product } from '../types'

type getCollectionUrlAndSuccessHandlerType = {
    collections: Collection[],
    collectionName: string,
    setProducts: (products: Product[]) => void,
    limit: number,
    page: number
}

const getCollectionUrlAndSuccessHandler = ({ collections, collectionName, setProducts, limit, page } : getCollectionUrlAndSuccessHandlerType) => {
    const collection = collections.find((c) => c.name === collectionName);
    if (!collection) {
        throw new Error(`Collection with name ${collectionName} not found`);
    }
    
    const { _id: collectionId } = collection;
    if (!collectionId) {
        throw new Error('Collection does not have a valid id');
    }

    const url = `${ROOT_URL}/api/v1/collections/${collectionId}/products?limit=${limit}&page=${page}`;

    const successHandler = async (res : ServerResponse) => {
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

type getCategoryUrlAndSuccessHandlerType = {
    categoryName: string,
    setProducts: Function,
    limit: number,
    page: number
}

const getCategoryUrlAndSuccessHandler = ({ categoryName, setProducts, limit, page } : getCategoryUrlAndSuccessHandlerType) => {
    const url = `${ROOT_URL}/api/v1/categories?name=${categoryName}`
    const successHandler = async (res: ServerResponse) => {
        if (res.data.status !== 'success') {
            throw new Error(`Failed to fetch categories of name ${categoryName}`)
        }

        const categoryIds : string[] = res.data.data.docs.map((category : Category) => category._id)

        const responses = await Promise.allSettled(
            categoryIds.map((categoryId: string) =>
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

type getTagsUrlAndSuccessHandlerType = {
    tags: Tag[],
    setProducts: Function,
    limit: number,
    page: number
}

const getTagsUrlAndSuccessHandler = ({ tags, setProducts, limit, page } : getTagsUrlAndSuccessHandlerType) => {
    const tagQueryParams = tags.join(`&tags[in]=`)

    const url = `${ROOT_URL}/api/v1/products?tags[in]=${tagQueryParams}&limit=${limit}&page=${page}`
    const successHandler = async (res: ServerResponse) => {
        if (res.data.status !== 'success') return
        setProducts(res.data.data.docs)
    }

    return { successHandler, url }
}   

type useFetchProductProps = {
    collections: Collection[],
    collectionName: string,
    categoryName?: string,
    tags?: Tag[],
    limit?: number,
    page?: number
}

export function useFetchProducts(type : string, props: useFetchProductProps) {
    const { collections, collectionName, categoryName, tags, limit = 4, page = 1 } = props
    const [products, setProducts] = useState<Product[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const getUrlAndSuccessHandler = useMemo(() => {
        return {
            'collections': getCollectionUrlAndSuccessHandler,
            'category': getCategoryUrlAndSuccessHandler,
            'tags': getTagsUrlAndSuccessHandler,
        }[type]
    }, [type])

    const fetchProducts = useCallback(async () => {
        if (isLoading || products) return
        setIsLoading(true)
        
        try {
            const { url, successHandler } = getUrlAndSuccessHandler!({
                collections,
                collectionName,
                categoryName: categoryName || '',
                tags: tags || [],
                setProducts,
                limit,
                page,
            })      

            const res = await axios(url)
            await successHandler(res)
        } catch (err: any) {
            if (err instanceof Error) {
                console.error(err.message)
            } else if (err.response) { 
                console.error(err.response.data?.message)
            }
        } finally { 
            setIsLoading(false)
        }  
    }, [getUrlAndSuccessHandler, collections, collectionName, categoryName, tags, setProducts, limit, page, isLoading, products])

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    return { data: products, isLoading }
}

export function useFetchProductsWithVisibility(type :string, props : useFetchProductProps, isVisible: boolean) {
    const { collections, collectionName, categoryName, tags, limit = 4, page = 1 } = props
    const [products, setProducts] = useState<Product[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isAlreadyFetched, setIsAlreadyFetched] = useState(false)

    const getUrlAndSuccessHandler = useMemo(() => {
        switch (type) {
            case 'collections':
                return getCollectionUrlAndSuccessHandler
            case 'category':
                return getCategoryUrlAndSuccessHandler
            case 'tags':
                return getTagsUrlAndSuccessHandler
            default:
                throw new Error('Invalid type of fetch products')
        }
    }, [type])

    const fetchProducts = useCallback(async () => {
        if (!isVisible || isAlreadyFetched) return
        setIsAlreadyFetched(true)

        try {
            const { url, successHandler } = getUrlAndSuccessHandler({
                collections,
                collectionName,
                categoryName: categoryName || '',
                tags: tags || [],
                setProducts,
                limit,
                page,
            })  

            const res = await axios(url)
            await successHandler(res)
        } catch (err: any) {
            if (err instanceof Error) {
                console.error(err.message)
            } else if (err.response) { 
                console.error(err.response.data?.message)
            }
        } finally { 
            setIsLoading(false)
        }  
    }, [getUrlAndSuccessHandler, collections, collectionName, categoryName, tags, setProducts, limit, page, isVisible, isAlreadyFetched])

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
