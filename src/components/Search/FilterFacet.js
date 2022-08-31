import React, { useState } from 'react'

export default function FilterFacet({ option, optionType, onFacetInput }) {
    const [isChecked, setIsChecked] = useState(false)

    const handleOptionInput = (e) => {
        setIsChecked(e.target.checked)
        onFacetInput({
            option,
            isChecked: e.target.checked,
        })
    }

    return (
        <>
            <input
                className="hidden"
                type="checkbox"
                name={optionType}
                id={option.value.toLowerCase()}
                value={option.value}
                onInput={handleOptionInput}
            />
            <label
                className={`flex items-center gap-3 relative before:content-['\\2713'] before:inline-block before:w-4 before:h-4 before:border before:border-gray-600 before:bg-slate-200 before:text-center before:align-text-center before:text-cyan-700 before:text-xs before:font-bold
    ${isChecked ? 'before:text-opacity-100' : 'before:text-opacity-0'}`}
                htmlFor={option.value.toLowerCase()}
            >
                {option.value}
            </label>
        </>
    )
}
