import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SideNavigation from '../SideNavigation'
import FilterFacet from './FilterFacet'

export default function FilterSidebar() {
    const [facetOptions, setFacetOptions] = useState([])

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
                return <FilterFacet key={`${optionType}_${index}`} optionType={optionType} options={options} />
            })}
        </div>
    )
}
