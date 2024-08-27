type CurrentFacetsProps = {
    selectedFacets: Record<string, string[]>
    handleRemoveFilter: (key: string, option: string) => void
}

export default function CurrentFacets({ selectedFacets, handleRemoveFilter } : CurrentFacetsProps) {
    const facets = Object.entries(selectedFacets).flatMap(([key, options]) =>
        options.map((option) => (
            <div
                className={`flex cursor-pointer items-center gap-3 relative rounded-full border border-slate-700 px-3 py-2 leading-none transition duration-200 hover:bg-red-400 ${
                    key === 'size' ? 'uppercase' : 'capitalize'
                }`}
                onClick={() => handleRemoveFilter(key, option)}
                key={`remove_filter_${key}_${option}`}
            >
                {option.split('-').join(' ')}
            </div>
        ))
    )

    return (
        <>
            {facets.length > 0 && (
                <>
                    <form className="py-2 h-max px-4 select-none w-full transform transition duration-300 origin-top overflow-hidden">
                        <div className="flex justify-between items-center mt-2 cursor-pointer" onClick={() => {}}>
                            <h3 className="font-semibold text-2xl text-cyan-400 capitalize">Current Filter</h3>
                        </div>
                        <div
                            className={`flex flex-wrap gap-2 p-2 max-w-full mt-3 transition-all transform duration-300 ease-in origin-top scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100 scrollbar-rounded scale-y-100 max-h-56 overflow-auto`}
                        >
                            {facets}
                        </div>
                    </form>
                </>
            )}
        </>
    )
}
