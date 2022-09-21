import axios from 'axios'
import React, { useRef, useState, useEffect } from 'react'
import { ROOT_URL } from '../../../config'
import formatDateToMDY from '../../../utils/formatDateToMDY'
import Overlay from '../../Overlay'
import CouponEditor from './CouponEditor'

export default function CouponAdminForm({ closeModal }) {
    const [coupons, setCoupons] = useState([])
    const [couponId, setCouponId] = useState(false)
    const [showCoupon, setShowCoupon] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const ref = useRef()
    const config = {
        code: {
            type: 'text',
            required: true,
        },
        percentOff: {
            type: 'number',
            required: false,
        },
        amountOff: {
            type: 'number',
            required: false,
        },
        products: {
            type: 'text',
            required: false,
            isArray: true,
        },
        collections: {
            type: 'text',
            required: false,
            isArray: true,
        },
        expiresIn: {
            type: 'date',
            required: true,
        },
    }

    // const processedcoupons = coupons.map((bidding) => {
    //     return Object.entries(bidding).reduce((processedBidding, data) => {
    //         const [key, value] = data
    //         if (typeof value === 'object') {
    //             return {
    //                 ...processedBidding,
    //                 [key]: value._id,
    //             }
    //         }
    //         return {
    //             ...processedBidding,
    //             [key]: value,
    //         }
    //     }, {})
    // })

    const handleItemClick = (collection) => {
        setCouponId(collection._id)
        setShowCoupon(true)
    }

    useEffect(() => {
        const fetchAllcoupons = async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    url: `${ROOT_URL}/api/v1/coupons`,
                    withCredentials: true,
                })

                if (res.data.status === 'success') {
                    console.log(res.data.data.docs[0].expiresIn)
                    setCoupons(() => {
                        return res.data.data.docs.map((coupon) => {
                            return {
                                ...coupon,
                                products: JSON.stringify(coupon.products),
                                collections: JSON.stringify(coupon.collections),
                                expiresIn: formatDateToMDY(new Date(coupon.expiresIn)),
                            }
                        })
                    })
                }
            } catch (err) {
                alert(err.response.data.message)
            }
        }

        fetchAllcoupons()
    }, [])

    return (
        <Overlay closeModal={closeModal} childRef={ref}>
            <form className="admin-editor-form" ref={ref}>
                <h2 className="admin-editor-form-title">coupons</h2>
                <div className="max-h-96 overflow-y-auto mt-5">
                    {coupons.length > 0 &&
                        coupons.map((coupon) => (
                            <div
                                key={`coupon_${coupon._id}`}
                                className="item-button"
                                onClick={() => handleItemClick(coupon)}
                            >
                                <h2>
                                    {coupon._id} at {coupon.createdAt}
                                </h2>
                            </div>
                        ))}
                </div>
                <button type="button" className="submit-button" onClick={() => setShowAddForm(true)}>
                    +
                </button>
                {showCoupon && (
                    <CouponEditor
                        couponId={couponId}
                        coupons={coupons}
                        isAddForm={false}
                        closeModal={() => setShowCoupon(false)}
                        config={config}
                    />
                )}
                {showAddForm && (
                    <CouponEditor
                        couponId={couponId}
                        coupons={coupons}
                        isAddForm={true}
                        closeModal={() => setShowAddForm(false)}
                        config={config}
                    />
                )}
            </form>
        </Overlay>
    )
}
