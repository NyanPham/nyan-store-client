import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'
import { addWishlist, removeWishlist } from '../redux/actions/wishlistActions'
import { WishlistState } from '../redux/reducers/wishlistReducer';

export default function useWishlist(productId: string) {
    const { isLoggedIn } = useAuthContext();
    const wishlist = useSelector((state : { wishlist: WishlistState}) => state.wishlist);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productIdSet = new Set(wishlist.map(item => item.item._id));
    const alreadyAdded = productIdSet.has(productId);

    const handleWishlistClick = () => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }   

        if (alreadyAdded) {
            removeWishlist(productId)(dispatch);
        } else {
            addWishlist(productId)(dispatch);
        }
    };

    return { alreadyAdded, handleWishlistClick };
}
