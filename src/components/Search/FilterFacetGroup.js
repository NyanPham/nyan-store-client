import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import useDeepCompareEffect from '../../hooks/useDeepCompareEffect'
import FilterFacet from './FilterFacet'

export default function FilterFacetGroup({ optionType, options, collectOptionsState }) {
    const [openFacet, setOpenFacet] = useState(true)
    const [checkedOptions, setCheckedOptions] = useState(() =>
        options.reduce((state, option) => {
            return {
                ...state,
                [option.value]: false,
            }
        }, {})
    )
    const toggleOpenFacet = () => {
        setOpenFacet((prevOpen) => !prevOpen)
    }

    const hanldeFacetInput = ({ option, isChecked }) => {
        setCheckedOptions((prevCheckedOptions) => {
            return {
                ...prevCheckedOptions,
                [option.value]: isChecked,
            }
        })
    }

    useDeepCompareEffect(() => {
        collectOptionsState({
            optionType,
            optionStates: checkedOptions,
        })
    }, [optionType, checkedOptions])

    return (
        <form className="py-2 h-max px-4 select-none w-full transform transition duration-300 origin-top overflow-hidden">
            <div className="flex justify-between items-center mt-2 cursor-pointer" onClick={toggleOpenFacet}>
                <h3 className="font-semibold text-2xl text-cyan-400 capitalize">{optionType}</h3>
                <div className="w-4 h-4 border border-gray-300 rounded-full flex justify-center items-center">
                    <FontAwesomeIcon
                        className="text-gray-300 text-xs font-normal"
                        icon={openFacet ? faMinus : faPlus}
                    />
                </div>
            </div>
            <div
                className={`columns-2 max-w-full flex-nowrap mt-4 transition-all transform duration-300 ease-in origin-top ${
                    openFacet ? 'scale-y-100 max-h-96 overflow-auto' : 'scale-y-0 max-h-0 overflow-clip'
                }`}
            >
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
