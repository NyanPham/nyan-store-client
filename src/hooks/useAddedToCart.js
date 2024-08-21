// import { useEffect, useState } from 'react'

// const findInCart = (cart, productId) => {
//     const product = cart.find((item) => item.product.toString() === productId)
//     return product != null
// }
    
export default function useAddedToCart(cart, productId) {
    const inCart = cart.some(item => item.product.toString() === productId)

    return inCart
}
