import React, { useState } from 'react'
import { COLOR_MAP, OPTION_TYPES_MAP } from '../data'

function VariantOptions({ options, styles, textHidden, optionType, handleOptionChange, optionOrderNum }) {
    const [selectedOption, setSelectOption] = useState(() => options[0])

    function handleOptionClick(e) {
        setSelectOption(e.target.dataset.value)
        handleOptionChange({
            option: e.target.dataset.value,
            orderNum: optionOrderNum,
        })
    }

    return (
        <>
            {options[0] && (
                <div className="form-group">
                    <h3 className="form-label">{optionType}</h3>
                    <div className="flex">
                        {options.map((option, index) => (
                            <Option
                                key={`option_${option}_${index}`}
                                option={option}
                                configures={{
                                    styles,
                                    textHidden,
                                }}
                                handleClick={handleOptionClick}
                                isSelected={selectedOption?.toLowerCase() === option?.toLowerCase()}
                                optionOrderNum={optionOrderNum}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

function Option({ option, configures, handleClick, isSelected, optionOrderNum }) {
    const { styles, textHidden } = configures
    const color = COLOR_MAP[option?.toLowerCase()]
    return (
        <>
            {option && (
                <>
                    <label
                        htmlFor={`${optionOrderNum}_${option}`}
                        className={`relative cursor-pointer ${styles} ${color && color} ${
                            isSelected && 'border-2 border-gray-900'
                        }`}
                        data-value={option}
                        onClick={handleClick}
                    >
                        {!textHidden && option}
                        {textHidden && <span className="absolute top-full opacity-0">{option}</span>}
                    </label>
                </>
            )}
        </>
    )
}
export default VariantOptions

// createOption(option, {
//     key: `option_1_${index}`,
//     styles: 'w-7 h-7 flex items-center justify-center gap-3 text-slate-700 text-sm font-bold bg-slate-100 border border-slate-300',
//     textHidden: false,
// })

// createOption(option, {
//     key: `option_2_${index}`,
//     styles: 'w-7 h-7 rounded-full flex items-center justify-center gap-3 text-slate-700 text-sm font-bold bg-slate-100 border border-slate-300',
//     textHidden: true,
// })

// createOption(option, {
//     key: `option_3_${index}`,
//     styles: 'w-7 h-7 flex items-center justify-center gap-3 text-slate-700 text-sm font-bold bg-slate-100 border border-slate-300',
//     textHidden: false,
// })
