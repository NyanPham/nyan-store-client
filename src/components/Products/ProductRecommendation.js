import React, { useEffect, useState } from 'react'
import { SwiperSlide } from 'swiper/react'
import { useSelector } from 'react-redux/es/exports'
import useFetchProducts from '../../hooks/useFetchProducts'
import ProductCard from './ProductCard'
import ProductShowcase from './ProductShowcase'
import nyanLogoWhite from '../../imgs/nyan-logo-white.png'

function ProductRecommendation() {
    const collections = useSelector((state) => state.collections)
    const randomCollectionId = collections[Math.floor(Math.random() * collections.length)]?._id
    const products = useFetchProducts({})

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
        <div className="bg-slate-200 py-12 px-12">
            <ProductShowcase productCards={[recommendationCard, ...productCards]} isSlider={true} slidesPerView={5} />
        </div>
    )
}

export default ProductRecommendation