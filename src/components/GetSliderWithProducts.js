import React from 'react'
import { useFetchProducts } from '../hooks/useFetchProducts'
import SliderWithProduct from './SliderWithProduct'

function GetSliderWithProducts({
    tags,
    category,
    sideNavBackground,
    navTitle,
    nameColor,
    borderColor,
    itemBorderColor,
    caretColor,
    slides,
    from,
}) {
    const products = useFetchProducts('category', { categoryName: category })

    return (
        <SliderWithProduct
            slides={slides}
            products={products}
            navTitle={navTitle}
            sideNavBackground={sideNavBackground}
            nameColor={nameColor}
            borderColor={borderColor}
            itemBorderColor={itemBorderColor}
            caretColor={caretColor}
        />
    )
}

export default GetSliderWithProducts
