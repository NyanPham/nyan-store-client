import { useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { ROOT_URL } from '../../config'
import { hideAlert, hideLoading, setError, setMessage, showAlert, showLoading } from '../../redux/actions/appStatusActions'

export default function CheckoutButton({ styles } : { styles: string }) {
    const { cart } = useSelector((state : any) => state.cart)
    const dispatch = useDispatch()
    
    const stripe = useStripe()
    const handleCheckout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        dispatch(showLoading())
        dispatch(setMessage(''))
        dispatch(setError(''))
        dispatch(hideAlert())

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
                stripe?.redirectToCheckout({
                    sessionId: res.data.session.id,
                })
            }   
        } catch (err) {
            dispatch(setError(
                'Something went wrong when directing you to the checkout. Please wait for 10 minutes then try again later.'
            ))
            dispatch(showAlert())
        } finally {
            dispatch(hideLoading())
        }
    }

    return (
        <>
            <button type="button" className={styles} onClick={handleCheckout}>
                Checkout
            </button>
        </>
    )
}
