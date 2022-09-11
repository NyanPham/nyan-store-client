import { useEffect, useState } from 'react'

const findInCart = (cart, productId) => {
    const product = cart.find((item) => item.product.toString() === productId)
    return product != null
}

export default function useAddedToCart(cart, productId) {
    const [inCart, setInCart] = useState(() => findInCart(cart, productId))

    useEffect(() => {
        if (cart.length === 0) return setInCart(false)

        setInCart(() => findInCart(cart, productId))
    }, [productId, cart])

    return inCart
}
