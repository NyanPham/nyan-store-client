import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { ROOT_URL } from '../../config'
import useDebounce from '../../hooks/useDebounce'
import { updateCart } from '../../redux/actions/cartActions'
import QuantityController from '../Products/QuantityController'
import CartEditor from './CartEditor'
import CartRemover from './CartRemover'

export default function SideProductCard({ currentVariant, currentQuantity, productId, isLast }) {
    const [quantity, setQuantity] = useState(currentQuantity)
    const [variant, setVariant] = useState(currentVariant)
    const dispatch = useDispatch()
    const firstRenderRef = useRef(true)

    const handleQuantityChange = (quantity) => {
        setQuantity(quantity)
    }

    const handleVariantChange = (variant) => {
        setVariant(variant)
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
        500,
        [quantity, variant._id]
    )

    return (
        <div className={`flex gap-3 py-3 ${!isLast && 'border-b border-gray-700/10'}`}>
            <div className="w-24 flex-shrink-0">
                <img
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
                    <CartEditor productId={productId} variantId={variant._id} onVariantChange={handleVariantChange} />
                    <CartRemover productId={productId} variantId={variant._id} />
                </div>
            </div>
        </div>
    )
}
