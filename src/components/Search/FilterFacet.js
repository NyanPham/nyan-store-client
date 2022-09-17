import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
                className={`flex cursor-pointer w-max items-center gap-3 relative before:content-[''] before:inline-block before:w-4 before:h-4 before:border before:border-gray-600 before:bg-slate-200 before:text-center before:align-text-center before:text-cyan-700 before:text-xs before:font-bold
    ${isChecked ? 'before:bg-cyan-400' : 'before:bg-slate-200'} ${optionType === 'size' ? 'uppercase' : 'capitalize'}`}
                htmlFor={option.value}
            >
                <FontAwesomeIcon
                    className={`absolute top-1/2 left-0.5 -translate-y-1/2 text-sm ${
                        isChecked ? 'text-white' : 'hidden'
                    }`}
                    icon={faCheck}
                />
                {option.value.split('-').join(' ')}
            </label>
        </>
    )
}
