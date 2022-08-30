import { shuffle } from 'lodash'
import React from 'react'
import Container from './Container'
import ProductCard from './Products/ProductCard'
import SideNavigation from './SideNavigation'
import Slider from './Slider'

function SliderWithProduct({
    slides,
    products,
    navTitle,
    sideNavBackground,
    nameColor,
    borderColor,
    itemBorderColor,
    caretColor,
}) {
    const productsToShow = shuffle(products).slice(0, 6)

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
                    <Slider slides={slides} slidesPerView={1} />
                    <div className="flex-shrink-0 w-full self-start grid grid-cols-2 md:grid-cols-3 lg:w-2/5  lg:grid-rows-2">
                        {productsToShow.map((product, index) => (
                            <ProductCard {...product} key={`slider_w_product_${index}`} />
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default SliderWithProduct
