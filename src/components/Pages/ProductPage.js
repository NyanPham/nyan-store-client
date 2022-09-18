import React, { useState } from 'react'
import ProductRecommendation from '../Products/ProductRecommendation'
import ProductInfo from '../Products/ProductInfo'
import { useLocation } from 'react-router-dom'

export default function ProductPage() {
    const location = useLocation()

    const [product, setProduct] = useState(() => {
        return location.state
    })

    return (
        <div>
            <section className="pb-7">
                <ProductInfo product={product} setProduct={setProduct} />
            </section>
            <section className="w-full bg-gray-200 py-7">
                <div className="w-4/5 mx-auto space-y-5">
                    <h2 className="text-xl font-semibold text-slate-700 ">Related Products</h2>
                    <ProductRecommendation
                        showRecommendCard={false}
                        category={product?.category}
                        collections={product?.collections}
                        type="category"
                    />
                </div>
            </section>
        </div>
    )
}
