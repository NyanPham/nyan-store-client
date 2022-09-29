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
    from = 'category',
}) {
    const options = {}
    if (from === 'category') {
        options.categoryName = category
    } else if (from === 'tags') {
        options.tags = tags
    }

    const products = useFetchProducts(from, options)

    console.log(products)

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
