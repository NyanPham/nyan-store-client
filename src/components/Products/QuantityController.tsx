import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import getMatchedButton from '../../utils/getMatchedButton'
import { CartState } from '../../redux/reducers/cartReducer'

type QuantityControllerProps = {
    productId: string
    inventory: number
    currentQuantity: number
    onQuantityChange: (quantity: number) => void
    isSoldOut: boolean
    isUnavailable?: boolean
    spacing?: string
    showLabel?: boolean
    quantityBtnSize?: string
    quantityInputSize?: string
}

export default function QuantityController({
    inventory,
    isSoldOut,
    isUnavailable,
    currentQuantity = 1,
    onQuantityChange,
    spacing = '',
    showLabel = true,
    quantityBtnSize = 'w-7 h-7',
    quantityInputSize = 'h-7',
} : QuantityControllerProps) {
    const [quantity, setQuantity] = useState<number>(currentQuantity)
    const { loading } = useSelector((state: { cart: CartState }) => state.cart)
    
    const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        if (value > inventory || value < 1) return alert(`You can only add ${inventory} to your cart`)

        setQuantity(value)
    }

    const handleControlClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = getMatchedButton(e, '[data-control]')
        if (!button) return

        if (button.dataset.control === 'plus') {
            setQuantity((prevQuantity) => {
                if ((prevQuantity) + 1 > inventory) return (prevQuantity)
                return (prevQuantity) + 1
            })
        } else {
            setQuantity((prevQuantity) => {
                if ((prevQuantity) - 1 < 1) return (prevQuantity)
                return (prevQuantity) - 1
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
                    disabled={isSoldOut || isUnavailable || loading}
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
                    disabled={isSoldOut || isUnavailable || loading}
                />
                <button
                    className={`${quantityBtnSize} border border-gray-500/30 rounded-sm text-sm text-gray-700 transition duration-200 disabled:text-gray-300 disabled:border-gray-200`}
                    type="button"
                    onClick={handleControlClick}
                    data-control="plus"
                    disabled={isSoldOut || isUnavailable || loading}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>
    )
}
