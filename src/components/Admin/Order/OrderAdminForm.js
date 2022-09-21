import axios from 'axios'
import React, { useRef, useState, useEffect } from 'react'
import { ROOT_URL } from '../../../config'
import Overlay from '../../Overlay'
import OrderEditor from './OrderEditor'

export default function OrderAdminForm({ closeModal }) {
    const [orders, setOrders] = useState([])
    const [orderId, setOrderId] = useState(false)
    const [showOrder, setShowOrder] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const ref = useRef()
    const config = {
        total: {
            type: 'number',
            required: true,
        },
        items: {
            type: 'textarea',
            required: false,
            isArray: true,
        },
        user: {
            type: 'text',
            required: false,
        },
        createdAt: {
            type: 'date',
            required: false,
        },
    }

    const handleItemClick = (collection) => {
        setOrderId(collection._id)
        setShowOrder(true)
    }

    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    url: `${ROOT_URL}/api/v1/orders`,
                    withCredentials: true,
                })

                if (res.data.status === 'success') {
                    console.log(res.data.data.docs[0].expiresIn)
                    setOrders(() => {
                        return res.data.data.docs.map((order) => {
                            return {
                                ...order,
                                items: JSON.stringify(order.items),
                            }
                        })
                    })
                }
            } catch (err) {
                alert(err.response.data.message)
            }
        }

        fetchAllOrders()
    }, [])

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
                        config={config}
                    />
                )}
                {showAddForm && (
                    <OrderEditor
                        orderId={orderId}
                        orders={orders}
                        isAddForm={true}
                        closeModal={() => setShowAddForm(false)}
                        config={config}
                    />
                )}
            </form>
        </Overlay>
    )
}
