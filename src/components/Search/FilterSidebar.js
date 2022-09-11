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
    const { setData, sortByTerm, categoryId, categoryName, setIsLoading, setMessage, setError, setShowAlert } = props

    const [facetOptions, setFacetOptions] = useState({})

    const [filterQuery, setFilterQuery] = useState({
        skip: 0,
        limit: 15,
        sortByTerm,
        categoryId,
        searchTerm: '',
        emptyCategory: true,
        categoryName,
    })
    const search = useSelector((state) => state.search)
    const { pathname } = useLocation()
    const allAvailableOptions = {}
    Object.entries(facetOptions).forEach(([key, value]) => {
        allAvailableOptions[`all${key.charAt(0).toUpperCase() + key.slice(1)}`] = Object.values(value).map(
            (value) => value.value
        )
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
            try {
                const res = await axios({
                    method: 'GET',
                    url: `${ROOT_URL}/api/v1/products/filterFacets`,
                })

                if (res.data.status === 'success') {
                    setFacetOptions(() =>
                        res.data.data.facets.reduce((facets, array) => {
                            return {
                                ...facets,
                                ...array[0],
                            }
                        }, {})
                    )
                }
            } catch (err) {
                // alert(err.response.data.message)
                console.error(err)
            }
        }

        fetchFilterFacets()
    }, [])

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

    const maxPrice = facetOptions?.maxPrice?.length > 0 ? facetOptions.maxPrice[0].value : 0
    const minPrice = facetOptions?.minPrice?.length > 0 ? facetOptions.minPrice[0].value : 0

    return (
        <div className="filter-sidebar pb-7 w-full row-span-6 border border-gray-300">
            <SideNavigation title="Categories" borderColor="border-0" />
            {Object.entries(facetOptions)
                .filter(([key, _]) => key !== 'minPrice' && key !== 'maxPrice')
                .map(([optionType, options], index) => {
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
