import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useDeepCompareEffect from '../../hooks/useDeepCompareEffect'
import querializeParams from '../../utils/querializeParams'
import SideNavigation from '../SideNavigation'
import FilterFacetGroup from './FilterFacetGroup'

export default function FilterSidebar() {
    const [facetOptions, setFacetOptions] = useState([])
    const [filterQuery, setFilterQuery] = useState({})
    const [searchedProducts, setSearchedProducts] = useState([])
    const skip = 0
    const limit = 15

    const allAvailableOptions = {}
    Object.entries(facetOptions).forEach(([key, value]) => {
        allAvailableOptions[`all${key.charAt(0).toUpperCase() + key.slice(1)}`] = Object.values(value).map(
            (value) => value.value
        )
    })

    const collectOptionsState = ({ optionType, optionStates }) => {
        const selectedOptions = Object.keys(optionStates).filter((key) => optionStates[key])
        setFilterQuery((prevFilterQuery) => {
            return {
                ...prevFilterQuery,
                [optionType]: selectedOptions,
            }
        })
    }

    useDeepCompareEffect(() => {
        if (filterQuery != null) {
            const obj = {}

            const searchProducts = async (filterQuery) => {
                try {
                    const res = await axios({
                        method: 'POST',
                        url: `/api/v1/products/filter`,
                        data: {
                            filterQuery,
                            all: {
                                ...allAvailableOptions,
                            },
                            skip,
                            limit,
                        },
                    })

                    console.log(res.data.data.products)
                } catch (err) {
                    console.error(err.response.data.message)
                }
            }

            searchProducts(filterQuery)
        }
    }, [filterQuery])

    useEffect(() => {
        const fetchFilterFacets = async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    url: '/api/v1/products/filterFacets',
                })

                if (res.data.status === 'success') {
                    setFacetOptions(res.data.data.facets[0][0])
                }
            } catch (err) {
                alert(err.response.data.message)
            }
        }

        fetchFilterFacets()
    }, [])

    return (
        <div className="filter-sidebar w-full row-span-2 border border-gray-300">
            <SideNavigation title="Categories" borderColor="border-0" />
            {Object.entries(facetOptions).map(([optionType, options], index) => {
                return (
                    <FilterFacetGroup
                        key={`${optionType}_${index}`}
                        optionType={optionType}
                        options={options}
                        collectOptionsState={collectOptionsState}
                    />
                )
            })}
        </div>
    )
}
