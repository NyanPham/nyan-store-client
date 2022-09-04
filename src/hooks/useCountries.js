import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useCountries() {
    const [countriesData, setCountriesData] = useState({
        countries: {},
        states: {},
    })

    useEffect(() => {
        const getCountries = async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    url: `https://enigmatic-harbor-26816.herokuapp.com/api/v1/countries`,
                })

                if (res.data.status === 'success') {
                    setCountriesData(JSON.parse(res.data.data.countriesAndStates))
                }
            } catch (err) {
                alert(err.response.data.message)
            }
        }

        getCountries()
    }, [])

    return countriesData
}
