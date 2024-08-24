import React, { useMemo, useRef } from 'react'
import { useFetchProductsWithVisibility } from '../hooks/useFetchProducts'
import SliderWithProduct from './SliderWithProduct'
import useOnScreen from '../hooks/useOnScreen'
    
// TODO: Do the cache as a state for the whole app to store the products
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
    const divRef = useRef()
    const isVisible = useOnScreen(divRef, '-50px', 0)

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

    const { data: products, isLoading } = useFetchProductsWithVisibility(from, options, isVisible)
    
    return (
        <div ref={divRef}>
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
                isLoading={isLoading}
            />
        </div>
    )
}

export default GetSliderWithProducts
