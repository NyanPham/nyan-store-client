import React from 'react'
import Container from '../Container'
import { useSelector } from 'react-redux'
import ProductAuctionCard from './ProductAuctionCard'

function ProductAuction() {
    const biddingProducts = useSelector((state) => state.biddingProducts.data)

    return (
        <Container>
            <h2 className="text-cyan-400 font-semibold text-2xl">Auction & Bidding</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6">
                {biddingProducts.map((biddingProduct, index) => (
                    <ProductAuctionCard key={`auction_product_card_${index}`} product={biddingProduct} />
                ))}
            </div>
        </Container>
    )
}

export default ProductAuction
