import React, { useMemo } from 'react'
import { shuffle } from 'lodash'
import Container from './Container'
import ProductCard from './Products/ProductCard'
import SideNavigation from './SideNavigation'
import Slider from './Slider'
import SkeletonCard from './SkeletonCard'

function SliderWithProduct({
    slides,
    products,
    navTitle,
    sideNavBackground,
    nameColor,
    borderColor,
    itemBorderColor,
    caretColor,
    isLoading,
    sliderFirst = true,
    showNumber = 4,
}) {
    const productsToShow = useMemo(() => shuffle(products).slice(0, showNumber), [products, showNumber])

    const ProductCards = (
        <div className="flex-shrink-0 w-full self-start grid grid-cols-2 md:grid-cols-3 lg:w-2/5 lg:grid-cols-2">
            {productsToShow?.length > 0 && !isLoading
                ? productsToShow.map((product, index) => <ProductCard {...product} key={`slider_w_product_${index}`} />)
                : Array.from({ length: 4 }, (_, index) => <SkeletonCard key={`recommendation_${index}`} />)}
        </div>
    )
            
    return (
        <div>
            <Container>
                <div className="flex items-center justify-center flex-col gap-8 lg:gap-0 lg:flex-row lg:items-stretch max-w-full shadow-lg">
                    <div className={` ${sideNavBackground} self-stretch flex-shrink-0 w-64 hidden lg:block`}>
                        <SideNavigation
                            title={navTitle}
                            isDrawer={false}
                            nameColor={nameColor}
                            borderColor={borderColor}
                            itemBorderColor={itemBorderColor}
                            caretColor={caretColor}
                        />
                    </div>
                    {sliderFirst ? (
                        <>
                            <Slider slides={slides} slidesPerView={1} />
                            {ProductCards}
                        </>
                    ) : (
                        <>
                            {ProductCards}
                            <Slider slides={slides} slidesPerView={1} />
                        </>
                    )}
                </div>
            </Container>
        </div>
    )
}

export default SliderWithProduct
