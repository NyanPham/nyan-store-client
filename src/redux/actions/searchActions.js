const ACTIONS = {
    SEARCH_RESULTS: 'search-results',
    SEARCH_TERMS: 'search-terms',
}

export const search = (searchTerm) => {
    return {
        type: ACTIONS.SEARCH_TERMS,
        payload: {
            searchTerm,
        },
    }
}

export default ACTIONS
