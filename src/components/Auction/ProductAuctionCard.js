import React from 'react'
import { createPortal } from 'react-dom'
import Countdown from '../Countdown'
import ProductCard from '../Products/ProductCard'

function ProductAuctionCard({ product }) {
    return (
        <>
            <div>
                <ProductCard {...product} inAuction={true} />
                <Countdown dueDate={product.auctionExpiresIn} />
                <button className="w-full py-1 mt-4 bg-cyan-400 text-white text-lg font-semibold rounded-2xl hover:bg-gray-900 hover:text-cyan-400 transition transform duration-200">
                    Bid Now
                </button>
            </div>
            {createPortal(<>Hello</>, document.getElementById('popup-container'))}
        </>
    )
}

export default ProductAuctionCard
