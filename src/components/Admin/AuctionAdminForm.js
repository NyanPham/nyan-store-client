import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import Overlay from '../Overlay'
import { ROOT_URL } from '../../config'
import BiddingEditor from './Auction/BiddingEditor'

export default function AuctionAdminForm({ closeModal }) {
    const [biddings, setBiddings] = useState([])
    const [biddingId, setBiddingId] = useState(false)
    const [showBidding, setShowBidding] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const ref = useRef()
    const config = {
        product: {
            type: 'text',
            required: true,
        },
        variant: {
            type: 'text',
            required: true,
        },
        user: {
            type: 'text',
            required: true,
        },
        duesIn: {
            type: 'text',
            required: true,
        },
        price: {
            type: 'number',
            required: true,
        },
    }

    const processedBiddings = biddings.map((bidding) => {
        return Object.entries(bidding).reduce((processedBidding, data) => {
            const [key, value] = data
            if (typeof value === 'object') {
                return {
                    ...processedBidding,
                    [key]: value._id,
                }
            }
            return {
                ...processedBidding,
                [key]: value,
            }
        }, {})
    })

    const handleItemClick = (collection) => {
        setBiddingId(collection._id)
        setShowBidding(true)
    }

    useEffect(() => {
        const fetchAllBiddings = async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    url: `${ROOT_URL}/api/v1/biddings`,
                    withCredentials: true,
                })

                if (res.data.status === 'success') {
                    setBiddings(res.data.data.docs)
                }
            } catch (err) {
                alert(err.response.data.message)
            }
        }

        fetchAllBiddings()
    }, [])

    return (
        <Overlay closeModal={closeModal} childRef={ref}>
            <form className="admin-editor-form" ref={ref}>
                <h2 className="admin-editor-form-title">biddings</h2>
                <div className="max-h-96 overflow-y-auto mt-5">
                    {processedBiddings.length > 0 &&
                        processedBiddings.map((bidding) => (
                            <div
                                key={`bidding_${bidding._id}`}
                                className="item-button"
                                onClick={() => handleItemClick(bidding)}
                            >
                                <h2>
                                    {bidding._id} at {bidding.createdAt}
                                </h2>
                            </div>
                        ))}
                </div>
                <button type="button" className="submit-button" onClick={() => setShowAddForm(true)}>
                    +
                </button>
                {showBidding && (
                    <BiddingEditor
                        biddingId={biddingId}
                        biddings={processedBiddings}
                        isAddForm={false}
                        closeModal={() => setShowBidding(false)}
                        config={config}
                    />
                )}
                {showAddForm && (
                    <BiddingEditor
                        biddingId={biddingId}
                        biddings={processedBiddings}
                        isAddForm={true}
                        closeModal={() => setShowAddForm(false)}
                        config={config}
                    />
                )}
            </form>
        </Overlay>
    )
}
