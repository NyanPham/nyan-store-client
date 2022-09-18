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
            return 'grid-cols-2 lg:grid-cols-3 gap-5 p-5 auto-rows-min'
        case 'dense':
            return 'grid-cols-5 gap-2 p-2 auto-rows-min'
        case 'list':
            return 'grid-cols-1'
        default:
            return 'grid-cols-3 auto-rows-min'
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
            <div className={`filter-view w-full h-full grid ${viewGrid} bg-slate-200 relative`}>
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
                    <div className="mx-auto flex flex-row col-span-full mt-7">
                        <button
                            className="rounded-full h-10 w-10 bg-white text-cyan-400 border border-slate-700 hover:bg-cyan-400 hover:text-white transition duration-200"
                            onClick={handlePaginationClick}
                            data-pagination="prev"
                        >
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                        {pageNumbers.map((pageNum) => (
                            <button
                                key={`pagination_${pageNum}`}
                                className={`text-cyan-400 h-10 w-10 relative after:absolute after:left-1/2 after:-bottom-0.5 after:-translate-x-1/2 after:h-0.5 after:w-1/4 after:bg-cyan-500 after:origin-left hover:after:origin-right hover:after:scale-x-100 after:transform after:transition-all after:duration-200 ${
                                    page === pageNum ? 'font-bold after:scale-x-100' : 'after:scale-x-0'
                                }`}
                                onClick={handlePaginationClick}
                                data-pagination={pageNum}
                            >
                                {pageNum}
                            </button>
                        ))}
                        <button
                            className="rounded-full h-10 w-10 bg-white text-cyan-400 border border-slate-700 hover:bg-cyan-400 hover:text-white transition duration-200"
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
