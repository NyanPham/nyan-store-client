import { useState } from 'react'
import ProductRecommendation from '../Products/ProductRecommendation'
import ProductInfo from '../Products/ProductInfo'
import { Location, useLocation } from 'react-router-dom'
import Container from '../Container'
import { Product } from '../../types'

export default function ProductPage() {
    const location : Location = useLocation()

    const [product, setProduct] = useState(() => {
        return location.state as Product
    })

    return (
        <div>
            <section className="pb-7">
                <ProductInfo product={product} setProduct={setProduct} />
            </section>
            <section className="w-full bg-gray-200 py-7">
                <div className="w-full md:w-4/5 mx-auto space-y-5">
                    <Container>
                        <h2 className="text-xl font-semibold text-slate-700 ">Related Products</h2>
                    </Container>
                    <ProductRecommendation
                        showRecommendCard={false}
                        category={product?.category}
                        type="category"
                    />
                </div>
            </section>
        </div>
    )
}
