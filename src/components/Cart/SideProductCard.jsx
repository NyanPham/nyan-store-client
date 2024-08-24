import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { ROOT_URL } from '../../config'
import useDebounce from '../../hooks/useDebounce'
import { updateCart } from '../../redux/actions/cartActions'
import QuantityController from '../Products/QuantityController'
import CartEditor from './CartEditor'
import CartRemover from './CartRemover'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

export default function SideProductCard({ currentVariant, currentQuantity, productId, isLast }) {
    const [variant, setVariant] = useState(currentVariant)
    const [quantity, setQuantity] = useState(currentQuantity)

    const dispatch = useDispatch()
    const firstRenderRef = useRef(true)

    const handleQuantityChange = (newQuantity) => {
        setQuantity(() => newQuantity)
    }   

    const handleVariantChange = (newVariant) => {
        setVariant(() => newVariant)
    }

    useEffect(() => {
        firstRenderRef.current = false
    }, [])  
    
    useDebounce(    
        () => {
            if (firstRenderRef.current) return

            const data = {
                quantity,
                currentVariant: currentVariant._id,
                variant: variant._id,
                product: productId,
            }
            dispatch(updateCart(data))
        },
        1000,
        [quantity, variant._id]
    )

    return (
        <div className={`flex gap-3 py-3 ${!isLast && 'border-b border-gray-700/10'}`}>
            <div className="w-24 flex-shrink-0">
                <LazyLoadImage
                    className="bg-gray-400 w-full aspect-29/37 object-center object-cover"
                    src={`${ROOT_URL}/img/products/${variant.images[0]}`}
                    alt={variant.name}
                    crossOrigin="anonymous"
                    loading="lazy"
                />
            </div>
            <div>
                <h3 className="text-base font-medium text-slate-700 capitalize">{variant.name}</h3>
                <div className="text-sm font-medium text-slate-500 capitalize">
                    <span>{variant.option1}</span>
                    {variant.option2 && (
                        <>
                            / <span>{variant.option2}</span>
                        </>
                    )}
                    {variant.option3 && (
                        <>
                            / <span>{variant.option3}</span>
                        </>
                    )}
                </div>
                <div className="flex justify-start items-center gap-2">
                    {variant.comparePrice ? (
                        <>
                            <span className="product-card-compare-price">${variant.comparePrice}</span>
                            <span className="product-card-price">${variant.price}</span>
                        </>
                    ) : (
                        <span className="product-card-price">${variant.price}</span>
                    )}
                </div>
                <QuantityController
                    inventory={variant.inventory}
                    isSoldout={false}
                    isUnavailable={false}
                    currentQuantity={currentQuantity}
                    onQuantityChange={handleQuantityChange}
                    spacing="mt-1"
                    showLabel={false}
                    quantityBtnSize="w-5 h-5 text-xs items-center leading-none"
                    quantityInputSize="h-5"
                />
                <div className="flex gap-2 mt-2">
                    <CartEditor productId={productId} variantId={variant._id} currentQuantity={quantity} onVariantChange={handleVariantChange} onQuantityChange={handleQuantityChange} />
                    <CartRemover productId={productId} variantId={variant._id} />
                </div>
            </div>
        </div>
    )
}
