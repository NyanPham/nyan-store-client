import { useState } from 'react'
import { useEffect } from 'react'
import { COLOR_MAP } from '../../config'

type VariantOptionsProps = {
    options: string[]
    currentOption: string
    styles: any
    textHidden: boolean
    optionType: string
    handleOptionChange: any
    optionOrderNum: string
}

export type OptionChangeData = {
    option: string
    orderNum: string
}

function VariantOptions({
    options,
    currentOption,
    styles,
    textHidden,
    optionType,
    handleOptionChange,
    optionOrderNum,
} : VariantOptionsProps) {
    const [selectedOption, setSelectOption] = useState(() => {
        return currentOption != null ? currentOption : options[0]
    })  

    const handleOptionClick = (e: React.MouseEvent<HTMLLabelElement>) => {
        const target = e.target as HTMLLabelElement

        if (target.dataset.value == null) {
            throw new Error("The option is not set with value data")
        }

        setSelectOption(target.dataset.value)
        handleOptionChange({
            option: target.dataset.value,
            orderNum: optionOrderNum,
        })
    }

    useEffect(() => {
        if (currentOption == null) return

        setSelectOption(currentOption)
    }, [currentOption])

    return (
        <>
            {options[0] && (
                <div className="w-full flex flex-col mt-3">
                    <h3 className="form-label">{optionType}</h3>
                    <div className="flex mt-1 gap-2 w-full flex-wrap ">
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

type OptionProps = {
    option: string
    configures: any
    handleClick: (e: React.MouseEvent<HTMLLabelElement>) => void
    isSelected: boolean
    optionOrderNum: string
}
    
function Option({ option, configures, handleClick, isSelected, optionOrderNum } : OptionProps) {
    const { styles, textHidden } = configures
    const color = COLOR_MAP[option?.toLowerCase().split('-').join('') as keyof typeof COLOR_MAP]

    return (
        <>
            {option && (
                <>
                    <label
                        htmlFor={`${optionOrderNum}_${option}`}
                        className={`${
                            color ? color : ''
                        } relative cursor-pointer transform transition duration-200 ${styles} ${
                            isSelected && (color ? `ring-2 ring-offset-1 ring-gray-900` : 'border-2 border-gray-900')
                        }`}
                        data-value={option}
                        onClick={handleClick}
                    >
                        {!textHidden && option.split('-').join(' ')}
                        {textHidden && (
                            <span className="absolute top-full opacity-0">{option.split('-').join(' ')}</span>
                        )}
                    </label>
                </>
            )}
        </>
    )
}
export default VariantOptions
