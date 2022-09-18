import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROOT_URL } from '../../config'
import LoadingWithAlert from '../LoadingWithAlert'
import OrderCard from '../Order/OrderCard'

export default function OrderPage() {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true)
            setMessage('')
            setError('')
            setShowAlert(false)

            try {
                const res = await axios.get(`${ROOT_URL}/api/v1/users/myOrders`, {
                    withCredentials: true,
                })

                if (res.data.status === 'success') {
                    setOrders(res.data.data.docs)
                }
            } catch (err) {
                setError('Failed to load your orders. Please try again later...!')
            } finally {
                setIsLoading(false)
            }
        }

        fetchOrders()
    }, [])

    return (
        <>
            <section className="flex-grow pb-12 w-full">
                <h2 className="text-cyan-400 text-3xl font-semibold mt-10 text-center">Orders</h2>
                {orders && orders.length > 0 ? (
                    <div className="w-full mx-auto mt-7 flex flex-col items-center justify-center md:w-1/2 ">
                        {orders.map((order, index) => (
                            <OrderCard key={`order_item_${index}`} order={order} />
                        ))}
                    </div>
                ) : (
                    <h3 className="text-slate-700 text-lg font-semibold mt-7 text-center">
                        You have not purchased any item just yet. <Link to="/categories/all">Back to shopping...</Link>
                    </h3>
                )}
            </section>
            <LoadingWithAlert
                loading={isLoading}
                message={message}
                error={error}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
            />
        </>
    )
}
