import React, { useState } from 'react'
import { useEffect } from 'react'

export default function FilterFacet({ option, optionType, onFacetInput }) {
    const [isChecked, setIsChecked] = useState(false)

    const handleOptionInput = (e) => {
        setIsChecked(e.target.checked)
        onFacetInput({
            option,
            isChecked: e.target.checked,
        })
    }

    useEffect(() => {
        setIsChecked(false)
        onFacetInput({
            option,
            isChecked: false,
        })
    }, [optionType, option, onFacetInput])

    return (
        <>
            <input
                className="hidden"
                type="checkbox"
                name={optionType}
                id={option.value}
                value={option.value}
                onInput={handleOptionInput}
            />
            <label
                className={`flex cursor-pointer items-center gap-3 relative rounded-full border border-slate-700 px-3 py-2 leading-none transition duration-200
    ${isChecked && 'ring-2 ring-offset-1 ring-cyan-400'} ${optionType === 'size' ? 'uppercase' : 'capitalize'}`}
                htmlFor={option.value}
            >
                {/* <FontAwesomeIcon
                    className={`absolute top-1/2 left-0.5 -translate-y-1/2 text-sm ${
                        isChecked ? 'text-white' : 'hidden'
                    }`}
                    icon={faCheck}
                /> */}
                {option.value.split('-').join(' ')}
            </label>
        </>
    )
}
