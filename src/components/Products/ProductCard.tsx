import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import ProductCardAction from './ProductCardAction'
import { useDispatch, useSelector } from 'react-redux'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { addToCart, resetMessageError } from '../../redux/actions/cartActions'
import { useSideCartContext } from '../../context/sideCartContext'
import 'react-lazy-load-image-component/src/effects/blur.css'

import { ROOT_URL } from '../../config'
import VariantsPickerWithImage from './VariantsPickerWithImage'
import { useRef } from 'react'
import useOnScreen from '../../hooks/useOnScreen'
import { AddToCartItem, Variant } from '../../types'

type ProductCardProps = {
    id: string
    name: string
    slug: string
    variants: any
    createdAt: Date
    inAuction?: boolean
    currentBidData?: any
}

export default function ProductCard(props: ProductCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const alreadyVisible = useRef(false)
    const isVisible = useOnScreen(cardRef, '0px', 0.3)

    const { id, name, slug, variants, createdAt, inAuction = false, currentBidData = {} } = props
    
    const { setOpenSideCart } = useSideCartContext()
    const [openQuickView, setOpenQuickView] = useState(false)
    const [selectedVariant, setSelectedVariant] = useState(variants[0])
    const { loading, error, message } = useSelector((state: any) => state.cart)
    const dispatch = useDispatch()
    
    // const isNew = new Date(Date.now() - new Date(createdAt)).getHours() < 24 * 1
    const isNew = new Date(Date.now() - createdAt.getTime()).getHours() < 24 * 1
    const firstVariant = variants[0]

    const handleAddToCart = (data: { variantId: string, quantity: number } | null) => {
        let dataToSubmit = {
            variant: firstVariant._id,
            product: id,
            quantity: 1,
        }
        
        if (data != null) {
            dataToSubmit = {
                variant: data.variantId,
                product: id,
                quantity: data.quantity,
            }
        } 

        addToCart(dataToSubmit)(dispatch)
    }

    const handleVariantChange = (variant: Variant) => {
        setSelectedVariant(variant)
    }

    useEffect(() => {
        if (isVisible && !alreadyVisible.current) {
            alreadyVisible.current = true
        }
    }, [isVisible])

    useEffect(() => {
        if (loading || error || message !== 'success') return
        if (!loading && message === 'success') {
            setOpenSideCart(true)
            dispatch(resetMessageError())
        }
    }, [loading, error, message, setOpenSideCart, dispatch])
    
    return (
        <div
            ref={cardRef}
            className={`${
                isVisible || alreadyVisible.current ? 'translate-y-0 opacity-100 duration-500' : 'translate-y-12 opacity-0'
            } flex flex-col items-center justify-between aspect-29/37 bg-white relative group p-2 md:p-4 transition transform duration-300 hover:border hover:border-slate-900/10 hover:-translate-y-2 hover:shadow-lg`}
        >
            <Link to={`/products/${slug}`} state={props} className="product-image w-full h-fit">
                {firstVariant ? (
                    <LazyLoadImage
                        className="block w-4/5 aspect-29/37 bg-slate-700 mx-auto object-cover object-center"
                        src={`${ROOT_URL}/img/products/${firstVariant.images[0]}`}
                        alt={firstVariant.name}
                        crossOrigin="anonymous"
                        loading="lazy"
                    />
                ) : (
                    <Skeleton />
                )}
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
                    <VariantsPickerWithImage
                        selectedVariant={selectedVariant}
                        id={id}
                        variants={variants}
                        handleAddToCart={handleAddToCart}
                        handleVariantChange={handleVariantChange}
                        setOpenQuickView={setOpenQuickView}
                        buttonText="Own Now"
                        nameStyles="text-2xl"
                        review={{
                            show: false,
                        }}
                        quantityControl={true}
                        wishlist={false}
                        isEditing={false}
                    />,
                    document.getElementById('modal-container')!
                )}
        </div>
    )
}
