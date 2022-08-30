import React from 'react'
import FilterSidebar from './FilterSidebar'
import FilterTopbar from './FilterTopbar'
import FilterView from './FilterView'

export default function FilterContainer() {
    return (
        <div className="filter-grid grid grid-cols-5">
            <FilterSidebar />
            <FilterTopbar />
            <FilterView />
        </div>
    )
}
