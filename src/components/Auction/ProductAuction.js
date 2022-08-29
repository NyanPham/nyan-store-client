import React from 'react'
import Container from '../Container'
import { useSelector } from 'react-redux'
import ProductAuctionCard from './ProductAuctionCard'

function ProductAuction() {
    const biddingProducts = useSelector((state) => state.biddingProducts)

    return (
        <div className="bg-slate-200 py-7">
            <Container>
                <h2 className="text-cyan-400 font-semibold text-2xl">Auction & Bidding</h2>
                <div className="grid grid-cols-5 gap-4 mt-6">
                    {biddingProducts.map((biddingProduct, index) => (
                        <ProductAuctionCard key={`auction_product_card_${index}`} product={biddingProduct} />
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default ProductAuction