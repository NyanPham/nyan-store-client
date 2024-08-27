import { useEffect, useState, useRef, useCallback } from 'react'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type FilterPriceRangeSlidersProps = {
    maxPrice: number
    minPrice: number
    collectPriceRange: (data: { fromValue: number; toValue: number }) => void
}

export default function FilterPriceRangeSliders({ maxPrice, minPrice, collectPriceRange }: FilterPriceRangeSlidersProps) {
    const [fromValue, setFromValue] = useState(0)
    const [toValue, setToValue] = useState(0)
    const [openFacet, setOpenFacet] = useState(true)
    const rangeSliderRef = useRef<HTMLInputElement>(null)

    const fullRange = maxPrice - minPrice

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.dataset.type === 'from') {
            if (Number(e.target.value) < Number(toValue)) setFromValue(Number(e.target.value))
        } else {
            if (Number(e.target.value) > Number(fromValue)) setToValue(Number(e.target.value))
        }
    }   

    const updateRangeColor = useCallback(() => {
        const currentRange = (toValue - fromValue) / fullRange
        const leftPosition = ((fromValue - minPrice) / fullRange) * 100

        rangeSliderRef.current?.style.setProperty('--left-position', leftPosition.toString())
        rangeSliderRef.current?.style.setProperty('--current-range', currentRange.toString())
    }, [fromValue, toValue, fullRange, minPrice])
    
    useEffect(() => {
        collectPriceRange({
            toValue,
            fromValue,
        })

        updateRangeColor()
    }, [fromValue, toValue, maxPrice, minPrice, collectPriceRange, updateRangeColor])

    useEffect(() => {
        setFromValue(minPrice)
        setToValue(maxPrice)
    }, [minPrice, maxPrice])

    return (
        <form className="py-2 px-4 select-none price-slider-container">
            <div
                className="flex justify-between items-center mt-2 cursor-pointer"
                onClick={() => setOpenFacet((prevOpen) => !prevOpen)}
            >
                <h3 className="font-semibold text-2xl text-cyan-400 capitalize">Price</h3>
                <div className="w-4 h-4 border border-gray-300 rounded-full flex justify-center items-center">
                    <FontAwesomeIcon
                        className="text-gray-300 text-xs font-normal"
                        icon={openFacet ? faMinus : faPlus}
                    />
                </div>
            </div>
            <div
                className={`columns-2 max-w-full h-max flex flex-col mt-4 transition-all transform duration-300 origin-top ${
                    openFacet ? 'scale-y-100 h-max' : 'scale-y-0 h-0'
                }`}
            >
                <div className="relative w-full h-1 bg-gray-200" ref={rangeSliderRef} id="range-slider">
                    <input
                        className="absolute w-full h-1 appearance-none"
                        type="range"
                        id="from-slider"
                        min={minPrice}
                        max={maxPrice}
                        value={fromValue}
                        onChange={handleSliderChange}
                        data-type="from"
                    />
                    <input
                        className="absolute w-full h-1 appearance-none"
                        type="range"
                        id="to-slider"
                        min={minPrice}
                        max={maxPrice}
                        value={toValue}
                        onChange={handleSliderChange}
                        data-type="to"
                    />
                </div>
                <div className="flex justify-between items-center mt-3">
                    <div>
                        <label htmlFor="from-price" className="hidden">
                            From
                        </label>
                        <span className="text-lg text-slate-700 font-semibold">$</span>
                        <input
                            className="inline-block w-14 text-lg text-slate-700 font-semibold"
                            type="number"
                            id="from-price"
                            value={fromValue}
                            min={minPrice}
                            max={maxPrice}
                            onChange={handleSliderChange}
                            data-type="from"
                        />
                    </div>
                    <div>
                        <label htmlFor="to-price" className="hidden">
                            To
                        </label>
                        <span className="text-lg text-slate-700 font-semibold">$</span>
                        <input
                            className="inline-block w-14 text-right text-lg text-slate-700 font-semibold"
                            type="number"
                            id="to-price"
                            value={toValue}
                            min={minPrice}
                            max={maxPrice}
                            onChange={handleSliderChange}
                            data-type="to"
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}
