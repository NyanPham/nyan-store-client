import  { useState } from 'react'
import { useEffect } from 'react'

type FilterFacetProps = {
    option: {
        value: string
    }
    optionType: string
    onFacetInput: (data: { option: { value: string }; isChecked: boolean }) => void
    filterToRemove: {
        optionType: string | null
        value: string | null 
    }       
    setFilterToRemove: React.Dispatch<React.SetStateAction<{
        optionType: string | null;
        value: string | null;
    }>>
}

export default function FilterFacet({ option, optionType, onFacetInput, filterToRemove, setFilterToRemove } : FilterFacetProps) {
    const [isChecked, setIsChecked] = useState(false)

    const handleOptionInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked)
        onFacetInput({
            option,
            isChecked: e.target.checked,
        })
    }
    
    const { optionType: filterTypeToRemove, value: filterValueToRemove } = filterToRemove

    useEffect(() => {
        if (filterTypeToRemove == null || filterValueToRemove == null) return
        if (filterTypeToRemove !== optionType || filterValueToRemove !== option.value) return

        setIsChecked(false)
        onFacetInput({
            option: { value: filterValueToRemove },
            isChecked: false,
        })

        setFilterToRemove({
            optionType: null,
            value: null,
        })
    }, [
        filterTypeToRemove,
        filterValueToRemove,
        optionType,
        onFacetInput,
        setIsChecked,
        option.value,
        setFilterToRemove,
    ])
    
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
                {option.value.split('-').join(' ')}
            </label>
        </>
    )
}
