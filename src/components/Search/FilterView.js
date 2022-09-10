import React from 'react'
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

export default function FilterView({ products, viewBy, isLoading, error, message, showAlert, setShowAlert }) {
    let viewGrid = getViewGrid(viewBy)

    return (
        <div className={`filter-view w-full h-full grid ${viewGrid} bg-slate-200 relative`}>
            {products &&
                viewBy !== 'list' &&
                products.map((product, index) => (
                    <ProductCard key={`search_product_${index}`} {...product} inAuction={false} currentBid={false} />
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
        </div>
    )
}
