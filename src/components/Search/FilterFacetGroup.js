import React, { useEffect, useState } from 'react'
import useDeepCompareEffect from '../../hooks/useDeepCompareEffect'
import FilterFacet from './FilterFacet'

export default function FilterFacetGroup({ optionType, options, collectOptionsState }) {
    const [checkedOptions, setCheckedOptions] = useState(() =>
        options.reduce((state, option) => {
            return {
                ...state,
                [option.value]: false,
            }
        }, {})
    )

    useDeepCompareEffect(() => {
        collectOptionsState({
            optionType,
            optionStates: checkedOptions,
        })
    }, [optionType, checkedOptions])

    const hanldeFacetInput = ({ option, isChecked }) => {
        setCheckedOptions((prevCheckedOptions) => {
            return {
                ...prevCheckedOptions,
                [option.value]: isChecked,
            }
        })
    }

    return (
        <form className="py-2 px-4 select-none">
            <h3 className="font-semibold text-2xl mt-2 text-cyan-400 capitalize">{optionType}</h3>
            <div className="columns-2 mt-4">
                {options
                    .filter((option) => option.value !== null)
                    .map((option, index) => (
                        <FilterFacet
                            key={`${optionType}_${index}`}
                            option={option}
                            optionType={optionType}
                            onFacetInput={hanldeFacetInput}
                        />
                    ))}
            </div>
        </form>
    )
}
