import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import FilterSidebar from './FilterSidebar'
import FilterTopbar from './FilterTopbar'
import FilterView from './FilterView'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function FilterContainer() {
    const [data, setData] = useState({})
    const [sortBy, setSortBy] = useState('oldest')
    const [viewBy, setViewBy] = useState('loose')
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    const [openSidebar, setOpenSidebar] = useState(false)
    const { categoryName } = useParams()
    const categories = useSelector((state) => state.categories)
    const categoryId = categories.find((category) => category.name === categoryName)?._id

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
                    categoryId={categoryId ? categoryId : null}
                    categoryName={categoryName}
                    setIsLoading={setIsLoading}
                    setMessage={setMessage}
                    setError={setError}
                    setShowAlert={setShowAlert}
                />
            </div>
            <div className="flex flex-col flex-grow bg-slate-200">
                <FilterTopbar
                    results={data.results}
                    onSortBy={setSortBy}
                    onViewBy={setViewBy}
                    categoryName={categoryName}
                />
                <FilterView
                    products={data.data?.docs}
                    viewBy={viewBy}
                    isLoading={isLoading}
                    error={error}
                    message={message}
                    showAlert={showAlert}
                    setShowAlert={setShowAlert}
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
