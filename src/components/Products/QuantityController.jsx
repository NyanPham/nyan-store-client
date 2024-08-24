import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import getMatchedButton from '../../utils/getMatchedButton'

export default function QuantityController({
    productId,
    inventory,
    isSoldout,
    isUnavailable,
    currentQuantity = 1,
    onQuantityChange,
    spacing = '',
    showLabel = true,
    quantityBtnSize = 'w-7 h-7',
    quantityInputSize = 'h-7',
}) {
    const [quantity, setQuantity] = useState(currentQuantity)
    const { loading } = useSelector((state) => state.cart)

    const handleNumberInput = (e) => {
        if (e.target.value > inventory || e.target.value < 1) return alert(`You can only add ${inventory} to your cart`)

        setQuantity(e.target.value)
    }

    const handleControlClick = (e) => {
        const button = getMatchedButton(e, '[data-control]')

        if (!button) return

        if (button.dataset.control === 'plus') {
            setQuantity((prevQuantity) => {
                if (parseInt(prevQuantity) + 1 > inventory) return parseInt(prevQuantity)
                return parseInt(prevQuantity) + 1
            })
        } else {
            setQuantity((prevQuantity) => {
                if (parseInt(prevQuantity) - 1 < 1) return parseInt(prevQuantity)
                return parseInt(prevQuantity) - 1
            })
        }
    }
    
    useEffect(() => {
        onQuantityChange(quantity)
    }, [quantity, onQuantityChange])

    useEffect(() => {
        if (quantity > inventory) {
            setQuantity(inventory)
        }
    }, [inventory, quantity])

    return (
        <div
            className={`form-group ${spacing} quantity-controller flex flex-row flex-wrap justify-start items-center gap-5`}
        >
            <label className={`form-label ${showLabel ? '' : 'hidden'}`} htmlFor="quantity">
                Quantity
            </label>
            <div className="flex items-center gap-1">
                <button
                    className={`${quantityBtnSize} border border-gray-500/30 rounded-sm text-sm text-gray-700 transition duration-200 disabled:text-gray-300 disabled:border-gray-200`}
                    type="button"
                    onClick={handleControlClick}
                    data-control="minus"
                    disabled={isSoldout || isUnavailable || loading}
                >
                    <FontAwesomeIcon icon={faMinus} />
                </button>
                <input
                    className={`${quantityInputSize} text-center border border-gray-500/30 rounded-sm text-sm text-gray-700 transition duration-200 disabled:text-gray-300 disabled:border-gray-200`}
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={quantity}
                    max={inventory}
                    min="1"
                    onInput={handleNumberInput}
                    disabled={isSoldout || isUnavailable || loading}
                />
                <button
                    className={`${quantityBtnSize} border border-gray-500/30 rounded-sm text-sm text-gray-700 transition duration-200 disabled:text-gray-300 disabled:border-gray-200`}
                    type="button"
                    onClick={handleControlClick}
                    data-control="plus"
                    disabled={isSoldout || isUnavailable || loading}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>
    )
}
