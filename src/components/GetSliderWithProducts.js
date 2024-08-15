import React, { useMemo } from 'react'
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
    sliderFirst = true,
    from = 'category',
}) {
    const options = useMemo(() => {
        const opts = {
            page: 1,
            limit: 4,
        }

        if (from === 'category') {
            opts.categoryName = category
        } else if (from === 'tags') {
            opts.tags = tags
        }
        return opts
    }, [from, category, tags])

    const products = useFetchProducts(from, options)

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
            sliderFirst={sliderFirst}
            showNumber={options.limit}
        />
    )
}

export default GetSliderWithProducts
