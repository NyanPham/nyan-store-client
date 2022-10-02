import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import useDebounce from '../hooks/useDebounce'
import { search } from '../redux/actions/searchActions'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

function SearchForm() {
    const { collectionName } = useParams()
    const [searchTerm, setSearchTerm] = useState(() => collectionName || '')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault()

        navigate('/categories/all')
    }

    useEffect(() => {
        if (collectionName == null || collectionName === '') return

        setSearchTerm(collectionName)
    }, [collectionName])

    useDebounce(
        () => {
            dispatch(search(searchTerm))
        },
        150,
        [searchTerm, dispatch]
    )

    return (
        <form className="hidden md:flex flex-row justify-between relative w-full max-w-lg" onSubmit={handleSearch}>
            <label htmlFor="search" className="hidden">
                Search
            </label>
            <input
                className="w-full py-2 pl-7 pr-14 bg-slate-200 rounded-full font-semibold text-slate-700 placeholder:font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
                id="search"
                type="text"
                value={searchTerm}
                onInput={(e) => setSearchTerm(e.target.value)}
                placeholder="search"
            />
            <button className="absolute top-1/2 right-7 -translate-y-1/2">
                <FontAwesomeIcon className="text-slate-700" icon={faMagnifyingGlass} />
            </button>
        </form>
    )
}

export default SearchForm
