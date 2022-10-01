import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Countdown from '../Countdown'
import ProductCard from '../Products/ProductCard'
import AuctionForm from './AuctionForm'
import { useSelector } from 'react-redux'

import { ROOT_URL } from '../../config'
import { useMemo } from 'react'

function ProductAuctionCard({ product }) {
    const [openAuctionModal, setOpenAuctionModal] = useState(false)
    const [auctionData, setAuctionData] = useState([])
    const { message } = useSelector((state) => state.biddingProducts)

    const fetchauctionData = async (productId) => {
        try {
            const res = await axios({
                method: 'GET',
                url: `${ROOT_URL}/api/v1/products/${productId}/biddings`,
                withCredentials: true,
            })
            if (res.data.status === 'success') {
                setAuctionData(res.data.data.docs)
            }
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    // const setAuctionWinner = async (currentBidData) => {
    //     try {
    //         const res = await axios({
    //             method: 'PATCH',
    //             url: `${ROOT_URL}/api/v1/users/myBiddings/setWonBid`,
    //             data: {
    //                 product: product._id,
    //                 variant: currentBidData.variant,
    //                 bidPrice: currentBidData.price,
    //                 winner: currentBidData.bidder,
    //             },
    //             withCredentials: true,
    //         })
    //         if (res.data.status === 'success') {
    //             setAuctionData(res.data.data.docs)
    //         }
    //     } catch (err) {
    //         alert(err.response.data.message)
    //     }
    // }

    useEffect(() => {
        fetchauctionData(product._id)
    }, [product._id])

    useEffect(() => {
        if (message) {
            fetchauctionData(product._id)
            setTimeout(() => {
                setOpenAuctionModal(false)
            }, 2000)
        }
    }, [message, product._id])

    const currentBidData = useMemo(() => {
        return auctionData
            .map((bidding) => {
                return {
                    price: bidding.price,
                    bidder: bidding.user.email,
                    duesIn: bidding.duesIn,
                    variant: bidding.variant,
                }
            })
            .reduce(
                (maxBid, bidData) => {
                    if (bidData.price > maxBid.price)
                        return {
                            ...bidData,
                        }
                    return maxBid
                },
                { price: 0, bidder: '', duesIn: undefined }
            )
    }, [auctionData])

    // const isEnd = new Date(currentBidData.duesIn).getTime() <= Date.now() || false

    // useEffect(() => {
    //     if (!isEnd || currentBidData == null) return

    //     setAuctionWinner(currentBidData)
    // }, [isEnd, setAuctionWinner, currentBidData])

    return (
        <>
            <div>
                <ProductCard {...product} inAuction={true} currentBidData={currentBidData} />
                <div className="text-center my-2 text-slate-700 text-sm font-normal">
                    Bidder:
                    <span className="text-cyan-400 tracking-wide"> {currentBidData.bidder}</span>
                </div>
                <Countdown dueDate={product.auctionExpiresIn} />
                <button
                    className="w-full py-1 mt-4 bg-cyan-400 text-white text-lg font-semibold rounded-2xl hover:bg-gray-900 hover:text-cyan-400 transition transform duration-200 disabled:bg-gray-300 disabled:text-slate-100"
                    onClick={() => setOpenAuctionModal(true)}
                    // disabled={isEnd}
                >
                    Bid Now
                </button>
            </div>
            {openAuctionModal &&
                createPortal(
                    <>
                        <AuctionForm
                            product={product}
                            setOpenModal={setOpenAuctionModal}
                            currentBid={currentBidData.price || false}
                        />
                    </>,
                    document.getElementById('modal-container')
                )}
        </>
    )
}

export default ProductAuctionCard
