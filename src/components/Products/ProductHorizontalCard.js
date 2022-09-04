import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCardAction from './ProductCardAction'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, resetMessageError } from '../../redux/actions/cartActions'
import { useSideCartContext } from '../../context/sideCartContext'

function ProductHorizontalCard(props) {
    const {
        id,
        images,
        summary,
        name,
        slug,
        variants,
        vendor,
        createdAt,
        inAuction = false,
        currentBid = false,
    } = props

    const isNew = new Date(Date.now() - new Date(createdAt)).getHours() < 24 * 1
    const firstVariant = variants[0]
    const { loading, error, message } = useSelector((state) => state.cart)
    const { setOpenSideCart } = useSideCartContext()
    const dispatch = useDispatch()
    const handleAddToCart = () => {
        const data = {
            variant: firstVariant._id,
            product: id,
            quantity: 1,
        }

        dispatch(addToCart(data))
    }

    useEffect(() => {
        if (loading || error || message !== 'success') return
        if (!loading && message === 'success') {
            setOpenSideCart(true)
            dispatch(resetMessageError())
        }
    }, [loading, error, message, setOpenSideCart])

    return (
        <div className="flex flex-row gap-3 items-center justify-start bg-white relative group p-2 md:p-4 lg:gap-12 border-t border-gray-300/50">
            <Link to={`/products/${slug}`} state={props} className="product-image w-36 h-max flex-shrink-0">
                <span className="block aspect-29/37 bg-slate-700 mx-auto"></span>
                {/* <img className="" src={images[0]} alt={name} /> */}
                {/* <img className="" src={images[1]} alt={name} /> */}
            </Link>
            <div className="product-card-info mt-3 flex-grow-0">
                <h3 className="text-left text-lg truncate text-gray-900 font-semibold">{name}</h3>
                <h4 className="text-left text-gray-500 text-sm font-medium w-44 lg:w-96 block">
                    <p className="truncate">{summary}</p>
                </h4>
                {currentBid === false && (
                    <div className="flex justify-start items-center gap-2">
                        {firstVariant.comparePrice ? (
                            <>
                                <span className="product-card-compare-price text-left">
                                    ${firstVariant.comparePrice}
                                </span>
                                <span className="product-card-price text-left">${firstVariant.price}</span>
                            </>
                        ) : (
                            <span className="product-card-price text-left">${firstVariant.price}</span>
                        )}
                    </div>
                )}
            </div>
            <div className="absolute top-2 right-2 flex flex-col gap-3 overflow-hidden">
                <ProductCardAction productId={id} handleAddToCart={handleAddToCart} />
            </div>
            {isNew && !inAuction && (
                <div className="absolute top-5 left-2 bg-yellow-400 py-0.5 px-2 text-xs text-white rounded-lg">New</div>
            )}
        </div>
    )
}

export default ProductHorizontalCard
