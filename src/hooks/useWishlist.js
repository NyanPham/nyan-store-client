import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'
import { addWishlist, removeWishlist } from '../redux/actions/wishlistActions'

export default function useWishlist(productId) {
    const { isLoggedIn } = useAuthContext();
    const wishlist = useSelector(state => state.wishlist);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productIdSet = new Set(wishlist.map(item => item.item._id));
    const alreadyAdded = productIdSet.has(productId);

    const handleWishlistClick = (e) => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        if (alreadyAdded) {
            dispatch(removeWishlist(productId));
        } else {
            dispatch(addWishlist(productId));
        }
    };

    return { alreadyAdded, handleWishlistClick };
}
