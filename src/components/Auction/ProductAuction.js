import React, { useState } from 'react'
import Container from '../Container'
import { useSelector } from 'react-redux'
import ProductAuctionCard from './ProductAuctionCard'
import { useLocation } from 'react-router-dom'
import { useAuthContext } from '../../context/authContext'
import axios from 'axios'
import { ROOT_URL } from '../../config'
import useDeepCompareEffect from '../../hooks/useDeepCompareEffect'

function ProductAuction() {
    const { pathname } = useLocation()
    const { isLoggedIn } = useAuthContext()
    const [userBiddingProducts, setUserBiddingProducts] = useState([])
    const biddingProducts = useSelector((state) => state.biddingProducts.data)

    const isInCartPage = pathname.startsWith('/cart')

    useDeepCompareEffect(() => {
        if (isLoggedIn) {
            const biddingProductIds = biddingProducts.map((product) => product._id)
            const fetchUserBiddingOnProducts = async (productIds) => {
                try {
                    const responses = await Promise.all(
                        productIds.map(async (productId) => {
                            return await axios({
                                method: 'GET',
                                url: `${ROOT_URL}/api/v1/users/myBidding?product=${productId}`,
                                withCredentials: true,
                            })
                        })
                    )

                    const userBiddedProductIds = responses.map((res) => res.data.data.docs[0].product)
                    const biddingProductInvolveUser = biddingProducts.filter((product) => {
                        return userBiddedProductIds.some((productId) => productId === product._id)
                    })

                    setUserBiddingProducts(biddingProductInvolveUser)
                } catch (err) {
                    alert(err.response.data.message)
                }
            }

            fetchUserBiddingOnProducts(biddingProductIds)
        }
    }, [biddingProducts, isLoggedIn])

    const biddingProductsToShow = isInCartPage ? userBiddingProducts : biddingProducts

    return (
        <Container>
            <h2 className="text-cyan-400 font-semibold text-2xl">{isInCartPage ? 'Your' : ''} Auction & Bidding</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6">
                {biddingProductsToShow.map((biddingProduct, index) => (
                    <ProductAuctionCard key={`auction_product_card_${index}`} product={biddingProduct} />
                ))}
            </div>
        </Container>
    )
}

export default ProductAuction
