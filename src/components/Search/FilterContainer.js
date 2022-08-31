import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import FilterSidebar from './FilterSidebar'
import FilterTopbar from './FilterTopbar'
import FilterView from './FilterView'
import { useSelector } from 'react-redux'

export default function FilterContainer() {
    const [data, setData] = useState({})
    const [sortBy, setSortBy] = useState('oldest')
    const [viewBy, setViewBy] = useState('loose')

    const { categoryName } = useParams()
    const categories = useSelector((state) => state.categories)
    const categoryId = categories.find((category) => category.name === categoryName)?._id

    return (
        <div className="filter-grid flex flex-row">
            <div className="w-64">
                <FilterSidebar setData={setData} sortBy={sortBy} categoryId={categoryId} />
            </div>
            <div className="flex flex-col flex-grow bg-slate-200">
                <FilterTopbar
                    results={data.results}
                    onSortBy={setSortBy}
                    onViewBy={setViewBy}
                    categoryName={categoryName}
                />
                <FilterView products={data.data?.products} viewBy={viewBy} />
            </div>
        </div>
    )
}
