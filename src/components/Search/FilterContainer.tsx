import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import FilterSidebar from './FilterSidebar'
import FilterTopbar from './FilterTopbar'
import FilterView from './FilterView'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { Category, Product } from '../../types'
import { CategoriesState } from '../../redux/reducers/categoriesReducer'

type FilterDataType = {
    status: "success" | "failure" | "loading"
    results: number
    data: {
        docs: Product[]
    }
}

export default function FilterContainer() {
    const [data, setData] = useState<FilterDataType>({ 
        status: 'loading', 
        results: 0, 
        data: { docs: [] } 
    })
    const [sortBy, setSortBy] = useState('oldest')
    const [viewBy, setViewBy] = useState('loose')
    const [page, setPage] = useState(1)
    const limit = 9

    const [openSidebar, setOpenSidebar] = useState(false)
    const { categoryName } = useParams()
    const categories = useSelector((state: { categories: CategoriesState }) => state.categories)
    const categoryId = categories.find((category: Category) => category.name === categoryName)?._id
    
    const pageCount = Math.ceil(data?.results / limit)
    const pageNumbers = pageCount ? Array.from(Array(pageCount).keys()).map((count) => count + 1) : null
    
    const onPaginationClick = (pageNum: number) => {
        if (pageNum > pageCount) return setPage(pageCount)
        if (pageNum <= 0) return setPage(1)

        setPage(pageNum)
    }

    return (
        <div className="filter-grid flex flex-row">
            <button
                className="fixed left-0 top-1/2 px-3 py-2 z-20 bg-white rounded-lg border border-slate-500 md:-translate-x-1/2 md:hover:-translate-x-0 transform transition duration-300 lg:hidden"
                onClick={() => {
                    setOpenSidebar(true)
                }}
            >
                <FontAwesomeIcon className="text-cyan-400" icon={faArrowRight} />
            </button>
            <div
                className={`w-64 fixed top-0 left-0 z-40 flex-shrink-0 transform transition duration-300 h-screen overflow-auto ${
                    openSidebar ? 'translate-x-0' : '-translate-x-full'
                } bg-white md:translate-x-0 md:static md:h-max md:z-10`}
            >
                <FilterSidebar
                    setData={setData}
                    sortByTerm={sortBy}
                    categoryId={categoryId || null}
                    categoryName={categoryName || ""}
                    pagination={{ page, limit, setPage }}
                />
            </div>
            <div className="flex flex-col flex-grow bg-slate-200">
                <FilterTopbar
                    results={data.results}
                    onSortBy={setSortBy}
                    onViewBy={setViewBy}
                    categoryName={categoryName || ""}
                />
                <FilterView
                    products={data.data?.docs}
                    viewBy={viewBy}
                    pagination={{ 
                        page, 
                        pageNumbers: pageNumbers || [], 
                        onPaginationClick
                    }}
                />
            </div>
            <span   
                onClick={() => setOpenSidebar(false)}
                className={`fixed top-0 left-0 w-full h-full transform transition duration-200 ${
                    openSidebar ? 'pointer-events-auto bg-slate-900/70' : 'pointer-events-none'
                }`}
            />
        </div>
    )
}
