import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import getMatchedButton from '../../utils/getMatchedButton'
import LoadingWithAlert from '../LoadingWithAlert'
import ProductHorizontalCard from '../Products/ProductHorizontalCard'
import ProductCard from './../Products/ProductCard'

const getViewGrid = (viewTerm) => {
    switch (viewTerm) {
        case 'loose':
            return 'grid grid-cols-2 lg:grid-cols-3 gap-5 p-5 auto-rows-min'
        case 'dense':
            return 'grid grid-cols-5 gap-2 p-2 auto-rows-min'
        case 'list':
            return 'flex flex-col'
        default:
            return 'grid grid-cols-3 auto-rows-min'
    }
}

export default function FilterView(props) {
    const { products, viewBy, isLoading, error, message, showAlert, setShowAlert, pagination } = props
    const { page, pageNumbers, onPaginationClick } = pagination
    let viewGrid = getViewGrid(viewBy)

    const handlePaginationClick = (e) => {
        const button = getMatchedButton(e, '[data-pagination]')
        if (button == null) return

        if (!isNaN(parseInt(button.dataset.pagination))) {
            return onPaginationClick(parseInt(button.dataset.pagination))
        }

        if (button.dataset.pagination === 'prev') return onPaginationClick(page - 1)

        onPaginationClick(page + 1)
    }

    return (
        <>
            <div className={`filter-view w-full h-full ${viewGrid} bg-slate-200 relative`}>
                {products &&
                    viewBy !== 'list' &&
                    products.map((product, index) => (
                        <ProductCard
                            key={`search_product_${index}`}
                            {...product}
                            inAuction={false}
                            currentBid={false}
                        />
                    ))}
                {products &&
                    viewBy === 'list' &&
                    products.map((product, index) => (
                        <ProductHorizontalCard
                            key={`search_product_${index}`}
                            {...product}
                            inAuction={false}
                            currentBid={false}
                        />
                    ))}
                <LoadingWithAlert
                    loading={isLoading}
                    showAlert={showAlert}
                    message={message}
                    error={error}
                    setShowAlert={setShowAlert}
                    inContainer={true}
                />

                {pageNumbers && pageNumbers.length > 1 && (
                    <div className="mx-auto flex flex-row gap-2 col-span-full mt-7 mb-4">
                        <button
                            className="rounded-full h-10 w-10 mr-2 bg-white text-cyan-400 border border-slate-700 hover:bg-cyan-400 hover:text-white transition duration-200"
                            onClick={handlePaginationClick}
                            data-pagination="prev"
                        >
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                        {pageNumbers.map((pageNum) => (
                            <button
                                key={`pagination_${pageNum}`}
                                className={`h-10 w-10 relative font-bold rounded-md hover:text-white hover:bg-cyan-400 ${
                                    page === pageNum ? ' text-white bg-cyan-500' : 'text-cyan-400'
                                }`}
                                onClick={handlePaginationClick}
                                data-pagination={pageNum}
                            >
                                {pageNum}
                            </button>
                        ))}
                        <button
                            className="rounded-full h-10 w-10 ml-2 bg-white text-cyan-400 border border-slate-700 hover:bg-cyan-400 hover:text-white transition duration-200"
                            onClick={handlePaginationClick}
                            data-pagination="next"
                        >
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}
