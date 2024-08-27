import { Cart, CartItem, Variant } from '../../types'
import CartItemCard from './CartItemCard'

export default function CartItems({ cart }: { cart: Cart }) {
    return (
        <div className="mx-auto mt-7">
            <div className="grid grid-cols-5 w-full mx-auto py-4 border-b border-slate-900/10">
                <h2 className="text-slate-700 font-semibold text-md col-span-2">Product</h2>
                <h2 className="text-slate-700 font-semibold text-md justify-self-center hidden md:inline-block">
                    Price
                </h2>
                <h2 className="text-slate-700 font-semibold text-md justify-self-center hidden md:inline-block">
                    Quantity
                </h2>
                <h2 className="text-slate-700 font-semibold text-md justify-self-end hidden md:inline-block">Total</h2>
            </div>
            {cart?.map(({ product, variant, quantity } : CartItem, index: number) => (
                <CartItemCard
                    key={`cart_item_${product}_${index}`}
                    productId={product}
                    currentVariant={variant}
                    currentQuantity={quantity}
                    isLast={index === cart.length - 1}
                />
            ))}
        </div>
    )
}
