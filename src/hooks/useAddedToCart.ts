export default function useAddedToCart(cart, productId) {
    const inCart = cart.some(item => item.product.toString() === productId)
    
    return inCart
}
