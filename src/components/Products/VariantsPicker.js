import React, { useState } from 'react'
import { COLOR_MAP } from '../data'
import VariantOptions from './VariantOptions'

function VariantsPicker({ variants, buttonText, formSubmitHandler }) {
    const [name, setName] = useState(() => variants[0].name)
    const [price, setPrice] = useState(() => variants[0].price)
    const [comparePrice, setComparePrice] = useState(() => variants[0].oldPrice)
    const [selectedVariant, setSelectedVariant] = useState(variants[0])
    const [isUnavailable, setIsUnavailable] = useState(false)
    const [isSoldOut, setIsSoldOut] = useState(variants[0].inventory === 0)

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

        formSubmitHandler(selectedVariant._id)
    }

    return (
        <div className="">
            <h3>{name}</h3>
            <div className="flex gap-2">
                <span>{comparePrice}</span>
                <span>{price}</span>
            </div>
            <form className="form space-y-4 mt-7" onSubmit={handleSubmit}>
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
                            'w-7 h-7 flex items-center justify-center gap-3 text-slate-700 text-sm font-bold bg-slate-100 border border-slate-300'
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
                            'w-7 h-7 flex items-center justify-center gap-3 text-slate-700 text-sm font-bold bg-slate-100 border border-slate-300'
                        }
                        textHidden={false}
                        handleOptionChange={handleOptionChange}
                        optionOrderNum={'option3'}
                        optionType="Material"
                    />
                )}
                <button
                    className="w-full mt-7 py-1 text-lg font-semibold text-white bg-cyan-400 rounded-lg disabled:pointer-events-none disabled:bg-slate-300 disabled:text-slate-500"
                    disabled={isUnavailable || isSoldOut}
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
