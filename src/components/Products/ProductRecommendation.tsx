import React, { useRef } from 'react'
import { SwiperSlide } from 'swiper/react'
import { useSelector } from 'react-redux/es/exports'
import {useFetchProductsWithVisibility } from '../../hooks/useFetchProducts'
import ProductCard from './ProductCard'
import ProductShowcase from './ProductShowcase'
import nyanLogoWhite from '../../imgs/nyan-logo-white.png'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import SkeletonCard from '../SkeletonCard'
import useOnScreen from '../../hooks/useOnScreen'

// TODO: Do the cache as a state for the whole app to store the products

type ProductRecommendationProps = {
    showRecommendCard?: boolean
    category?: any
    type?: string
}

function ProductRecommendation({ showRecommendCard = true, category, type = 'collections' } : ProductRecommendationProps) {
    const allCollections = useSelector((state: any) => state.collections)
    const divRef = useRef<HTMLDivElement>(null)
    const isVisible = useOnScreen(divRef, '-50px', 0)

    const { data: products, isLoading } = useFetchProductsWithVisibility(type, {
        collections: allCollections,
        collectionName: 'New Arrival',
        categoryName: category?.name,
        limit: 8,
        page: 1,
    }, isVisible)  

    const recommendationCard = (
        <SwiperSlide key="recommendation_message">
            <div className="flex flex-col items-center justify-center w-full h-full bg-cyan-500 gap-4 px-7 max-w-xs">
                <h2 className="text-2xl font-semibold text-white uppercase">Recommend for you</h2>
                <span className="text-base text-white font-normal align-baseline">By</span>
                <LazyLoadImage src={nyanLogoWhite} alt="Nyan Logo" loading="lazy" />
            </div>
        </SwiperSlide>
    )

    const productCards = isLoading || !products ? (
        Array.from({ length: 8 }, (_, index) => (
            <SwiperSlide key={`recommendation_${index}`}>
                <SkeletonCard />
            </SwiperSlide>
        ))
    ) : (
        products.map((product, index) => (
            <SwiperSlide key={`recommendation_${index}`}>
                <ProductCard {...product} />
            </SwiperSlide>
        ))
    )

    return (
        <div ref={divRef}>
            <ProductShowcase
                productCards={showRecommendCard ? [recommendationCard, ...productCards] : productCards}
                isSlider={!isLoading}
            />
        </div>
    )
}

export default ProductRecommendation
