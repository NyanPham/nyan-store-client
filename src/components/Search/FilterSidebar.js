import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { ROOT_URL } from '../../config'
import useDebounce from '../../hooks/useDebounce'
// import useDeepCompareEffect from '../../hooks/useDeepCompareEffect'
import SideNavigation from '../SideNavigation'
import FilterFacetGroup from './FilterFacetGroup'
import FilterPriceRangeSliders from './FilterPriceRangeSliders'

export default function FilterSidebar(props) {
    const {
        setData,
        sortByTerm,
        categoryId,
        categoryName,
        setIsLoading,
        setMessage,
        setError,
        setShowAlert,
        pagination,
    } = props
    const { page, limit, setPage } = pagination

    const [facetOptions, setFacetOptions] = useState([])

    const [filterQuery, setFilterQuery] = useState({
        page: page,
        limit: limit,
        sortByTerm,
        categoryId,
        searchTerm: '',
        emptyCategory: true,
        categoryName,
    })

    const search = useSelector((state) => state.search)
    const { pathname } = useLocation()
    const allAvailableOptions = {}
    facetOptions.forEach((facetOption) => {
        const key = Object.keys(facetOption)[0]
        const values = facetOption[key]

        if (key === 'maxPrice' || key === 'minPrice') return

        allAvailableOptions[`all${key.charAt(0).toUpperCase() + key.slice(1)}`] = values.map((value) => value.value)
    })

    const collectOptionsState = useCallback(({ optionType, optionStates }) => {
        const selectedOptions = Object.keys(optionStates).filter((key) => optionStates[key])
        setFilterQuery((prevFilterQuery) => {
            return {
                ...prevFilterQuery,
                [optionType]: selectedOptions,
            }
        })
    }, [])

    const collectPriceRange = useCallback(({ toValue, fromValue }) => {
        setFilterQuery((prevFilterQuery) => {
            return {
                ...prevFilterQuery,
                maxPrice: toValue,
                minPrice: fromValue,
            }
        })
    }, [])

    const searchProducts = async (filterQuery, allAvailableOptions) => {
        setIsLoading(true)
        setMessage('')
        setError('')

        try {
            const res = await axios({
                method: 'POST',
                url: `${ROOT_URL}/api/v1/products/filter`,
                data: {
                    filterQuery,
                    all: {
                        ...allAvailableOptions,
                    },
                },
                withCredentials: true,
            })

            if (res.data.status === 'success') {
                setData(res.data)
            }
        } catch (err) {
            setError(err.response.data.message)
            setShowAlert(true)
        } finally {
            setIsLoading(false)
        }
    }

    useDebounce(
        () => {
            if (filterQuery != null) {
                searchProducts(filterQuery, allAvailableOptions)
            }
        },
        350,
        [filterQuery]
    )

    useEffect(() => {
        const fetchFilterFacets = async () => {
            let url = `${ROOT_URL}/api/v1/products/filterFacets`
            if (categoryId && categoryName.toLowerCase() !== 'all') url = url + `?category=${categoryId}`

            try {
                const res = await axios({
                    method: 'GET',
                    url,
                })

                if (res.data.status === 'success') {
                    setFacetOptions(() => {
                        if (res.data.data.facets[0] == null) return []

                        return Object.entries(res.data.data.facets[0]).map(([key, value]) => {
                            return {
                                [key]: value.filter((value) => value.value != null || typeof value === 'number'),
                            }
                        })
                    })

                    setFilterQuery((prevFilterQuery) => {
                        const resetFilterQuery = { ...prevFilterQuery }
                        delete resetFilterQuery['size']
                        delete resetFilterQuery['color']
                        delete resetFilterQuery['material']
                        delete resetFilterQuery['brand']

                        return resetFilterQuery
                    })

                    setPage(1)
                }
            } catch (err) {
                // alert(err.response.data.message)
                console.error(err)
            }
        }

        fetchFilterFacets()
    }, [categoryId, categoryName, setPage])

    useEffect(() => {
        setFilterQuery((prevFilterQuery) => {
            return {
                ...prevFilterQuery,
                sortByTerm,
                categoryId,
                searchTerm: search,
                emptyCategory: pathname.startsWith('/search'),
                categoryName: categoryName,
            }
        })
    }, [sortByTerm, categoryId, search, pathname, categoryName])

    useEffect(() => {
        setFilterQuery((prevFilterQuery) => {
            return {
                ...prevFilterQuery,
                page,
                limit,
            }
        })
    }, [page, limit])

    const maxPrice = facetOptions?.find((facetOption) => Object.keys(facetOption)[0] === 'maxPrice')?.maxPrice[0]
    const minPrice = facetOptions?.find((facetOption) => Object.keys(facetOption)[0] === 'minPrice')?.minPrice[0]

    return (
        <div className="filter-sidebar pb-7 w-full row-span-6 border border-gray-300">
            <SideNavigation title="Categories" borderColor="border-0" />
            {facetOptions
                ?.filter((facets) => {
                    const key = Object.keys(facets)[0]
                    return key !== 'minPrice' && key !== 'maxPrice'
                })
                .map((facets, index) => {
                    const optionType = Object.keys(facets)[0]
                    const options = facets[optionType]
                    return (
                        <FilterFacetGroup
                            key={`${optionType}_${index}`}
                            optionType={optionType}
                            options={options}
                            collectOptionsState={collectOptionsState}
                        />
                    )
                })}
            <FilterPriceRangeSliders maxPrice={maxPrice} minPrice={minPrice} collectPriceRange={collectPriceRange} />
        </div>
    )
}
