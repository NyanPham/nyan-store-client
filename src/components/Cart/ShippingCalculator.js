import React, { useEffect, useMemo, useState } from 'react'
import useCountries from '../../hooks/useCountries'

export default function ShippingCalculator() {
    const [country, setCountry] = useState()
    // const [state, setState] = useState()
    const { countries, states } = useCountries()

    const countryStates = useMemo(() => states[country], [country, states])

    const handleCalcSubmit = (e) => {
        e.preventDefault()
    }

    const handleShippingChange = (e) => {
        if (e.target.name === 'country') {
            setCountry(e.target.value)
        } else if (e.target.name === 'state') {
            // setState(e.target.value)
        }
    }

    const handleZipInput = (e) => {}

    useEffect(() => {
        if (!country) return

        // setState(countryStates[0]?.code)
    }, [country, countryStates])

    //  border border-gray-900/20 rounded-xl
    return (
        <>
            <form className="form w-full max-w-full text-center" onSubmit={handleCalcSubmit}>
                <fieldset className="pb-12 px-4 pt-5 border border-gray-900/20 rounded-xl">
                    <legend className="p-3 text-xl font-semibold text-slate-700 capitalize">Calculate Shipping</legend>
                    <div className="flex flex-row justify-center items-center w-full gap-7 flex-wrap">
                        <div className="form-group mt-2">
                            <label className="form-label" htmlFor="country">
                                Country:
                            </label>
                            <select id="country" className="form-input" name="country" onInput={handleShippingChange}>
                                {countries &&
                                    Object.entries(countries).map(([key, value]) => (
                                        <option key={key} name="country" value={key}>
                                            {value}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="form-group mt-2">
                            <label className="form-label" htmlFor="state">
                                State/Province:
                            </label>
                            <select id="state" className="form-input" name="state" onInput={handleShippingChange}>
                                {countryStates &&
                                    countryStates.map((state) => (
                                        <option key={state.code} name="state" value={state.code}>
                                            {state.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="form-group mt-2">
                            <label className="form-label" htmlFor="zip">
                                Zip Code:
                            </label>
                            <input type="text" id="zip" className="form-input" name="zip" onInput={handleZipInput} />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-56 mt-5 mx-auto text-white font-semibold tracking-wide bg-cyan-400 py-2 px-4 rounded-lg flex-grow flex-shrink-0 transition transform duration-200 hover:-translate-y-1 active:-translate-y-1 active:bg-cyan-500"
                    >
                        Apply Coupon
                    </button>
                </fieldset>
            </form>
        </>
    )
}
