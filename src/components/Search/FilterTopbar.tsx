import React, { useCallback, useEffect, useState } from 'react'
import {
    faSquarePollVertical,
    faSort,
    faTableCellsLarge,
    faTableCells,
    faListUl,
    faArrowDownWideShort,
    faArrowUpWideShort,
    faArrowDown91,
    faArrowDown19,
    faArrowDownAZ,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import getMatchedButton from '../../utils/getMatchedButton'
import { useSelector } from 'react-redux'

type FilterTopbarProps = {
    results: number
    onSortBy: (sortBy: string) => void
    onViewBy: (viewBy: string) => void
    categoryName: string
}

export default function FilterTopbar({ results, onSortBy, onViewBy, categoryName }: FilterTopbarProps) {
    const [activeView, setActiveView] = useState('loose')
    const [sortBy, setSortBy] = useState<string>('oldest')
    const [openSort, setOpenSort] = useState(false)
    const search = useSelector((state: { search: string }) => state.search)

    const hanldeViewClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = getMatchedButton(e, 'button[data-type]')
        if (!button || button.dataset.type == null) return
        
        setActiveView(button.dataset.type)
    }

    const toggleOpenSort = () => setOpenSort((prevOpenSort) => !prevOpenSort)

    const handleCloseSortModal = useCallback((e: MouseEvent) => {
        if ((e.target as HTMLElement).closest('[data-sort-button]') != null) return

        setOpenSort(false)
    }, [])

    const handleSortByClick = (e: React.MouseEvent<SVGSVGElement>) => {
        let sortIcon
        
        const target = e.target as HTMLElement

        if (target.matches('[data-sort]')) {
            sortIcon = target
        }       
        if (target.closest('[data-sort]') != null) {
            sortIcon = target.closest('[data-sort]')
        }   
        
        if (!sortIcon) return

        setSortBy((sortIcon as HTMLElement).dataset.sort!)
    }
    
    useEffect(() => {
        window.addEventListener('click', handleCloseSortModal)

        return () => window.removeEventListener('click', handleCloseSortModal)
    }, [handleCloseSortModal])

    useEffect(() => {
        onSortBy(sortBy)
    }, [sortBy, onSortBy])

    useEffect(() => {
        onViewBy(activeView)
    }, [activeView, onViewBy])

    return (
        <div className="filter-topbar py-3 px-4 h-max bg-white flex flex-col gap-3 items-center justify-between border-r border-t border-b border-gray-300 md:flex-row ld:py-6 lg:px-10">
            <div className="flex items-center gap-2">
                <FontAwesomeIcon className="w-7 h-7 text-cyan-400" icon={faSquarePollVertical} />
                <span className="text-2xl text-slate-700 font-semibold leading-none">
                    {results?.toLocaleString('en-US')}
                </span>
                <span className="text-base text-slate-700 font-medium">
                    items found
                    <span className="capitalize">
                        {categoryName && ` in ${categoryName}`}
                        {search && ` for ${search}`}
                    </span>
                </span>
            </div>
            <div className="flex gap-3">
                <span className="text-base text-slate-700 font-medium">Sort</span>
                <div className="flex gap-7 z-10">
                    <button className="relative" onClick={toggleOpenSort} data-sort-button>
                        <FontAwesomeIcon
                            className={`w-6 h-6 transition duration-300 hover:text-cyan-400 ${
                                openSort ? 'text-cyan-400' : 'text-slate-500'
                            }`}
                            icon={faSort}
                        />
                        <div
                            className={`${
                                openSort
                                    ? 'translate-y-3 pointer-events-auto opacity-100'
                                    : 'translate-y-0 pointer-events-none opacity-0'
                            } bg-white transition transform duration-200 absolute right-0 left-0 md:right-0 md:top-full py-4 px-7 grid justify-center items-center grid-cols-3 grid-rows-5 gap-y-4 gap-x-6 text-left w-max shadow-lg border border-gray-300/30`}
                        >
                            <h4 className="col-span-2 text-slate-700 text-md font-semibold">The latest</h4>
                            <FontAwesomeIcon
                                className={`text-xl hover:text-cyan-300 active:text-cyan-500 ${
                                    sortBy === 'oldest' ? 'text-cyan-500' : 'text-cyan-400'
                                }`}
                                icon={faArrowDownWideShort}
                                data-sort="oldest"
                                onClick={handleSortByClick}
                            />

                            <h4 className="col-span-2 text-slate-700 text-md font-semibold">The oldest</h4>
                            <FontAwesomeIcon
                                className={`text-xl hover:text-cyan-300 active:text-cyan-500 ${
                                    sortBy === 'latest' ? 'text-cyan-500' : 'text-cyan-400'
                                }`}
                                icon={faArrowUpWideShort}
                                data-sort="latest"
                                onClick={handleSortByClick}
                            />

                            <h4 className="col-span-2 text-slate-700 text-md font-semibold">Price down</h4>
                            <FontAwesomeIcon
                                className={`text-xl hover:text-cyan-300 active:text-cyan-500 ${
                                    sortBy === 'price-down' ? 'text-cyan-500' : 'text-cyan-400'
                                }`}
                                icon={faArrowDown91}
                                data-sort="price-down"
                                onClick={handleSortByClick}
                            />

                            <h4 className="col-span-2 text-slate-700 text-md font-semibold">Price up</h4>
                            <FontAwesomeIcon
                                className={`text-xl hover:text-cyan-300 active:text-cyan-500 ${
                                    sortBy === 'price-up' ? 'text-cyan-500' : 'text-cyan-400'
                                }`}
                                icon={faArrowDown19}
                                data-sort="price-up"
                                onClick={handleSortByClick}
                            />

                            <h4 className="col-span-2 text-slate-700 text-md font-semibold">Alphebetical</h4>
                            <FontAwesomeIcon
                                className={`text-xl hover:text-cyan-300 active:text-cyan-500 ${
                                    sortBy === 'alphabet' ? 'text-cyan-500' : 'text-cyan-400'
                                }`}
                                icon={faArrowDownAZ}
                                data-sort="alphabet"
                                onClick={handleSortByClick}
                            />
                        </div>
                    </button>
                    <button data-type="loose" onClick={hanldeViewClick}>
                        <FontAwesomeIcon
                            className={`w-6 h-6 transition duration-300 ${
                                activeView === 'loose' ? 'text-cyan-400' : 'text-slate-500'
                            }`}
                            icon={faTableCellsLarge}
                        />
                    </button>
                    <button className="hidden xl:block" data-type="dense" onClick={hanldeViewClick}>
                        <FontAwesomeIcon
                            className={`w-6 h-6 transition duration-300 ${
                                activeView === 'dense' ? 'text-cyan-400' : 'text-slate-500'
                            }`}
                            icon={faTableCells}
                        />
                    </button>
                    <button data-type="list" onClick={hanldeViewClick}>
                        <FontAwesomeIcon
                            className={`w-6 h-6 transition duration-300 ${
                                activeView === 'list' ? 'text-cyan-400' : 'text-slate-500'
                            }`}
                            icon={faListUl}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}
