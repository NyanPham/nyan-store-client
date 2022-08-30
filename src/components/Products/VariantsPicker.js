import React, { useRef, useState } from 'react'
import { COLOR_MAP } from '../data'
import VariantOptions from './VariantOptions'

function VariantsPicker(props) {
    const { variants, buttonText, formSubmitHandler, currentBid } = props

    const [selectedVariant, setSelectedVariant] = useState(variants[0])
    const [isUnavailable, setIsUnavailable] = useState(false)
    const [isSoldOut, setIsSoldOut] = useState(variants[0].inventory === 0)

    const priceRef = useRef()

    const firstOptions = filterDuplicateOption(variants, 'option1')
    const secondOptions = filterDuplicateOption(variants, 'option2')
    const thirdOptions = filterDuplicateOption(variants, 'option3')

    function handleOptionChange(data) {
        const desiredVariant = { ...selectedVariant }
        desiredVariant[data.orderNum] = data.option

        const availableVariant = variants.find(
            (variant) =>
                compareStringValue(variant.option1, desiredVariant.option1) &&
                compareStringValue(variant.option2, desiredVariant.option2) &&
                compareStringValue(variant.option3, desiredVariant.option3)
        )
        if (!availableVariant) {
            setIsUnavailable(true)
        } else {
            setIsUnavailable(false)
            setSelectedVariant(availableVariant)
            setIsSoldOut(availableVariant.inventory === 0)
        }
    }

    const actionButtonText = isUnavailable ? 'Unavailable' : isSoldOut ? 'Soldout' : buttonText

    function handleSubmit(e) {
        e.preventDefault()

        formSubmitHandler({ variantId: selectedVariant._id, bidPrice: priceRef.current.value })
    }

    return (
        <div className="">
            <h3 className="text-xl text-slate-700 font-semibold capitalize">{selectedVariant.name}</h3>
            <div className="flex gap-2 justify-start items-center mt-2">
                {selectedVariant.oldPrice && (
                    <span className="product-card-compare-price text-base">${selectedVariant.oldPrice}</span>
                )}
                <span className="product-card-price text-2xl">${selectedVariant.price}</span>
            </div>
            <form className="form mt-1 w-full" onSubmit={handleSubmit}>
                {secondOptions && (
                    <VariantOptions
                        options={secondOptions}
                        styles={
                            'w-7 h-7 rounded-full flex items-center justify-center gap-3 text-slate-700 text-sm font-bold bg-slate-100 border border-slate-300'
                        }
                        textHidden={true}
                        handleOptionChange={handleOptionChange}
                        optionOrderNum={'option2'}
                        optionType="Color"
                    />
                )}
                {firstOptions && (
                    <VariantOptions
                        options={firstOptions}
                        styles={
                            'w-8 h-8 flex items-center justify-center gap-3 text-slate-700 text-sm font-medium bg-slate-100 rounded-sm border border-slate-300'
                        }
                        textHidden={false}
                        handleOptionChange={handleOptionChange}
                        optionOrderNum={'option1'}
                        optionType="Size"
                    />
                )}
                {thirdOptions && (
                    <VariantOptions
                        options={thirdOptions}
                        styles={
                            'h-7 w-fit px-3 flex items-center justify-center gap-3 text-slate-700 text-sm font-medium bg-slate-100 rounded-sm border border-slate-300'
                        }
                        textHidden={false}
                        handleOptionChange={handleOptionChange}
                        optionOrderNum={'option3'}
                        optionType="Material"
                    />
                )}
                {currentBid != null && (
                    <div className="form-group">
                        <label htmlFor="auction-price" className="form-label">
                            Your Bid
                        </label>
                        <input
                            className="form-input"
                            type="number"
                            name="auction-price"
                            id="auction-price"
                            min={currentBid + 1}
                            step={1}
                            defaultValue={currentBid + 1}
                            ref={priceRef}
                        />
                    </div>
                )}
                <button
                    className="w-full mt-5 py-1 text-lg font-semibold text-white bg-cyan-400 rounded-lg disabled:pointer-events-none disabled:bg-slate-300 disabled:text-slate-500"
                    disabled={isUnavailable || isSoldOut}
                    type="submit"
                >
                    {actionButtonText}
                </button>
            </form>
        </div>
    )
}

function filterDuplicateOption(variants, optionPosition) {
    return variants.reduce((options, variant) => {
        if (options.includes(variant[optionPosition])) return options
        return [...options, variant[optionPosition]]
    }, [])
}

export function compareStringValue(value1, value2) {
    return value1?.toString().toLowerCase() === value2?.toString().toLowerCase()
}

export default VariantsPicker
