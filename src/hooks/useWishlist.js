import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'
import { addWishlist, removeWishlist } from '../redux/actions/wishlistActions'

export default function useWishlist(productId) {
    const { isLoggedIn } = useAuthContext()
    const wishlist = useSelector((state) => state.wishlist)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const alreadyAdded = wishlist.some((item) => {
        return item.item === productId
    })

    function handleWishlistClick(e) {
        if (!isLoggedIn) return navigate('/login')
        if (!alreadyAdded) {
            return dispatch(addWishlist(productId))
        }

        dispatch(removeWishlist(wishlist, productId))
    }

    return { alreadyAdded, handleWishlistClick }
}
