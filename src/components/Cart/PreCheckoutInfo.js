import { faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useSelector } from 'react-redux'
import { cart_configures } from '../data'

const getInstruction = (fraction) => {
    let percent = fraction
    const instruction = {
        textColor: '',
        text: '',
        moreText: '',
        progressColor: '',
    }

    if (percent > 1) percent = 1
    if (percent < 0) percent = 0

    if (percent >= 1) {
        instruction.textColor = 'text-cyan-400'
        instruction.progressColor = 'bg-cyan-400'
        instruction.text = 'Congratulations!'
        instruction.moreText = "You've got free shipping!"
    }
    if (percent >= 0.5 && percent < 1) {
        instruction.textColor = 'text-amber-400'
        instruction.progressColor = 'bg-amber-400'
        instruction.text = 'Hold up!'
        instruction.moreText = "You're almost there!"
    }
    if (percent <= 0.5) {
        instruction.textColor = 'text-red-400'
        instruction.progressColor = 'bg-red-400'
        instruction.text = 'Hi there!'
        instruction.moreText = 'Add some more to get free shipping!'
    }

    return { instruction, percent }
}

export default function PreCheckoutInfo() {
    const { freeShippingThreshold } = cart_configures
    const { cart } = useSelector((state) => state.cart)
    const subtotal = cart.reduce((_, item) => item.variant.price * item.quantity, 0)

    const { instruction, percent } = getInstruction(subtotal / freeShippingThreshold)

    return (
        <>
            <h3 className="text-md font-normal text-slate-700">
                <span className={`${instruction.textColor} text-lg font-semibold`}>{instruction.text}</span>{' '}
                {instruction.moreText}
            </h3>
            <div className="w-1/2 mt-7 justify-self-start ml-0 md:ml-auto md:justify-self-end">
                <div className="w-full h-3 bg-gray-300 rounded-full relative">
                    <span
                        className={`absolute rounded-full left-0 top-0 h-full min-w-0 max-w-full transition-all transform duration-500 ${instruction.progressColor}`}
                        style={{ width: `${percent * 100}%` }}
                    />
                    <FontAwesomeIcon
                        className={`absolute rounded-full right-full bottom-full text-base md:text-lg transition-all transform duration-500 ${
                            percent === 0 ? 'opacity-0' : 'opacity-100'
                        } ${instruction.textColor}`}
                        icon={faTruckFast}
                        style={{ right: `${(1 - percent) * 100}%` }}
                    />
                </div>
            </div>
            <div className="flex justify-between items-center justify-self-start ml-0 w-1/2 md:ml-auto mt-5">
                <h3 className="text-slate-700 font-semibold">Subtotal: </h3>
                <span className="text-slate-700 font-semibold">${subtotal}</span>
            </div>
            <p className="text-slate-700 font-normal mt-3">Shipping fee is calculated at checkout</p>
            <button
                type="submit"
                className="py-2 w-1/3 bg-cyan-400 text-white font-semibold tracking-wide rounded-lg mt-5 transition transform duration-200 hover:-translate-y-1 active:-translate-y-1 active:ring-2 active:ring-offset-2 active:ring-cyan-400"
            >
                Checkout
            </button>
        </>
    )
}
