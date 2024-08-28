import React, { useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons'
import useCountries from '../../hooks/useCountries'

export default function SideShippingCalculator() {
    const [country, setCountry] = useState<string>("")
    // const [state, setState] = useState()
    const [openShippingCalculator, setOpenShippingCalculator] = useState(false)
    const { countries, states }: { countries: any, states: { [country: string]: any[] } } = useCountries()    
    const countryStates = useMemo(() => states[country], [country, states])
    
    const handleCalcSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const handleShippingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const element = e.target
        if (element.name === 'side-country') {
            setCountry(element.value as string)
        } else if (element.name === 'side-state') {
            // setState(e.target.value)
        }
    }

    const handleZipInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.warn(e)
    }

    useEffect(() => {
        if (!country) return

        // setState(countryStates[0].code)
    }, [country, countryStates])

    return (
        <>
            <button
                className="text-slate-700 text-xl flex flex-col justify-center items-center transition duration-200 hover:text-cyan-300 active:text-cyan-500"
                onClick={() => setOpenShippingCalculator(true)}
            >
                <FontAwesomeIcon icon={faTruckFast} />
                <span className="text-sm font-normal">Shipping</span>
            </button>
            <form
                className={`form py-7 px-5 z-30 bg-white absolute bottom-0 left-0 w-full h-full transition transform duration-300 shadow-top ${
                    openShippingCalculator
                        ? 'translate-y-0 pointer-events-auto'
                        : 'translate-y-full pointer-events-none'
                }`}
                onSubmit={handleCalcSubmit}
            >
                <div className="form-group mt-2">
                    <label className="form-label" htmlFor="side-country">
                        Country:
                    </label>
                    <select id="side-country" className="form-input" name="side-country" onInput={handleShippingChange}>
                        {countries &&
                            Object.entries(countries).map(([key, value]) => (
                                <option key={key}  value={key}>
                                    {value as string}
                                </option>
                            ))} 
                    </select>
                </div>
                <div className="form-group mt-2">
                    <label className="form-label" htmlFor="side-state">
                        State/Province:
                    </label>
                    <select id="side-state" className="form-input" name="side-state" onInput={handleShippingChange}>
                        {countryStates &&
                            countryStates.map((state) => (
                                <option key={state.code} value={state.code}>
                                    {state.name}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="form-group mt-2">
                    <label className="form-label" htmlFor="sidezip">
                        Zip Code:
                    </label>
                    <input type="text" id="side-zip" className="form-input" name="side-zip" onInput={handleZipInput} />
                </div>
                <button
                    type="submit"
                    className="mt-7 text-white font-semibold tracking-wide bg-cyan-400 py-1 px-4 rounded-lg flex-grow flex-shrink-0 w-full transition transform duration-200 hover:-translate-y-1 active:-translate-y-1 active:bg-cyan-500"
                >
                    Apply Coupon
                </button>
                <button
                    type="reset"
                    className="mt-2 text-center text-slate-700 font-semibold tracking-wide bg-white border border-slate-700 py-1 px-4 rounded-lg flex-grow flex-shrink-0 w-full transition transform duration-200 hover:-translate-y-1 active:-translate-y-1 active:bg-slate-700 active:text-white"
                    onClick={() => {
                        setOpenShippingCalculator(false)
                    }}
                >
                    Cancel
                </button>
            </form>
        </>
    )
}
