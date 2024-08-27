import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProductCard from '../Products/ProductCard'
import { Product } from '../../types'

export default function WishlistPage() {
    const wishlist = useSelector((state: any) => state.wishlist)
    
    return (
        <section className="flex-grow pb-12">
            <div className="container mx-auto">
                <h2 className="text-cyan-400 text-3xl font-semibold mt-10 text-center">Wishlist</h2>
                {wishlist.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {wishlist.map((product: { item: Product }, index: string) => (
                            <ProductCard key={`wishlist_item_${index}`} {...product.item} />
                        ))}
                    </div>
                ) : (
                    <h3 className="text-slate-700 text-lg font-semibold mt-7 text-center">
                        You have no items in wishlist. <Link to="/categories/all">Back to shopping...</Link>
                    </h3>
                )}
            </div>
        </section>
    )
}
