import React, { useRef, useState } from 'react'
import { orderConfig } from '../../../config'
import useFetchDocs from '../../../hooks/useFetchDocs'
import Overlay from '../../Overlay'
import OrderEditor from './OrderEditor'

export default function OrderAdminForm({ closeModal }) {
    const [orders] = useFetchDocs('orders', (orders) =>
        orders.map((order) => {
            return {
                ...order,
                items: JSON.stringify(order.items),
            }
        })
    )

    const [orderId, setOrderId] = useState(false)
    const [showOrder, setShowOrder] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const ref = useRef()

    const handleItemClick = (collection) => {
        setOrderId(collection._id)
        setShowOrder(true)
    }

    return (
        <Overlay closeModal={closeModal} childRef={ref}>
            <form className="admin-editor-form" ref={ref}>
                <h2 className="admin-editor-form-title">orders</h2>
                <div className="max-h-96 overflow-y-auto mt-5">
                    {orders.length > 0 &&
                        orders.map((coupon) => (
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
                {showOrder && (
                    <OrderEditor
                        orderId={orderId}
                        orders={orders}
                        isAddForm={false}
                        closeModal={() => setShowOrder(false)}
                        config={orderConfig}
                    />
                )}
                {showAddForm && (
                    <OrderEditor
                        orderId={orderId}
                        orders={orders}
                        isAddForm={true}
                        closeModal={() => setShowAddForm(false)}
                        config={orderConfig}
                    />
                )}
            </form>
        </Overlay>
    )
}
