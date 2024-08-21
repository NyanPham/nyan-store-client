import axios from 'axios'
import { useEffect, useState } from 'react'
import { ROOT_URL } from '../config'

export default function useCountries() {
    const [countriesData, setCountriesData] = useState(() => ({
        countries: {},
        states: {},
    }))

    useEffect(() => {
        const cachedData = localStorage.getItem('countriesAndStates')
        if (cachedData) {
            setCountriesData(JSON.parse(cachedData))
        } else {
            axios.get(`${ROOT_URL}/api/v1/countries`)
                .then(res => {
                    if (res.data.status === 'success') {
                        const countriesAndStates = JSON.parse(res.data.data.countriesAndStates)
                        localStorage.setItem('countriesAndStates', JSON.stringify(countriesAndStates))
                        setCountriesData(countriesAndStates)
                    }
                })
                .catch(err => {
                    alert(err.response.data.message)
                })
        }
    }, [])

    return countriesData
}

