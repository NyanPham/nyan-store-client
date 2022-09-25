import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import ProductCardAction from './ProductCardAction'
import { useDispatch, useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { addToCart, resetMessageError } from '../../redux/actions/cartActions'
import { useSideCartContext } from '../../context/sideCartContext'
import VariantsPicker from './VariantsPicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { ROOT_URL } from '../../config'

export default function ProductCard(props) {
    const { id, name, slug, variants, createdAt, inAuction = false, currentBidData = {} } = props
    const { setOpenSideCart } = useSideCartContext()
    const [openQuickView, setOpenQuickView] = useState(false)
    const { loading, error, message } = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    const isNew = new Date(Date.now() - new Date(createdAt)).getHours() < 24 * 1
    const firstVariant = variants[0]

    const handleAddToCart = (data) => {
        let dataToSubmit = {}

        if (data == null) {
            dataToSubmit = {
                variant: firstVariant._id,
                product: id,
                quantity: 1,
            }
        } else {
            dataToSubmit = {
                variant: data.variantId,
                product: id,
                quantity: data.quantity,
            }
        }

        dispatch(addToCart(dataToSubmit))
    }

    useEffect(() => {
        if (loading || error || message !== 'success') return
        if (!loading && message === 'success') {
            setOpenSideCart(true)
            dispatch(resetMessageError())
        }
    }, [loading, error, message, setOpenSideCart, dispatch])

    return (
        <div className="flex flex-col items-center justify-between aspect-29/37 bg-white relative group p-2 md:p-4 transition transform duration-300 hover:border hover:border-slate-900/10 hover:-translate-y-2 hover:shadow-lg">
            <Link to={`/products/${slug}`} state={props} className="product-image w-full h-fit">
                {/* <span className="block w-4/5 aspect-29/37 bg-slate-700 mx-auto"></span> */}
                {firstVariant ? (
                    <img
                        className="block w-4/5 aspect-29/37 bg-slate-700 mx-auto object-cover object-center"
                        src={`${ROOT_URL}/img/products/${firstVariant.images[0]}`}
                        alt={firstVariant.name}
                        crossOrigin="anonymous"
                        loading="lazy"
                    />
                ) : (
                    <Skeleton />
                )}

                {/* <img className="" src={images[1]} alt={name} /> */}
            </Link>
            <div className="product-card-info mt-3">
                <h3 className="text-center text-ellipsis text-gray-900 text-base font-semibold">{name}</h3>
                {inAuction === false && (
                    <div className="flex justify-center items-center gap-2">
                        {firstVariant.comparePrice ? (
                            <>
                                <span className="product-card-compare-price">${firstVariant.comparePrice}</span>
                                <span className="product-card-price">${firstVariant.price}</span>
                            </>
                        ) : (
                            <span className="product-card-price">${firstVariant.price}</span>
                        )}
                    </div>
                )}
                {(typeof currentBidData.price === 'number' || typeof currentBidData.bidder === 'string') && (
                    <>
                        <span className="product-card-price">${currentBidData.price}</span>
                    </>
                )}
            </div>
            <div className="absolute top-2 right-2 flex flex-col gap-3 overflow-hidden">
                <ProductCardAction
                    productId={id}
                    handleAddToCart={handleAddToCart}
                    setOpenQuickView={setOpenQuickView}
                />
            </div>
            {isNew && !inAuction && (
                <div className="absolute bottom-2 right-2 bg-yellow-400 py-0.5 px-2 text-xs text-white rounded-lg">
                    New
                </div>
            )}
            {openQuickView &&
                ReactDOM.createPortal(
                    <div className="z-20 bg-slate-700/90 fixed top-0 left-0 w-full h-full">
                        <div className="p-3 w-96 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <VariantsPicker
                                productId={id}
                                variants={variants}
                                currentVariantId={firstVariant._id}
                                buttonText={'Own Now'}
                                data={'hello'}
                                formSubmitHandler={handleAddToCart}
                                inAuction={false}
                                nameStyles="text-2xl"
                                review={{
                                    show: false,
                                }}
                                quantityControl={true}
                                wishlist={false}
                                isEditing={false}
                            />
                            <button
                                className="absolute right-4 top-3"
                                type="button"
                                onClick={() => setOpenQuickView(false)}
                            >
                                <FontAwesomeIcon icon={faClose} />
                            </button>
                        </div>
                    </div>,
                    document.getElementById('modal-container')
                )}
        </div>
    )
}
