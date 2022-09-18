import React from 'react'

export default function OrderCard({ order }) {
    const { variant, quantity, createdAt } = order

    return (
        <div>
            <div>Item: {variant.name}</div>
            <div>Quantity: {quantity}</div>
            <div>Purchased in: {createdAt}</div>
        </div>
    )
}
