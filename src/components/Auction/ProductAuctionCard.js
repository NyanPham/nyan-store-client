import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Countdown from '../Countdown'
import ProductCard from '../Products/ProductCard'
import AuctionForm from './AuctionForm'
import { useSelector, useDispatch } from 'react-redux'

function ProductAuctionCard({ product }) {
    const [openAuctionModal, setOpenAuctionModal] = useState(false)
    const [autionData, setAutionData] = useState([])
    const { message, error } = useSelector((state) => state.biddingProducts)
    const dispatch = useDispatch()

    const fetchAutionData = async (productId) => {
        try {
            const res = await axios({
                method: 'GET',
                url: `/api/v1/products/${productId}/bidding`,
            })
            if (res.data.status === 'success') {
                setAutionData(res.data.data.docs)
            }
        } catch (err) {
            console.error(err.response.data.message)
        }
    }

    useEffect(() => {
        fetchAutionData(product._id)
    }, [product._id])

    useEffect(() => {
        if (message) {
            fetchAutionData(product._id)
            setTimeout(() => {
                setOpenAuctionModal(false)
            }, 2000)
        }
    }, [message, product._id])

    const currentBid = autionData
        .map((bidding) => bidding.price)
        .reduce((maxBid, price) => {
            if (price > maxBid) return price
            return maxBid
        }, 0)

    console.log(currentBid)

    return (
        <>
            <div>
                <ProductCard {...product} inAuction={true} currentBid={currentBid} />
                <Countdown dueDate={product.auctionExpiresIn} />
                <button
                    className="w-full py-1 mt-4 bg-cyan-400 text-white text-lg font-semibold rounded-2xl hover:bg-gray-900 hover:text-cyan-400 transition transform duration-200"
                    onClick={() => setOpenAuctionModal(true)}
                >
                    Bid Now
                </button>
            </div>
            {openAuctionModal &&
                createPortal(
                    <>
                        <AuctionForm product={product} setOpenModal={setOpenAuctionModal} />
                    </>,
                    document.getElementById('popup-container')
                )}
        </>
    )
}

export default ProductAuctionCard
