import React from 'react'
import { useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import { useSelector } from 'react-redux'
import useAsyncValidateState from '../../hooks/useAsyncValidateState'
import LoadingWithAlert from '../LoadingWithAlert'
import { ROOT_URL } from '../../config'

export default function CheckoutButton({ styles }) {
    const { cart } = useSelector((state) => state.cart)
    const { isLoading, setIsLoading, message, setMessage, error, setError, showAlert, setShowAlert } =
        useAsyncValidateState()
    const stripe = useStripe()
    const handleCheckout = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        setMessage('')
        setError('')
        setShowAlert(false)

        try {
            const res = await axios({
                method: 'POST',
                url: `${ROOT_URL}/api/v1/orders/checkout-session`,
                data: {
                    items: cart,
                },
                withCredentials: true,
            })
            if (res.data.status === 'success') {
                stripe.redirectToCheckout({
                    sessionId: res.data.session.id,
                })
            }
        } catch (err) {
            setError(
                'Something went wrong when directing you to the checkout. Please wait for 10 minutes then try again later.'
            )
            setShowAlert(true)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <button type="button" className={styles} onClick={handleCheckout}>
                Checkout
            </button>
            {/* <LoadingWithAlert
                loading={isLoading}
                showAlert={showAlert}
                message={message}
                error={error}
                setShowAlert={setShowAlert}
            /> */}
        </>
    )
}
