import React, { useEffect, useState } from 'react'
import { SwiperSlide } from 'swiper/react'
import { useSelector } from 'react-redux/es/exports'
import { useFetchProductsFromCollection } from '../../hooks/useFetchProducts'
import ProductCard from './ProductCard'
import ProductShowcase from './ProductShowcase'
import nyanLogoWhite from '../../imgs/nyan-logo-white.png'

function ProductRecommendation() {
    const collections = useSelector((state) => state.collections)
    const categories = useSelector((state) => state.categories)
    const products = useFetchProductsFromCollection(collections, 'New Arrival')
    const [slidesPerView, setSlidesPerView] = useState(() => {
        if (products.length) {
            return products.length <= 4 ? products.length + 1 : 5
        } else {
            return 5
        }
    })

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth < 767) {
                return setSlidesPerView(2)
            }
            if (window.innerWidth < 1024) {
                return setSlidesPerView(3)
            }

            if (products) {
                return setSlidesPerView(products.length <= 4 ? products.length + 1 : 5)
            } else {
                return setSlidesPerView(3)
            }
        })
    }, [products])

    const recommendationCard = (
        <SwiperSlide key={`recommendation_message`}>
            <div className="flex flex-col items-center justify-center w-full h-full bg-cyan-500 gap-4 px-7">
                <h2 className="text-2xl font-semibold text-white uppercase">Recommend for you</h2>
                <span className="text-base text-white font-normal align-baseline">By</span>
                <img src={nyanLogoWhite} alt="Nyan Logo" />
            </div>
        </SwiperSlide>
    )

    const productCards = products.map((product, index) => {
        return (
            <SwiperSlide key={`recommendation_${index}`}>
                <ProductCard {...product} />
            </SwiperSlide>
        )
    })

    return (
        <ProductShowcase
            productCards={[recommendationCard, ...productCards]}
            isSlider={true}
            slidesPerView={slidesPerView}
        />
    )
}

export default ProductRecommendation
