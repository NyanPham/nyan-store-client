import React from 'react'

export default function FilterFacet({ optionType, options }) {
    return (
        <div>
            <h3>{optionType}</h3>
            {options.map((option, index) => (
                <span key={`${optionType}_${option}_${index}`}>{option.value}</span>
            ))}
        </div>
    )
}
