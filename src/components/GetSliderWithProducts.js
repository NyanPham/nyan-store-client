import React from 'react'
import { useFetchProductsFromCategory } from '../hooks/useFetchProducts'
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
}) {
    const products = useFetchProductsFromCategory(category)

    return (
        <div className="py-10">
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
        </div>
    )
}

export default GetSliderWithProducts
