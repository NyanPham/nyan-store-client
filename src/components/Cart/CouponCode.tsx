import React from 'react'

export default function CouponCode() {
    return (
        <div className="form-group">
            <label htmlFor="coupon-code" className="form-label">
                Coupon
            </label>
            <h4>Coupon code will be applied on checkout page</h4>
            <input className="form-input" id="coupon-code" />
        </div>
    )
}
