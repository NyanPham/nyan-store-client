import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'

export default function QuantityController({ inventory, isSoldout, isUnavailable, onQuantityChange }) {
    const [quantity, setQuantity] = useState(1)

    const handleNumberInput = (e) => {
        setQuantity(e.target.value)
    }

    const handleControlClick = (e) => {
        let button
        if (e.target.matches('[data-control]')) button = e.target.matches('[data-control]')
        if (e.target.closest('[data-control]') != null) button = e.target.closest('[data-control]')

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
    }, [quantity])

    return (
        <div className="form-group quantity-controller">
            <label className="form-label" htmlFor="quantity">
                Quantity
            </label>
            <div>
                <button
                    type="button"
                    onClick={handleControlClick}
                    data-control="minus"
                    disabled={isSoldout || isUnavailable}
                >
                    <FontAwesomeIcon icon={faMinus} />
                </button>
                <input
                    className="text-center"
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={quantity}
                    max={inventory}
                    min="1"
                    onInput={handleNumberInput}
                    disabled={isSoldout || isUnavailable}
                />
                <button
                    type="button"
                    onClick={handleControlClick}
                    data-control="plus"
                    disabled={isSoldout || isUnavailable}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>
    )
}
