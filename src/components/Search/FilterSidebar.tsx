import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { ROOT_URL } from '../../config'
import useDebounce from '../../hooks/useDebounce'
// import useDeepCompareEffect from '../../hooks/useDeepCompareEffect'
import SideNavigation from '../SideNavigation'
import CurrentFacets from './CurrentFacets'
import FilterFacetGroup from './FilterFacetGroup'
import FilterPriceRangeSliders from './FilterPriceRangeSliders'

import { hideLoading, setError, setMessage, showLoading, showAlert } from '../../redux/actions/appStatusActions'

type FilterQueryType = {
    page: number;
    limit: number;
    sortByTerm: string;
    categoryId: string | null;
    searchTerm: string;
    emptyCategory: boolean;
    categoryName: string;
    maxPrice?: number;
    minPrice?: number;
    size?: string[];
    color?: string[];
    material?: string[];
    brand?: string[];
};

type AllAvailableOptionsType = {
    allSize: string[];
    allColor: string[];
    allMaterial: string[];
    allBrand: string[];
}

type FilterSidebarProps = {
    setData: (data: any) => void
    sortByTerm: string
    categoryId: string | null
    categoryName: string
    pagination: {
        page: number
        limit: number
        setPage: (page: number) => void
    }
}

type AllAvailableOptionsKeys = 'allSize' | 'allColor' | 'allMaterial' | 'allBrand';

export default function FilterSidebar(props: FilterSidebarProps) {
    const {
        setData,
        sortByTerm,
        categoryId,
        categoryName,
        pagination,
    } = props
    const { page, limit, setPage } = pagination

    const [facetOptions, setFacetOptions] = useState<{ [key: string]: any }[]>([])
    const [filterQuery, setFilterQuery] = useState<FilterQueryType>({
        page: page,
        limit: limit,
        sortByTerm,
        categoryId,
        searchTerm: '',
        emptyCategory: true,
        categoryName,
    })

    const [selectedFacets, setSelectedFacets] = useState({})
    const [filterToRemove, setFilterToRemove] = useState<{ optionType: string | null, value: string | null }>({
        optionType: null,
        value: null,
    })

    const dispatch = useDispatch()

    const search = useSelector((state: { search: string } ) => state.search)
    const { pathname } = useLocation()
    const allAvailableOptions: AllAvailableOptionsType = { allSize: [], allColor: [], allMaterial: [], allBrand: [] };
    facetOptions.forEach((facetOption) => {
        const key = Object.keys(facetOption)[0]
        const values: { value: string }[] = facetOption[key]

        if (key === 'maxPrice' || key === 'minPrice') return

        (allAvailableOptions as { [key: string]: any })[`all${key.charAt(0).toUpperCase() + key.slice(1)}`] = values.map((value) =>  value.value)
    })  

    const collectOptionsState = useCallback(({ optionType, optionStates }: { optionType: string; optionStates: Record<string, boolean> }) => {
        const selectedOptions = Object.keys(optionStates).filter((key) => optionStates[key])
        setFilterQuery((prevFilterQuery) => {
            return {
                ...prevFilterQuery,
                [optionType]: selectedOptions,
            }
        })

        setSelectedFacets((preSelectedFacets) => {
            return {
                ...preSelectedFacets,
                [optionType]: selectedOptions,
            }
        })
    }, [])

    const collectPriceRange = useCallback(({ toValue, fromValue }: { toValue: number; fromValue: number }) => {
        setFilterQuery((prevFilterQuery) => {
            return {
                ...prevFilterQuery,
                maxPrice: toValue,
                minPrice: fromValue,
            }
        })
    }, [])

    const handleRemoveFilter = (optionType: string, value: string) => {
        setFilterToRemove({
            optionType,
            value,
        })
    }   
    
    const searchProducts = async (filterQuery: FilterQueryType, allAvailableOptions: AllAvailableOptionsType) => {
        
        dispatch(showLoading())
        dispatch(setMessage(''))
        dispatch(setError(''))

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
        } catch (err: any) {
            dispatch(setError(err.response.data.message))
            dispatch(showAlert())
        } finally {
            dispatch(hideLoading())
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
                            console.log(value)
                            return {
                                [key]: (value as { value: string }[]).filter((value) => value.value != null || typeof value === 'number'),
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

        setSelectedFacets({})
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
            <CurrentFacets selectedFacets={selectedFacets} handleRemoveFilter={handleRemoveFilter} />
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
                            filterToRemove={filterToRemove}
                            setFilterToRemove={setFilterToRemove}
                        />
                    )
                })}
            <FilterPriceRangeSliders maxPrice={maxPrice} minPrice={minPrice} collectPriceRange={collectPriceRange} />
        </div>
    )
}
