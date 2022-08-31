import React from 'react'
import ProductCard from './../Products/ProductCard'

const getViewGrid = (viewTerm) => {
    switch (viewTerm) {
        case 'loose':
            return 'grid-cols-3 gap-5 p-5'
        case 'dense':
            return 'grid-cols-5 gap-2 p-2'
        case 'list':
            return 'grid-cols-1'
        default:
            return 'grid-cols-3'
    }
}

export default function FilterView({ products, viewBy }) {
    let viewGrid = getViewGrid(viewBy)

    return (
        <div className={`filter-view w-full grid ${viewGrid} bg-slate-200`}>
            {products &&
                products.map((product, index) => (
                    <ProductCard key={`search_product_${index}`} {...product} inAuction={false} currentBid={false} />
                ))}
        </div>
    )
}
