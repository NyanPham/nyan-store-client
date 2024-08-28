import { useMemo, useRef } from 'react'
import { useFetchProductProps, useFetchProductsWithVisibility } from '../hooks/useFetchProducts'
import SliderWithProduct from './SliderWithProduct'
import useOnScreen from '../hooks/useOnScreen'
import { Tag } from '../types'
    
// TODO: Do the cache as a state for the whole app to store the products
type GetSliderWithProductsProps = {
    tags: string[]
    category: string
    sideNavBackground: string
    navTitle: string
    nameColor: string
    borderColor: string
    itemBorderColor: string
    caretColor: string
    slides: number
    sliderFirst?: boolean
    from?: 'category' | 'tags'
}

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
}: GetSliderWithProductsProps) {    
    const divRef = useRef<HTMLDivElement>(null)
    const isVisible = useOnScreen(divRef, '-50px', 0)

    type OptionsType = {
        page: number,
        limit: number,
        categoryName?: string
        tags?: Tag[]
    }

    const options: OptionsType = useMemo(() => {
        const opts: OptionsType = {
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

    const { data: products, isLoading } = useFetchProductsWithVisibility(from, options as useFetchProductProps, isVisible)
    
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
