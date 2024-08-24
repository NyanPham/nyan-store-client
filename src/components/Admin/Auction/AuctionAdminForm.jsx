import React, { useState, useRef } from 'react'
import Overlay from '../../Overlay'
import { biddingConfig } from '../../../config'
import BiddingEditor from './BiddingEditor'
import useFetchDocs from '../../../hooks/useFetchDocs'

export default function AuctionAdminForm({ closeModal }) {
    const [biddings] = useFetchDocs('biddings')
    const [biddingId, setBiddingId] = useState(false)
    const [showBidding, setShowBidding] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const ref = useRef()

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
                        config={biddingConfig}
                    />
                )}
                {showAddForm && (
                    <BiddingEditor
                        biddingId={biddingId}
                        biddings={processedBiddings}
                        isAddForm={true}
                        closeModal={() => setShowAddForm(false)}
                        config={biddingConfig}
                    />
                )}
            </form>
        </Overlay>
    )
}
