import React, { useRef, useState } from 'react'
import { couponConfig } from '../../../config'
import useFetchDocs from '../../../hooks/useFetchDocs'
import formatDateToMDY from '../../../utils/formatDateToMDY'
import Overlay from '../../Overlay'
import CouponEditor from './CouponEditor'

export default function CouponAdminForm({ closeModal }) {
    const [coupons] = useFetchDocs('coupons', (coupons) =>
        coupons.map((coupon) => {
            return {
                ...coupon,
                products: JSON.stringify(coupon.products),
                collections: JSON.stringify(coupon.collections),
                expiresIn: formatDateToMDY(new Date(coupon.expiresIn)),
            }
        })
    )
    const [couponId, setCouponId] = useState(false)
    const [showCoupon, setShowCoupon] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const ref = useRef()

    const handleItemClick = (collection) => {
        setCouponId(collection._id)
        setShowCoupon(true)
    }

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
                        config={couponConfig}
                    />
                )}
                {showAddForm && (
                    <CouponEditor
                        couponId={couponId}
                        coupons={coupons}
                        isAddForm={true}
                        closeModal={() => setShowAddForm(false)}
                        config={couponConfig}
                    />
                )}
            </form>
        </Overlay>
    )
}
