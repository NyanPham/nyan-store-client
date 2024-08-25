import React from 'react'

export default function OrderNote() {
    return (
        <div className="form-group">
            <label htmlFor="order-note" className="form-label">
                Add Order Note:
            </label>
            <textarea className="form-input" id="order-note"></textarea>
        </div>
    )
}
