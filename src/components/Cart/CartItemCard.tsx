import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ROOT_URL } from '../../config'
import useDebounce from '../../hooks/useDebounce'
import useDeepCompareEffect from '../../hooks/useDeepCompareEffect'
import { updateCart } from '../../redux/actions/cartActions'
import QuantityController from '../Products/QuantityController'
import CartEditor from './CartEditor'
import CartRemover from './CartRemover'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { Variant } from '../../types'

type CartItemCardProps = {
    currentVariant: Variant
    currentQuantity: number
    productId: string
    isLast?: boolean
}

export default function CartItemCard({ currentVariant, currentQuantity, productId, isLast } : CartItemCardProps) {
    const [quantity, setQuantity] = useState<number>(currentQuantity)
    const [variant, setVariant] = useState<Variant>(currentVariant)
    const [total, setTotal] = useState<number>(() => {
        return currentVariant.price * currentQuantity
    })  

    const dispatch = useDispatch()

    const handleQuantityChange = useCallback((quantity: number) => {
        setQuantity(quantity)
    }, [])

    const handleVariantChange = useCallback((variant: Variant) => {
        setVariant(variant)
    }, [])

    useDebounce(
        () => {
            const data = {
                quantity,
                currentVariant: currentVariant._id,
                variant: variant._id,
                product: productId,
            }
            updateCart(data)(dispatch)
        },
        500,
        [quantity, variant._id]
    )

    useDeepCompareEffect(() => {
        setTotal(() => variant.price * quantity)
    }, [quantity, variant])

    return (
        <div
            className={`grid grid-rows-3 grid-cols-2 md:grid-cols-5 md:grid-rows-1 w-full mx-auto py-4 ${
                !isLast && 'border-b border-gray-700/10'
            }`}
        >
            <div className="flex gap-3 items-center row-span-3 md:row-span-1 md:col-span-2">
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
                    <div className="flex gap-2 mt-2">
                        <CartEditor
                            productId={productId}
                            variantId={variant._id}
                            currentQuantity={quantity}
                            onVariantChange={handleVariantChange}
                            onQuantityChange={handleQuantityChange}
                        />
                        <CartRemover productId={productId} variantId={variant._id} />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 justify-end md:justify-self-center">
                {variant.comparePrice ? (
                    <>
                        <span className="product-card-compare-price">${variant.comparePrice}</span>
                        <span className="product-card-price">${variant.price}</span>
                    </>
                ) : (
                    <span className="product-card-price">${variant.price}</span>
                )}
            </div>
            <div className="justify-self-end self-center md:justify-self-center">
                <QuantityController
                    inventory={variant.inventory}
                    isSoldout={false}
                    isUnavailable={false}
                    currentQuantity={quantity}
                    onQuantityChange={handleQuantityChange}
                    spacing="mt-1"
                    showLabel={false}
                    quantityBtnSize="w-5 h-5 text-xs items-center leading-none"
                    quantityInputSize="h-5"
                />
            </div>
            <div className="justify-self-end self-center product-card-price text-slate-700">
                ${total.toLocaleString('en-US')}
            </div>
        </div>
    )
}
